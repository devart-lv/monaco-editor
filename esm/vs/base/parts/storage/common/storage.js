/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __awaiter =
	(this && this.__awaiter) ||
	function (thisArg, _arguments, P, generator) {
		function adopt(value) {
			return value instanceof P
				? value
				: new P(function (resolve) {
						resolve(value);
				  });
		}
		return new (P || (P = Promise))(function (resolve, reject) {
			function fulfilled(value) {
				try {
					step(generator.next(value));
				} catch (e) {
					reject(e);
				}
			}
			function rejected(value) {
				try {
					step(generator['throw'](value));
				} catch (e) {
					reject(e);
				}
			}
			function step(result) {
				result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
			}
			step((generator = generator.apply(thisArg, _arguments || [])).next());
		});
	};
import { ThrottledDelayer } from '../../../common/async.js';
import { Emitter, Event } from '../../../common/event.js';
import { Disposable } from '../../../common/lifecycle.js';
import { isUndefinedOrNull } from '../../../common/types.js';
export var StorageHint;
(function (StorageHint) {
	// A hint to the storage that the storage
	// does not exist on disk yet. This allows
	// the storage library to improve startup
	// time by not checking the storage for data.
	StorageHint[(StorageHint['STORAGE_DOES_NOT_EXIST'] = 0)] = 'STORAGE_DOES_NOT_EXIST';
	// A hint to the storage that the storage
	// is backed by an in-memory storage.
	StorageHint[(StorageHint['STORAGE_IN_MEMORY'] = 1)] = 'STORAGE_IN_MEMORY';
})(StorageHint || (StorageHint = {}));
export var StorageState;
(function (StorageState) {
	StorageState[(StorageState['None'] = 0)] = 'None';
	StorageState[(StorageState['Initialized'] = 1)] = 'Initialized';
	StorageState[(StorageState['Closed'] = 2)] = 'Closed';
})(StorageState || (StorageState = {}));
export class Storage extends Disposable {
	constructor(database, options = Object.create(null)) {
		super();
		this.database = database;
		this.options = options;
		this._onDidChangeStorage = this._register(new Emitter());
		this.onDidChangeStorage = this._onDidChangeStorage.event;
		this.state = StorageState.None;
		this.cache = new Map();
		this.flushDelayer = new ThrottledDelayer(Storage.DEFAULT_FLUSH_DELAY);
		this.pendingDeletes = new Set();
		this.pendingInserts = new Map();
		this.whenFlushedCallbacks = [];
		this.registerListeners();
	}
	registerListeners() {
		this._register(this.database.onDidChangeItemsExternal((e) => this.onDidChangeItemsExternal(e)));
	}
	onDidChangeItemsExternal(e) {
		var _a, _b;
		// items that change external require us to update our
		// caches with the values. we just accept the value and
		// emit an event if there is a change.
		(_a = e.changed) === null || _a === void 0
			? void 0
			: _a.forEach((value, key) => this.accept(key, value));
		(_b = e.deleted) === null || _b === void 0
			? void 0
			: _b.forEach((key) => this.accept(key, undefined));
	}
	accept(key, value) {
		if (this.state === StorageState.Closed) {
			return; // Return early if we are already closed
		}
		let changed = false;
		// Item got removed, check for deletion
		if (isUndefinedOrNull(value)) {
			changed = this.cache.delete(key);
		}
		// Item got updated, check for change
		else {
			const currentValue = this.cache.get(key);
			if (currentValue !== value) {
				this.cache.set(key, value);
				changed = true;
			}
		}
		// Signal to outside listeners
		if (changed) {
			this._onDidChangeStorage.fire(key);
		}
	}
	get(key, fallbackValue) {
		const value = this.cache.get(key);
		if (isUndefinedOrNull(value)) {
			return fallbackValue;
		}
		return value;
	}
	getBoolean(key, fallbackValue) {
		const value = this.get(key);
		if (isUndefinedOrNull(value)) {
			return fallbackValue;
		}
		return value === 'true';
	}
	getNumber(key, fallbackValue) {
		const value = this.get(key);
		if (isUndefinedOrNull(value)) {
			return fallbackValue;
		}
		return parseInt(value, 10);
	}
	set(key, value) {
		return __awaiter(this, void 0, void 0, function* () {
			if (this.state === StorageState.Closed) {
				return; // Return early if we are already closed
			}
			// We remove the key for undefined/null values
			if (isUndefinedOrNull(value)) {
				return this.delete(key);
			}
			// Otherwise, convert to String and store
			const valueStr = String(value);
			// Return early if value already set
			const currentValue = this.cache.get(key);
			if (currentValue === valueStr) {
				return;
			}
			// Update in cache and pending
			this.cache.set(key, valueStr);
			this.pendingInserts.set(key, valueStr);
			this.pendingDeletes.delete(key);
			// Event
			this._onDidChangeStorage.fire(key);
			// Accumulate work by scheduling after timeout
			return this.doFlush();
		});
	}
	delete(key) {
		return __awaiter(this, void 0, void 0, function* () {
			if (this.state === StorageState.Closed) {
				return; // Return early if we are already closed
			}
			// Remove from cache and add to pending
			const wasDeleted = this.cache.delete(key);
			if (!wasDeleted) {
				return; // Return early if value already deleted
			}
			if (!this.pendingDeletes.has(key)) {
				this.pendingDeletes.add(key);
			}
			this.pendingInserts.delete(key);
			// Event
			this._onDidChangeStorage.fire(key);
			// Accumulate work by scheduling after timeout
			return this.doFlush();
		});
	}
	get hasPending() {
		return this.pendingInserts.size > 0 || this.pendingDeletes.size > 0;
	}
	flushPending() {
		return __awaiter(this, void 0, void 0, function* () {
			if (!this.hasPending) {
				return; // return early if nothing to do
			}
			// Get pending data
			const updateRequest = { insert: this.pendingInserts, delete: this.pendingDeletes };
			// Reset pending data for next run
			this.pendingDeletes = new Set();
			this.pendingInserts = new Map();
			// Update in storage and release any
			// waiters we have once done
			return this.database.updateItems(updateRequest).finally(() => {
				var _a;
				if (!this.hasPending) {
					while (this.whenFlushedCallbacks.length) {
						(_a = this.whenFlushedCallbacks.pop()) === null || _a === void 0 ? void 0 : _a();
					}
				}
			});
		});
	}
	doFlush(delay) {
		return __awaiter(this, void 0, void 0, function* () {
			return this.flushDelayer.trigger(() => this.flushPending(), delay);
		});
	}
	dispose() {
		this.flushDelayer.dispose();
		super.dispose();
	}
}
Storage.DEFAULT_FLUSH_DELAY = 100;
export class InMemoryStorageDatabase {
	constructor() {
		this.onDidChangeItemsExternal = Event.None;
		this.items = new Map();
	}
	updateItems(request) {
		var _a, _b;
		return __awaiter(this, void 0, void 0, function* () {
			(_a = request.insert) === null || _a === void 0
				? void 0
				: _a.forEach((value, key) => this.items.set(key, value));
			(_b = request.delete) === null || _b === void 0
				? void 0
				: _b.forEach((key) => this.items.delete(key));
		});
	}
}
