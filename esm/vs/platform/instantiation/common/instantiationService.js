/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { IdleValue } from '../../../base/common/async.js';
import { illegalState } from '../../../base/common/errors.js';
import { toDisposable } from '../../../base/common/lifecycle.js';
import { SyncDescriptor } from './descriptors.js';
import { Graph } from './graph.js';
import { IInstantiationService, _util } from './instantiation.js';
import { ServiceCollection } from './serviceCollection.js';
import { LinkedList } from '../../../base/common/linkedList.js';
// TRACING
const _enableAllTracing = false;
class CyclicDependencyError extends Error {
	constructor(graph) {
		var _a;
		super('cyclic dependency between services');
		this.message =
			(_a = graph.findCycleSlow()) !== null && _a !== void 0
				? _a
				: `UNABLE to detect cycle, dumping graph: \n${graph.toString()}`;
	}
}
export class InstantiationService {
	constructor(
		_services = new ServiceCollection(),
		_strict = false,
		_parent,
		_enableTracing = _enableAllTracing
	) {
		var _a;
		this._services = _services;
		this._strict = _strict;
		this._parent = _parent;
		this._enableTracing = _enableTracing;
		this._activeInstantiations = new Set();
		this._services.set(IInstantiationService, this);
		this._globalGraph = _enableTracing
			? (_a = _parent === null || _parent === void 0 ? void 0 : _parent._globalGraph) !== null &&
			  _a !== void 0
				? _a
				: new Graph((e) => e)
			: undefined;
	}
	createChild(services) {
		return new InstantiationService(services, this._strict, this, this._enableTracing);
	}
	invokeFunction(fn, ...args) {
		const _trace = Trace.traceInvocation(this._enableTracing, fn);
		let _done = false;
		try {
			const accessor = {
				get: (id) => {
					if (_done) {
						throw illegalState(
							'service accessor is only valid during the invocation of its target method'
						);
					}
					const result = this._getOrCreateServiceInstance(id, _trace);
					if (!result) {
						throw new Error(`[invokeFunction] unknown service '${id}'`);
					}
					return result;
				}
			};
			return fn(accessor, ...args);
		} finally {
			_done = true;
			_trace.stop();
		}
	}
	createInstance(ctorOrDescriptor, ...rest) {
		let _trace;
		let result;
		if (ctorOrDescriptor instanceof SyncDescriptor) {
			_trace = Trace.traceCreation(this._enableTracing, ctorOrDescriptor.ctor);
			result = this._createInstance(
				ctorOrDescriptor.ctor,
				ctorOrDescriptor.staticArguments.concat(rest),
				_trace
			);
		} else {
			_trace = Trace.traceCreation(this._enableTracing, ctorOrDescriptor);
			result = this._createInstance(ctorOrDescriptor, rest, _trace);
		}
		_trace.stop();
		return result;
	}
	_createInstance(ctor, args = [], _trace) {
		// arguments defined by service decorators
		const serviceDependencies = _util
			.getServiceDependencies(ctor)
			.sort((a, b) => a.index - b.index);
		const serviceArgs = [];
		for (const dependency of serviceDependencies) {
			const service = this._getOrCreateServiceInstance(dependency.id, _trace);
			if (!service) {
				this._throwIfStrict(
					`[createInstance] ${ctor.name} depends on UNKNOWN service ${dependency.id}.`,
					false
				);
			}
			serviceArgs.push(service);
		}
		const firstServiceArgPos =
			serviceDependencies.length > 0 ? serviceDependencies[0].index : args.length;
		// check for argument mismatches, adjust static args if needed
		if (args.length !== firstServiceArgPos) {
			console.trace(
				`[createInstance] First service dependency of ${ctor.name} at position ${
					firstServiceArgPos + 1
				} conflicts with ${args.length} static arguments`
			);
			const delta = firstServiceArgPos - args.length;
			if (delta > 0) {
				args = args.concat(new Array(delta));
			} else {
				args = args.slice(0, firstServiceArgPos);
			}
		}
		// now create the instance
		return Reflect.construct(ctor, args.concat(serviceArgs));
	}
	_setServiceInstance(id, instance) {
		if (this._services.get(id) instanceof SyncDescriptor) {
			this._services.set(id, instance);
		} else if (this._parent) {
			this._parent._setServiceInstance(id, instance);
		} else {
			throw new Error('illegalState - setting UNKNOWN service instance');
		}
	}
	_getServiceInstanceOrDescriptor(id) {
		const instanceOrDesc = this._services.get(id);
		if (!instanceOrDesc && this._parent) {
			return this._parent._getServiceInstanceOrDescriptor(id);
		} else {
			return instanceOrDesc;
		}
	}
	_getOrCreateServiceInstance(id, _trace) {
		if (this._globalGraph && this._globalGraphImplicitDependency) {
			this._globalGraph.insertEdge(this._globalGraphImplicitDependency, String(id));
		}
		const thing = this._getServiceInstanceOrDescriptor(id);
		if (thing instanceof SyncDescriptor) {
			return this._safeCreateAndCacheServiceInstance(id, thing, _trace.branch(id, true));
		} else {
			_trace.branch(id, false);
			return thing;
		}
	}
	_safeCreateAndCacheServiceInstance(id, desc, _trace) {
		if (this._activeInstantiations.has(id)) {
			throw new Error(`illegal state - RECURSIVELY instantiating service '${id}'`);
		}
		this._activeInstantiations.add(id);
		try {
			return this._createAndCacheServiceInstance(id, desc, _trace);
		} finally {
			this._activeInstantiations.delete(id);
		}
	}
	_createAndCacheServiceInstance(id, desc, _trace) {
		var _a;
		const graph = new Graph((data) => data.id.toString());
		let cycleCount = 0;
		const stack = [{ id, desc, _trace }];
		while (stack.length) {
			const item = stack.pop();
			graph.lookupOrInsertNode(item);
			// a weak but working heuristic for cycle checks
			if (cycleCount++ > 1000) {
				throw new CyclicDependencyError(graph);
			}
			// check all dependencies for existence and if they need to be created first
			for (const dependency of _util.getServiceDependencies(item.desc.ctor)) {
				const instanceOrDesc = this._getServiceInstanceOrDescriptor(dependency.id);
				if (!instanceOrDesc) {
					this._throwIfStrict(
						`[createInstance] ${id} depends on ${dependency.id} which is NOT registered.`,
						true
					);
				}
				// take note of all service dependencies
				(_a = this._globalGraph) === null || _a === void 0
					? void 0
					: _a.insertEdge(String(item.id), String(dependency.id));
				if (instanceOrDesc instanceof SyncDescriptor) {
					const d = {
						id: dependency.id,
						desc: instanceOrDesc,
						_trace: item._trace.branch(dependency.id, true)
					};
					graph.insertEdge(item, d);
					stack.push(d);
				}
			}
		}
		while (true) {
			const roots = graph.roots();
			// if there is no more roots but still
			// nodes in the graph we have a cycle
			if (roots.length === 0) {
				if (!graph.isEmpty()) {
					throw new CyclicDependencyError(graph);
				}
				break;
			}
			for (const { data } of roots) {
				// Repeat the check for this still being a service sync descriptor. That's because
				// instantiating a dependency might have side-effect and recursively trigger instantiation
				// so that some dependencies are now fullfilled already.
				const instanceOrDesc = this._getServiceInstanceOrDescriptor(data.id);
				if (instanceOrDesc instanceof SyncDescriptor) {
					// create instance and overwrite the service collections
					const instance = this._createServiceInstanceWithOwner(
						data.id,
						data.desc.ctor,
						data.desc.staticArguments,
						data.desc.supportsDelayedInstantiation,
						data._trace
					);
					this._setServiceInstance(data.id, instance);
				}
				graph.removeNode(data);
			}
		}
		return this._getServiceInstanceOrDescriptor(id);
	}
	_createServiceInstanceWithOwner(id, ctor, args = [], supportsDelayedInstantiation, _trace) {
		if (this._services.get(id) instanceof SyncDescriptor) {
			return this._createServiceInstance(id, ctor, args, supportsDelayedInstantiation, _trace);
		} else if (this._parent) {
			return this._parent._createServiceInstanceWithOwner(
				id,
				ctor,
				args,
				supportsDelayedInstantiation,
				_trace
			);
		} else {
			throw new Error(`illegalState - creating UNKNOWN service instance ${ctor.name}`);
		}
	}
	_createServiceInstance(id, ctor, args = [], supportsDelayedInstantiation, _trace) {
		if (!supportsDelayedInstantiation) {
			// eager instantiation
			return this._createInstance(ctor, args, _trace);
		} else {
			const child = new InstantiationService(undefined, this._strict, this, this._enableTracing);
			child._globalGraphImplicitDependency = String(id);
			// Return a proxy object that's backed by an idle value. That
			// strategy is to instantiate services in our idle time or when actually
			// needed but not when injected into a consumer
			// return "empty events" when the service isn't instantiated yet
			const earlyListeners = new Map();
			const idle = new IdleValue(() => {
				const result = child._createInstance(ctor, args, _trace);
				// early listeners that we kept are now being subscribed to
				// the real service
				for (const [key, values] of earlyListeners) {
					const candidate = result[key];
					if (typeof candidate === 'function') {
						for (const listener of values) {
							candidate.apply(result, listener);
						}
					}
				}
				earlyListeners.clear();
				return result;
			});
			return new Proxy(Object.create(null), {
				get(target, key) {
					if (!idle.isInitialized) {
						// looks like an event
						if (typeof key === 'string' && (key.startsWith('onDid') || key.startsWith('onWill'))) {
							let list = earlyListeners.get(key);
							if (!list) {
								list = new LinkedList();
								earlyListeners.set(key, list);
							}
							const event = (callback, thisArg, disposables) => {
								const rm = list.push([callback, thisArg, disposables]);
								return toDisposable(rm);
							};
							return event;
						}
					}
					// value already exists
					if (key in target) {
						return target[key];
					}
					// create value
					const obj = idle.value;
					let prop = obj[key];
					if (typeof prop !== 'function') {
						return prop;
					}
					prop = prop.bind(obj);
					target[key] = prop;
					return prop;
				},
				set(_target, p, value) {
					idle.value[p] = value;
					return true;
				},
				getPrototypeOf(_target) {
					return ctor.prototype;
				}
			});
		}
	}
	_throwIfStrict(msg, printWarning) {
		if (printWarning) {
			console.warn(msg);
		}
		if (this._strict) {
			throw new Error(msg);
		}
	}
}
export class Trace {
	static traceInvocation(_enableTracing, ctor) {
		return !_enableTracing
			? Trace._None
			: new Trace(
					2 /* TraceType.Invocation */,
					ctor.name || new Error().stack.split('\n').slice(3, 4).join('\n')
			  );
	}
	static traceCreation(_enableTracing, ctor) {
		return !_enableTracing ? Trace._None : new Trace(1 /* TraceType.Creation */, ctor.name);
	}
	constructor(type, name) {
		this.type = type;
		this.name = name;
		this._start = Date.now();
		this._dep = [];
	}
	branch(id, first) {
		const child = new Trace(3 /* TraceType.Branch */, id.toString());
		this._dep.push([id, first, child]);
		return child;
	}
	stop() {
		const dur = Date.now() - this._start;
		Trace._totals += dur;
		let causedCreation = false;
		function printChild(n, trace) {
			const res = [];
			const prefix = new Array(n + 1).join('\t');
			for (const [id, first, child] of trace._dep) {
				if (first && child) {
					causedCreation = true;
					res.push(`${prefix}CREATES -> ${id}`);
					const nested = printChild(n + 1, child);
					if (nested) {
						res.push(nested);
					}
				} else {
					res.push(`${prefix}uses -> ${id}`);
				}
			}
			return res.join('\n');
		}
		const lines = [
			`${this.type === 1 /* TraceType.Creation */ ? 'CREATE' : 'CALL'} ${this.name}`,
			`${printChild(1, this)}`,
			`DONE, took ${dur.toFixed(2)}ms (grand total ${Trace._totals.toFixed(2)}ms)`
		];
		if (dur > 2 || causedCreation) {
			Trace.all.add(lines.join('\n'));
		}
	}
}
Trace.all = new Set();
Trace._None = new (class extends Trace {
	constructor() {
		super(0 /* TraceType.None */, null);
	}
	stop() {}
	branch() {
		return this;
	}
})();
Trace._totals = 0;
//#endregion
