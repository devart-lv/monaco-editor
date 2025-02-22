/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.38.0(0e330ae453813de4e6cf272460fb79c7117073d0)
 * Released under the MIT license
 * https://github.com/microsoft/vscode/blob/main/LICENSE.txt
 *-----------------------------------------------------------*/ (function () {
	var X = [
			'require',
			'exports',
			'vs/editor/common/core/range',
			'vs/editor/common/core/position',
			'vs/base/common/errors',
			'vs/base/common/strings',
			'vs/editor/common/core/offsetRange',
			'vs/editor/common/diff/algorithms/diffAlgorithm',
			'vs/base/common/platform',
			'vs/base/common/event',
			'vs/base/common/assert',
			'vs/base/common/lifecycle',
			'vs/base/common/objects',
			'vs/base/common/uri',
			'vs/base/common/functional',
			'vs/base/common/iterator',
			'vs/base/common/linkedList',
			'vs/base/common/diff/diff',
			'vs/base/common/types',
			'vs/base/common/uint',
			'vs/editor/common/core/characterClassifier',
			'vs/editor/common/core/lineRange',
			'vs/editor/common/core/wordHelper',
			'vs/editor/common/diff/linesDiffComputer',
			'vs/base/common/stopwatch',
			'vs/nls',
			'vs/base/common/arrays',
			'vs/base/common/cache',
			'vs/base/common/color',
			'vs/base/common/diff/diffChange',
			'vs/base/common/keyCodes',
			'vs/base/common/lazy',
			'vs/base/common/hash',
			'vs/base/common/codicons',
			'vs/editor/common/core/selection',
			'vs/editor/common/core/wordCharacterClassifier',
			'vs/editor/common/diff/algorithms/joinSequenceDiffs',
			'vs/editor/common/diff/algorithms/myersDiffAlgorithm',
			'vs/editor/common/diff/algorithms/utils',
			'vs/editor/common/diff/algorithms/dynamicProgrammingDiffing',
			'vs/editor/common/diff/smartLinesDiffComputer',
			'vs/editor/common/diff/standardLinesDiffComputer',
			'vs/editor/common/diff/linesDiffComputers',
			'vs/editor/common/languages/defaultDocumentColorsComputer',
			'vs/editor/common/languages/linkComputer',
			'vs/editor/common/languages/supports/inplaceReplaceSupport',
			'vs/editor/common/model',
			'vs/editor/common/model/prefixSumComputer',
			'vs/editor/common/model/mirrorTextModel',
			'vs/editor/common/model/textModelSearch',
			'vs/editor/common/services/unicodeTextModelHighlighter',
			'vs/editor/common/standalone/standaloneEnums',
			'vs/nls!vs/base/common/platform',
			'vs/base/common/process',
			'vs/base/common/path',
			'vs/base/common/cancellation',
			'vs/editor/common/tokenizationRegistry',
			'vs/editor/common/languages',
			'vs/editor/common/services/editorBaseApi',
			'vs/nls!vs/base/common/worker/simpleWorker',
			'vs/base/common/worker/simpleWorker',
			'vs/editor/common/services/editorSimpleWorker'
		],
		J = function (x) {
			for (var n = [], R = 0, M = x.length; R < M; R++) n[R] = X[x[R]];
			return n;
		};
	const Ee = this,
		Re = typeof global == 'object' ? global : {};
	var ue;
	(function (x) {
		x.global = Ee;
		class n {
			get isWindows() {
				return this._detect(), this._isWindows;
			}
			get isNode() {
				return this._detect(), this._isNode;
			}
			get isElectronRenderer() {
				return this._detect(), this._isElectronRenderer;
			}
			get isWebWorker() {
				return this._detect(), this._isWebWorker;
			}
			get isElectronNodeIntegrationWebWorker() {
				return this._detect(), this._isElectronNodeIntegrationWebWorker;
			}
			constructor() {
				(this._detected = !1),
					(this._isWindows = !1),
					(this._isNode = !1),
					(this._isElectronRenderer = !1),
					(this._isWebWorker = !1),
					(this._isElectronNodeIntegrationWebWorker = !1);
			}
			_detect() {
				this._detected ||
					((this._detected = !0),
					(this._isWindows = n._isWindows()),
					(this._isNode = typeof module < 'u' && !!module.exports),
					(this._isElectronRenderer =
						typeof process < 'u' &&
						typeof process.versions < 'u' &&
						typeof process.versions.electron < 'u' &&
						process.type === 'renderer'),
					(this._isWebWorker = typeof x.global.importScripts == 'function'),
					(this._isElectronNodeIntegrationWebWorker =
						this._isWebWorker &&
						typeof process < 'u' &&
						typeof process.versions < 'u' &&
						typeof process.versions.electron < 'u' &&
						process.type === 'worker'));
			}
			static _isWindows() {
				return typeof navigator < 'u' &&
					navigator.userAgent &&
					navigator.userAgent.indexOf('Windows') >= 0
					? !0
					: typeof process < 'u'
					? process.platform === 'win32'
					: !1;
			}
		}
		x.Environment = n;
	})(ue || (ue = {}));
	var ue;
	(function (x) {
		class n {
			constructor(a, C, S) {
				(this.type = a), (this.detail = C), (this.timestamp = S);
			}
		}
		x.LoaderEvent = n;
		class R {
			constructor(a) {
				this._events = [new n(1, '', a)];
			}
			record(a, C) {
				this._events.push(new n(a, C, x.Utilities.getHighPerformanceTimestamp()));
			}
			getEvents() {
				return this._events;
			}
		}
		x.LoaderEventRecorder = R;
		class M {
			record(a, C) {}
			getEvents() {
				return [];
			}
		}
		(M.INSTANCE = new M()), (x.NullLoaderEventRecorder = M);
	})(ue || (ue = {}));
	var ue;
	(function (x) {
		class n {
			static fileUriToFilePath(M, i) {
				if (((i = decodeURI(i).replace(/%23/g, '#')), M)) {
					if (/^file:\/\/\//.test(i)) return i.substr(8);
					if (/^file:\/\//.test(i)) return i.substr(5);
				} else if (/^file:\/\//.test(i)) return i.substr(7);
				return i;
			}
			static startsWith(M, i) {
				return M.length >= i.length && M.substr(0, i.length) === i;
			}
			static endsWith(M, i) {
				return M.length >= i.length && M.substr(M.length - i.length) === i;
			}
			static containsQueryString(M) {
				return /^[^\#]*\?/gi.test(M);
			}
			static isAbsolutePath(M) {
				return /^((http:\/\/)|(https:\/\/)|(file:\/\/)|(\/))/.test(M);
			}
			static forEachProperty(M, i) {
				if (M) {
					let a;
					for (a in M) M.hasOwnProperty(a) && i(a, M[a]);
				}
			}
			static isEmpty(M) {
				let i = !0;
				return (
					n.forEachProperty(M, () => {
						i = !1;
					}),
					i
				);
			}
			static recursiveClone(M) {
				if (
					!M ||
					typeof M != 'object' ||
					M instanceof RegExp ||
					(!Array.isArray(M) && Object.getPrototypeOf(M) !== Object.prototype)
				)
					return M;
				let i = Array.isArray(M) ? [] : {};
				return (
					n.forEachProperty(M, (a, C) => {
						C && typeof C == 'object' ? (i[a] = n.recursiveClone(C)) : (i[a] = C);
					}),
					i
				);
			}
			static generateAnonymousModule() {
				return '===anonymous' + n.NEXT_ANONYMOUS_ID++ + '===';
			}
			static isAnonymousModule(M) {
				return n.startsWith(M, '===anonymous');
			}
			static getHighPerformanceTimestamp() {
				return (
					this.PERFORMANCE_NOW_PROBED ||
						((this.PERFORMANCE_NOW_PROBED = !0),
						(this.HAS_PERFORMANCE_NOW =
							x.global.performance && typeof x.global.performance.now == 'function')),
					this.HAS_PERFORMANCE_NOW ? x.global.performance.now() : Date.now()
				);
			}
		}
		(n.NEXT_ANONYMOUS_ID = 1),
			(n.PERFORMANCE_NOW_PROBED = !1),
			(n.HAS_PERFORMANCE_NOW = !1),
			(x.Utilities = n);
	})(ue || (ue = {}));
	var ue;
	(function (x) {
		function n(i) {
			if (i instanceof Error) return i;
			const a = new Error(i.message || String(i) || 'Unknown Error');
			return i.stack && (a.stack = i.stack), a;
		}
		x.ensureError = n;
		class R {
			static validateConfigurationOptions(a) {
				function C(S) {
					if (S.phase === 'loading') {
						console.error('Loading "' + S.moduleId + '" failed'),
							console.error(S),
							console.error('Here are the modules that depend on it:'),
							console.error(S.neededBy);
						return;
					}
					if (S.phase === 'factory') {
						console.error('The factory function of "' + S.moduleId + '" has thrown an exception'),
							console.error(S),
							console.error('Here are the modules that depend on it:'),
							console.error(S.neededBy);
						return;
					}
				}
				if (
					((a = a || {}),
					typeof a.baseUrl != 'string' && (a.baseUrl = ''),
					typeof a.isBuild != 'boolean' && (a.isBuild = !1),
					typeof a.paths != 'object' && (a.paths = {}),
					typeof a.config != 'object' && (a.config = {}),
					typeof a.catchError > 'u' && (a.catchError = !1),
					typeof a.recordStats > 'u' && (a.recordStats = !1),
					typeof a.urlArgs != 'string' && (a.urlArgs = ''),
					typeof a.onError != 'function' && (a.onError = C),
					Array.isArray(a.ignoreDuplicateModules) || (a.ignoreDuplicateModules = []),
					a.baseUrl.length > 0 && (x.Utilities.endsWith(a.baseUrl, '/') || (a.baseUrl += '/')),
					typeof a.cspNonce != 'string' && (a.cspNonce = ''),
					typeof a.preferScriptTags > 'u' && (a.preferScriptTags = !1),
					a.nodeCachedData &&
						typeof a.nodeCachedData == 'object' &&
						(typeof a.nodeCachedData.seed != 'string' && (a.nodeCachedData.seed = 'seed'),
						(typeof a.nodeCachedData.writeDelay != 'number' || a.nodeCachedData.writeDelay < 0) &&
							(a.nodeCachedData.writeDelay = 1e3 * 7),
						!a.nodeCachedData.path || typeof a.nodeCachedData.path != 'string'))
				) {
					const S = n(new Error("INVALID cached data configuration, 'path' MUST be set"));
					(S.phase = 'configuration'), a.onError(S), (a.nodeCachedData = void 0);
				}
				return a;
			}
			static mergeConfigurationOptions(a = null, C = null) {
				let S = x.Utilities.recursiveClone(C || {});
				return (
					x.Utilities.forEachProperty(a, (o, s) => {
						o === 'ignoreDuplicateModules' && typeof S.ignoreDuplicateModules < 'u'
							? (S.ignoreDuplicateModules = S.ignoreDuplicateModules.concat(s))
							: o === 'paths' && typeof S.paths < 'u'
							? x.Utilities.forEachProperty(s, (p, e) => (S.paths[p] = e))
							: o === 'config' && typeof S.config < 'u'
							? x.Utilities.forEachProperty(s, (p, e) => (S.config[p] = e))
							: (S[o] = x.Utilities.recursiveClone(s));
					}),
					R.validateConfigurationOptions(S)
				);
			}
		}
		x.ConfigurationOptionsUtil = R;
		class M {
			constructor(a, C) {
				if (
					((this._env = a),
					(this.options = R.mergeConfigurationOptions(C)),
					this._createIgnoreDuplicateModulesMap(),
					this._createSortedPathsRules(),
					this.options.baseUrl === '' &&
						this.options.nodeRequire &&
						this.options.nodeRequire.main &&
						this.options.nodeRequire.main.filename &&
						this._env.isNode)
				) {
					let S = this.options.nodeRequire.main.filename,
						o = Math.max(S.lastIndexOf('/'), S.lastIndexOf('\\'));
					this.options.baseUrl = S.substring(0, o + 1);
				}
			}
			_createIgnoreDuplicateModulesMap() {
				this.ignoreDuplicateModulesMap = {};
				for (let a = 0; a < this.options.ignoreDuplicateModules.length; a++)
					this.ignoreDuplicateModulesMap[this.options.ignoreDuplicateModules[a]] = !0;
			}
			_createSortedPathsRules() {
				(this.sortedPathsRules = []),
					x.Utilities.forEachProperty(this.options.paths, (a, C) => {
						Array.isArray(C)
							? this.sortedPathsRules.push({ from: a, to: C })
							: this.sortedPathsRules.push({ from: a, to: [C] });
					}),
					this.sortedPathsRules.sort((a, C) => C.from.length - a.from.length);
			}
			cloneAndMerge(a) {
				return new M(this._env, R.mergeConfigurationOptions(a, this.options));
			}
			getOptionsLiteral() {
				return this.options;
			}
			_applyPaths(a) {
				let C;
				for (let S = 0, o = this.sortedPathsRules.length; S < o; S++)
					if (((C = this.sortedPathsRules[S]), x.Utilities.startsWith(a, C.from))) {
						let s = [];
						for (let p = 0, e = C.to.length; p < e; p++) s.push(C.to[p] + a.substr(C.from.length));
						return s;
					}
				return [a];
			}
			_addUrlArgsToUrl(a) {
				return x.Utilities.containsQueryString(a)
					? a + '&' + this.options.urlArgs
					: a + '?' + this.options.urlArgs;
			}
			_addUrlArgsIfNecessaryToUrl(a) {
				return this.options.urlArgs ? this._addUrlArgsToUrl(a) : a;
			}
			_addUrlArgsIfNecessaryToUrls(a) {
				if (this.options.urlArgs)
					for (let C = 0, S = a.length; C < S; C++) a[C] = this._addUrlArgsToUrl(a[C]);
				return a;
			}
			moduleIdToPaths(a) {
				if (
					this._env.isNode &&
					this.options.amdModulesPattern instanceof RegExp &&
					!this.options.amdModulesPattern.test(a)
				)
					return this.isBuild() ? ['empty:'] : ['node|' + a];
				let C = a,
					S;
				if (!x.Utilities.endsWith(C, '.js') && !x.Utilities.isAbsolutePath(C)) {
					S = this._applyPaths(C);
					for (let o = 0, s = S.length; o < s; o++)
						(this.isBuild() && S[o] === 'empty:') ||
							(x.Utilities.isAbsolutePath(S[o]) || (S[o] = this.options.baseUrl + S[o]),
							!x.Utilities.endsWith(S[o], '.js') &&
								!x.Utilities.containsQueryString(S[o]) &&
								(S[o] = S[o] + '.js'));
				} else
					!x.Utilities.endsWith(C, '.js') && !x.Utilities.containsQueryString(C) && (C = C + '.js'),
						(S = [C]);
				return this._addUrlArgsIfNecessaryToUrls(S);
			}
			requireToUrl(a) {
				let C = a;
				return (
					x.Utilities.isAbsolutePath(C) ||
						((C = this._applyPaths(C)[0]),
						x.Utilities.isAbsolutePath(C) || (C = this.options.baseUrl + C)),
					this._addUrlArgsIfNecessaryToUrl(C)
				);
			}
			isBuild() {
				return this.options.isBuild;
			}
			shouldInvokeFactory(a) {
				return !!(
					!this.options.isBuild ||
					x.Utilities.isAnonymousModule(a) ||
					(this.options.buildForceInvokeFactory && this.options.buildForceInvokeFactory[a])
				);
			}
			isDuplicateMessageIgnoredFor(a) {
				return this.ignoreDuplicateModulesMap.hasOwnProperty(a);
			}
			getConfigForModule(a) {
				if (this.options.config) return this.options.config[a];
			}
			shouldCatchError() {
				return this.options.catchError;
			}
			shouldRecordStats() {
				return this.options.recordStats;
			}
			onError(a) {
				this.options.onError(a);
			}
		}
		x.Configuration = M;
	})(ue || (ue = {}));
	var ue;
	(function (x) {
		class n {
			constructor(s) {
				(this._env = s), (this._scriptLoader = null), (this._callbackMap = {});
			}
			load(s, p, e, d) {
				if (!this._scriptLoader)
					if (this._env.isWebWorker) this._scriptLoader = new i();
					else if (this._env.isElectronRenderer) {
						const { preferScriptTags: b } = s.getConfig().getOptionsLiteral();
						b ? (this._scriptLoader = new R()) : (this._scriptLoader = new a(this._env));
					} else
						this._env.isNode
							? (this._scriptLoader = new a(this._env))
							: (this._scriptLoader = new R());
				let g = { callback: e, errorback: d };
				if (this._callbackMap.hasOwnProperty(p)) {
					this._callbackMap[p].push(g);
					return;
				}
				(this._callbackMap[p] = [g]),
					this._scriptLoader.load(
						s,
						p,
						() => this.triggerCallback(p),
						(b) => this.triggerErrorback(p, b)
					);
			}
			triggerCallback(s) {
				let p = this._callbackMap[s];
				delete this._callbackMap[s];
				for (let e = 0; e < p.length; e++) p[e].callback();
			}
			triggerErrorback(s, p) {
				let e = this._callbackMap[s];
				delete this._callbackMap[s];
				for (let d = 0; d < e.length; d++) e[d].errorback(p);
			}
		}
		class R {
			attachListeners(s, p, e) {
				let d = () => {
						s.removeEventListener('load', g), s.removeEventListener('error', b);
					},
					g = (m) => {
						d(), p();
					},
					b = (m) => {
						d(), e(m);
					};
				s.addEventListener('load', g), s.addEventListener('error', b);
			}
			load(s, p, e, d) {
				if (/^node\|/.test(p)) {
					let g = s.getConfig().getOptionsLiteral(),
						b = C(s.getRecorder(), g.nodeRequire || x.global.nodeRequire),
						m = p.split('|'),
						v = null;
					try {
						v = b(m[1]);
					} catch (E) {
						d(E);
						return;
					}
					s.enqueueDefineAnonymousModule([], () => v), e();
				} else {
					let g = document.createElement('script');
					g.setAttribute('async', 'async'),
						g.setAttribute('type', 'text/javascript'),
						this.attachListeners(g, e, d);
					const { trustedTypesPolicy: b } = s.getConfig().getOptionsLiteral();
					b && (p = b.createScriptURL(p)), g.setAttribute('src', p);
					const { cspNonce: m } = s.getConfig().getOptionsLiteral();
					m && g.setAttribute('nonce', m), document.getElementsByTagName('head')[0].appendChild(g);
				}
			}
		}
		function M(o) {
			const { trustedTypesPolicy: s } = o.getConfig().getOptionsLiteral();
			try {
				return (s ? self.eval(s.createScript('', 'true')) : new Function('true')).call(self), !0;
			} catch {
				return !1;
			}
		}
		class i {
			constructor() {
				this._cachedCanUseEval = null;
			}
			_canUseEval(s) {
				return (
					this._cachedCanUseEval === null && (this._cachedCanUseEval = M(s)), this._cachedCanUseEval
				);
			}
			load(s, p, e, d) {
				if (/^node\|/.test(p)) {
					const g = s.getConfig().getOptionsLiteral(),
						b = C(s.getRecorder(), g.nodeRequire || x.global.nodeRequire),
						m = p.split('|');
					let v = null;
					try {
						v = b(m[1]);
					} catch (E) {
						d(E);
						return;
					}
					s.enqueueDefineAnonymousModule([], function () {
						return v;
					}),
						e();
				} else {
					const { trustedTypesPolicy: g } = s.getConfig().getOptionsLiteral();
					if (
						!(
							/^((http:)|(https:)|(file:))/.test(p) &&
							p.substring(0, self.origin.length) !== self.origin
						) &&
						this._canUseEval(s)
					) {
						fetch(p)
							.then((m) => {
								if (m.status !== 200) throw new Error(m.statusText);
								return m.text();
							})
							.then((m) => {
								(m = `${m}
//# sourceURL=${p}`),
									(g ? self.eval(g.createScript('', m)) : new Function(m)).call(self),
									e();
							})
							.then(void 0, d);
						return;
					}
					try {
						g && (p = g.createScriptURL(p)), importScripts(p), e();
					} catch (m) {
						d(m);
					}
				}
			}
		}
		class a {
			constructor(s) {
				(this._env = s), (this._didInitialize = !1), (this._didPatchNodeRequire = !1);
			}
			_init(s) {
				this._didInitialize ||
					((this._didInitialize = !0),
					(this._fs = s('fs')),
					(this._vm = s('vm')),
					(this._path = s('path')),
					(this._crypto = s('crypto')));
			}
			_initNodeRequire(s, p) {
				const { nodeCachedData: e } = p.getConfig().getOptionsLiteral();
				if (!e || this._didPatchNodeRequire) return;
				this._didPatchNodeRequire = !0;
				const d = this,
					g = s('module');
				function b(m) {
					const v = m.constructor;
					let E = function (A) {
						try {
							return m.require(A);
						} finally {
						}
					};
					return (
						(E.resolve = function (A, w) {
							return v._resolveFilename(A, m, !1, w);
						}),
						(E.resolve.paths = function (A) {
							return v._resolveLookupPaths(A, m);
						}),
						(E.main = process.mainModule),
						(E.extensions = v._extensions),
						(E.cache = v._cache),
						E
					);
				}
				g.prototype._compile = function (m, v) {
					const E = g.wrap(m.replace(/^#!.*/, '')),
						L = p.getRecorder(),
						A = d._getCachedDataPath(e, v),
						w = { filename: v };
					let c;
					try {
						const N = d._fs.readFileSync(A);
						(c = N.slice(0, 16)), (w.cachedData = N.slice(16)), L.record(60, A);
					} catch {
						L.record(61, A);
					}
					const r = new d._vm.Script(E, w),
						u = r.runInThisContext(w),
						h = d._path.dirname(v),
						f = b(this),
						l = [this.exports, f, this, v, h, process, Re, Buffer],
						_ = u.apply(this.exports, l);
					return (
						d._handleCachedData(r, E, A, !w.cachedData, p), d._verifyCachedData(r, E, A, c, p), _
					);
				};
			}
			load(s, p, e, d) {
				const g = s.getConfig().getOptionsLiteral(),
					b = C(s.getRecorder(), g.nodeRequire || x.global.nodeRequire),
					m =
						g.nodeInstrumenter ||
						function (E) {
							return E;
						};
				this._init(b), this._initNodeRequire(b, s);
				let v = s.getRecorder();
				if (/^node\|/.test(p)) {
					let E = p.split('|'),
						L = null;
					try {
						L = b(E[1]);
					} catch (A) {
						d(A);
						return;
					}
					s.enqueueDefineAnonymousModule([], () => L), e();
				} else {
					p = x.Utilities.fileUriToFilePath(this._env.isWindows, p);
					const E = this._path.normalize(p),
						L = this._getElectronRendererScriptPathOrUri(E),
						A = !!g.nodeCachedData,
						w = A ? this._getCachedDataPath(g.nodeCachedData, p) : void 0;
					this._readSourceAndCachedData(E, w, v, (c, r, u, h) => {
						if (c) {
							d(c);
							return;
						}
						let f;
						r.charCodeAt(0) === a._BOM
							? (f = a._PREFIX + r.substring(1) + a._SUFFIX)
							: (f = a._PREFIX + r + a._SUFFIX),
							(f = m(f, E));
						const l = { filename: L, cachedData: u },
							_ = this._createAndEvalScript(s, f, l, e, d);
						this._handleCachedData(_, f, w, A && !u, s), this._verifyCachedData(_, f, w, h, s);
					});
				}
			}
			_createAndEvalScript(s, p, e, d, g) {
				const b = s.getRecorder();
				b.record(31, e.filename);
				const m = new this._vm.Script(p, e),
					v = m.runInThisContext(e),
					E = s.getGlobalAMDDefineFunc();
				let L = !1;
				const A = function () {
					return (L = !0), E.apply(null, arguments);
				};
				return (
					(A.amd = E.amd),
					v.call(
						x.global,
						s.getGlobalAMDRequireFunc(),
						A,
						e.filename,
						this._path.dirname(e.filename)
					),
					b.record(32, e.filename),
					L ? d() : g(new Error(`Didn't receive define call in ${e.filename}!`)),
					m
				);
			}
			_getElectronRendererScriptPathOrUri(s) {
				if (!this._env.isElectronRenderer) return s;
				let p = s.match(/^([a-z])\:(.*)/i);
				return p
					? `file:///${(p[1].toUpperCase() + ':' + p[2]).replace(/\\/g, '/')}`
					: `file://${s}`;
			}
			_getCachedDataPath(s, p) {
				const e = this._crypto
						.createHash('md5')
						.update(p, 'utf8')
						.update(s.seed, 'utf8')
						.update(process.arch, '')
						.digest('hex'),
					d = this._path.basename(p).replace(/\.js$/, '');
				return this._path.join(s.path, `${d}-${e}.code`);
			}
			_handleCachedData(s, p, e, d, g) {
				s.cachedDataRejected
					? this._fs.unlink(e, (b) => {
							g.getRecorder().record(62, e),
								this._createAndWriteCachedData(s, p, e, g),
								b && g.getConfig().onError(b);
					  })
					: d && this._createAndWriteCachedData(s, p, e, g);
			}
			_createAndWriteCachedData(s, p, e, d) {
				let g = Math.ceil(
						d.getConfig().getOptionsLiteral().nodeCachedData.writeDelay * (1 + Math.random())
					),
					b = -1,
					m = 0,
					v;
				const E = () => {
					setTimeout(() => {
						v || (v = this._crypto.createHash('md5').update(p, 'utf8').digest());
						const L = s.createCachedData();
						if (!(L.length === 0 || L.length === b || m >= 5)) {
							if (L.length < b) {
								E();
								return;
							}
							(b = L.length),
								this._fs.writeFile(e, Buffer.concat([v, L]), (A) => {
									A && d.getConfig().onError(A), d.getRecorder().record(63, e), E();
								});
						}
					}, g * Math.pow(4, m++));
				};
				E();
			}
			_readSourceAndCachedData(s, p, e, d) {
				if (!p) this._fs.readFile(s, { encoding: 'utf8' }, d);
				else {
					let g,
						b,
						m,
						v = 2;
					const E = (L) => {
						L ? d(L) : --v === 0 && d(void 0, g, b, m);
					};
					this._fs.readFile(s, { encoding: 'utf8' }, (L, A) => {
						(g = A), E(L);
					}),
						this._fs.readFile(p, (L, A) => {
							!L && A && A.length > 0
								? ((m = A.slice(0, 16)), (b = A.slice(16)), e.record(60, p))
								: e.record(61, p),
								E();
						});
				}
			}
			_verifyCachedData(s, p, e, d, g) {
				d &&
					(s.cachedDataRejected ||
						setTimeout(() => {
							const b = this._crypto.createHash('md5').update(p, 'utf8').digest();
							d.equals(b) ||
								(g
									.getConfig()
									.onError(
										new Error(
											`FAILED TO VERIFY CACHED DATA, deleting stale '${e}' now, but a RESTART IS REQUIRED`
										)
									),
								this._fs.unlink(e, (m) => {
									m && g.getConfig().onError(m);
								}));
						}, Math.ceil(5e3 * (1 + Math.random()))));
			}
		}
		(a._BOM = 65279),
			(a._PREFIX = '(function (require, define, __filename, __dirname) { '),
			(a._SUFFIX = `
});`);
		function C(o, s) {
			if (s.__$__isRecorded) return s;
			const p = function (d) {
				o.record(33, d);
				try {
					return s(d);
				} finally {
					o.record(34, d);
				}
			};
			return (p.__$__isRecorded = !0), p;
		}
		x.ensureRecordedNodeRequire = C;
		function S(o) {
			return new n(o);
		}
		x.createScriptLoader = S;
	})(ue || (ue = {}));
	var ue;
	(function (x) {
		class n {
			constructor(o) {
				let s = o.lastIndexOf('/');
				s !== -1 ? (this.fromModulePath = o.substr(0, s + 1)) : (this.fromModulePath = '');
			}
			static _normalizeModuleId(o) {
				let s = o,
					p;
				for (p = /\/\.\//; p.test(s); ) s = s.replace(p, '/');
				for (
					s = s.replace(/^\.\//g, ''),
						p = /\/(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//;
					p.test(s);

				)
					s = s.replace(p, '/');
				return (
					(s = s.replace(
						/^(([^\/])|([^\/][^\/\.])|([^\/\.][^\/])|([^\/][^\/][^\/]+))\/\.\.\//,
						''
					)),
					s
				);
			}
			resolveModule(o) {
				let s = o;
				return (
					x.Utilities.isAbsolutePath(s) ||
						((x.Utilities.startsWith(s, './') || x.Utilities.startsWith(s, '../')) &&
							(s = n._normalizeModuleId(this.fromModulePath + s))),
					s
				);
			}
		}
		(n.ROOT = new n('')), (x.ModuleIdResolver = n);
		class R {
			constructor(o, s, p, e, d, g) {
				(this.id = o),
					(this.strId = s),
					(this.dependencies = p),
					(this._callback = e),
					(this._errorback = d),
					(this.moduleIdResolver = g),
					(this.exports = {}),
					(this.error = null),
					(this.exportsPassedIn = !1),
					(this.unresolvedDependenciesCount = this.dependencies.length),
					(this._isComplete = !1);
			}
			static _safeInvokeFunction(o, s) {
				try {
					return { returnedValue: o.apply(x.global, s), producedError: null };
				} catch (p) {
					return { returnedValue: null, producedError: p };
				}
			}
			static _invokeFactory(o, s, p, e) {
				return o.shouldInvokeFactory(s)
					? o.shouldCatchError()
						? this._safeInvokeFunction(p, e)
						: { returnedValue: p.apply(x.global, e), producedError: null }
					: { returnedValue: null, producedError: null };
			}
			complete(o, s, p, e) {
				this._isComplete = !0;
				let d = null;
				if (this._callback)
					if (typeof this._callback == 'function') {
						o.record(21, this.strId);
						let g = R._invokeFactory(s, this.strId, this._callback, p);
						(d = g.producedError),
							o.record(22, this.strId),
							!d &&
								typeof g.returnedValue < 'u' &&
								(!this.exportsPassedIn || x.Utilities.isEmpty(this.exports)) &&
								(this.exports = g.returnedValue);
					} else this.exports = this._callback;
				if (d) {
					let g = x.ensureError(d);
					(g.phase = 'factory'),
						(g.moduleId = this.strId),
						(g.neededBy = e(this.id)),
						(this.error = g),
						s.onError(g);
				}
				(this.dependencies = null),
					(this._callback = null),
					(this._errorback = null),
					(this.moduleIdResolver = null);
			}
			onDependencyError(o) {
				return (
					(this._isComplete = !0), (this.error = o), this._errorback ? (this._errorback(o), !0) : !1
				);
			}
			isComplete() {
				return this._isComplete;
			}
		}
		x.Module = R;
		class M {
			constructor() {
				(this._nextId = 0),
					(this._strModuleIdToIntModuleId = new Map()),
					(this._intModuleIdToStrModuleId = []),
					this.getModuleId('exports'),
					this.getModuleId('module'),
					this.getModuleId('require');
			}
			getMaxModuleId() {
				return this._nextId;
			}
			getModuleId(o) {
				let s = this._strModuleIdToIntModuleId.get(o);
				return (
					typeof s > 'u' &&
						((s = this._nextId++),
						this._strModuleIdToIntModuleId.set(o, s),
						(this._intModuleIdToStrModuleId[s] = o)),
					s
				);
			}
			getStrModuleId(o) {
				return this._intModuleIdToStrModuleId[o];
			}
		}
		class i {
			constructor(o) {
				this.id = o;
			}
		}
		(i.EXPORTS = new i(0)),
			(i.MODULE = new i(1)),
			(i.REQUIRE = new i(2)),
			(x.RegularDependency = i);
		class a {
			constructor(o, s, p) {
				(this.id = o), (this.pluginId = s), (this.pluginParam = p);
			}
		}
		x.PluginDependency = a;
		class C {
			constructor(o, s, p, e, d = 0) {
				(this._env = o),
					(this._scriptLoader = s),
					(this._loaderAvailableTimestamp = d),
					(this._defineFunc = p),
					(this._requireFunc = e),
					(this._moduleIdProvider = new M()),
					(this._config = new x.Configuration(this._env)),
					(this._hasDependencyCycle = !1),
					(this._modules2 = []),
					(this._knownModules2 = []),
					(this._inverseDependencies2 = []),
					(this._inversePluginDependencies2 = new Map()),
					(this._currentAnonymousDefineCall = null),
					(this._recorder = null),
					(this._buildInfoPath = []),
					(this._buildInfoDefineStack = []),
					(this._buildInfoDependencies = []);
			}
			reset() {
				return new C(
					this._env,
					this._scriptLoader,
					this._defineFunc,
					this._requireFunc,
					this._loaderAvailableTimestamp
				);
			}
			getGlobalAMDDefineFunc() {
				return this._defineFunc;
			}
			getGlobalAMDRequireFunc() {
				return this._requireFunc;
			}
			static _findRelevantLocationInStack(o, s) {
				let p = (g) => g.replace(/\\/g, '/'),
					e = p(o),
					d = s.split(/\n/);
				for (let g = 0; g < d.length; g++) {
					let b = d[g].match(/(.*):(\d+):(\d+)\)?$/);
					if (b) {
						let m = b[1],
							v = b[2],
							E = b[3],
							L = Math.max(m.lastIndexOf(' ') + 1, m.lastIndexOf('(') + 1);
						if (((m = m.substr(L)), (m = p(m)), m === e)) {
							let A = { line: parseInt(v, 10), col: parseInt(E, 10) };
							return A.line === 1 && (A.col -= 53), A;
						}
					}
				}
				throw new Error('Could not correlate define call site for needle ' + o);
			}
			getBuildInfo() {
				if (!this._config.isBuild()) return null;
				let o = [],
					s = 0;
				for (let p = 0, e = this._modules2.length; p < e; p++) {
					let d = this._modules2[p];
					if (!d) continue;
					let g = this._buildInfoPath[d.id] || null,
						b = this._buildInfoDefineStack[d.id] || null,
						m = this._buildInfoDependencies[d.id];
					o[s++] = {
						id: d.strId,
						path: g,
						defineLocation: g && b ? C._findRelevantLocationInStack(g, b) : null,
						dependencies: m,
						shim: null,
						exports: d.exports
					};
				}
				return o;
			}
			getRecorder() {
				return (
					this._recorder ||
						(this._config.shouldRecordStats()
							? (this._recorder = new x.LoaderEventRecorder(this._loaderAvailableTimestamp))
							: (this._recorder = x.NullLoaderEventRecorder.INSTANCE)),
					this._recorder
				);
			}
			getLoaderEvents() {
				return this.getRecorder().getEvents();
			}
			enqueueDefineAnonymousModule(o, s) {
				if (this._currentAnonymousDefineCall !== null)
					throw new Error('Can only have one anonymous define call per script file');
				let p = null;
				this._config.isBuild() && (p = new Error('StackLocation').stack || null),
					(this._currentAnonymousDefineCall = { stack: p, dependencies: o, callback: s });
			}
			defineModule(o, s, p, e, d, g = new n(o)) {
				let b = this._moduleIdProvider.getModuleId(o);
				if (this._modules2[b]) {
					this._config.isDuplicateMessageIgnoredFor(o) ||
						console.warn("Duplicate definition of module '" + o + "'");
					return;
				}
				let m = new R(b, o, this._normalizeDependencies(s, g), p, e, g);
				(this._modules2[b] = m),
					this._config.isBuild() &&
						((this._buildInfoDefineStack[b] = d),
						(this._buildInfoDependencies[b] = (m.dependencies || []).map((v) =>
							this._moduleIdProvider.getStrModuleId(v.id)
						))),
					this._resolve(m);
			}
			_normalizeDependency(o, s) {
				if (o === 'exports') return i.EXPORTS;
				if (o === 'module') return i.MODULE;
				if (o === 'require') return i.REQUIRE;
				let p = o.indexOf('!');
				if (p >= 0) {
					let e = s.resolveModule(o.substr(0, p)),
						d = s.resolveModule(o.substr(p + 1)),
						g = this._moduleIdProvider.getModuleId(e + '!' + d),
						b = this._moduleIdProvider.getModuleId(e);
					return new a(g, b, d);
				}
				return new i(this._moduleIdProvider.getModuleId(s.resolveModule(o)));
			}
			_normalizeDependencies(o, s) {
				let p = [],
					e = 0;
				for (let d = 0, g = o.length; d < g; d++) p[e++] = this._normalizeDependency(o[d], s);
				return p;
			}
			_relativeRequire(o, s, p, e) {
				if (typeof s == 'string') return this.synchronousRequire(s, o);
				this.defineModule(x.Utilities.generateAnonymousModule(), s, p, e, null, o);
			}
			synchronousRequire(o, s = new n(o)) {
				let p = this._normalizeDependency(o, s),
					e = this._modules2[p.id];
				if (!e)
					throw new Error(
						"Check dependency list! Synchronous require cannot resolve module '" +
							o +
							"'. This is the first mention of this module!"
					);
				if (!e.isComplete())
					throw new Error(
						"Check dependency list! Synchronous require cannot resolve module '" +
							o +
							"'. This module has not been resolved completely yet."
					);
				if (e.error) throw e.error;
				return e.exports;
			}
			configure(o, s) {
				let p = this._config.shouldRecordStats();
				s
					? (this._config = new x.Configuration(this._env, o))
					: (this._config = this._config.cloneAndMerge(o)),
					this._config.shouldRecordStats() && !p && (this._recorder = null);
			}
			getConfig() {
				return this._config;
			}
			_onLoad(o) {
				if (this._currentAnonymousDefineCall !== null) {
					let s = this._currentAnonymousDefineCall;
					(this._currentAnonymousDefineCall = null),
						this.defineModule(
							this._moduleIdProvider.getStrModuleId(o),
							s.dependencies,
							s.callback,
							null,
							s.stack
						);
				}
			}
			_createLoadError(o, s) {
				let p = this._moduleIdProvider.getStrModuleId(o),
					e = (this._inverseDependencies2[o] || []).map((g) =>
						this._moduleIdProvider.getStrModuleId(g)
					);
				const d = x.ensureError(s);
				return (d.phase = 'loading'), (d.moduleId = p), (d.neededBy = e), d;
			}
			_onLoadError(o, s) {
				const p = this._createLoadError(o, s);
				this._modules2[o] ||
					(this._modules2[o] = new R(
						o,
						this._moduleIdProvider.getStrModuleId(o),
						[],
						() => {},
						null,
						null
					));
				let e = [];
				for (let b = 0, m = this._moduleIdProvider.getMaxModuleId(); b < m; b++) e[b] = !1;
				let d = !1,
					g = [];
				for (g.push(o), e[o] = !0; g.length > 0; ) {
					let b = g.shift(),
						m = this._modules2[b];
					m && (d = m.onDependencyError(p) || d);
					let v = this._inverseDependencies2[b];
					if (v)
						for (let E = 0, L = v.length; E < L; E++) {
							let A = v[E];
							e[A] || (g.push(A), (e[A] = !0));
						}
				}
				d || this._config.onError(p);
			}
			_hasDependencyPath(o, s) {
				let p = this._modules2[o];
				if (!p) return !1;
				let e = [];
				for (let g = 0, b = this._moduleIdProvider.getMaxModuleId(); g < b; g++) e[g] = !1;
				let d = [];
				for (d.push(p), e[o] = !0; d.length > 0; ) {
					let b = d.shift().dependencies;
					if (b)
						for (let m = 0, v = b.length; m < v; m++) {
							let E = b[m];
							if (E.id === s) return !0;
							let L = this._modules2[E.id];
							L && !e[E.id] && ((e[E.id] = !0), d.push(L));
						}
				}
				return !1;
			}
			_findCyclePath(o, s, p) {
				if (o === s || p === 50) return [o];
				let e = this._modules2[o];
				if (!e) return null;
				let d = e.dependencies;
				if (d)
					for (let g = 0, b = d.length; g < b; g++) {
						let m = this._findCyclePath(d[g].id, s, p + 1);
						if (m !== null) return m.push(o), m;
					}
				return null;
			}
			_createRequire(o) {
				let s = (p, e, d) => this._relativeRequire(o, p, e, d);
				return (
					(s.toUrl = (p) => this._config.requireToUrl(o.resolveModule(p))),
					(s.getStats = () => this.getLoaderEvents()),
					(s.hasDependencyCycle = () => this._hasDependencyCycle),
					(s.config = (p, e = !1) => {
						this.configure(p, e);
					}),
					(s.__$__nodeRequire = x.global.nodeRequire),
					s
				);
			}
			_loadModule(o) {
				if (this._modules2[o] || this._knownModules2[o]) return;
				this._knownModules2[o] = !0;
				let s = this._moduleIdProvider.getStrModuleId(o),
					p = this._config.moduleIdToPaths(s),
					e = /^@[^\/]+\/[^\/]+$/;
				this._env.isNode && (s.indexOf('/') === -1 || e.test(s)) && p.push('node|' + s);
				let d = -1,
					g = (b) => {
						if ((d++, d >= p.length)) this._onLoadError(o, b);
						else {
							let m = p[d],
								v = this.getRecorder();
							if (this._config.isBuild() && m === 'empty:') {
								(this._buildInfoPath[o] = m),
									this.defineModule(this._moduleIdProvider.getStrModuleId(o), [], null, null, null),
									this._onLoad(o);
								return;
							}
							v.record(10, m),
								this._scriptLoader.load(
									this,
									m,
									() => {
										this._config.isBuild() && (this._buildInfoPath[o] = m),
											v.record(11, m),
											this._onLoad(o);
									},
									(E) => {
										v.record(12, m), g(E);
									}
								);
						}
					};
				g(null);
			}
			_loadPluginDependency(o, s) {
				if (this._modules2[s.id] || this._knownModules2[s.id]) return;
				this._knownModules2[s.id] = !0;
				let p = (e) => {
					this.defineModule(this._moduleIdProvider.getStrModuleId(s.id), [], e, null, null);
				};
				(p.error = (e) => {
					this._config.onError(this._createLoadError(s.id, e));
				}),
					o.load(s.pluginParam, this._createRequire(n.ROOT), p, this._config.getOptionsLiteral());
			}
			_resolve(o) {
				let s = o.dependencies;
				if (s)
					for (let p = 0, e = s.length; p < e; p++) {
						let d = s[p];
						if (d === i.EXPORTS) {
							(o.exportsPassedIn = !0), o.unresolvedDependenciesCount--;
							continue;
						}
						if (d === i.MODULE) {
							o.unresolvedDependenciesCount--;
							continue;
						}
						if (d === i.REQUIRE) {
							o.unresolvedDependenciesCount--;
							continue;
						}
						let g = this._modules2[d.id];
						if (g && g.isComplete()) {
							if (g.error) {
								o.onDependencyError(g.error);
								return;
							}
							o.unresolvedDependenciesCount--;
							continue;
						}
						if (this._hasDependencyPath(d.id, o.id)) {
							(this._hasDependencyCycle = !0),
								console.warn(
									"There is a dependency cycle between '" +
										this._moduleIdProvider.getStrModuleId(d.id) +
										"' and '" +
										this._moduleIdProvider.getStrModuleId(o.id) +
										"'. The cyclic path follows:"
								);
							let b = this._findCyclePath(d.id, o.id, 0) || [];
							b.reverse(),
								b.push(d.id),
								console.warn(
									b.map((m) => this._moduleIdProvider.getStrModuleId(m)).join(` => 
`)
								),
								o.unresolvedDependenciesCount--;
							continue;
						}
						if (
							((this._inverseDependencies2[d.id] = this._inverseDependencies2[d.id] || []),
							this._inverseDependencies2[d.id].push(o.id),
							d instanceof a)
						) {
							let b = this._modules2[d.pluginId];
							if (b && b.isComplete()) {
								this._loadPluginDependency(b.exports, d);
								continue;
							}
							let m = this._inversePluginDependencies2.get(d.pluginId);
							m || ((m = []), this._inversePluginDependencies2.set(d.pluginId, m)),
								m.push(d),
								this._loadModule(d.pluginId);
							continue;
						}
						this._loadModule(d.id);
					}
				o.unresolvedDependenciesCount === 0 && this._onModuleComplete(o);
			}
			_onModuleComplete(o) {
				let s = this.getRecorder();
				if (o.isComplete()) return;
				let p = o.dependencies,
					e = [];
				if (p)
					for (let m = 0, v = p.length; m < v; m++) {
						let E = p[m];
						if (E === i.EXPORTS) {
							e[m] = o.exports;
							continue;
						}
						if (E === i.MODULE) {
							e[m] = { id: o.strId, config: () => this._config.getConfigForModule(o.strId) };
							continue;
						}
						if (E === i.REQUIRE) {
							e[m] = this._createRequire(o.moduleIdResolver);
							continue;
						}
						let L = this._modules2[E.id];
						if (L) {
							e[m] = L.exports;
							continue;
						}
						e[m] = null;
					}
				const d = (m) =>
					(this._inverseDependencies2[m] || []).map((v) =>
						this._moduleIdProvider.getStrModuleId(v)
					);
				o.complete(s, this._config, e, d);
				let g = this._inverseDependencies2[o.id];
				if (((this._inverseDependencies2[o.id] = null), g))
					for (let m = 0, v = g.length; m < v; m++) {
						let E = g[m],
							L = this._modules2[E];
						L.unresolvedDependenciesCount--,
							L.unresolvedDependenciesCount === 0 && this._onModuleComplete(L);
					}
				let b = this._inversePluginDependencies2.get(o.id);
				if (b) {
					this._inversePluginDependencies2.delete(o.id);
					for (let m = 0, v = b.length; m < v; m++) this._loadPluginDependency(o.exports, b[m]);
				}
			}
		}
		x.ModuleManager = C;
	})(ue || (ue = {}));
	var Y, ue;
	(function (x) {
		const n = new x.Environment();
		let R = null;
		const M = function (S, o, s) {
			typeof S != 'string' && ((s = o), (o = S), (S = null)),
				(typeof o != 'object' || !Array.isArray(o)) && ((s = o), (o = null)),
				o || (o = ['require', 'exports', 'module']),
				S ? R.defineModule(S, o, s, null, null) : R.enqueueDefineAnonymousModule(o, s);
		};
		M.amd = { jQuery: !0 };
		const i = function (S, o = !1) {
				R.configure(S, o);
			},
			a = function () {
				if (arguments.length === 1) {
					if (arguments[0] instanceof Object && !Array.isArray(arguments[0])) {
						i(arguments[0]);
						return;
					}
					if (typeof arguments[0] == 'string') return R.synchronousRequire(arguments[0]);
				}
				if ((arguments.length === 2 || arguments.length === 3) && Array.isArray(arguments[0])) {
					R.defineModule(
						x.Utilities.generateAnonymousModule(),
						arguments[0],
						arguments[1],
						arguments[2],
						null
					);
					return;
				}
				throw new Error('Unrecognized require call');
			};
		(a.config = i),
			(a.getConfig = function () {
				return R.getConfig().getOptionsLiteral();
			}),
			(a.reset = function () {
				R = R.reset();
			}),
			(a.getBuildInfo = function () {
				return R.getBuildInfo();
			}),
			(a.getStats = function () {
				return R.getLoaderEvents();
			}),
			(a.define = M);
		function C() {
			if (typeof x.global.require < 'u' || typeof require < 'u') {
				const S = x.global.require || require;
				if (typeof S == 'function' && typeof S.resolve == 'function') {
					const o = x.ensureRecordedNodeRequire(R.getRecorder(), S);
					(x.global.nodeRequire = o), (a.nodeRequire = o), (a.__$__nodeRequire = o);
				}
			}
			n.isNode && !n.isElectronRenderer && !n.isElectronNodeIntegrationWebWorker
				? (module.exports = a)
				: (n.isElectronRenderer || (x.global.define = M), (x.global.require = a));
		}
		(x.init = C),
			(typeof x.global.define != 'function' || !x.global.define.amd) &&
				((R = new x.ModuleManager(
					n,
					x.createScriptLoader(n),
					M,
					a,
					x.Utilities.getHighPerformanceTimestamp()
				)),
				typeof x.global.require < 'u' &&
					typeof x.global.require != 'function' &&
					a.config(x.global.require),
				(Y = function () {
					return M.apply(null, arguments);
				}),
				(Y.amd = M.amd),
				typeof doNotInitLoader > 'u' && C());
	})(ue || (ue = {}));
	var me =
		(this && this.__awaiter) ||
		function (x, n, R, M) {
			function i(a) {
				return a instanceof R
					? a
					: new R(function (C) {
							C(a);
					  });
			}
			return new (R || (R = Promise))(function (a, C) {
				function S(p) {
					try {
						s(M.next(p));
					} catch (e) {
						C(e);
					}
				}
				function o(p) {
					try {
						s(M.throw(p));
					} catch (e) {
						C(e);
					}
				}
				function s(p) {
					p.done ? a(p.value) : i(p.value).then(S, o);
				}
				s((M = M.apply(x, n || [])).next());
			});
		};
	Y(X[25], J([0, 1]), function (x, n) {
		'use strict';
		Object.defineProperty(n, '__esModule', { value: !0 }),
			(n.load =
				n.create =
				n.setPseudoTranslation =
				n.getConfiguredDefaultLocale =
				n.localize =
					void 0);
		let R =
			typeof document < 'u' &&
			document.location &&
			document.location.hash.indexOf('pseudo=true') >= 0;
		const M = 'i-default';
		function i(b, m) {
			let v;
			return (
				m.length === 0
					? (v = b)
					: (v = b.replace(/\{(\d+)\}/g, (E, L) => {
							const A = L[0],
								w = m[A];
							let c = E;
							return (
								typeof w == 'string'
									? (c = w)
									: (typeof w == 'number' || typeof w == 'boolean' || w === void 0 || w === null) &&
									  (c = String(w)),
								c
							);
					  })),
				R && (v = '\uFF3B' + v.replace(/[aouei]/g, '$&$&') + '\uFF3D'),
				v
			);
		}
		function a(b, m) {
			let v = b[m];
			return v || ((v = b['*']), v) ? v : null;
		}
		function C(b) {
			return b.charAt(b.length - 1) === '/' ? b : b + '/';
		}
		function S(b, m, v) {
			return me(this, void 0, void 0, function* () {
				const E = C(b) + C(m) + 'vscode/' + C(v),
					L = yield fetch(E);
				if (L.ok) return yield L.json();
				throw new Error(`${L.status} - ${L.statusText}`);
			});
		}
		function o(b) {
			return function (m, v) {
				const E = Array.prototype.slice.call(arguments, 2);
				return i(b[m], E);
			};
		}
		function s(b, m, ...v) {
			return i(m, v);
		}
		n.localize = s;
		function p(b) {}
		n.getConfiguredDefaultLocale = p;
		function e(b) {
			R = b;
		}
		n.setPseudoTranslation = e;
		function d(b, m) {
			var v;
			return {
				localize: o(m[b]),
				getConfiguredDefaultLocale:
					(v = m.getConfiguredDefaultLocale) !== null && v !== void 0 ? v : (E) => {}
			};
		}
		n.create = d;
		function g(b, m, v, E) {
			var L;
			const A = (L = E['vs/nls']) !== null && L !== void 0 ? L : {};
			if (!b || b.length === 0)
				return v({
					localize: s,
					getConfiguredDefaultLocale: () => {
						var h;
						return (h = A.availableLanguages) === null || h === void 0 ? void 0 : h['*'];
					}
				});
			const w = A.availableLanguages ? a(A.availableLanguages, b) : null,
				c = w === null || w === M;
			let r = '.nls';
			c || (r = r + '.' + w);
			const u = (h) => {
				Array.isArray(h) ? (h.localize = o(h)) : (h.localize = o(h[b])),
					(h.getConfiguredDefaultLocale = () => {
						var f;
						return (f = A.availableLanguages) === null || f === void 0 ? void 0 : f['*'];
					}),
					v(h);
			};
			typeof A.loadBundle == 'function'
				? A.loadBundle(b, w, (h, f) => {
						h ? m([b + '.nls'], u) : u(f);
				  })
				: A.translationServiceUrl && !c
				? me(this, void 0, void 0, function* () {
						var h;
						try {
							const f = yield S(A.translationServiceUrl, w, b);
							return u(f);
						} catch (f) {
							if (!w.includes('-')) return console.error(f), m([b + '.nls'], u);
							try {
								const l = w.split('-')[0],
									_ = yield S(A.translationServiceUrl, l, b);
								return (
									((h = A.availableLanguages) !== null && h !== void 0) ||
										(A.availableLanguages = {}),
									(A.availableLanguages['*'] = l),
									u(_)
								);
							} catch (l) {
								return console.error(l), m([b + '.nls'], u);
							}
						}
				  })
				: m([b + r], u, (h) => {
						if (r === '.nls') {
							console.error('Failed trying to load default language strings', h);
							return;
						}
						console.error(
							`Failed to load message bundle for language ${w}. Falling back to the default language:`,
							h
						),
							m([b + '.nls'], u);
				  });
		}
		n.load = g;
	}),
		(function () {
			var x, n;
			const R = globalThis.MonacoEnvironment,
				M = R && R.baseUrl ? R.baseUrl : '../../../',
				i =
					typeof ((x = self.trustedTypes) === null || x === void 0 ? void 0 : x.createPolicy) ==
					'function'
						? (n = self.trustedTypes) === null || n === void 0
							? void 0
							: n.createPolicy('amdLoader', {
									createScriptURL: (e) => e,
									createScript: (e, ...d) => {
										const g = d.slice(0, -1).join(','),
											b = d.pop().toString();
										return `(function anonymous(${g}) { ${b}
})`;
									}
							  })
						: void 0;
			function a() {
				try {
					return (
						(i ? globalThis.eval(i.createScript('', 'true')) : new Function('true')).call(
							globalThis
						),
						!0
					);
				} catch {
					return !1;
				}
			}
			function C() {
				return new Promise((e, d) => {
					if (typeof globalThis.define == 'function' && globalThis.define.amd) return e();
					const g = M + 'vs/loader.js';
					if (
						!(
							/^((http:)|(https:)|(file:))/.test(g) &&
							g.substring(0, globalThis.origin.length) !== globalThis.origin
						) &&
						a()
					) {
						fetch(g)
							.then((m) => {
								if (m.status !== 200) throw new Error(m.statusText);
								return m.text();
							})
							.then((m) => {
								(m = `${m}
//# sourceURL=${g}`),
									(i ? globalThis.eval(i.createScript('', m)) : new Function(m)).call(globalThis),
									e();
							})
							.then(void 0, d);
						return;
					}
					i ? importScripts(i.createScriptURL(g)) : importScripts(g), e();
				});
			}
			function S() {
				require.config({
					baseUrl: M,
					catchError: !0,
					trustedTypesPolicy: i,
					amdModulesPattern: /^vs\//
				});
			}
			function o(e) {
				C().then(() => {
					S(),
						require([e], function (d) {
							setTimeout(function () {
								const g = d.create((b, m) => {
									globalThis.postMessage(b, m);
								}, null);
								for (globalThis.onmessage = (b) => g.onmessage(b.data, b.ports); p.length > 0; ) {
									const b = p.shift();
									g.onmessage(b.data, b.ports);
								}
							}, 0);
						});
				});
			}
			typeof globalThis.define == 'function' && globalThis.define.amd && S();
			let s = !0;
			const p = [];
			globalThis.onmessage = (e) => {
				if (!s) {
					p.push(e);
					return;
				}
				(s = !1), o(e.data);
			};
		})(),
		Y(X[26], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.CallbackIterable =
					n.ArrayQueue =
					n.findMinBy =
					n.findLastMaxBy =
					n.findMaxBy =
					n.numberComparator =
					n.compareBy =
					n.CompareResult =
					n.splice =
					n.insertInto =
					n.mapFind =
					n.asArray =
					n.pushMany =
					n.pushToEnd =
					n.pushToStart =
					n.arrayInsert =
					n.range =
					n.firstOrDefault =
					n.lastIndex =
					n.findLast =
					n.distinct =
					n.isNonEmptyArray =
					n.isFalsyOrEmpty =
					n.coalesceInPlace =
					n.coalesce =
					n.groupBy =
					n.quickSelect =
					n.findFirstInSorted =
					n.binarySearch2 =
					n.binarySearch =
					n.removeFastWithoutKeepingOrder =
					n.equals =
					n.tail2 =
					n.tail =
						void 0);
			function R(F, T = 0) {
				return F[F.length - (1 + T)];
			}
			n.tail = R;
			function M(F) {
				if (F.length === 0) throw new Error('Invalid tail call');
				return [F.slice(0, F.length - 1), F[F.length - 1]];
			}
			n.tail2 = M;
			function i(F, T, q = (H, t) => H === t) {
				if (F === T) return !0;
				if (!F || !T || F.length !== T.length) return !1;
				for (let H = 0, t = F.length; H < t; H++) if (!q(F[H], T[H])) return !1;
				return !0;
			}
			n.equals = i;
			function a(F, T) {
				const q = F.length - 1;
				T < q && (F[T] = F[q]), F.pop();
			}
			n.removeFastWithoutKeepingOrder = a;
			function C(F, T, q) {
				return S(F.length, (H) => q(F[H], T));
			}
			n.binarySearch = C;
			function S(F, T) {
				let q = 0,
					H = F - 1;
				for (; q <= H; ) {
					const t = ((q + H) / 2) | 0,
						oe = T(t);
					if (oe < 0) q = t + 1;
					else if (oe > 0) H = t - 1;
					else return t;
				}
				return -(q + 1);
			}
			n.binarySearch2 = S;
			function o(F, T) {
				let q = 0,
					H = F.length;
				if (H === 0) return 0;
				for (; q < H; ) {
					const t = Math.floor((q + H) / 2);
					T(F[t]) ? (H = t) : (q = t + 1);
				}
				return q;
			}
			n.findFirstInSorted = o;
			function s(F, T, q) {
				if (((F = F | 0), F >= T.length)) throw new TypeError('invalid index');
				const H = T[Math.floor(T.length * Math.random())],
					t = [],
					oe = [],
					ne = [];
				for (const he of T) {
					const be = q(he, H);
					be < 0 ? t.push(he) : be > 0 ? oe.push(he) : ne.push(he);
				}
				return F < t.length
					? s(F, t, q)
					: F < t.length + ne.length
					? ne[0]
					: s(F - (t.length + ne.length), oe, q);
			}
			n.quickSelect = s;
			function p(F, T) {
				const q = [];
				let H;
				for (const t of F.slice(0).sort(T))
					!H || T(H[0], t) !== 0 ? ((H = [t]), q.push(H)) : H.push(t);
				return q;
			}
			n.groupBy = p;
			function e(F) {
				return F.filter((T) => !!T);
			}
			n.coalesce = e;
			function d(F) {
				let T = 0;
				for (let q = 0; q < F.length; q++) F[q] && ((F[T] = F[q]), (T += 1));
				F.length = T;
			}
			n.coalesceInPlace = d;
			function g(F) {
				return !Array.isArray(F) || F.length === 0;
			}
			n.isFalsyOrEmpty = g;
			function b(F) {
				return Array.isArray(F) && F.length > 0;
			}
			n.isNonEmptyArray = b;
			function m(F, T = (q) => q) {
				const q = new Set();
				return F.filter((H) => {
					const t = T(H);
					return q.has(t) ? !1 : (q.add(t), !0);
				});
			}
			n.distinct = m;
			function v(F, T) {
				const q = E(F, T);
				if (q !== -1) return F[q];
			}
			n.findLast = v;
			function E(F, T) {
				for (let q = F.length - 1; q >= 0; q--) {
					const H = F[q];
					if (T(H)) return q;
				}
				return -1;
			}
			n.lastIndex = E;
			function L(F, T) {
				return F.length > 0 ? F[0] : T;
			}
			n.firstOrDefault = L;
			function A(F, T) {
				let q = typeof T == 'number' ? F : 0;
				typeof T == 'number' ? (q = F) : ((q = 0), (T = F));
				const H = [];
				if (q <= T) for (let t = q; t < T; t++) H.push(t);
				else for (let t = q; t > T; t--) H.push(t);
				return H;
			}
			n.range = A;
			function w(F, T, q) {
				const H = F.slice(0, T),
					t = F.slice(T);
				return H.concat(q, t);
			}
			n.arrayInsert = w;
			function c(F, T) {
				const q = F.indexOf(T);
				q > -1 && (F.splice(q, 1), F.unshift(T));
			}
			n.pushToStart = c;
			function r(F, T) {
				const q = F.indexOf(T);
				q > -1 && (F.splice(q, 1), F.push(T));
			}
			n.pushToEnd = r;
			function u(F, T) {
				for (const q of T) F.push(q);
			}
			n.pushMany = u;
			function h(F) {
				return Array.isArray(F) ? F : [F];
			}
			n.asArray = h;
			function f(F, T) {
				for (const q of F) {
					const H = T(q);
					if (H !== void 0) return H;
				}
			}
			n.mapFind = f;
			function l(F, T, q) {
				const H = N(F, T),
					t = F.length,
					oe = q.length;
				F.length = t + oe;
				for (let ne = t - 1; ne >= H; ne--) F[ne + oe] = F[ne];
				for (let ne = 0; ne < oe; ne++) F[ne + H] = q[ne];
			}
			n.insertInto = l;
			function _(F, T, q, H) {
				const t = N(F, T),
					oe = F.splice(t, q);
				return l(F, t, H), oe;
			}
			n.splice = _;
			function N(F, T) {
				return T < 0 ? Math.max(T + F.length, 0) : Math.min(T, F.length);
			}
			var y;
			(function (F) {
				function T(t) {
					return t < 0;
				}
				F.isLessThan = T;
				function q(t) {
					return t > 0;
				}
				F.isGreaterThan = q;
				function H(t) {
					return t === 0;
				}
				(F.isNeitherLessOrGreaterThan = H),
					(F.greaterThan = 1),
					(F.lessThan = -1),
					(F.neitherLessOrGreaterThan = 0);
			})(y || (n.CompareResult = y = {}));
			function D(F, T) {
				return (q, H) => T(F(q), F(H));
			}
			n.compareBy = D;
			const k = (F, T) => F - T;
			n.numberComparator = k;
			function B(F, T) {
				if (F.length === 0) return;
				let q = F[0];
				for (let H = 1; H < F.length; H++) {
					const t = F[H];
					T(t, q) > 0 && (q = t);
				}
				return q;
			}
			n.findMaxBy = B;
			function I(F, T) {
				if (F.length === 0) return;
				let q = F[0];
				for (let H = 1; H < F.length; H++) {
					const t = F[H];
					T(t, q) >= 0 && (q = t);
				}
				return q;
			}
			n.findLastMaxBy = I;
			function U(F, T) {
				return B(F, (q, H) => -T(q, H));
			}
			n.findMinBy = U;
			class V {
				constructor(T) {
					(this.items = T), (this.firstIdx = 0), (this.lastIdx = this.items.length - 1);
				}
				get length() {
					return this.lastIdx - this.firstIdx + 1;
				}
				takeWhile(T) {
					let q = this.firstIdx;
					for (; q < this.items.length && T(this.items[q]); ) q++;
					const H = q === this.firstIdx ? null : this.items.slice(this.firstIdx, q);
					return (this.firstIdx = q), H;
				}
				takeFromEndWhile(T) {
					let q = this.lastIdx;
					for (; q >= 0 && T(this.items[q]); ) q--;
					const H = q === this.lastIdx ? null : this.items.slice(q + 1, this.lastIdx + 1);
					return (this.lastIdx = q), H;
				}
				peek() {
					if (this.length !== 0) return this.items[this.firstIdx];
				}
				dequeue() {
					const T = this.items[this.firstIdx];
					return this.firstIdx++, T;
				}
				takeCount(T) {
					const q = this.items.slice(this.firstIdx, this.firstIdx + T);
					return (this.firstIdx += T), q;
				}
			}
			n.ArrayQueue = V;
			class Q {
				constructor(T) {
					this.iterate = T;
				}
				toArray() {
					const T = [];
					return this.iterate((q) => (T.push(q), !0)), T;
				}
				filter(T) {
					return new Q((q) => this.iterate((H) => (T(H) ? q(H) : !0)));
				}
				map(T) {
					return new Q((q) => this.iterate((H) => q(T(H))));
				}
				findLast(T) {
					let q;
					return this.iterate((H) => (T(H) && (q = H), !0)), q;
				}
				findLastMaxBy(T) {
					let q,
						H = !0;
					return (
						this.iterate((t) => ((H || y.isGreaterThan(T(t, q))) && ((H = !1), (q = t)), !0)), q
					);
				}
			}
			(n.CallbackIterable = Q), (Q.empty = new Q((F) => {}));
		}),
		Y(X[27], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.CachedFunction = n.LRUCachedFunction = void 0);
			class R {
				constructor(a) {
					(this.fn = a), (this.lastCache = void 0), (this.lastArgKey = void 0);
				}
				get(a) {
					const C = JSON.stringify(a);
					return (
						this.lastArgKey !== C && ((this.lastArgKey = C), (this.lastCache = this.fn(a))),
						this.lastCache
					);
				}
			}
			n.LRUCachedFunction = R;
			class M {
				get cachedValues() {
					return this._map;
				}
				constructor(a) {
					(this.fn = a), (this._map = new Map());
				}
				get(a) {
					if (this._map.has(a)) return this._map.get(a);
					const C = this.fn(a);
					return this._map.set(a, C), C;
				}
			}
			n.CachedFunction = M;
		}),
		Y(X[28], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.Color = n.HSVA = n.HSLA = n.RGBA = void 0);
			function R(S, o) {
				const s = Math.pow(10, o);
				return Math.round(S * s) / s;
			}
			class M {
				constructor(o, s, p, e = 1) {
					(this._rgbaBrand = void 0),
						(this.r = Math.min(255, Math.max(0, o)) | 0),
						(this.g = Math.min(255, Math.max(0, s)) | 0),
						(this.b = Math.min(255, Math.max(0, p)) | 0),
						(this.a = R(Math.max(Math.min(1, e), 0), 3));
				}
				static equals(o, s) {
					return o.r === s.r && o.g === s.g && o.b === s.b && o.a === s.a;
				}
			}
			n.RGBA = M;
			class i {
				constructor(o, s, p, e) {
					(this._hslaBrand = void 0),
						(this.h = Math.max(Math.min(360, o), 0) | 0),
						(this.s = R(Math.max(Math.min(1, s), 0), 3)),
						(this.l = R(Math.max(Math.min(1, p), 0), 3)),
						(this.a = R(Math.max(Math.min(1, e), 0), 3));
				}
				static equals(o, s) {
					return o.h === s.h && o.s === s.s && o.l === s.l && o.a === s.a;
				}
				static fromRGBA(o) {
					const s = o.r / 255,
						p = o.g / 255,
						e = o.b / 255,
						d = o.a,
						g = Math.max(s, p, e),
						b = Math.min(s, p, e);
					let m = 0,
						v = 0;
					const E = (b + g) / 2,
						L = g - b;
					if (L > 0) {
						switch (((v = Math.min(E <= 0.5 ? L / (2 * E) : L / (2 - 2 * E), 1)), g)) {
							case s:
								m = (p - e) / L + (p < e ? 6 : 0);
								break;
							case p:
								m = (e - s) / L + 2;
								break;
							case e:
								m = (s - p) / L + 4;
								break;
						}
						(m *= 60), (m = Math.round(m));
					}
					return new i(m, v, E, d);
				}
				static _hue2rgb(o, s, p) {
					return (
						p < 0 && (p += 1),
						p > 1 && (p -= 1),
						p < 1 / 6
							? o + (s - o) * 6 * p
							: p < 1 / 2
							? s
							: p < 2 / 3
							? o + (s - o) * (2 / 3 - p) * 6
							: o
					);
				}
				static toRGBA(o) {
					const s = o.h / 360,
						{ s: p, l: e, a: d } = o;
					let g, b, m;
					if (p === 0) g = b = m = e;
					else {
						const v = e < 0.5 ? e * (1 + p) : e + p - e * p,
							E = 2 * e - v;
						(g = i._hue2rgb(E, v, s + 1 / 3)),
							(b = i._hue2rgb(E, v, s)),
							(m = i._hue2rgb(E, v, s - 1 / 3));
					}
					return new M(Math.round(g * 255), Math.round(b * 255), Math.round(m * 255), d);
				}
			}
			n.HSLA = i;
			class a {
				constructor(o, s, p, e) {
					(this._hsvaBrand = void 0),
						(this.h = Math.max(Math.min(360, o), 0) | 0),
						(this.s = R(Math.max(Math.min(1, s), 0), 3)),
						(this.v = R(Math.max(Math.min(1, p), 0), 3)),
						(this.a = R(Math.max(Math.min(1, e), 0), 3));
				}
				static equals(o, s) {
					return o.h === s.h && o.s === s.s && o.v === s.v && o.a === s.a;
				}
				static fromRGBA(o) {
					const s = o.r / 255,
						p = o.g / 255,
						e = o.b / 255,
						d = Math.max(s, p, e),
						g = Math.min(s, p, e),
						b = d - g,
						m = d === 0 ? 0 : b / d;
					let v;
					return (
						b === 0
							? (v = 0)
							: d === s
							? (v = ((((p - e) / b) % 6) + 6) % 6)
							: d === p
							? (v = (e - s) / b + 2)
							: (v = (s - p) / b + 4),
						new a(Math.round(v * 60), m, d, o.a)
					);
				}
				static toRGBA(o) {
					const { h: s, s: p, v: e, a: d } = o,
						g = e * p,
						b = g * (1 - Math.abs(((s / 60) % 2) - 1)),
						m = e - g;
					let [v, E, L] = [0, 0, 0];
					return (
						s < 60
							? ((v = g), (E = b))
							: s < 120
							? ((v = b), (E = g))
							: s < 180
							? ((E = g), (L = b))
							: s < 240
							? ((E = b), (L = g))
							: s < 300
							? ((v = b), (L = g))
							: s <= 360 && ((v = g), (L = b)),
						(v = Math.round((v + m) * 255)),
						(E = Math.round((E + m) * 255)),
						(L = Math.round((L + m) * 255)),
						new M(v, E, L, d)
					);
				}
			}
			n.HSVA = a;
			class C {
				static fromHex(o) {
					return C.Format.CSS.parseHex(o) || C.red;
				}
				static equals(o, s) {
					return !o && !s ? !0 : !o || !s ? !1 : o.equals(s);
				}
				get hsla() {
					return this._hsla ? this._hsla : i.fromRGBA(this.rgba);
				}
				get hsva() {
					return this._hsva ? this._hsva : a.fromRGBA(this.rgba);
				}
				constructor(o) {
					if (o)
						if (o instanceof M) this.rgba = o;
						else if (o instanceof i) (this._hsla = o), (this.rgba = i.toRGBA(o));
						else if (o instanceof a) (this._hsva = o), (this.rgba = a.toRGBA(o));
						else throw new Error('Invalid color ctor argument');
					else throw new Error('Color needs a value');
				}
				equals(o) {
					return (
						!!o &&
						M.equals(this.rgba, o.rgba) &&
						i.equals(this.hsla, o.hsla) &&
						a.equals(this.hsva, o.hsva)
					);
				}
				getRelativeLuminance() {
					const o = C._relativeLuminanceForComponent(this.rgba.r),
						s = C._relativeLuminanceForComponent(this.rgba.g),
						p = C._relativeLuminanceForComponent(this.rgba.b),
						e = 0.2126 * o + 0.7152 * s + 0.0722 * p;
					return R(e, 4);
				}
				static _relativeLuminanceForComponent(o) {
					const s = o / 255;
					return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
				}
				isLighter() {
					return (this.rgba.r * 299 + this.rgba.g * 587 + this.rgba.b * 114) / 1e3 >= 128;
				}
				isLighterThan(o) {
					const s = this.getRelativeLuminance(),
						p = o.getRelativeLuminance();
					return s > p;
				}
				isDarkerThan(o) {
					const s = this.getRelativeLuminance(),
						p = o.getRelativeLuminance();
					return s < p;
				}
				lighten(o) {
					return new C(new i(this.hsla.h, this.hsla.s, this.hsla.l + this.hsla.l * o, this.hsla.a));
				}
				darken(o) {
					return new C(new i(this.hsla.h, this.hsla.s, this.hsla.l - this.hsla.l * o, this.hsla.a));
				}
				transparent(o) {
					const { r: s, g: p, b: e, a: d } = this.rgba;
					return new C(new M(s, p, e, d * o));
				}
				isTransparent() {
					return this.rgba.a === 0;
				}
				isOpaque() {
					return this.rgba.a === 1;
				}
				opposite() {
					return new C(new M(255 - this.rgba.r, 255 - this.rgba.g, 255 - this.rgba.b, this.rgba.a));
				}
				makeOpaque(o) {
					if (this.isOpaque() || o.rgba.a !== 1) return this;
					const { r: s, g: p, b: e, a: d } = this.rgba;
					return new C(
						new M(
							o.rgba.r - d * (o.rgba.r - s),
							o.rgba.g - d * (o.rgba.g - p),
							o.rgba.b - d * (o.rgba.b - e),
							1
						)
					);
				}
				toString() {
					return this._toString || (this._toString = C.Format.CSS.format(this)), this._toString;
				}
				static getLighterColor(o, s, p) {
					if (o.isLighterThan(s)) return o;
					p = p || 0.5;
					const e = o.getRelativeLuminance(),
						d = s.getRelativeLuminance();
					return (p = (p * (d - e)) / d), o.lighten(p);
				}
				static getDarkerColor(o, s, p) {
					if (o.isDarkerThan(s)) return o;
					p = p || 0.5;
					const e = o.getRelativeLuminance(),
						d = s.getRelativeLuminance();
					return (p = (p * (e - d)) / e), o.darken(p);
				}
			}
			(n.Color = C),
				(C.white = new C(new M(255, 255, 255, 1))),
				(C.black = new C(new M(0, 0, 0, 1))),
				(C.red = new C(new M(255, 0, 0, 1))),
				(C.blue = new C(new M(0, 0, 255, 1))),
				(C.green = new C(new M(0, 255, 0, 1))),
				(C.cyan = new C(new M(0, 255, 255, 1))),
				(C.lightgrey = new C(new M(211, 211, 211, 1))),
				(C.transparent = new C(new M(0, 0, 0, 0))),
				(function (S) {
					let o;
					(function (s) {
						let p;
						(function (e) {
							function d(r) {
								return r.rgba.a === 1
									? `rgb(${r.rgba.r}, ${r.rgba.g}, ${r.rgba.b})`
									: S.Format.CSS.formatRGBA(r);
							}
							e.formatRGB = d;
							function g(r) {
								return `rgba(${r.rgba.r}, ${r.rgba.g}, ${r.rgba.b}, ${+r.rgba.a.toFixed(2)})`;
							}
							e.formatRGBA = g;
							function b(r) {
								return r.hsla.a === 1
									? `hsl(${r.hsla.h}, ${(r.hsla.s * 100).toFixed(2)}%, ${(r.hsla.l * 100).toFixed(
											2
									  )}%)`
									: S.Format.CSS.formatHSLA(r);
							}
							e.formatHSL = b;
							function m(r) {
								return `hsla(${r.hsla.h}, ${(r.hsla.s * 100).toFixed(2)}%, ${(
									r.hsla.l * 100
								).toFixed(2)}%, ${r.hsla.a.toFixed(2)})`;
							}
							e.formatHSLA = m;
							function v(r) {
								const u = r.toString(16);
								return u.length !== 2 ? '0' + u : u;
							}
							function E(r) {
								return `#${v(r.rgba.r)}${v(r.rgba.g)}${v(r.rgba.b)}`;
							}
							e.formatHex = E;
							function L(r, u = !1) {
								return u && r.rgba.a === 1
									? S.Format.CSS.formatHex(r)
									: `#${v(r.rgba.r)}${v(r.rgba.g)}${v(r.rgba.b)}${v(Math.round(r.rgba.a * 255))}`;
							}
							e.formatHexA = L;
							function A(r) {
								return r.isOpaque() ? S.Format.CSS.formatHex(r) : S.Format.CSS.formatRGBA(r);
							}
							e.format = A;
							function w(r) {
								const u = r.length;
								if (u === 0 || r.charCodeAt(0) !== 35) return null;
								if (u === 7) {
									const h = 16 * c(r.charCodeAt(1)) + c(r.charCodeAt(2)),
										f = 16 * c(r.charCodeAt(3)) + c(r.charCodeAt(4)),
										l = 16 * c(r.charCodeAt(5)) + c(r.charCodeAt(6));
									return new S(new M(h, f, l, 1));
								}
								if (u === 9) {
									const h = 16 * c(r.charCodeAt(1)) + c(r.charCodeAt(2)),
										f = 16 * c(r.charCodeAt(3)) + c(r.charCodeAt(4)),
										l = 16 * c(r.charCodeAt(5)) + c(r.charCodeAt(6)),
										_ = 16 * c(r.charCodeAt(7)) + c(r.charCodeAt(8));
									return new S(new M(h, f, l, _ / 255));
								}
								if (u === 4) {
									const h = c(r.charCodeAt(1)),
										f = c(r.charCodeAt(2)),
										l = c(r.charCodeAt(3));
									return new S(new M(16 * h + h, 16 * f + f, 16 * l + l));
								}
								if (u === 5) {
									const h = c(r.charCodeAt(1)),
										f = c(r.charCodeAt(2)),
										l = c(r.charCodeAt(3)),
										_ = c(r.charCodeAt(4));
									return new S(new M(16 * h + h, 16 * f + f, 16 * l + l, (16 * _ + _) / 255));
								}
								return null;
							}
							e.parseHex = w;
							function c(r) {
								switch (r) {
									case 48:
										return 0;
									case 49:
										return 1;
									case 50:
										return 2;
									case 51:
										return 3;
									case 52:
										return 4;
									case 53:
										return 5;
									case 54:
										return 6;
									case 55:
										return 7;
									case 56:
										return 8;
									case 57:
										return 9;
									case 97:
										return 10;
									case 65:
										return 10;
									case 98:
										return 11;
									case 66:
										return 11;
									case 99:
										return 12;
									case 67:
										return 12;
									case 100:
										return 13;
									case 68:
										return 13;
									case 101:
										return 14;
									case 69:
										return 14;
									case 102:
										return 15;
									case 70:
										return 15;
								}
								return 0;
							}
						})((p = s.CSS || (s.CSS = {})));
					})((o = S.Format || (S.Format = {})));
				})(C || (n.Color = C = {}));
		}),
		Y(X[29], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.DiffChange = void 0);
			class R {
				constructor(i, a, C, S) {
					(this.originalStart = i),
						(this.originalLength = a),
						(this.modifiedStart = C),
						(this.modifiedLength = S);
				}
				getOriginalEnd() {
					return this.originalStart + this.originalLength;
				}
				getModifiedEnd() {
					return this.modifiedStart + this.modifiedLength;
				}
			}
			n.DiffChange = R;
		}),
		Y(X[4], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.BugIndicatingError =
					n.ErrorNoTelemetry =
					n.NotSupportedError =
					n.illegalState =
					n.illegalArgument =
					n.canceled =
					n.CancellationError =
					n.isCancellationError =
					n.transformErrorForSerialization =
					n.onUnexpectedExternalError =
					n.onUnexpectedError =
					n.errorHandler =
					n.ErrorHandler =
						void 0);
			class R {
				constructor() {
					(this.listeners = []),
						(this.unexpectedErrorHandler = function (v) {
							setTimeout(() => {
								throw v.stack
									? g.isErrorNoTelemetry(v)
										? new g(
												v.message +
													`

` +
													v.stack
										  )
										: new Error(
												v.message +
													`

` +
													v.stack
										  )
									: v;
							}, 0);
						});
				}
				emit(v) {
					this.listeners.forEach((E) => {
						E(v);
					});
				}
				onUnexpectedError(v) {
					this.unexpectedErrorHandler(v), this.emit(v);
				}
				onUnexpectedExternalError(v) {
					this.unexpectedErrorHandler(v);
				}
			}
			(n.ErrorHandler = R), (n.errorHandler = new R());
			function M(m) {
				S(m) || n.errorHandler.onUnexpectedError(m);
			}
			n.onUnexpectedError = M;
			function i(m) {
				S(m) || n.errorHandler.onUnexpectedExternalError(m);
			}
			n.onUnexpectedExternalError = i;
			function a(m) {
				if (m instanceof Error) {
					const { name: v, message: E } = m,
						L = m.stacktrace || m.stack;
					return {
						$isError: !0,
						name: v,
						message: E,
						stack: L,
						noTelemetry: g.isErrorNoTelemetry(m)
					};
				}
				return m;
			}
			n.transformErrorForSerialization = a;
			const C = 'Canceled';
			function S(m) {
				return m instanceof o ? !0 : m instanceof Error && m.name === C && m.message === C;
			}
			n.isCancellationError = S;
			class o extends Error {
				constructor() {
					super(C), (this.name = this.message);
				}
			}
			n.CancellationError = o;
			function s() {
				const m = new Error(C);
				return (m.name = m.message), m;
			}
			n.canceled = s;
			function p(m) {
				return m ? new Error(`Illegal argument: ${m}`) : new Error('Illegal argument');
			}
			n.illegalArgument = p;
			function e(m) {
				return m ? new Error(`Illegal state: ${m}`) : new Error('Illegal state');
			}
			n.illegalState = e;
			class d extends Error {
				constructor(v) {
					super('NotSupported'), v && (this.message = v);
				}
			}
			n.NotSupportedError = d;
			class g extends Error {
				constructor(v) {
					super(v), (this.name = 'CodeExpectedError');
				}
				static fromError(v) {
					if (v instanceof g) return v;
					const E = new g();
					return (E.message = v.message), (E.stack = v.stack), E;
				}
				static isErrorNoTelemetry(v) {
					return v.name === 'CodeExpectedError';
				}
			}
			n.ErrorNoTelemetry = g;
			class b extends Error {
				constructor(v) {
					super(v || 'An unexpected bug occurred.'), Object.setPrototypeOf(this, b.prototype);
					debugger;
				}
			}
			n.BugIndicatingError = b;
		}),
		Y(X[10], J([0, 1, 4]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.checkAdjacentItems = n.assertFn = n.assertNever = n.ok = void 0);
			function M(S, o) {
				if (!S) throw new Error(o ? `Assertion failed (${o})` : 'Assertion Failed');
			}
			n.ok = M;
			function i(S, o = 'Unreachable') {
				throw new Error(o);
			}
			n.assertNever = i;
			function a(S) {
				if (!S()) {
					debugger;
					S(), (0, R.onUnexpectedError)(new R.BugIndicatingError('Assertion Failed'));
				}
			}
			n.assertFn = a;
			function C(S, o) {
				let s = 0;
				for (; s < S.length - 1; ) {
					const p = S[s],
						e = S[s + 1];
					if (!o(p, e)) return !1;
					s++;
				}
				return !0;
			}
			n.checkAdjacentItems = C;
		}),
		Y(X[14], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.once = void 0);
			function R(M) {
				const i = this;
				let a = !1,
					C;
				return function () {
					return a || ((a = !0), (C = M.apply(i, arguments))), C;
				};
			}
			n.once = R;
		}),
		Y(X[15], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.Iterable = void 0);
			var R;
			(function (M) {
				function i(w) {
					return w && typeof w == 'object' && typeof w[Symbol.iterator] == 'function';
				}
				M.is = i;
				const a = Object.freeze([]);
				function C() {
					return a;
				}
				M.empty = C;
				function* S(w) {
					yield w;
				}
				M.single = S;
				function o(w) {
					return i(w) ? w : S(w);
				}
				M.wrap = o;
				function s(w) {
					return w || a;
				}
				M.from = s;
				function p(w) {
					return !w || w[Symbol.iterator]().next().done === !0;
				}
				M.isEmpty = p;
				function e(w) {
					return w[Symbol.iterator]().next().value;
				}
				M.first = e;
				function d(w, c) {
					for (const r of w) if (c(r)) return !0;
					return !1;
				}
				M.some = d;
				function g(w, c) {
					for (const r of w) if (c(r)) return r;
				}
				M.find = g;
				function* b(w, c) {
					for (const r of w) c(r) && (yield r);
				}
				M.filter = b;
				function* m(w, c) {
					let r = 0;
					for (const u of w) yield c(u, r++);
				}
				M.map = m;
				function* v(...w) {
					for (const c of w) for (const r of c) yield r;
				}
				M.concat = v;
				function E(w, c, r) {
					let u = r;
					for (const h of w) u = c(u, h);
					return u;
				}
				M.reduce = E;
				function* L(w, c, r = w.length) {
					for (
						c < 0 && (c += w.length), r < 0 ? (r += w.length) : r > w.length && (r = w.length);
						c < r;
						c++
					)
						yield w[c];
				}
				M.slice = L;
				function A(w, c = Number.POSITIVE_INFINITY) {
					const r = [];
					if (c === 0) return [r, w];
					const u = w[Symbol.iterator]();
					for (let h = 0; h < c; h++) {
						const f = u.next();
						if (f.done) return [r, M.empty()];
						r.push(f.value);
					}
					return [
						r,
						{
							[Symbol.iterator]() {
								return u;
							}
						}
					];
				}
				M.consume = A;
			})(R || (n.Iterable = R = {}));
		}),
		Y(X[30], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.KeyChord =
					n.KeyCodeUtils =
					n.IMMUTABLE_KEY_CODE_TO_CODE =
					n.IMMUTABLE_CODE_TO_KEY_CODE =
					n.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE =
					n.EVENT_KEY_CODE_MAP =
						void 0);
			class R {
				constructor() {
					(this._keyCodeToStr = []), (this._strToKeyCode = Object.create(null));
				}
				define(d, g) {
					(this._keyCodeToStr[d] = g), (this._strToKeyCode[g.toLowerCase()] = d);
				}
				keyCodeToStr(d) {
					return this._keyCodeToStr[d];
				}
				strToKeyCode(d) {
					return this._strToKeyCode[d.toLowerCase()] || 0;
				}
			}
			const M = new R(),
				i = new R(),
				a = new R();
			(n.EVENT_KEY_CODE_MAP = new Array(230)), (n.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE = {});
			const C = [],
				S = Object.create(null),
				o = Object.create(null);
			(n.IMMUTABLE_CODE_TO_KEY_CODE = []), (n.IMMUTABLE_KEY_CODE_TO_CODE = []);
			for (let e = 0; e <= 193; e++) n.IMMUTABLE_CODE_TO_KEY_CODE[e] = -1;
			for (let e = 0; e <= 132; e++) n.IMMUTABLE_KEY_CODE_TO_CODE[e] = -1;
			(function () {
				const e = '',
					d = [
						[1, 0, 'None', 0, 'unknown', 0, 'VK_UNKNOWN', e, e],
						[1, 1, 'Hyper', 0, e, 0, e, e, e],
						[1, 2, 'Super', 0, e, 0, e, e, e],
						[1, 3, 'Fn', 0, e, 0, e, e, e],
						[1, 4, 'FnLock', 0, e, 0, e, e, e],
						[1, 5, 'Suspend', 0, e, 0, e, e, e],
						[1, 6, 'Resume', 0, e, 0, e, e, e],
						[1, 7, 'Turbo', 0, e, 0, e, e, e],
						[1, 8, 'Sleep', 0, e, 0, 'VK_SLEEP', e, e],
						[1, 9, 'WakeUp', 0, e, 0, e, e, e],
						[0, 10, 'KeyA', 31, 'A', 65, 'VK_A', e, e],
						[0, 11, 'KeyB', 32, 'B', 66, 'VK_B', e, e],
						[0, 12, 'KeyC', 33, 'C', 67, 'VK_C', e, e],
						[0, 13, 'KeyD', 34, 'D', 68, 'VK_D', e, e],
						[0, 14, 'KeyE', 35, 'E', 69, 'VK_E', e, e],
						[0, 15, 'KeyF', 36, 'F', 70, 'VK_F', e, e],
						[0, 16, 'KeyG', 37, 'G', 71, 'VK_G', e, e],
						[0, 17, 'KeyH', 38, 'H', 72, 'VK_H', e, e],
						[0, 18, 'KeyI', 39, 'I', 73, 'VK_I', e, e],
						[0, 19, 'KeyJ', 40, 'J', 74, 'VK_J', e, e],
						[0, 20, 'KeyK', 41, 'K', 75, 'VK_K', e, e],
						[0, 21, 'KeyL', 42, 'L', 76, 'VK_L', e, e],
						[0, 22, 'KeyM', 43, 'M', 77, 'VK_M', e, e],
						[0, 23, 'KeyN', 44, 'N', 78, 'VK_N', e, e],
						[0, 24, 'KeyO', 45, 'O', 79, 'VK_O', e, e],
						[0, 25, 'KeyP', 46, 'P', 80, 'VK_P', e, e],
						[0, 26, 'KeyQ', 47, 'Q', 81, 'VK_Q', e, e],
						[0, 27, 'KeyR', 48, 'R', 82, 'VK_R', e, e],
						[0, 28, 'KeyS', 49, 'S', 83, 'VK_S', e, e],
						[0, 29, 'KeyT', 50, 'T', 84, 'VK_T', e, e],
						[0, 30, 'KeyU', 51, 'U', 85, 'VK_U', e, e],
						[0, 31, 'KeyV', 52, 'V', 86, 'VK_V', e, e],
						[0, 32, 'KeyW', 53, 'W', 87, 'VK_W', e, e],
						[0, 33, 'KeyX', 54, 'X', 88, 'VK_X', e, e],
						[0, 34, 'KeyY', 55, 'Y', 89, 'VK_Y', e, e],
						[0, 35, 'KeyZ', 56, 'Z', 90, 'VK_Z', e, e],
						[0, 36, 'Digit1', 22, '1', 49, 'VK_1', e, e],
						[0, 37, 'Digit2', 23, '2', 50, 'VK_2', e, e],
						[0, 38, 'Digit3', 24, '3', 51, 'VK_3', e, e],
						[0, 39, 'Digit4', 25, '4', 52, 'VK_4', e, e],
						[0, 40, 'Digit5', 26, '5', 53, 'VK_5', e, e],
						[0, 41, 'Digit6', 27, '6', 54, 'VK_6', e, e],
						[0, 42, 'Digit7', 28, '7', 55, 'VK_7', e, e],
						[0, 43, 'Digit8', 29, '8', 56, 'VK_8', e, e],
						[0, 44, 'Digit9', 30, '9', 57, 'VK_9', e, e],
						[0, 45, 'Digit0', 21, '0', 48, 'VK_0', e, e],
						[1, 46, 'Enter', 3, 'Enter', 13, 'VK_RETURN', e, e],
						[1, 47, 'Escape', 9, 'Escape', 27, 'VK_ESCAPE', e, e],
						[1, 48, 'Backspace', 1, 'Backspace', 8, 'VK_BACK', e, e],
						[1, 49, 'Tab', 2, 'Tab', 9, 'VK_TAB', e, e],
						[1, 50, 'Space', 10, 'Space', 32, 'VK_SPACE', e, e],
						[0, 51, 'Minus', 88, '-', 189, 'VK_OEM_MINUS', '-', 'OEM_MINUS'],
						[0, 52, 'Equal', 86, '=', 187, 'VK_OEM_PLUS', '=', 'OEM_PLUS'],
						[0, 53, 'BracketLeft', 92, '[', 219, 'VK_OEM_4', '[', 'OEM_4'],
						[0, 54, 'BracketRight', 94, ']', 221, 'VK_OEM_6', ']', 'OEM_6'],
						[0, 55, 'Backslash', 93, '\\', 220, 'VK_OEM_5', '\\', 'OEM_5'],
						[0, 56, 'IntlHash', 0, e, 0, e, e, e],
						[0, 57, 'Semicolon', 85, ';', 186, 'VK_OEM_1', ';', 'OEM_1'],
						[0, 58, 'Quote', 95, "'", 222, 'VK_OEM_7', "'", 'OEM_7'],
						[0, 59, 'Backquote', 91, '`', 192, 'VK_OEM_3', '`', 'OEM_3'],
						[0, 60, 'Comma', 87, ',', 188, 'VK_OEM_COMMA', ',', 'OEM_COMMA'],
						[0, 61, 'Period', 89, '.', 190, 'VK_OEM_PERIOD', '.', 'OEM_PERIOD'],
						[0, 62, 'Slash', 90, '/', 191, 'VK_OEM_2', '/', 'OEM_2'],
						[1, 63, 'CapsLock', 8, 'CapsLock', 20, 'VK_CAPITAL', e, e],
						[1, 64, 'F1', 59, 'F1', 112, 'VK_F1', e, e],
						[1, 65, 'F2', 60, 'F2', 113, 'VK_F2', e, e],
						[1, 66, 'F3', 61, 'F3', 114, 'VK_F3', e, e],
						[1, 67, 'F4', 62, 'F4', 115, 'VK_F4', e, e],
						[1, 68, 'F5', 63, 'F5', 116, 'VK_F5', e, e],
						[1, 69, 'F6', 64, 'F6', 117, 'VK_F6', e, e],
						[1, 70, 'F7', 65, 'F7', 118, 'VK_F7', e, e],
						[1, 71, 'F8', 66, 'F8', 119, 'VK_F8', e, e],
						[1, 72, 'F9', 67, 'F9', 120, 'VK_F9', e, e],
						[1, 73, 'F10', 68, 'F10', 121, 'VK_F10', e, e],
						[1, 74, 'F11', 69, 'F11', 122, 'VK_F11', e, e],
						[1, 75, 'F12', 70, 'F12', 123, 'VK_F12', e, e],
						[1, 76, 'PrintScreen', 0, e, 0, e, e, e],
						[1, 77, 'ScrollLock', 84, 'ScrollLock', 145, 'VK_SCROLL', e, e],
						[1, 78, 'Pause', 7, 'PauseBreak', 19, 'VK_PAUSE', e, e],
						[1, 79, 'Insert', 19, 'Insert', 45, 'VK_INSERT', e, e],
						[1, 80, 'Home', 14, 'Home', 36, 'VK_HOME', e, e],
						[1, 81, 'PageUp', 11, 'PageUp', 33, 'VK_PRIOR', e, e],
						[1, 82, 'Delete', 20, 'Delete', 46, 'VK_DELETE', e, e],
						[1, 83, 'End', 13, 'End', 35, 'VK_END', e, e],
						[1, 84, 'PageDown', 12, 'PageDown', 34, 'VK_NEXT', e, e],
						[1, 85, 'ArrowRight', 17, 'RightArrow', 39, 'VK_RIGHT', 'Right', e],
						[1, 86, 'ArrowLeft', 15, 'LeftArrow', 37, 'VK_LEFT', 'Left', e],
						[1, 87, 'ArrowDown', 18, 'DownArrow', 40, 'VK_DOWN', 'Down', e],
						[1, 88, 'ArrowUp', 16, 'UpArrow', 38, 'VK_UP', 'Up', e],
						[1, 89, 'NumLock', 83, 'NumLock', 144, 'VK_NUMLOCK', e, e],
						[1, 90, 'NumpadDivide', 113, 'NumPad_Divide', 111, 'VK_DIVIDE', e, e],
						[1, 91, 'NumpadMultiply', 108, 'NumPad_Multiply', 106, 'VK_MULTIPLY', e, e],
						[1, 92, 'NumpadSubtract', 111, 'NumPad_Subtract', 109, 'VK_SUBTRACT', e, e],
						[1, 93, 'NumpadAdd', 109, 'NumPad_Add', 107, 'VK_ADD', e, e],
						[1, 94, 'NumpadEnter', 3, e, 0, e, e, e],
						[1, 95, 'Numpad1', 99, 'NumPad1', 97, 'VK_NUMPAD1', e, e],
						[1, 96, 'Numpad2', 100, 'NumPad2', 98, 'VK_NUMPAD2', e, e],
						[1, 97, 'Numpad3', 101, 'NumPad3', 99, 'VK_NUMPAD3', e, e],
						[1, 98, 'Numpad4', 102, 'NumPad4', 100, 'VK_NUMPAD4', e, e],
						[1, 99, 'Numpad5', 103, 'NumPad5', 101, 'VK_NUMPAD5', e, e],
						[1, 100, 'Numpad6', 104, 'NumPad6', 102, 'VK_NUMPAD6', e, e],
						[1, 101, 'Numpad7', 105, 'NumPad7', 103, 'VK_NUMPAD7', e, e],
						[1, 102, 'Numpad8', 106, 'NumPad8', 104, 'VK_NUMPAD8', e, e],
						[1, 103, 'Numpad9', 107, 'NumPad9', 105, 'VK_NUMPAD9', e, e],
						[1, 104, 'Numpad0', 98, 'NumPad0', 96, 'VK_NUMPAD0', e, e],
						[1, 105, 'NumpadDecimal', 112, 'NumPad_Decimal', 110, 'VK_DECIMAL', e, e],
						[0, 106, 'IntlBackslash', 97, 'OEM_102', 226, 'VK_OEM_102', e, e],
						[1, 107, 'ContextMenu', 58, 'ContextMenu', 93, e, e, e],
						[1, 108, 'Power', 0, e, 0, e, e, e],
						[1, 109, 'NumpadEqual', 0, e, 0, e, e, e],
						[1, 110, 'F13', 71, 'F13', 124, 'VK_F13', e, e],
						[1, 111, 'F14', 72, 'F14', 125, 'VK_F14', e, e],
						[1, 112, 'F15', 73, 'F15', 126, 'VK_F15', e, e],
						[1, 113, 'F16', 74, 'F16', 127, 'VK_F16', e, e],
						[1, 114, 'F17', 75, 'F17', 128, 'VK_F17', e, e],
						[1, 115, 'F18', 76, 'F18', 129, 'VK_F18', e, e],
						[1, 116, 'F19', 77, 'F19', 130, 'VK_F19', e, e],
						[1, 117, 'F20', 78, 'F20', 0, 'VK_F20', e, e],
						[1, 118, 'F21', 79, 'F21', 0, 'VK_F21', e, e],
						[1, 119, 'F22', 80, 'F22', 0, 'VK_F22', e, e],
						[1, 120, 'F23', 81, 'F23', 0, 'VK_F23', e, e],
						[1, 121, 'F24', 82, 'F24', 0, 'VK_F24', e, e],
						[1, 122, 'Open', 0, e, 0, e, e, e],
						[1, 123, 'Help', 0, e, 0, e, e, e],
						[1, 124, 'Select', 0, e, 0, e, e, e],
						[1, 125, 'Again', 0, e, 0, e, e, e],
						[1, 126, 'Undo', 0, e, 0, e, e, e],
						[1, 127, 'Cut', 0, e, 0, e, e, e],
						[1, 128, 'Copy', 0, e, 0, e, e, e],
						[1, 129, 'Paste', 0, e, 0, e, e, e],
						[1, 130, 'Find', 0, e, 0, e, e, e],
						[1, 131, 'AudioVolumeMute', 117, 'AudioVolumeMute', 173, 'VK_VOLUME_MUTE', e, e],
						[1, 132, 'AudioVolumeUp', 118, 'AudioVolumeUp', 175, 'VK_VOLUME_UP', e, e],
						[1, 133, 'AudioVolumeDown', 119, 'AudioVolumeDown', 174, 'VK_VOLUME_DOWN', e, e],
						[1, 134, 'NumpadComma', 110, 'NumPad_Separator', 108, 'VK_SEPARATOR', e, e],
						[0, 135, 'IntlRo', 115, 'ABNT_C1', 193, 'VK_ABNT_C1', e, e],
						[1, 136, 'KanaMode', 0, e, 0, e, e, e],
						[0, 137, 'IntlYen', 0, e, 0, e, e, e],
						[1, 138, 'Convert', 0, e, 0, e, e, e],
						[1, 139, 'NonConvert', 0, e, 0, e, e, e],
						[1, 140, 'Lang1', 0, e, 0, e, e, e],
						[1, 141, 'Lang2', 0, e, 0, e, e, e],
						[1, 142, 'Lang3', 0, e, 0, e, e, e],
						[1, 143, 'Lang4', 0, e, 0, e, e, e],
						[1, 144, 'Lang5', 0, e, 0, e, e, e],
						[1, 145, 'Abort', 0, e, 0, e, e, e],
						[1, 146, 'Props', 0, e, 0, e, e, e],
						[1, 147, 'NumpadParenLeft', 0, e, 0, e, e, e],
						[1, 148, 'NumpadParenRight', 0, e, 0, e, e, e],
						[1, 149, 'NumpadBackspace', 0, e, 0, e, e, e],
						[1, 150, 'NumpadMemoryStore', 0, e, 0, e, e, e],
						[1, 151, 'NumpadMemoryRecall', 0, e, 0, e, e, e],
						[1, 152, 'NumpadMemoryClear', 0, e, 0, e, e, e],
						[1, 153, 'NumpadMemoryAdd', 0, e, 0, e, e, e],
						[1, 154, 'NumpadMemorySubtract', 0, e, 0, e, e, e],
						[1, 155, 'NumpadClear', 131, 'Clear', 12, 'VK_CLEAR', e, e],
						[1, 156, 'NumpadClearEntry', 0, e, 0, e, e, e],
						[1, 0, e, 5, 'Ctrl', 17, 'VK_CONTROL', e, e],
						[1, 0, e, 4, 'Shift', 16, 'VK_SHIFT', e, e],
						[1, 0, e, 6, 'Alt', 18, 'VK_MENU', e, e],
						[1, 0, e, 57, 'Meta', 91, 'VK_COMMAND', e, e],
						[1, 157, 'ControlLeft', 5, e, 0, 'VK_LCONTROL', e, e],
						[1, 158, 'ShiftLeft', 4, e, 0, 'VK_LSHIFT', e, e],
						[1, 159, 'AltLeft', 6, e, 0, 'VK_LMENU', e, e],
						[1, 160, 'MetaLeft', 57, e, 0, 'VK_LWIN', e, e],
						[1, 161, 'ControlRight', 5, e, 0, 'VK_RCONTROL', e, e],
						[1, 162, 'ShiftRight', 4, e, 0, 'VK_RSHIFT', e, e],
						[1, 163, 'AltRight', 6, e, 0, 'VK_RMENU', e, e],
						[1, 164, 'MetaRight', 57, e, 0, 'VK_RWIN', e, e],
						[1, 165, 'BrightnessUp', 0, e, 0, e, e, e],
						[1, 166, 'BrightnessDown', 0, e, 0, e, e, e],
						[1, 167, 'MediaPlay', 0, e, 0, e, e, e],
						[1, 168, 'MediaRecord', 0, e, 0, e, e, e],
						[1, 169, 'MediaFastForward', 0, e, 0, e, e, e],
						[1, 170, 'MediaRewind', 0, e, 0, e, e, e],
						[1, 171, 'MediaTrackNext', 124, 'MediaTrackNext', 176, 'VK_MEDIA_NEXT_TRACK', e, e],
						[
							1,
							172,
							'MediaTrackPrevious',
							125,
							'MediaTrackPrevious',
							177,
							'VK_MEDIA_PREV_TRACK',
							e,
							e
						],
						[1, 173, 'MediaStop', 126, 'MediaStop', 178, 'VK_MEDIA_STOP', e, e],
						[1, 174, 'Eject', 0, e, 0, e, e, e],
						[1, 175, 'MediaPlayPause', 127, 'MediaPlayPause', 179, 'VK_MEDIA_PLAY_PAUSE', e, e],
						[
							1,
							176,
							'MediaSelect',
							128,
							'LaunchMediaPlayer',
							181,
							'VK_MEDIA_LAUNCH_MEDIA_SELECT',
							e,
							e
						],
						[1, 177, 'LaunchMail', 129, 'LaunchMail', 180, 'VK_MEDIA_LAUNCH_MAIL', e, e],
						[1, 178, 'LaunchApp2', 130, 'LaunchApp2', 183, 'VK_MEDIA_LAUNCH_APP2', e, e],
						[1, 179, 'LaunchApp1', 0, e, 0, 'VK_MEDIA_LAUNCH_APP1', e, e],
						[1, 180, 'SelectTask', 0, e, 0, e, e, e],
						[1, 181, 'LaunchScreenSaver', 0, e, 0, e, e, e],
						[1, 182, 'BrowserSearch', 120, 'BrowserSearch', 170, 'VK_BROWSER_SEARCH', e, e],
						[1, 183, 'BrowserHome', 121, 'BrowserHome', 172, 'VK_BROWSER_HOME', e, e],
						[1, 184, 'BrowserBack', 122, 'BrowserBack', 166, 'VK_BROWSER_BACK', e, e],
						[1, 185, 'BrowserForward', 123, 'BrowserForward', 167, 'VK_BROWSER_FORWARD', e, e],
						[1, 186, 'BrowserStop', 0, e, 0, 'VK_BROWSER_STOP', e, e],
						[1, 187, 'BrowserRefresh', 0, e, 0, 'VK_BROWSER_REFRESH', e, e],
						[1, 188, 'BrowserFavorites', 0, e, 0, 'VK_BROWSER_FAVORITES', e, e],
						[1, 189, 'ZoomToggle', 0, e, 0, e, e, e],
						[1, 190, 'MailReply', 0, e, 0, e, e, e],
						[1, 191, 'MailForward', 0, e, 0, e, e, e],
						[1, 192, 'MailSend', 0, e, 0, e, e, e],
						[1, 0, e, 114, 'KeyInComposition', 229, e, e, e],
						[1, 0, e, 116, 'ABNT_C2', 194, 'VK_ABNT_C2', e, e],
						[1, 0, e, 96, 'OEM_8', 223, 'VK_OEM_8', e, e],
						[1, 0, e, 0, e, 0, 'VK_KANA', e, e],
						[1, 0, e, 0, e, 0, 'VK_HANGUL', e, e],
						[1, 0, e, 0, e, 0, 'VK_JUNJA', e, e],
						[1, 0, e, 0, e, 0, 'VK_FINAL', e, e],
						[1, 0, e, 0, e, 0, 'VK_HANJA', e, e],
						[1, 0, e, 0, e, 0, 'VK_KANJI', e, e],
						[1, 0, e, 0, e, 0, 'VK_CONVERT', e, e],
						[1, 0, e, 0, e, 0, 'VK_NONCONVERT', e, e],
						[1, 0, e, 0, e, 0, 'VK_ACCEPT', e, e],
						[1, 0, e, 0, e, 0, 'VK_MODECHANGE', e, e],
						[1, 0, e, 0, e, 0, 'VK_SELECT', e, e],
						[1, 0, e, 0, e, 0, 'VK_PRINT', e, e],
						[1, 0, e, 0, e, 0, 'VK_EXECUTE', e, e],
						[1, 0, e, 0, e, 0, 'VK_SNAPSHOT', e, e],
						[1, 0, e, 0, e, 0, 'VK_HELP', e, e],
						[1, 0, e, 0, e, 0, 'VK_APPS', e, e],
						[1, 0, e, 0, e, 0, 'VK_PROCESSKEY', e, e],
						[1, 0, e, 0, e, 0, 'VK_PACKET', e, e],
						[1, 0, e, 0, e, 0, 'VK_DBE_SBCSCHAR', e, e],
						[1, 0, e, 0, e, 0, 'VK_DBE_DBCSCHAR', e, e],
						[1, 0, e, 0, e, 0, 'VK_ATTN', e, e],
						[1, 0, e, 0, e, 0, 'VK_CRSEL', e, e],
						[1, 0, e, 0, e, 0, 'VK_EXSEL', e, e],
						[1, 0, e, 0, e, 0, 'VK_EREOF', e, e],
						[1, 0, e, 0, e, 0, 'VK_PLAY', e, e],
						[1, 0, e, 0, e, 0, 'VK_ZOOM', e, e],
						[1, 0, e, 0, e, 0, 'VK_NONAME', e, e],
						[1, 0, e, 0, e, 0, 'VK_PA1', e, e],
						[1, 0, e, 0, e, 0, 'VK_OEM_CLEAR', e, e]
					],
					g = [],
					b = [];
				for (const m of d) {
					const [v, E, L, A, w, c, r, u, h] = m;
					if (
						(b[E] ||
							((b[E] = !0),
							(C[E] = L),
							(S[L] = E),
							(o[L.toLowerCase()] = E),
							v &&
								((n.IMMUTABLE_CODE_TO_KEY_CODE[E] = A),
								A !== 0 &&
									A !== 3 &&
									A !== 5 &&
									A !== 4 &&
									A !== 6 &&
									A !== 57 &&
									(n.IMMUTABLE_KEY_CODE_TO_CODE[A] = E))),
						!g[A])
					) {
						if (((g[A] = !0), !w))
							throw new Error(
								`String representation missing for key code ${A} around scan code ${L}`
							);
						M.define(A, w), i.define(A, u || w), a.define(A, h || u || w);
					}
					c && (n.EVENT_KEY_CODE_MAP[c] = A), r && (n.NATIVE_WINDOWS_KEY_CODE_TO_KEY_CODE[r] = A);
				}
				n.IMMUTABLE_KEY_CODE_TO_CODE[3] = 46;
			})();
			var s;
			(function (e) {
				function d(L) {
					return M.keyCodeToStr(L);
				}
				e.toString = d;
				function g(L) {
					return M.strToKeyCode(L);
				}
				e.fromString = g;
				function b(L) {
					return i.keyCodeToStr(L);
				}
				e.toUserSettingsUS = b;
				function m(L) {
					return a.keyCodeToStr(L);
				}
				e.toUserSettingsGeneral = m;
				function v(L) {
					return i.strToKeyCode(L) || a.strToKeyCode(L);
				}
				e.fromUserSettings = v;
				function E(L) {
					if (L >= 98 && L <= 113) return null;
					switch (L) {
						case 16:
							return 'Up';
						case 18:
							return 'Down';
						case 15:
							return 'Left';
						case 17:
							return 'Right';
					}
					return M.keyCodeToStr(L);
				}
				e.toElectronAccelerator = E;
			})(s || (n.KeyCodeUtils = s = {}));
			function p(e, d) {
				const g = ((d & 65535) << 16) >>> 0;
				return (e | g) >>> 0;
			}
			n.KeyChord = p;
		}),
		Y(X[31], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.Lazy = void 0);
			class R {
				constructor(i) {
					(this.executor = i), (this._didRun = !1);
				}
				get value() {
					if (!this._didRun)
						try {
							this._value = this.executor();
						} catch (i) {
							this._error = i;
						} finally {
							this._didRun = !0;
						}
					if (this._error) throw this._error;
					return this._value;
				}
				get rawValue() {
					return this._value;
				}
			}
			n.Lazy = R;
		}),
		Y(X[11], J([0, 1, 14, 15]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.DisposableMap =
					n.ImmortalReference =
					n.SafeDisposable =
					n.RefCountedDisposable =
					n.MutableDisposable =
					n.Disposable =
					n.DisposableStore =
					n.toDisposable =
					n.combinedDisposable =
					n.dispose =
					n.isDisposable =
					n.markAsSingleton =
					n.setDisposableTracker =
						void 0);
			const i = !1;
			let a = null;
			function C(u) {
				a = u;
			}
			if (((n.setDisposableTracker = C), i)) {
				const u = '__is_disposable_tracked__';
				C(
					new (class {
						trackDisposable(h) {
							const f = new Error('Potentially leaked disposable').stack;
							setTimeout(() => {
								h[u] || console.log(f);
							}, 3e3);
						}
						setParent(h, f) {
							if (h && h !== E.None)
								try {
									h[u] = !0;
								} catch {}
						}
						markAsDisposed(h) {
							if (h && h !== E.None)
								try {
									h[u] = !0;
								} catch {}
						}
						markAsSingleton(h) {}
					})()
				);
			}
			function S(u) {
				return a?.trackDisposable(u), u;
			}
			function o(u) {
				a?.markAsDisposed(u);
			}
			function s(u, h) {
				a?.setParent(u, h);
			}
			function p(u, h) {
				if (a) for (const f of u) a.setParent(f, h);
			}
			function e(u) {
				return a?.markAsSingleton(u), u;
			}
			n.markAsSingleton = e;
			function d(u) {
				return typeof u.dispose == 'function' && u.dispose.length === 0;
			}
			n.isDisposable = d;
			function g(u) {
				if (M.Iterable.is(u)) {
					const h = [];
					for (const f of u)
						if (f)
							try {
								f.dispose();
							} catch (l) {
								h.push(l);
							}
					if (h.length === 1) throw h[0];
					if (h.length > 1)
						throw new AggregateError(h, 'Encountered errors while disposing of store');
					return Array.isArray(u) ? [] : u;
				} else if (u) return u.dispose(), u;
			}
			n.dispose = g;
			function b(...u) {
				const h = m(() => g(u));
				return p(u, h), h;
			}
			n.combinedDisposable = b;
			function m(u) {
				const h = S({
					dispose: (0, R.once)(() => {
						o(h), u();
					})
				});
				return h;
			}
			n.toDisposable = m;
			class v {
				constructor() {
					(this._toDispose = new Set()), (this._isDisposed = !1), S(this);
				}
				dispose() {
					this._isDisposed || (o(this), (this._isDisposed = !0), this.clear());
				}
				get isDisposed() {
					return this._isDisposed;
				}
				clear() {
					if (this._toDispose.size !== 0)
						try {
							g(this._toDispose);
						} finally {
							this._toDispose.clear();
						}
				}
				add(h) {
					if (!h) return h;
					if (h === this) throw new Error('Cannot register a disposable on itself!');
					return (
						s(h, this),
						this._isDisposed
							? v.DISABLE_DISPOSED_WARNING ||
							  console.warn(
									new Error(
										'Trying to add a disposable to a DisposableStore that has already been disposed of. The added object will be leaked!'
									).stack
							  )
							: this._toDispose.add(h),
						h
					);
				}
			}
			(n.DisposableStore = v), (v.DISABLE_DISPOSED_WARNING = !1);
			class E {
				constructor() {
					(this._store = new v()), S(this), s(this._store, this);
				}
				dispose() {
					o(this), this._store.dispose();
				}
				_register(h) {
					if (h === this) throw new Error('Cannot register a disposable on itself!');
					return this._store.add(h);
				}
			}
			(n.Disposable = E), (E.None = Object.freeze({ dispose() {} }));
			class L {
				constructor() {
					(this._isDisposed = !1), S(this);
				}
				get value() {
					return this._isDisposed ? void 0 : this._value;
				}
				set value(h) {
					var f;
					this._isDisposed ||
						h === this._value ||
						((f = this._value) === null || f === void 0 || f.dispose(),
						h && s(h, this),
						(this._value = h));
				}
				clear() {
					this.value = void 0;
				}
				dispose() {
					var h;
					(this._isDisposed = !0),
						o(this),
						(h = this._value) === null || h === void 0 || h.dispose(),
						(this._value = void 0);
				}
			}
			n.MutableDisposable = L;
			class A {
				constructor(h) {
					(this._disposable = h), (this._counter = 1);
				}
				acquire() {
					return this._counter++, this;
				}
				release() {
					return --this._counter === 0 && this._disposable.dispose(), this;
				}
			}
			n.RefCountedDisposable = A;
			class w {
				constructor() {
					(this.dispose = () => {}), (this.unset = () => {}), (this.isset = () => !1), S(this);
				}
				set(h) {
					let f = h;
					return (
						(this.unset = () => (f = void 0)),
						(this.isset = () => f !== void 0),
						(this.dispose = () => {
							f && (f(), (f = void 0), o(this));
						}),
						this
					);
				}
			}
			n.SafeDisposable = w;
			class c {
				constructor(h) {
					this.object = h;
				}
				dispose() {}
			}
			n.ImmortalReference = c;
			class r {
				constructor() {
					(this._store = new Map()), (this._isDisposed = !1), S(this);
				}
				dispose() {
					o(this), (this._isDisposed = !0), this.clearAndDisposeAll();
				}
				clearAndDisposeAll() {
					if (this._store.size)
						try {
							g(this._store.values());
						} finally {
							this._store.clear();
						}
				}
				get(h) {
					return this._store.get(h);
				}
				set(h, f, l = !1) {
					var _;
					this._isDisposed &&
						console.warn(
							new Error(
								'Trying to add a disposable to a DisposableMap that has already been disposed of. The added object will be leaked!'
							).stack
						),
						l || (_ = this._store.get(h)) === null || _ === void 0 || _.dispose(),
						this._store.set(h, f);
				}
				deleteAndDispose(h) {
					var f;
					(f = this._store.get(h)) === null || f === void 0 || f.dispose(), this._store.delete(h);
				}
				[Symbol.iterator]() {
					return this._store[Symbol.iterator]();
				}
			}
			n.DisposableMap = r;
		}),
		Y(X[16], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.LinkedList = void 0);
			class R {
				constructor(a) {
					(this.element = a), (this.next = R.Undefined), (this.prev = R.Undefined);
				}
			}
			R.Undefined = new R(void 0);
			class M {
				constructor() {
					(this._first = R.Undefined), (this._last = R.Undefined), (this._size = 0);
				}
				get size() {
					return this._size;
				}
				isEmpty() {
					return this._first === R.Undefined;
				}
				clear() {
					let a = this._first;
					for (; a !== R.Undefined; ) {
						const C = a.next;
						(a.prev = R.Undefined), (a.next = R.Undefined), (a = C);
					}
					(this._first = R.Undefined), (this._last = R.Undefined), (this._size = 0);
				}
				unshift(a) {
					return this._insert(a, !1);
				}
				push(a) {
					return this._insert(a, !0);
				}
				_insert(a, C) {
					const S = new R(a);
					if (this._first === R.Undefined) (this._first = S), (this._last = S);
					else if (C) {
						const s = this._last;
						(this._last = S), (S.prev = s), (s.next = S);
					} else {
						const s = this._first;
						(this._first = S), (S.next = s), (s.prev = S);
					}
					this._size += 1;
					let o = !1;
					return () => {
						o || ((o = !0), this._remove(S));
					};
				}
				shift() {
					if (this._first !== R.Undefined) {
						const a = this._first.element;
						return this._remove(this._first), a;
					}
				}
				pop() {
					if (this._last !== R.Undefined) {
						const a = this._last.element;
						return this._remove(this._last), a;
					}
				}
				_remove(a) {
					if (a.prev !== R.Undefined && a.next !== R.Undefined) {
						const C = a.prev;
						(C.next = a.next), (a.next.prev = C);
					} else a.prev === R.Undefined && a.next === R.Undefined ? ((this._first = R.Undefined), (this._last = R.Undefined)) : a.next === R.Undefined ? ((this._last = this._last.prev), (this._last.next = R.Undefined)) : a.prev === R.Undefined && ((this._first = this._first.next), (this._first.prev = R.Undefined));
					this._size -= 1;
				}
				*[Symbol.iterator]() {
					let a = this._first;
					for (; a !== R.Undefined; ) yield a.element, (a = a.next);
				}
			}
			n.LinkedList = M;
		}),
		Y(X[5], J([0, 1, 27, 31]), function (x, n, R, M) {
			'use strict';
			var i;
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.InvisibleCharacters =
					n.AmbiguousCharacters =
					n.noBreakWhitespace =
					n.getLeftDeleteOffset =
					n.singleLetterHash =
					n.containsUppercaseCharacter =
					n.startsWithUTF8BOM =
					n.UTF8_BOM_CHARACTER =
					n.isEmojiImprecise =
					n.isFullWidthCharacter =
					n.containsUnusualLineTerminators =
					n.UNUSUAL_LINE_TERMINATORS =
					n.isBasicASCII =
					n.containsRTL =
					n.getCharContainingOffset =
					n.prevCharLength =
					n.nextCharLength =
					n.GraphemeIterator =
					n.CodePointIterator =
					n.getNextCodePoint =
					n.computeCodePoint =
					n.isLowSurrogate =
					n.isHighSurrogate =
					n.commonSuffixLength =
					n.commonPrefixLength =
					n.startsWithIgnoreCase =
					n.equalsIgnoreCase =
					n.isUpperAsciiLetter =
					n.isLowerAsciiLetter =
					n.isAsciiDigit =
					n.compareSubstringIgnoreCase =
					n.compareIgnoreCase =
					n.compareSubstring =
					n.compare =
					n.lastNonWhitespaceIndex =
					n.getLeadingWhitespace =
					n.firstNonWhitespaceIndex =
					n.splitLines =
					n.regExpFlags =
					n.regExpLeadsToEndlessLoop =
					n.createRegExp =
					n.stripWildcards =
					n.convertSimple2RegExpPattern =
					n.rtrim =
					n.ltrim =
					n.trim =
					n.escapeRegExpCharacters =
					n.escape =
					n.format =
					n.isFalsyOrWhitespace =
						void 0);
			function a(P) {
				return !P || typeof P != 'string' ? !0 : P.trim().length === 0;
			}
			n.isFalsyOrWhitespace = a;
			const C = /{(\d+)}/g;
			function S(P, ...O) {
				return O.length === 0
					? P
					: P.replace(C, function (W, $) {
							const ee = parseInt($, 10);
							return isNaN(ee) || ee < 0 || ee >= O.length ? W : O[ee];
					  });
			}
			n.format = S;
			function o(P) {
				return P.replace(/[<>&]/g, function (O) {
					switch (O) {
						case '<':
							return '&lt;';
						case '>':
							return '&gt;';
						case '&':
							return '&amp;';
						default:
							return O;
					}
				});
			}
			n.escape = o;
			function s(P) {
				return P.replace(/[\\\{\}\*\+\?\|\^\$\.\[\]\(\)]/g, '\\$&');
			}
			n.escapeRegExpCharacters = s;
			function p(P, O = ' ') {
				const W = e(P, O);
				return d(W, O);
			}
			n.trim = p;
			function e(P, O) {
				if (!P || !O) return P;
				const W = O.length;
				if (W === 0 || P.length === 0) return P;
				let $ = 0;
				for (; P.indexOf(O, $) === $; ) $ = $ + W;
				return P.substring($);
			}
			n.ltrim = e;
			function d(P, O) {
				if (!P || !O) return P;
				const W = O.length,
					$ = P.length;
				if (W === 0 || $ === 0) return P;
				let ee = $,
					ae = -1;
				for (; (ae = P.lastIndexOf(O, ee - 1)), !(ae === -1 || ae + W !== ee); ) {
					if (ae === 0) return '';
					ee = ae;
				}
				return P.substring(0, ee);
			}
			n.rtrim = d;
			function g(P) {
				return P.replace(/[\-\\\{\}\+\?\|\^\$\.\,\[\]\(\)\#\s]/g, '\\$&').replace(/[\*]/g, '.*');
			}
			n.convertSimple2RegExpPattern = g;
			function b(P) {
				return P.replace(/\*/g, '');
			}
			n.stripWildcards = b;
			function m(P, O, W = {}) {
				if (!P) throw new Error('Cannot create regex from empty string');
				O || (P = s(P)),
					W.wholeWord &&
						(/\B/.test(P.charAt(0)) || (P = '\\b' + P),
						/\B/.test(P.charAt(P.length - 1)) || (P = P + '\\b'));
				let $ = '';
				return (
					W.global && ($ += 'g'),
					W.matchCase || ($ += 'i'),
					W.multiline && ($ += 'm'),
					W.unicode && ($ += 'u'),
					new RegExp(P, $)
				);
			}
			n.createRegExp = m;
			function v(P) {
				return P.source === '^' || P.source === '^$' || P.source === '$' || P.source === '^\\s*$'
					? !1
					: !!(P.exec('') && P.lastIndex === 0);
			}
			n.regExpLeadsToEndlessLoop = v;
			function E(P) {
				return (
					(P.global ? 'g' : '') +
					(P.ignoreCase ? 'i' : '') +
					(P.multiline ? 'm' : '') +
					(P.unicode ? 'u' : '')
				);
			}
			n.regExpFlags = E;
			function L(P) {
				return P.split(/\r\n|\r|\n/);
			}
			n.splitLines = L;
			function A(P) {
				for (let O = 0, W = P.length; O < W; O++) {
					const $ = P.charCodeAt(O);
					if ($ !== 32 && $ !== 9) return O;
				}
				return -1;
			}
			n.firstNonWhitespaceIndex = A;
			function w(P, O = 0, W = P.length) {
				for (let $ = O; $ < W; $++) {
					const ee = P.charCodeAt($);
					if (ee !== 32 && ee !== 9) return P.substring(O, $);
				}
				return P.substring(O, W);
			}
			n.getLeadingWhitespace = w;
			function c(P, O = P.length - 1) {
				for (let W = O; W >= 0; W--) {
					const $ = P.charCodeAt(W);
					if ($ !== 32 && $ !== 9) return W;
				}
				return -1;
			}
			n.lastNonWhitespaceIndex = c;
			function r(P, O) {
				return P < O ? -1 : P > O ? 1 : 0;
			}
			n.compare = r;
			function u(P, O, W = 0, $ = P.length, ee = 0, ae = O.length) {
				for (; W < $ && ee < ae; W++, ee++) {
					const pe = P.charCodeAt(W),
						le = O.charCodeAt(ee);
					if (pe < le) return -1;
					if (pe > le) return 1;
				}
				const de = $ - W,
					ye = ae - ee;
				return de < ye ? -1 : de > ye ? 1 : 0;
			}
			n.compareSubstring = u;
			function h(P, O) {
				return f(P, O, 0, P.length, 0, O.length);
			}
			n.compareIgnoreCase = h;
			function f(P, O, W = 0, $ = P.length, ee = 0, ae = O.length) {
				for (; W < $ && ee < ae; W++, ee++) {
					let pe = P.charCodeAt(W),
						le = O.charCodeAt(ee);
					if (pe === le) continue;
					if (pe >= 128 || le >= 128) return u(P.toLowerCase(), O.toLowerCase(), W, $, ee, ae);
					_(pe) && (pe -= 32), _(le) && (le -= 32);
					const _e = pe - le;
					if (_e !== 0) return _e;
				}
				const de = $ - W,
					ye = ae - ee;
				return de < ye ? -1 : de > ye ? 1 : 0;
			}
			n.compareSubstringIgnoreCase = f;
			function l(P) {
				return P >= 48 && P <= 57;
			}
			n.isAsciiDigit = l;
			function _(P) {
				return P >= 97 && P <= 122;
			}
			n.isLowerAsciiLetter = _;
			function N(P) {
				return P >= 65 && P <= 90;
			}
			n.isUpperAsciiLetter = N;
			function y(P, O) {
				return P.length === O.length && f(P, O) === 0;
			}
			n.equalsIgnoreCase = y;
			function D(P, O) {
				const W = O.length;
				return O.length > P.length ? !1 : f(P, O, 0, W) === 0;
			}
			n.startsWithIgnoreCase = D;
			function k(P, O) {
				const W = Math.min(P.length, O.length);
				let $;
				for ($ = 0; $ < W; $++) if (P.charCodeAt($) !== O.charCodeAt($)) return $;
				return W;
			}
			n.commonPrefixLength = k;
			function B(P, O) {
				const W = Math.min(P.length, O.length);
				let $;
				const ee = P.length - 1,
					ae = O.length - 1;
				for ($ = 0; $ < W; $++) if (P.charCodeAt(ee - $) !== O.charCodeAt(ae - $)) return $;
				return W;
			}
			n.commonSuffixLength = B;
			function I(P) {
				return 55296 <= P && P <= 56319;
			}
			n.isHighSurrogate = I;
			function U(P) {
				return 56320 <= P && P <= 57343;
			}
			n.isLowSurrogate = U;
			function V(P, O) {
				return ((P - 55296) << 10) + (O - 56320) + 65536;
			}
			n.computeCodePoint = V;
			function Q(P, O, W) {
				const $ = P.charCodeAt(W);
				if (I($) && W + 1 < O) {
					const ee = P.charCodeAt(W + 1);
					if (U(ee)) return V($, ee);
				}
				return $;
			}
			n.getNextCodePoint = Q;
			function F(P, O) {
				const W = P.charCodeAt(O - 1);
				if (U(W) && O > 1) {
					const $ = P.charCodeAt(O - 2);
					if (I($)) return V($, W);
				}
				return W;
			}
			class T {
				get offset() {
					return this._offset;
				}
				constructor(O, W = 0) {
					(this._str = O), (this._len = O.length), (this._offset = W);
				}
				setOffset(O) {
					this._offset = O;
				}
				prevCodePoint() {
					const O = F(this._str, this._offset);
					return (this._offset -= O >= 65536 ? 2 : 1), O;
				}
				nextCodePoint() {
					const O = Q(this._str, this._len, this._offset);
					return (this._offset += O >= 65536 ? 2 : 1), O;
				}
				eol() {
					return this._offset >= this._len;
				}
			}
			n.CodePointIterator = T;
			class q {
				get offset() {
					return this._iterator.offset;
				}
				constructor(O, W = 0) {
					this._iterator = new T(O, W);
				}
				nextGraphemeLength() {
					const O = K.getInstance(),
						W = this._iterator,
						$ = W.offset;
					let ee = O.getGraphemeBreakType(W.nextCodePoint());
					for (; !W.eol(); ) {
						const ae = W.offset,
							de = O.getGraphemeBreakType(W.nextCodePoint());
						if (j(ee, de)) {
							W.setOffset(ae);
							break;
						}
						ee = de;
					}
					return W.offset - $;
				}
				prevGraphemeLength() {
					const O = K.getInstance(),
						W = this._iterator,
						$ = W.offset;
					let ee = O.getGraphemeBreakType(W.prevCodePoint());
					for (; W.offset > 0; ) {
						const ae = W.offset,
							de = O.getGraphemeBreakType(W.prevCodePoint());
						if (j(de, ee)) {
							W.setOffset(ae);
							break;
						}
						ee = de;
					}
					return $ - W.offset;
				}
				eol() {
					return this._iterator.eol();
				}
			}
			n.GraphemeIterator = q;
			function H(P, O) {
				return new q(P, O).nextGraphemeLength();
			}
			n.nextCharLength = H;
			function t(P, O) {
				return new q(P, O).prevGraphemeLength();
			}
			n.prevCharLength = t;
			function oe(P, O) {
				O > 0 && U(P.charCodeAt(O)) && O--;
				const W = O + H(P, O);
				return [W - t(P, W), W];
			}
			n.getCharContainingOffset = oe;
			let ne;
			function he() {
				return /(?:[\u05BE\u05C0\u05C3\u05C6\u05D0-\u05F4\u0608\u060B\u060D\u061B-\u064A\u066D-\u066F\u0671-\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u0710\u0712-\u072F\u074D-\u07A5\u07B1-\u07EA\u07F4\u07F5\u07FA\u07FE-\u0815\u081A\u0824\u0828\u0830-\u0858\u085E-\u088E\u08A0-\u08C9\u200F\uFB1D\uFB1F-\uFB28\uFB2A-\uFD3D\uFD50-\uFDC7\uFDF0-\uFDFC\uFE70-\uFEFC]|\uD802[\uDC00-\uDD1B\uDD20-\uDE00\uDE10-\uDE35\uDE40-\uDEE4\uDEEB-\uDF35\uDF40-\uDFFF]|\uD803[\uDC00-\uDD23\uDE80-\uDEA9\uDEAD-\uDF45\uDF51-\uDF81\uDF86-\uDFF6]|\uD83A[\uDC00-\uDCCF\uDD00-\uDD43\uDD4B-\uDFFF]|\uD83B[\uDC00-\uDEBB])/;
			}
			function be(P) {
				return ne || (ne = he()), ne.test(P);
			}
			n.containsRTL = be;
			const re = /^[\t\n\r\x20-\x7E]*$/;
			function se(P) {
				return re.test(P);
			}
			(n.isBasicASCII = se), (n.UNUSUAL_LINE_TERMINATORS = /[\u2028\u2029]/);
			function ge(P) {
				return n.UNUSUAL_LINE_TERMINATORS.test(P);
			}
			n.containsUnusualLineTerminators = ge;
			function Le(P) {
				return (
					(P >= 11904 && P <= 55215) || (P >= 63744 && P <= 64255) || (P >= 65281 && P <= 65374)
				);
			}
			n.isFullWidthCharacter = Le;
			function Se(P) {
				return (
					(P >= 127462 && P <= 127487) ||
					P === 8986 ||
					P === 8987 ||
					P === 9200 ||
					P === 9203 ||
					(P >= 9728 && P <= 10175) ||
					P === 11088 ||
					P === 11093 ||
					(P >= 127744 && P <= 128591) ||
					(P >= 128640 && P <= 128764) ||
					(P >= 128992 && P <= 129008) ||
					(P >= 129280 && P <= 129535) ||
					(P >= 129648 && P <= 129782)
				);
			}
			(n.isEmojiImprecise = Se), (n.UTF8_BOM_CHARACTER = String.fromCharCode(65279));
			function Z(P) {
				return !!(P && P.length > 0 && P.charCodeAt(0) === 65279);
			}
			n.startsWithUTF8BOM = Z;
			function z(P, O = !1) {
				return P ? (O && (P = P.replace(/\\./g, '')), P.toLowerCase() !== P) : !1;
			}
			n.containsUppercaseCharacter = z;
			function G(P) {
				return (
					(P = P % (2 * 26)),
					P < 26 ? String.fromCharCode(97 + P) : String.fromCharCode(65 + P - 26)
				);
			}
			n.singleLetterHash = G;
			function j(P, O) {
				return P === 0
					? O !== 5 && O !== 7
					: P === 2 && O === 3
					? !1
					: P === 4 || P === 2 || P === 3 || O === 4 || O === 2 || O === 3
					? !0
					: !(
							(P === 8 && (O === 8 || O === 9 || O === 11 || O === 12)) ||
							((P === 11 || P === 9) && (O === 9 || O === 10)) ||
							((P === 12 || P === 10) && O === 10) ||
							O === 5 ||
							O === 13 ||
							O === 7 ||
							P === 1 ||
							(P === 13 && O === 14) ||
							(P === 6 && O === 6)
					  );
			}
			class K {
				static getInstance() {
					return K._INSTANCE || (K._INSTANCE = new K()), K._INSTANCE;
				}
				constructor() {
					this._data = te();
				}
				getGraphemeBreakType(O) {
					if (O < 32) return O === 10 ? 3 : O === 13 ? 2 : 4;
					if (O < 127) return 0;
					const W = this._data,
						$ = W.length / 3;
					let ee = 1;
					for (; ee <= $; )
						if (O < W[3 * ee]) ee = 2 * ee;
						else if (O > W[3 * ee + 1]) ee = 2 * ee + 1;
						else return W[3 * ee + 2];
					return 0;
				}
			}
			K._INSTANCE = null;
			function te() {
				return JSON.parse(
					'[0,0,0,51229,51255,12,44061,44087,12,127462,127487,6,7083,7085,5,47645,47671,12,54813,54839,12,128678,128678,14,3270,3270,5,9919,9923,14,45853,45879,12,49437,49463,12,53021,53047,12,71216,71218,7,128398,128399,14,129360,129374,14,2519,2519,5,4448,4519,9,9742,9742,14,12336,12336,14,44957,44983,12,46749,46775,12,48541,48567,12,50333,50359,12,52125,52151,12,53917,53943,12,69888,69890,5,73018,73018,5,127990,127990,14,128558,128559,14,128759,128760,14,129653,129655,14,2027,2035,5,2891,2892,7,3761,3761,5,6683,6683,5,8293,8293,4,9825,9826,14,9999,9999,14,43452,43453,5,44509,44535,12,45405,45431,12,46301,46327,12,47197,47223,12,48093,48119,12,48989,49015,12,49885,49911,12,50781,50807,12,51677,51703,12,52573,52599,12,53469,53495,12,54365,54391,12,65279,65279,4,70471,70472,7,72145,72147,7,119173,119179,5,127799,127818,14,128240,128244,14,128512,128512,14,128652,128652,14,128721,128722,14,129292,129292,14,129445,129450,14,129734,129743,14,1476,1477,5,2366,2368,7,2750,2752,7,3076,3076,5,3415,3415,5,4141,4144,5,6109,6109,5,6964,6964,5,7394,7400,5,9197,9198,14,9770,9770,14,9877,9877,14,9968,9969,14,10084,10084,14,43052,43052,5,43713,43713,5,44285,44311,12,44733,44759,12,45181,45207,12,45629,45655,12,46077,46103,12,46525,46551,12,46973,46999,12,47421,47447,12,47869,47895,12,48317,48343,12,48765,48791,12,49213,49239,12,49661,49687,12,50109,50135,12,50557,50583,12,51005,51031,12,51453,51479,12,51901,51927,12,52349,52375,12,52797,52823,12,53245,53271,12,53693,53719,12,54141,54167,12,54589,54615,12,55037,55063,12,69506,69509,5,70191,70193,5,70841,70841,7,71463,71467,5,72330,72342,5,94031,94031,5,123628,123631,5,127763,127765,14,127941,127941,14,128043,128062,14,128302,128317,14,128465,128467,14,128539,128539,14,128640,128640,14,128662,128662,14,128703,128703,14,128745,128745,14,129004,129007,14,129329,129330,14,129402,129402,14,129483,129483,14,129686,129704,14,130048,131069,14,173,173,4,1757,1757,1,2200,2207,5,2434,2435,7,2631,2632,5,2817,2817,5,3008,3008,5,3201,3201,5,3387,3388,5,3542,3542,5,3902,3903,7,4190,4192,5,6002,6003,5,6439,6440,5,6765,6770,7,7019,7027,5,7154,7155,7,8205,8205,13,8505,8505,14,9654,9654,14,9757,9757,14,9792,9792,14,9852,9853,14,9890,9894,14,9937,9937,14,9981,9981,14,10035,10036,14,11035,11036,14,42654,42655,5,43346,43347,7,43587,43587,5,44006,44007,7,44173,44199,12,44397,44423,12,44621,44647,12,44845,44871,12,45069,45095,12,45293,45319,12,45517,45543,12,45741,45767,12,45965,45991,12,46189,46215,12,46413,46439,12,46637,46663,12,46861,46887,12,47085,47111,12,47309,47335,12,47533,47559,12,47757,47783,12,47981,48007,12,48205,48231,12,48429,48455,12,48653,48679,12,48877,48903,12,49101,49127,12,49325,49351,12,49549,49575,12,49773,49799,12,49997,50023,12,50221,50247,12,50445,50471,12,50669,50695,12,50893,50919,12,51117,51143,12,51341,51367,12,51565,51591,12,51789,51815,12,52013,52039,12,52237,52263,12,52461,52487,12,52685,52711,12,52909,52935,12,53133,53159,12,53357,53383,12,53581,53607,12,53805,53831,12,54029,54055,12,54253,54279,12,54477,54503,12,54701,54727,12,54925,54951,12,55149,55175,12,68101,68102,5,69762,69762,7,70067,70069,7,70371,70378,5,70720,70721,7,71087,71087,5,71341,71341,5,71995,71996,5,72249,72249,7,72850,72871,5,73109,73109,5,118576,118598,5,121505,121519,5,127245,127247,14,127568,127569,14,127777,127777,14,127872,127891,14,127956,127967,14,128015,128016,14,128110,128172,14,128259,128259,14,128367,128368,14,128424,128424,14,128488,128488,14,128530,128532,14,128550,128551,14,128566,128566,14,128647,128647,14,128656,128656,14,128667,128673,14,128691,128693,14,128715,128715,14,128728,128732,14,128752,128752,14,128765,128767,14,129096,129103,14,129311,129311,14,129344,129349,14,129394,129394,14,129413,129425,14,129466,129471,14,129511,129535,14,129664,129666,14,129719,129722,14,129760,129767,14,917536,917631,5,13,13,2,1160,1161,5,1564,1564,4,1807,1807,1,2085,2087,5,2307,2307,7,2382,2383,7,2497,2500,5,2563,2563,7,2677,2677,5,2763,2764,7,2879,2879,5,2914,2915,5,3021,3021,5,3142,3144,5,3263,3263,5,3285,3286,5,3398,3400,7,3530,3530,5,3633,3633,5,3864,3865,5,3974,3975,5,4155,4156,7,4229,4230,5,5909,5909,7,6078,6085,7,6277,6278,5,6451,6456,7,6744,6750,5,6846,6846,5,6972,6972,5,7074,7077,5,7146,7148,7,7222,7223,5,7416,7417,5,8234,8238,4,8417,8417,5,9000,9000,14,9203,9203,14,9730,9731,14,9748,9749,14,9762,9763,14,9776,9783,14,9800,9811,14,9831,9831,14,9872,9873,14,9882,9882,14,9900,9903,14,9929,9933,14,9941,9960,14,9974,9974,14,9989,9989,14,10006,10006,14,10062,10062,14,10160,10160,14,11647,11647,5,12953,12953,14,43019,43019,5,43232,43249,5,43443,43443,5,43567,43568,7,43696,43696,5,43765,43765,7,44013,44013,5,44117,44143,12,44229,44255,12,44341,44367,12,44453,44479,12,44565,44591,12,44677,44703,12,44789,44815,12,44901,44927,12,45013,45039,12,45125,45151,12,45237,45263,12,45349,45375,12,45461,45487,12,45573,45599,12,45685,45711,12,45797,45823,12,45909,45935,12,46021,46047,12,46133,46159,12,46245,46271,12,46357,46383,12,46469,46495,12,46581,46607,12,46693,46719,12,46805,46831,12,46917,46943,12,47029,47055,12,47141,47167,12,47253,47279,12,47365,47391,12,47477,47503,12,47589,47615,12,47701,47727,12,47813,47839,12,47925,47951,12,48037,48063,12,48149,48175,12,48261,48287,12,48373,48399,12,48485,48511,12,48597,48623,12,48709,48735,12,48821,48847,12,48933,48959,12,49045,49071,12,49157,49183,12,49269,49295,12,49381,49407,12,49493,49519,12,49605,49631,12,49717,49743,12,49829,49855,12,49941,49967,12,50053,50079,12,50165,50191,12,50277,50303,12,50389,50415,12,50501,50527,12,50613,50639,12,50725,50751,12,50837,50863,12,50949,50975,12,51061,51087,12,51173,51199,12,51285,51311,12,51397,51423,12,51509,51535,12,51621,51647,12,51733,51759,12,51845,51871,12,51957,51983,12,52069,52095,12,52181,52207,12,52293,52319,12,52405,52431,12,52517,52543,12,52629,52655,12,52741,52767,12,52853,52879,12,52965,52991,12,53077,53103,12,53189,53215,12,53301,53327,12,53413,53439,12,53525,53551,12,53637,53663,12,53749,53775,12,53861,53887,12,53973,53999,12,54085,54111,12,54197,54223,12,54309,54335,12,54421,54447,12,54533,54559,12,54645,54671,12,54757,54783,12,54869,54895,12,54981,55007,12,55093,55119,12,55243,55291,10,66045,66045,5,68325,68326,5,69688,69702,5,69817,69818,5,69957,69958,7,70089,70092,5,70198,70199,5,70462,70462,5,70502,70508,5,70750,70750,5,70846,70846,7,71100,71101,5,71230,71230,7,71351,71351,5,71737,71738,5,72000,72000,7,72160,72160,5,72273,72278,5,72752,72758,5,72882,72883,5,73031,73031,5,73461,73462,7,94192,94193,7,119149,119149,7,121403,121452,5,122915,122916,5,126980,126980,14,127358,127359,14,127535,127535,14,127759,127759,14,127771,127771,14,127792,127793,14,127825,127867,14,127897,127899,14,127945,127945,14,127985,127986,14,128000,128007,14,128021,128021,14,128066,128100,14,128184,128235,14,128249,128252,14,128266,128276,14,128335,128335,14,128379,128390,14,128407,128419,14,128444,128444,14,128481,128481,14,128499,128499,14,128526,128526,14,128536,128536,14,128543,128543,14,128556,128556,14,128564,128564,14,128577,128580,14,128643,128645,14,128649,128649,14,128654,128654,14,128660,128660,14,128664,128664,14,128675,128675,14,128686,128689,14,128695,128696,14,128705,128709,14,128717,128719,14,128725,128725,14,128736,128741,14,128747,128748,14,128755,128755,14,128762,128762,14,128981,128991,14,129009,129023,14,129160,129167,14,129296,129304,14,129320,129327,14,129340,129342,14,129356,129356,14,129388,129392,14,129399,129400,14,129404,129407,14,129432,129442,14,129454,129455,14,129473,129474,14,129485,129487,14,129648,129651,14,129659,129660,14,129671,129679,14,129709,129711,14,129728,129730,14,129751,129753,14,129776,129782,14,917505,917505,4,917760,917999,5,10,10,3,127,159,4,768,879,5,1471,1471,5,1536,1541,1,1648,1648,5,1767,1768,5,1840,1866,5,2070,2073,5,2137,2139,5,2274,2274,1,2363,2363,7,2377,2380,7,2402,2403,5,2494,2494,5,2507,2508,7,2558,2558,5,2622,2624,7,2641,2641,5,2691,2691,7,2759,2760,5,2786,2787,5,2876,2876,5,2881,2884,5,2901,2902,5,3006,3006,5,3014,3016,7,3072,3072,5,3134,3136,5,3157,3158,5,3260,3260,5,3266,3266,5,3274,3275,7,3328,3329,5,3391,3392,7,3405,3405,5,3457,3457,5,3536,3537,7,3551,3551,5,3636,3642,5,3764,3772,5,3895,3895,5,3967,3967,7,3993,4028,5,4146,4151,5,4182,4183,7,4226,4226,5,4253,4253,5,4957,4959,5,5940,5940,7,6070,6070,7,6087,6088,7,6158,6158,4,6432,6434,5,6448,6449,7,6679,6680,5,6742,6742,5,6754,6754,5,6783,6783,5,6912,6915,5,6966,6970,5,6978,6978,5,7042,7042,7,7080,7081,5,7143,7143,7,7150,7150,7,7212,7219,5,7380,7392,5,7412,7412,5,8203,8203,4,8232,8232,4,8265,8265,14,8400,8412,5,8421,8432,5,8617,8618,14,9167,9167,14,9200,9200,14,9410,9410,14,9723,9726,14,9733,9733,14,9745,9745,14,9752,9752,14,9760,9760,14,9766,9766,14,9774,9774,14,9786,9786,14,9794,9794,14,9823,9823,14,9828,9828,14,9833,9850,14,9855,9855,14,9875,9875,14,9880,9880,14,9885,9887,14,9896,9897,14,9906,9916,14,9926,9927,14,9935,9935,14,9939,9939,14,9962,9962,14,9972,9972,14,9978,9978,14,9986,9986,14,9997,9997,14,10002,10002,14,10017,10017,14,10055,10055,14,10071,10071,14,10133,10135,14,10548,10549,14,11093,11093,14,12330,12333,5,12441,12442,5,42608,42610,5,43010,43010,5,43045,43046,5,43188,43203,7,43302,43309,5,43392,43394,5,43446,43449,5,43493,43493,5,43571,43572,7,43597,43597,7,43703,43704,5,43756,43757,5,44003,44004,7,44009,44010,7,44033,44059,12,44089,44115,12,44145,44171,12,44201,44227,12,44257,44283,12,44313,44339,12,44369,44395,12,44425,44451,12,44481,44507,12,44537,44563,12,44593,44619,12,44649,44675,12,44705,44731,12,44761,44787,12,44817,44843,12,44873,44899,12,44929,44955,12,44985,45011,12,45041,45067,12,45097,45123,12,45153,45179,12,45209,45235,12,45265,45291,12,45321,45347,12,45377,45403,12,45433,45459,12,45489,45515,12,45545,45571,12,45601,45627,12,45657,45683,12,45713,45739,12,45769,45795,12,45825,45851,12,45881,45907,12,45937,45963,12,45993,46019,12,46049,46075,12,46105,46131,12,46161,46187,12,46217,46243,12,46273,46299,12,46329,46355,12,46385,46411,12,46441,46467,12,46497,46523,12,46553,46579,12,46609,46635,12,46665,46691,12,46721,46747,12,46777,46803,12,46833,46859,12,46889,46915,12,46945,46971,12,47001,47027,12,47057,47083,12,47113,47139,12,47169,47195,12,47225,47251,12,47281,47307,12,47337,47363,12,47393,47419,12,47449,47475,12,47505,47531,12,47561,47587,12,47617,47643,12,47673,47699,12,47729,47755,12,47785,47811,12,47841,47867,12,47897,47923,12,47953,47979,12,48009,48035,12,48065,48091,12,48121,48147,12,48177,48203,12,48233,48259,12,48289,48315,12,48345,48371,12,48401,48427,12,48457,48483,12,48513,48539,12,48569,48595,12,48625,48651,12,48681,48707,12,48737,48763,12,48793,48819,12,48849,48875,12,48905,48931,12,48961,48987,12,49017,49043,12,49073,49099,12,49129,49155,12,49185,49211,12,49241,49267,12,49297,49323,12,49353,49379,12,49409,49435,12,49465,49491,12,49521,49547,12,49577,49603,12,49633,49659,12,49689,49715,12,49745,49771,12,49801,49827,12,49857,49883,12,49913,49939,12,49969,49995,12,50025,50051,12,50081,50107,12,50137,50163,12,50193,50219,12,50249,50275,12,50305,50331,12,50361,50387,12,50417,50443,12,50473,50499,12,50529,50555,12,50585,50611,12,50641,50667,12,50697,50723,12,50753,50779,12,50809,50835,12,50865,50891,12,50921,50947,12,50977,51003,12,51033,51059,12,51089,51115,12,51145,51171,12,51201,51227,12,51257,51283,12,51313,51339,12,51369,51395,12,51425,51451,12,51481,51507,12,51537,51563,12,51593,51619,12,51649,51675,12,51705,51731,12,51761,51787,12,51817,51843,12,51873,51899,12,51929,51955,12,51985,52011,12,52041,52067,12,52097,52123,12,52153,52179,12,52209,52235,12,52265,52291,12,52321,52347,12,52377,52403,12,52433,52459,12,52489,52515,12,52545,52571,12,52601,52627,12,52657,52683,12,52713,52739,12,52769,52795,12,52825,52851,12,52881,52907,12,52937,52963,12,52993,53019,12,53049,53075,12,53105,53131,12,53161,53187,12,53217,53243,12,53273,53299,12,53329,53355,12,53385,53411,12,53441,53467,12,53497,53523,12,53553,53579,12,53609,53635,12,53665,53691,12,53721,53747,12,53777,53803,12,53833,53859,12,53889,53915,12,53945,53971,12,54001,54027,12,54057,54083,12,54113,54139,12,54169,54195,12,54225,54251,12,54281,54307,12,54337,54363,12,54393,54419,12,54449,54475,12,54505,54531,12,54561,54587,12,54617,54643,12,54673,54699,12,54729,54755,12,54785,54811,12,54841,54867,12,54897,54923,12,54953,54979,12,55009,55035,12,55065,55091,12,55121,55147,12,55177,55203,12,65024,65039,5,65520,65528,4,66422,66426,5,68152,68154,5,69291,69292,5,69633,69633,5,69747,69748,5,69811,69814,5,69826,69826,5,69932,69932,7,70016,70017,5,70079,70080,7,70095,70095,5,70196,70196,5,70367,70367,5,70402,70403,7,70464,70464,5,70487,70487,5,70709,70711,7,70725,70725,7,70833,70834,7,70843,70844,7,70849,70849,7,71090,71093,5,71103,71104,5,71227,71228,7,71339,71339,5,71344,71349,5,71458,71461,5,71727,71735,5,71985,71989,7,71998,71998,5,72002,72002,7,72154,72155,5,72193,72202,5,72251,72254,5,72281,72283,5,72344,72345,5,72766,72766,7,72874,72880,5,72885,72886,5,73023,73029,5,73104,73105,5,73111,73111,5,92912,92916,5,94095,94098,5,113824,113827,4,119142,119142,7,119155,119162,4,119362,119364,5,121476,121476,5,122888,122904,5,123184,123190,5,125252,125258,5,127183,127183,14,127340,127343,14,127377,127386,14,127491,127503,14,127548,127551,14,127744,127756,14,127761,127761,14,127769,127769,14,127773,127774,14,127780,127788,14,127796,127797,14,127820,127823,14,127869,127869,14,127894,127895,14,127902,127903,14,127943,127943,14,127947,127950,14,127972,127972,14,127988,127988,14,127992,127994,14,128009,128011,14,128019,128019,14,128023,128041,14,128064,128064,14,128102,128107,14,128174,128181,14,128238,128238,14,128246,128247,14,128254,128254,14,128264,128264,14,128278,128299,14,128329,128330,14,128348,128359,14,128371,128377,14,128392,128393,14,128401,128404,14,128421,128421,14,128433,128434,14,128450,128452,14,128476,128478,14,128483,128483,14,128495,128495,14,128506,128506,14,128519,128520,14,128528,128528,14,128534,128534,14,128538,128538,14,128540,128542,14,128544,128549,14,128552,128555,14,128557,128557,14,128560,128563,14,128565,128565,14,128567,128576,14,128581,128591,14,128641,128642,14,128646,128646,14,128648,128648,14,128650,128651,14,128653,128653,14,128655,128655,14,128657,128659,14,128661,128661,14,128663,128663,14,128665,128666,14,128674,128674,14,128676,128677,14,128679,128685,14,128690,128690,14,128694,128694,14,128697,128702,14,128704,128704,14,128710,128714,14,128716,128716,14,128720,128720,14,128723,128724,14,128726,128727,14,128733,128735,14,128742,128744,14,128746,128746,14,128749,128751,14,128753,128754,14,128756,128758,14,128761,128761,14,128763,128764,14,128884,128895,14,128992,129003,14,129008,129008,14,129036,129039,14,129114,129119,14,129198,129279,14,129293,129295,14,129305,129310,14,129312,129319,14,129328,129328,14,129331,129338,14,129343,129343,14,129351,129355,14,129357,129359,14,129375,129387,14,129393,129393,14,129395,129398,14,129401,129401,14,129403,129403,14,129408,129412,14,129426,129431,14,129443,129444,14,129451,129453,14,129456,129465,14,129472,129472,14,129475,129482,14,129484,129484,14,129488,129510,14,129536,129647,14,129652,129652,14,129656,129658,14,129661,129663,14,129667,129670,14,129680,129685,14,129705,129708,14,129712,129718,14,129723,129727,14,129731,129733,14,129744,129750,14,129754,129759,14,129768,129775,14,129783,129791,14,917504,917504,4,917506,917535,4,917632,917759,4,918000,921599,4,0,9,4,11,12,4,14,31,4,169,169,14,174,174,14,1155,1159,5,1425,1469,5,1473,1474,5,1479,1479,5,1552,1562,5,1611,1631,5,1750,1756,5,1759,1764,5,1770,1773,5,1809,1809,5,1958,1968,5,2045,2045,5,2075,2083,5,2089,2093,5,2192,2193,1,2250,2273,5,2275,2306,5,2362,2362,5,2364,2364,5,2369,2376,5,2381,2381,5,2385,2391,5,2433,2433,5,2492,2492,5,2495,2496,7,2503,2504,7,2509,2509,5,2530,2531,5,2561,2562,5,2620,2620,5,2625,2626,5,2635,2637,5,2672,2673,5,2689,2690,5,2748,2748,5,2753,2757,5,2761,2761,7,2765,2765,5,2810,2815,5,2818,2819,7,2878,2878,5,2880,2880,7,2887,2888,7,2893,2893,5,2903,2903,5,2946,2946,5,3007,3007,7,3009,3010,7,3018,3020,7,3031,3031,5,3073,3075,7,3132,3132,5,3137,3140,7,3146,3149,5,3170,3171,5,3202,3203,7,3262,3262,7,3264,3265,7,3267,3268,7,3271,3272,7,3276,3277,5,3298,3299,5,3330,3331,7,3390,3390,5,3393,3396,5,3402,3404,7,3406,3406,1,3426,3427,5,3458,3459,7,3535,3535,5,3538,3540,5,3544,3550,7,3570,3571,7,3635,3635,7,3655,3662,5,3763,3763,7,3784,3789,5,3893,3893,5,3897,3897,5,3953,3966,5,3968,3972,5,3981,3991,5,4038,4038,5,4145,4145,7,4153,4154,5,4157,4158,5,4184,4185,5,4209,4212,5,4228,4228,7,4237,4237,5,4352,4447,8,4520,4607,10,5906,5908,5,5938,5939,5,5970,5971,5,6068,6069,5,6071,6077,5,6086,6086,5,6089,6099,5,6155,6157,5,6159,6159,5,6313,6313,5,6435,6438,7,6441,6443,7,6450,6450,5,6457,6459,5,6681,6682,7,6741,6741,7,6743,6743,7,6752,6752,5,6757,6764,5,6771,6780,5,6832,6845,5,6847,6862,5,6916,6916,7,6965,6965,5,6971,6971,7,6973,6977,7,6979,6980,7,7040,7041,5,7073,7073,7,7078,7079,7,7082,7082,7,7142,7142,5,7144,7145,5,7149,7149,5,7151,7153,5,7204,7211,7,7220,7221,7,7376,7378,5,7393,7393,7,7405,7405,5,7415,7415,7,7616,7679,5,8204,8204,5,8206,8207,4,8233,8233,4,8252,8252,14,8288,8292,4,8294,8303,4,8413,8416,5,8418,8420,5,8482,8482,14,8596,8601,14,8986,8987,14,9096,9096,14,9193,9196,14,9199,9199,14,9201,9202,14,9208,9210,14,9642,9643,14,9664,9664,14,9728,9729,14,9732,9732,14,9735,9741,14,9743,9744,14,9746,9746,14,9750,9751,14,9753,9756,14,9758,9759,14,9761,9761,14,9764,9765,14,9767,9769,14,9771,9773,14,9775,9775,14,9784,9785,14,9787,9791,14,9793,9793,14,9795,9799,14,9812,9822,14,9824,9824,14,9827,9827,14,9829,9830,14,9832,9832,14,9851,9851,14,9854,9854,14,9856,9861,14,9874,9874,14,9876,9876,14,9878,9879,14,9881,9881,14,9883,9884,14,9888,9889,14,9895,9895,14,9898,9899,14,9904,9905,14,9917,9918,14,9924,9925,14,9928,9928,14,9934,9934,14,9936,9936,14,9938,9938,14,9940,9940,14,9961,9961,14,9963,9967,14,9970,9971,14,9973,9973,14,9975,9977,14,9979,9980,14,9982,9985,14,9987,9988,14,9992,9996,14,9998,9998,14,10000,10001,14,10004,10004,14,10013,10013,14,10024,10024,14,10052,10052,14,10060,10060,14,10067,10069,14,10083,10083,14,10085,10087,14,10145,10145,14,10175,10175,14,11013,11015,14,11088,11088,14,11503,11505,5,11744,11775,5,12334,12335,5,12349,12349,14,12951,12951,14,42607,42607,5,42612,42621,5,42736,42737,5,43014,43014,5,43043,43044,7,43047,43047,7,43136,43137,7,43204,43205,5,43263,43263,5,43335,43345,5,43360,43388,8,43395,43395,7,43444,43445,7,43450,43451,7,43454,43456,7,43561,43566,5,43569,43570,5,43573,43574,5,43596,43596,5,43644,43644,5,43698,43700,5,43710,43711,5,43755,43755,7,43758,43759,7,43766,43766,5,44005,44005,5,44008,44008,5,44012,44012,7,44032,44032,11,44060,44060,11,44088,44088,11,44116,44116,11,44144,44144,11,44172,44172,11,44200,44200,11,44228,44228,11,44256,44256,11,44284,44284,11,44312,44312,11,44340,44340,11,44368,44368,11,44396,44396,11,44424,44424,11,44452,44452,11,44480,44480,11,44508,44508,11,44536,44536,11,44564,44564,11,44592,44592,11,44620,44620,11,44648,44648,11,44676,44676,11,44704,44704,11,44732,44732,11,44760,44760,11,44788,44788,11,44816,44816,11,44844,44844,11,44872,44872,11,44900,44900,11,44928,44928,11,44956,44956,11,44984,44984,11,45012,45012,11,45040,45040,11,45068,45068,11,45096,45096,11,45124,45124,11,45152,45152,11,45180,45180,11,45208,45208,11,45236,45236,11,45264,45264,11,45292,45292,11,45320,45320,11,45348,45348,11,45376,45376,11,45404,45404,11,45432,45432,11,45460,45460,11,45488,45488,11,45516,45516,11,45544,45544,11,45572,45572,11,45600,45600,11,45628,45628,11,45656,45656,11,45684,45684,11,45712,45712,11,45740,45740,11,45768,45768,11,45796,45796,11,45824,45824,11,45852,45852,11,45880,45880,11,45908,45908,11,45936,45936,11,45964,45964,11,45992,45992,11,46020,46020,11,46048,46048,11,46076,46076,11,46104,46104,11,46132,46132,11,46160,46160,11,46188,46188,11,46216,46216,11,46244,46244,11,46272,46272,11,46300,46300,11,46328,46328,11,46356,46356,11,46384,46384,11,46412,46412,11,46440,46440,11,46468,46468,11,46496,46496,11,46524,46524,11,46552,46552,11,46580,46580,11,46608,46608,11,46636,46636,11,46664,46664,11,46692,46692,11,46720,46720,11,46748,46748,11,46776,46776,11,46804,46804,11,46832,46832,11,46860,46860,11,46888,46888,11,46916,46916,11,46944,46944,11,46972,46972,11,47000,47000,11,47028,47028,11,47056,47056,11,47084,47084,11,47112,47112,11,47140,47140,11,47168,47168,11,47196,47196,11,47224,47224,11,47252,47252,11,47280,47280,11,47308,47308,11,47336,47336,11,47364,47364,11,47392,47392,11,47420,47420,11,47448,47448,11,47476,47476,11,47504,47504,11,47532,47532,11,47560,47560,11,47588,47588,11,47616,47616,11,47644,47644,11,47672,47672,11,47700,47700,11,47728,47728,11,47756,47756,11,47784,47784,11,47812,47812,11,47840,47840,11,47868,47868,11,47896,47896,11,47924,47924,11,47952,47952,11,47980,47980,11,48008,48008,11,48036,48036,11,48064,48064,11,48092,48092,11,48120,48120,11,48148,48148,11,48176,48176,11,48204,48204,11,48232,48232,11,48260,48260,11,48288,48288,11,48316,48316,11,48344,48344,11,48372,48372,11,48400,48400,11,48428,48428,11,48456,48456,11,48484,48484,11,48512,48512,11,48540,48540,11,48568,48568,11,48596,48596,11,48624,48624,11,48652,48652,11,48680,48680,11,48708,48708,11,48736,48736,11,48764,48764,11,48792,48792,11,48820,48820,11,48848,48848,11,48876,48876,11,48904,48904,11,48932,48932,11,48960,48960,11,48988,48988,11,49016,49016,11,49044,49044,11,49072,49072,11,49100,49100,11,49128,49128,11,49156,49156,11,49184,49184,11,49212,49212,11,49240,49240,11,49268,49268,11,49296,49296,11,49324,49324,11,49352,49352,11,49380,49380,11,49408,49408,11,49436,49436,11,49464,49464,11,49492,49492,11,49520,49520,11,49548,49548,11,49576,49576,11,49604,49604,11,49632,49632,11,49660,49660,11,49688,49688,11,49716,49716,11,49744,49744,11,49772,49772,11,49800,49800,11,49828,49828,11,49856,49856,11,49884,49884,11,49912,49912,11,49940,49940,11,49968,49968,11,49996,49996,11,50024,50024,11,50052,50052,11,50080,50080,11,50108,50108,11,50136,50136,11,50164,50164,11,50192,50192,11,50220,50220,11,50248,50248,11,50276,50276,11,50304,50304,11,50332,50332,11,50360,50360,11,50388,50388,11,50416,50416,11,50444,50444,11,50472,50472,11,50500,50500,11,50528,50528,11,50556,50556,11,50584,50584,11,50612,50612,11,50640,50640,11,50668,50668,11,50696,50696,11,50724,50724,11,50752,50752,11,50780,50780,11,50808,50808,11,50836,50836,11,50864,50864,11,50892,50892,11,50920,50920,11,50948,50948,11,50976,50976,11,51004,51004,11,51032,51032,11,51060,51060,11,51088,51088,11,51116,51116,11,51144,51144,11,51172,51172,11,51200,51200,11,51228,51228,11,51256,51256,11,51284,51284,11,51312,51312,11,51340,51340,11,51368,51368,11,51396,51396,11,51424,51424,11,51452,51452,11,51480,51480,11,51508,51508,11,51536,51536,11,51564,51564,11,51592,51592,11,51620,51620,11,51648,51648,11,51676,51676,11,51704,51704,11,51732,51732,11,51760,51760,11,51788,51788,11,51816,51816,11,51844,51844,11,51872,51872,11,51900,51900,11,51928,51928,11,51956,51956,11,51984,51984,11,52012,52012,11,52040,52040,11,52068,52068,11,52096,52096,11,52124,52124,11,52152,52152,11,52180,52180,11,52208,52208,11,52236,52236,11,52264,52264,11,52292,52292,11,52320,52320,11,52348,52348,11,52376,52376,11,52404,52404,11,52432,52432,11,52460,52460,11,52488,52488,11,52516,52516,11,52544,52544,11,52572,52572,11,52600,52600,11,52628,52628,11,52656,52656,11,52684,52684,11,52712,52712,11,52740,52740,11,52768,52768,11,52796,52796,11,52824,52824,11,52852,52852,11,52880,52880,11,52908,52908,11,52936,52936,11,52964,52964,11,52992,52992,11,53020,53020,11,53048,53048,11,53076,53076,11,53104,53104,11,53132,53132,11,53160,53160,11,53188,53188,11,53216,53216,11,53244,53244,11,53272,53272,11,53300,53300,11,53328,53328,11,53356,53356,11,53384,53384,11,53412,53412,11,53440,53440,11,53468,53468,11,53496,53496,11,53524,53524,11,53552,53552,11,53580,53580,11,53608,53608,11,53636,53636,11,53664,53664,11,53692,53692,11,53720,53720,11,53748,53748,11,53776,53776,11,53804,53804,11,53832,53832,11,53860,53860,11,53888,53888,11,53916,53916,11,53944,53944,11,53972,53972,11,54000,54000,11,54028,54028,11,54056,54056,11,54084,54084,11,54112,54112,11,54140,54140,11,54168,54168,11,54196,54196,11,54224,54224,11,54252,54252,11,54280,54280,11,54308,54308,11,54336,54336,11,54364,54364,11,54392,54392,11,54420,54420,11,54448,54448,11,54476,54476,11,54504,54504,11,54532,54532,11,54560,54560,11,54588,54588,11,54616,54616,11,54644,54644,11,54672,54672,11,54700,54700,11,54728,54728,11,54756,54756,11,54784,54784,11,54812,54812,11,54840,54840,11,54868,54868,11,54896,54896,11,54924,54924,11,54952,54952,11,54980,54980,11,55008,55008,11,55036,55036,11,55064,55064,11,55092,55092,11,55120,55120,11,55148,55148,11,55176,55176,11,55216,55238,9,64286,64286,5,65056,65071,5,65438,65439,5,65529,65531,4,66272,66272,5,68097,68099,5,68108,68111,5,68159,68159,5,68900,68903,5,69446,69456,5,69632,69632,7,69634,69634,7,69744,69744,5,69759,69761,5,69808,69810,7,69815,69816,7,69821,69821,1,69837,69837,1,69927,69931,5,69933,69940,5,70003,70003,5,70018,70018,7,70070,70078,5,70082,70083,1,70094,70094,7,70188,70190,7,70194,70195,7,70197,70197,7,70206,70206,5,70368,70370,7,70400,70401,5,70459,70460,5,70463,70463,7,70465,70468,7,70475,70477,7,70498,70499,7,70512,70516,5,70712,70719,5,70722,70724,5,70726,70726,5,70832,70832,5,70835,70840,5,70842,70842,5,70845,70845,5,70847,70848,5,70850,70851,5,71088,71089,7,71096,71099,7,71102,71102,7,71132,71133,5,71219,71226,5,71229,71229,5,71231,71232,5,71340,71340,7,71342,71343,7,71350,71350,7,71453,71455,5,71462,71462,7,71724,71726,7,71736,71736,7,71984,71984,5,71991,71992,7,71997,71997,7,71999,71999,1,72001,72001,1,72003,72003,5,72148,72151,5,72156,72159,7,72164,72164,7,72243,72248,5,72250,72250,1,72263,72263,5,72279,72280,7,72324,72329,1,72343,72343,7,72751,72751,7,72760,72765,5,72767,72767,5,72873,72873,7,72881,72881,7,72884,72884,7,73009,73014,5,73020,73021,5,73030,73030,1,73098,73102,7,73107,73108,7,73110,73110,7,73459,73460,5,78896,78904,4,92976,92982,5,94033,94087,7,94180,94180,5,113821,113822,5,118528,118573,5,119141,119141,5,119143,119145,5,119150,119154,5,119163,119170,5,119210,119213,5,121344,121398,5,121461,121461,5,121499,121503,5,122880,122886,5,122907,122913,5,122918,122922,5,123566,123566,5,125136,125142,5,126976,126979,14,126981,127182,14,127184,127231,14,127279,127279,14,127344,127345,14,127374,127374,14,127405,127461,14,127489,127490,14,127514,127514,14,127538,127546,14,127561,127567,14,127570,127743,14,127757,127758,14,127760,127760,14,127762,127762,14,127766,127768,14,127770,127770,14,127772,127772,14,127775,127776,14,127778,127779,14,127789,127791,14,127794,127795,14,127798,127798,14,127819,127819,14,127824,127824,14,127868,127868,14,127870,127871,14,127892,127893,14,127896,127896,14,127900,127901,14,127904,127940,14,127942,127942,14,127944,127944,14,127946,127946,14,127951,127955,14,127968,127971,14,127973,127984,14,127987,127987,14,127989,127989,14,127991,127991,14,127995,127999,5,128008,128008,14,128012,128014,14,128017,128018,14,128020,128020,14,128022,128022,14,128042,128042,14,128063,128063,14,128065,128065,14,128101,128101,14,128108,128109,14,128173,128173,14,128182,128183,14,128236,128237,14,128239,128239,14,128245,128245,14,128248,128248,14,128253,128253,14,128255,128258,14,128260,128263,14,128265,128265,14,128277,128277,14,128300,128301,14,128326,128328,14,128331,128334,14,128336,128347,14,128360,128366,14,128369,128370,14,128378,128378,14,128391,128391,14,128394,128397,14,128400,128400,14,128405,128406,14,128420,128420,14,128422,128423,14,128425,128432,14,128435,128443,14,128445,128449,14,128453,128464,14,128468,128475,14,128479,128480,14,128482,128482,14,128484,128487,14,128489,128494,14,128496,128498,14,128500,128505,14,128507,128511,14,128513,128518,14,128521,128525,14,128527,128527,14,128529,128529,14,128533,128533,14,128535,128535,14,128537,128537,14]'
				);
			}
			function ie(P, O) {
				if (P === 0) return 0;
				const W = fe(P, O);
				if (W !== void 0) return W;
				const $ = new T(O, P);
				return $.prevCodePoint(), $.offset;
			}
			n.getLeftDeleteOffset = ie;
			function fe(P, O) {
				const W = new T(O, P);
				let $ = W.prevCodePoint();
				for (; we($) || $ === 65039 || $ === 8419; ) {
					if (W.offset === 0) return;
					$ = W.prevCodePoint();
				}
				if (!Se($)) return;
				let ee = W.offset;
				return ee > 0 && W.prevCodePoint() === 8205 && (ee = W.offset), ee;
			}
			function we(P) {
				return 127995 <= P && P <= 127999;
			}
			n.noBreakWhitespace = '\xA0';
			class ce {
				static getInstance(O) {
					return ce.cache.get(Array.from(O));
				}
				static getLocales() {
					return ce._locales.value;
				}
				constructor(O) {
					this.confusableDictionary = O;
				}
				isAmbiguous(O) {
					return this.confusableDictionary.has(O);
				}
				getPrimaryConfusable(O) {
					return this.confusableDictionary.get(O);
				}
				getConfusableCodePoints() {
					return new Set(this.confusableDictionary.keys());
				}
			}
			(n.AmbiguousCharacters = ce),
				(i = ce),
				(ce.ambiguousCharacterData = new M.Lazy(() =>
					JSON.parse(
						'{"_common":[8232,32,8233,32,5760,32,8192,32,8193,32,8194,32,8195,32,8196,32,8197,32,8198,32,8200,32,8201,32,8202,32,8287,32,8199,32,8239,32,2042,95,65101,95,65102,95,65103,95,8208,45,8209,45,8210,45,65112,45,1748,45,8259,45,727,45,8722,45,10134,45,11450,45,1549,44,1643,44,8218,44,184,44,42233,44,894,59,2307,58,2691,58,1417,58,1795,58,1796,58,5868,58,65072,58,6147,58,6153,58,8282,58,1475,58,760,58,42889,58,8758,58,720,58,42237,58,451,33,11601,33,660,63,577,63,2429,63,5038,63,42731,63,119149,46,8228,46,1793,46,1794,46,42510,46,68176,46,1632,46,1776,46,42232,46,1373,96,65287,96,8219,96,8242,96,1370,96,1523,96,8175,96,65344,96,900,96,8189,96,8125,96,8127,96,8190,96,697,96,884,96,712,96,714,96,715,96,756,96,699,96,701,96,700,96,702,96,42892,96,1497,96,2036,96,2037,96,5194,96,5836,96,94033,96,94034,96,65339,91,10088,40,10098,40,12308,40,64830,40,65341,93,10089,41,10099,41,12309,41,64831,41,10100,123,119060,123,10101,125,65342,94,8270,42,1645,42,8727,42,66335,42,5941,47,8257,47,8725,47,8260,47,9585,47,10187,47,10744,47,119354,47,12755,47,12339,47,11462,47,20031,47,12035,47,65340,92,65128,92,8726,92,10189,92,10741,92,10745,92,119311,92,119355,92,12756,92,20022,92,12034,92,42872,38,708,94,710,94,5869,43,10133,43,66203,43,8249,60,10094,60,706,60,119350,60,5176,60,5810,60,5120,61,11840,61,12448,61,42239,61,8250,62,10095,62,707,62,119351,62,5171,62,94015,62,8275,126,732,126,8128,126,8764,126,65372,124,65293,45,120784,50,120794,50,120804,50,120814,50,120824,50,130034,50,42842,50,423,50,1000,50,42564,50,5311,50,42735,50,119302,51,120785,51,120795,51,120805,51,120815,51,120825,51,130035,51,42923,51,540,51,439,51,42858,51,11468,51,1248,51,94011,51,71882,51,120786,52,120796,52,120806,52,120816,52,120826,52,130036,52,5070,52,71855,52,120787,53,120797,53,120807,53,120817,53,120827,53,130037,53,444,53,71867,53,120788,54,120798,54,120808,54,120818,54,120828,54,130038,54,11474,54,5102,54,71893,54,119314,55,120789,55,120799,55,120809,55,120819,55,120829,55,130039,55,66770,55,71878,55,2819,56,2538,56,2666,56,125131,56,120790,56,120800,56,120810,56,120820,56,120830,56,130040,56,547,56,546,56,66330,56,2663,57,2920,57,2541,57,3437,57,120791,57,120801,57,120811,57,120821,57,120831,57,130041,57,42862,57,11466,57,71884,57,71852,57,71894,57,9082,97,65345,97,119834,97,119886,97,119938,97,119990,97,120042,97,120094,97,120146,97,120198,97,120250,97,120302,97,120354,97,120406,97,120458,97,593,97,945,97,120514,97,120572,97,120630,97,120688,97,120746,97,65313,65,119808,65,119860,65,119912,65,119964,65,120016,65,120068,65,120120,65,120172,65,120224,65,120276,65,120328,65,120380,65,120432,65,913,65,120488,65,120546,65,120604,65,120662,65,120720,65,5034,65,5573,65,42222,65,94016,65,66208,65,119835,98,119887,98,119939,98,119991,98,120043,98,120095,98,120147,98,120199,98,120251,98,120303,98,120355,98,120407,98,120459,98,388,98,5071,98,5234,98,5551,98,65314,66,8492,66,119809,66,119861,66,119913,66,120017,66,120069,66,120121,66,120173,66,120225,66,120277,66,120329,66,120381,66,120433,66,42932,66,914,66,120489,66,120547,66,120605,66,120663,66,120721,66,5108,66,5623,66,42192,66,66178,66,66209,66,66305,66,65347,99,8573,99,119836,99,119888,99,119940,99,119992,99,120044,99,120096,99,120148,99,120200,99,120252,99,120304,99,120356,99,120408,99,120460,99,7428,99,1010,99,11429,99,43951,99,66621,99,128844,67,71922,67,71913,67,65315,67,8557,67,8450,67,8493,67,119810,67,119862,67,119914,67,119966,67,120018,67,120174,67,120226,67,120278,67,120330,67,120382,67,120434,67,1017,67,11428,67,5087,67,42202,67,66210,67,66306,67,66581,67,66844,67,8574,100,8518,100,119837,100,119889,100,119941,100,119993,100,120045,100,120097,100,120149,100,120201,100,120253,100,120305,100,120357,100,120409,100,120461,100,1281,100,5095,100,5231,100,42194,100,8558,68,8517,68,119811,68,119863,68,119915,68,119967,68,120019,68,120071,68,120123,68,120175,68,120227,68,120279,68,120331,68,120383,68,120435,68,5024,68,5598,68,5610,68,42195,68,8494,101,65349,101,8495,101,8519,101,119838,101,119890,101,119942,101,120046,101,120098,101,120150,101,120202,101,120254,101,120306,101,120358,101,120410,101,120462,101,43826,101,1213,101,8959,69,65317,69,8496,69,119812,69,119864,69,119916,69,120020,69,120072,69,120124,69,120176,69,120228,69,120280,69,120332,69,120384,69,120436,69,917,69,120492,69,120550,69,120608,69,120666,69,120724,69,11577,69,5036,69,42224,69,71846,69,71854,69,66182,69,119839,102,119891,102,119943,102,119995,102,120047,102,120099,102,120151,102,120203,102,120255,102,120307,102,120359,102,120411,102,120463,102,43829,102,42905,102,383,102,7837,102,1412,102,119315,70,8497,70,119813,70,119865,70,119917,70,120021,70,120073,70,120125,70,120177,70,120229,70,120281,70,120333,70,120385,70,120437,70,42904,70,988,70,120778,70,5556,70,42205,70,71874,70,71842,70,66183,70,66213,70,66853,70,65351,103,8458,103,119840,103,119892,103,119944,103,120048,103,120100,103,120152,103,120204,103,120256,103,120308,103,120360,103,120412,103,120464,103,609,103,7555,103,397,103,1409,103,119814,71,119866,71,119918,71,119970,71,120022,71,120074,71,120126,71,120178,71,120230,71,120282,71,120334,71,120386,71,120438,71,1292,71,5056,71,5107,71,42198,71,65352,104,8462,104,119841,104,119945,104,119997,104,120049,104,120101,104,120153,104,120205,104,120257,104,120309,104,120361,104,120413,104,120465,104,1211,104,1392,104,5058,104,65320,72,8459,72,8460,72,8461,72,119815,72,119867,72,119919,72,120023,72,120179,72,120231,72,120283,72,120335,72,120387,72,120439,72,919,72,120494,72,120552,72,120610,72,120668,72,120726,72,11406,72,5051,72,5500,72,42215,72,66255,72,731,105,9075,105,65353,105,8560,105,8505,105,8520,105,119842,105,119894,105,119946,105,119998,105,120050,105,120102,105,120154,105,120206,105,120258,105,120310,105,120362,105,120414,105,120466,105,120484,105,618,105,617,105,953,105,8126,105,890,105,120522,105,120580,105,120638,105,120696,105,120754,105,1110,105,42567,105,1231,105,43893,105,5029,105,71875,105,65354,106,8521,106,119843,106,119895,106,119947,106,119999,106,120051,106,120103,106,120155,106,120207,106,120259,106,120311,106,120363,106,120415,106,120467,106,1011,106,1112,106,65322,74,119817,74,119869,74,119921,74,119973,74,120025,74,120077,74,120129,74,120181,74,120233,74,120285,74,120337,74,120389,74,120441,74,42930,74,895,74,1032,74,5035,74,5261,74,42201,74,119844,107,119896,107,119948,107,120000,107,120052,107,120104,107,120156,107,120208,107,120260,107,120312,107,120364,107,120416,107,120468,107,8490,75,65323,75,119818,75,119870,75,119922,75,119974,75,120026,75,120078,75,120130,75,120182,75,120234,75,120286,75,120338,75,120390,75,120442,75,922,75,120497,75,120555,75,120613,75,120671,75,120729,75,11412,75,5094,75,5845,75,42199,75,66840,75,1472,108,8739,73,9213,73,65512,73,1633,108,1777,73,66336,108,125127,108,120783,73,120793,73,120803,73,120813,73,120823,73,130033,73,65321,73,8544,73,8464,73,8465,73,119816,73,119868,73,119920,73,120024,73,120128,73,120180,73,120232,73,120284,73,120336,73,120388,73,120440,73,65356,108,8572,73,8467,108,119845,108,119897,108,119949,108,120001,108,120053,108,120105,73,120157,73,120209,73,120261,73,120313,73,120365,73,120417,73,120469,73,448,73,120496,73,120554,73,120612,73,120670,73,120728,73,11410,73,1030,73,1216,73,1493,108,1503,108,1575,108,126464,108,126592,108,65166,108,65165,108,1994,108,11599,73,5825,73,42226,73,93992,73,66186,124,66313,124,119338,76,8556,76,8466,76,119819,76,119871,76,119923,76,120027,76,120079,76,120131,76,120183,76,120235,76,120287,76,120339,76,120391,76,120443,76,11472,76,5086,76,5290,76,42209,76,93974,76,71843,76,71858,76,66587,76,66854,76,65325,77,8559,77,8499,77,119820,77,119872,77,119924,77,120028,77,120080,77,120132,77,120184,77,120236,77,120288,77,120340,77,120392,77,120444,77,924,77,120499,77,120557,77,120615,77,120673,77,120731,77,1018,77,11416,77,5047,77,5616,77,5846,77,42207,77,66224,77,66321,77,119847,110,119899,110,119951,110,120003,110,120055,110,120107,110,120159,110,120211,110,120263,110,120315,110,120367,110,120419,110,120471,110,1400,110,1404,110,65326,78,8469,78,119821,78,119873,78,119925,78,119977,78,120029,78,120081,78,120185,78,120237,78,120289,78,120341,78,120393,78,120445,78,925,78,120500,78,120558,78,120616,78,120674,78,120732,78,11418,78,42208,78,66835,78,3074,111,3202,111,3330,111,3458,111,2406,111,2662,111,2790,111,3046,111,3174,111,3302,111,3430,111,3664,111,3792,111,4160,111,1637,111,1781,111,65359,111,8500,111,119848,111,119900,111,119952,111,120056,111,120108,111,120160,111,120212,111,120264,111,120316,111,120368,111,120420,111,120472,111,7439,111,7441,111,43837,111,959,111,120528,111,120586,111,120644,111,120702,111,120760,111,963,111,120532,111,120590,111,120648,111,120706,111,120764,111,11423,111,4351,111,1413,111,1505,111,1607,111,126500,111,126564,111,126596,111,65259,111,65260,111,65258,111,65257,111,1726,111,64428,111,64429,111,64427,111,64426,111,1729,111,64424,111,64425,111,64423,111,64422,111,1749,111,3360,111,4125,111,66794,111,71880,111,71895,111,66604,111,1984,79,2534,79,2918,79,12295,79,70864,79,71904,79,120782,79,120792,79,120802,79,120812,79,120822,79,130032,79,65327,79,119822,79,119874,79,119926,79,119978,79,120030,79,120082,79,120134,79,120186,79,120238,79,120290,79,120342,79,120394,79,120446,79,927,79,120502,79,120560,79,120618,79,120676,79,120734,79,11422,79,1365,79,11604,79,4816,79,2848,79,66754,79,42227,79,71861,79,66194,79,66219,79,66564,79,66838,79,9076,112,65360,112,119849,112,119901,112,119953,112,120005,112,120057,112,120109,112,120161,112,120213,112,120265,112,120317,112,120369,112,120421,112,120473,112,961,112,120530,112,120544,112,120588,112,120602,112,120646,112,120660,112,120704,112,120718,112,120762,112,120776,112,11427,112,65328,80,8473,80,119823,80,119875,80,119927,80,119979,80,120031,80,120083,80,120187,80,120239,80,120291,80,120343,80,120395,80,120447,80,929,80,120504,80,120562,80,120620,80,120678,80,120736,80,11426,80,5090,80,5229,80,42193,80,66197,80,119850,113,119902,113,119954,113,120006,113,120058,113,120110,113,120162,113,120214,113,120266,113,120318,113,120370,113,120422,113,120474,113,1307,113,1379,113,1382,113,8474,81,119824,81,119876,81,119928,81,119980,81,120032,81,120084,81,120188,81,120240,81,120292,81,120344,81,120396,81,120448,81,11605,81,119851,114,119903,114,119955,114,120007,114,120059,114,120111,114,120163,114,120215,114,120267,114,120319,114,120371,114,120423,114,120475,114,43847,114,43848,114,7462,114,11397,114,43905,114,119318,82,8475,82,8476,82,8477,82,119825,82,119877,82,119929,82,120033,82,120189,82,120241,82,120293,82,120345,82,120397,82,120449,82,422,82,5025,82,5074,82,66740,82,5511,82,42211,82,94005,82,65363,115,119852,115,119904,115,119956,115,120008,115,120060,115,120112,115,120164,115,120216,115,120268,115,120320,115,120372,115,120424,115,120476,115,42801,115,445,115,1109,115,43946,115,71873,115,66632,115,65331,83,119826,83,119878,83,119930,83,119982,83,120034,83,120086,83,120138,83,120190,83,120242,83,120294,83,120346,83,120398,83,120450,83,1029,83,1359,83,5077,83,5082,83,42210,83,94010,83,66198,83,66592,83,119853,116,119905,116,119957,116,120009,116,120061,116,120113,116,120165,116,120217,116,120269,116,120321,116,120373,116,120425,116,120477,116,8868,84,10201,84,128872,84,65332,84,119827,84,119879,84,119931,84,119983,84,120035,84,120087,84,120139,84,120191,84,120243,84,120295,84,120347,84,120399,84,120451,84,932,84,120507,84,120565,84,120623,84,120681,84,120739,84,11430,84,5026,84,42196,84,93962,84,71868,84,66199,84,66225,84,66325,84,119854,117,119906,117,119958,117,120010,117,120062,117,120114,117,120166,117,120218,117,120270,117,120322,117,120374,117,120426,117,120478,117,42911,117,7452,117,43854,117,43858,117,651,117,965,117,120534,117,120592,117,120650,117,120708,117,120766,117,1405,117,66806,117,71896,117,8746,85,8899,85,119828,85,119880,85,119932,85,119984,85,120036,85,120088,85,120140,85,120192,85,120244,85,120296,85,120348,85,120400,85,120452,85,1357,85,4608,85,66766,85,5196,85,42228,85,94018,85,71864,85,8744,118,8897,118,65366,118,8564,118,119855,118,119907,118,119959,118,120011,118,120063,118,120115,118,120167,118,120219,118,120271,118,120323,118,120375,118,120427,118,120479,118,7456,118,957,118,120526,118,120584,118,120642,118,120700,118,120758,118,1141,118,1496,118,71430,118,43945,118,71872,118,119309,86,1639,86,1783,86,8548,86,119829,86,119881,86,119933,86,119985,86,120037,86,120089,86,120141,86,120193,86,120245,86,120297,86,120349,86,120401,86,120453,86,1140,86,11576,86,5081,86,5167,86,42719,86,42214,86,93960,86,71840,86,66845,86,623,119,119856,119,119908,119,119960,119,120012,119,120064,119,120116,119,120168,119,120220,119,120272,119,120324,119,120376,119,120428,119,120480,119,7457,119,1121,119,1309,119,1377,119,71434,119,71438,119,71439,119,43907,119,71919,87,71910,87,119830,87,119882,87,119934,87,119986,87,120038,87,120090,87,120142,87,120194,87,120246,87,120298,87,120350,87,120402,87,120454,87,1308,87,5043,87,5076,87,42218,87,5742,120,10539,120,10540,120,10799,120,65368,120,8569,120,119857,120,119909,120,119961,120,120013,120,120065,120,120117,120,120169,120,120221,120,120273,120,120325,120,120377,120,120429,120,120481,120,5441,120,5501,120,5741,88,9587,88,66338,88,71916,88,65336,88,8553,88,119831,88,119883,88,119935,88,119987,88,120039,88,120091,88,120143,88,120195,88,120247,88,120299,88,120351,88,120403,88,120455,88,42931,88,935,88,120510,88,120568,88,120626,88,120684,88,120742,88,11436,88,11613,88,5815,88,42219,88,66192,88,66228,88,66327,88,66855,88,611,121,7564,121,65369,121,119858,121,119910,121,119962,121,120014,121,120066,121,120118,121,120170,121,120222,121,120274,121,120326,121,120378,121,120430,121,120482,121,655,121,7935,121,43866,121,947,121,8509,121,120516,121,120574,121,120632,121,120690,121,120748,121,1199,121,4327,121,71900,121,65337,89,119832,89,119884,89,119936,89,119988,89,120040,89,120092,89,120144,89,120196,89,120248,89,120300,89,120352,89,120404,89,120456,89,933,89,978,89,120508,89,120566,89,120624,89,120682,89,120740,89,11432,89,1198,89,5033,89,5053,89,42220,89,94019,89,71844,89,66226,89,119859,122,119911,122,119963,122,120015,122,120067,122,120119,122,120171,122,120223,122,120275,122,120327,122,120379,122,120431,122,120483,122,7458,122,43923,122,71876,122,66293,90,71909,90,65338,90,8484,90,8488,90,119833,90,119885,90,119937,90,119989,90,120041,90,120197,90,120249,90,120301,90,120353,90,120405,90,120457,90,918,90,120493,90,120551,90,120609,90,120667,90,120725,90,5059,90,42204,90,71849,90,65282,34,65284,36,65285,37,65286,38,65290,42,65291,43,65294,46,65295,47,65296,48,65297,49,65298,50,65299,51,65300,52,65301,53,65302,54,65303,55,65304,56,65305,57,65308,60,65309,61,65310,62,65312,64,65316,68,65318,70,65319,71,65324,76,65329,81,65330,82,65333,85,65334,86,65335,87,65343,95,65346,98,65348,100,65350,102,65355,107,65357,109,65358,110,65361,113,65362,114,65364,116,65365,117,65367,119,65370,122,65371,123,65373,125,119846,109],"_default":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"cs":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"de":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"es":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"fr":[65374,126,65306,58,65281,33,8216,96,8245,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"it":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ja":[8211,45,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65292,44,65307,59],"ko":[8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pl":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"pt-BR":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"qps-ploc":[160,32,8211,45,65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"ru":[65374,126,65306,58,65281,33,8216,96,8217,96,8245,96,180,96,12494,47,305,105,921,73,1009,112,215,120,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"tr":[160,32,8211,45,65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65288,40,65289,41,65292,44,65307,59,65311,63],"zh-hans":[65374,126,65306,58,65281,33,8245,96,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65288,40,65289,41],"zh-hant":[8211,45,65374,126,180,96,12494,47,1047,51,1073,54,1072,97,1040,65,1068,98,1042,66,1089,99,1057,67,1077,101,1045,69,1053,72,305,105,1050,75,921,73,1052,77,1086,111,1054,79,1009,112,1088,112,1056,80,1075,114,1058,84,215,120,1093,120,1061,88,1091,121,1059,89,65283,35,65307,59]}'
					)
				)),
				(ce.cache = new R.LRUCachedFunction((P) => {
					function O(le) {
						const _e = new Map();
						for (let Ce = 0; Ce < le.length; Ce += 2) _e.set(le[Ce], le[Ce + 1]);
						return _e;
					}
					function W(le, _e) {
						const Ce = new Map(le);
						for (const [Ae, Ne] of _e) Ce.set(Ae, Ne);
						return Ce;
					}
					function $(le, _e) {
						if (!le) return _e;
						const Ce = new Map();
						for (const [Ae, Ne] of le) _e.has(Ae) && Ce.set(Ae, Ne);
						return Ce;
					}
					const ee = i.ambiguousCharacterData.value;
					let ae = P.filter((le) => !le.startsWith('_') && le in ee);
					ae.length === 0 && (ae = ['_default']);
					let de;
					for (const le of ae) {
						const _e = O(ee[le]);
						de = $(de, _e);
					}
					const ye = O(ee._common),
						pe = W(ye, de);
					return new ce(pe);
				})),
				(ce._locales = new M.Lazy(() =>
					Object.keys(ce.ambiguousCharacterData.value).filter((P) => !P.startsWith('_'))
				));
			class ve {
				static getRawData() {
					return JSON.parse(
						'[9,10,11,12,13,32,127,160,173,847,1564,4447,4448,6068,6069,6155,6156,6157,6158,7355,7356,8192,8193,8194,8195,8196,8197,8198,8199,8200,8201,8202,8203,8204,8205,8206,8207,8234,8235,8236,8237,8238,8239,8287,8288,8289,8290,8291,8292,8293,8294,8295,8296,8297,8298,8299,8300,8301,8302,8303,10240,12288,12644,65024,65025,65026,65027,65028,65029,65030,65031,65032,65033,65034,65035,65036,65037,65038,65039,65279,65440,65520,65521,65522,65523,65524,65525,65526,65527,65528,65532,78844,119155,119156,119157,119158,119159,119160,119161,119162,917504,917505,917506,917507,917508,917509,917510,917511,917512,917513,917514,917515,917516,917517,917518,917519,917520,917521,917522,917523,917524,917525,917526,917527,917528,917529,917530,917531,917532,917533,917534,917535,917536,917537,917538,917539,917540,917541,917542,917543,917544,917545,917546,917547,917548,917549,917550,917551,917552,917553,917554,917555,917556,917557,917558,917559,917560,917561,917562,917563,917564,917565,917566,917567,917568,917569,917570,917571,917572,917573,917574,917575,917576,917577,917578,917579,917580,917581,917582,917583,917584,917585,917586,917587,917588,917589,917590,917591,917592,917593,917594,917595,917596,917597,917598,917599,917600,917601,917602,917603,917604,917605,917606,917607,917608,917609,917610,917611,917612,917613,917614,917615,917616,917617,917618,917619,917620,917621,917622,917623,917624,917625,917626,917627,917628,917629,917630,917631,917760,917761,917762,917763,917764,917765,917766,917767,917768,917769,917770,917771,917772,917773,917774,917775,917776,917777,917778,917779,917780,917781,917782,917783,917784,917785,917786,917787,917788,917789,917790,917791,917792,917793,917794,917795,917796,917797,917798,917799,917800,917801,917802,917803,917804,917805,917806,917807,917808,917809,917810,917811,917812,917813,917814,917815,917816,917817,917818,917819,917820,917821,917822,917823,917824,917825,917826,917827,917828,917829,917830,917831,917832,917833,917834,917835,917836,917837,917838,917839,917840,917841,917842,917843,917844,917845,917846,917847,917848,917849,917850,917851,917852,917853,917854,917855,917856,917857,917858,917859,917860,917861,917862,917863,917864,917865,917866,917867,917868,917869,917870,917871,917872,917873,917874,917875,917876,917877,917878,917879,917880,917881,917882,917883,917884,917885,917886,917887,917888,917889,917890,917891,917892,917893,917894,917895,917896,917897,917898,917899,917900,917901,917902,917903,917904,917905,917906,917907,917908,917909,917910,917911,917912,917913,917914,917915,917916,917917,917918,917919,917920,917921,917922,917923,917924,917925,917926,917927,917928,917929,917930,917931,917932,917933,917934,917935,917936,917937,917938,917939,917940,917941,917942,917943,917944,917945,917946,917947,917948,917949,917950,917951,917952,917953,917954,917955,917956,917957,917958,917959,917960,917961,917962,917963,917964,917965,917966,917967,917968,917969,917970,917971,917972,917973,917974,917975,917976,917977,917978,917979,917980,917981,917982,917983,917984,917985,917986,917987,917988,917989,917990,917991,917992,917993,917994,917995,917996,917997,917998,917999]'
					);
				}
				static getData() {
					return this._data || (this._data = new Set(ve.getRawData())), this._data;
				}
				static isInvisibleCharacter(O) {
					return ve.getData().has(O);
				}
				static get codePoints() {
					return ve.getData();
				}
			}
			(n.InvisibleCharacters = ve), (ve._data = void 0);
		}),
		Y(X[32], J([0, 1, 5]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.StringSHA1 = n.toHexString = n.stringHash = n.numberHash = n.doHash = n.hash = void 0);
			function M(m) {
				return i(m, 0);
			}
			n.hash = M;
			function i(m, v) {
				switch (typeof m) {
					case 'object':
						return m === null ? a(349, v) : Array.isArray(m) ? o(m, v) : s(m, v);
					case 'string':
						return S(m, v);
					case 'boolean':
						return C(m, v);
					case 'number':
						return a(m, v);
					case 'undefined':
						return a(937, v);
					default:
						return a(617, v);
				}
			}
			n.doHash = i;
			function a(m, v) {
				return ((v << 5) - v + m) | 0;
			}
			n.numberHash = a;
			function C(m, v) {
				return a(m ? 433 : 863, v);
			}
			function S(m, v) {
				v = a(149417, v);
				for (let E = 0, L = m.length; E < L; E++) v = a(m.charCodeAt(E), v);
				return v;
			}
			n.stringHash = S;
			function o(m, v) {
				return (v = a(104579, v)), m.reduce((E, L) => i(L, E), v);
			}
			function s(m, v) {
				return (
					(v = a(181387, v)),
					Object.keys(m)
						.sort()
						.reduce((E, L) => ((E = S(L, E)), i(m[L], E)), v)
				);
			}
			function p(m, v, E = 32) {
				const L = E - v,
					A = ~((1 << L) - 1);
				return ((m << v) | ((A & m) >>> L)) >>> 0;
			}
			function e(m, v = 0, E = m.byteLength, L = 0) {
				for (let A = 0; A < E; A++) m[v + A] = L;
			}
			function d(m, v, E = '0') {
				for (; m.length < v; ) m = E + m;
				return m;
			}
			function g(m, v = 32) {
				return m instanceof ArrayBuffer
					? Array.from(new Uint8Array(m))
							.map((E) => E.toString(16).padStart(2, '0'))
							.join('')
					: d((m >>> 0).toString(16), v / 4);
			}
			n.toHexString = g;
			class b {
				constructor() {
					(this._h0 = 1732584193),
						(this._h1 = 4023233417),
						(this._h2 = 2562383102),
						(this._h3 = 271733878),
						(this._h4 = 3285377520),
						(this._buff = new Uint8Array(64 + 3)),
						(this._buffDV = new DataView(this._buff.buffer)),
						(this._buffLen = 0),
						(this._totalLen = 0),
						(this._leftoverHighSurrogate = 0),
						(this._finished = !1);
				}
				update(v) {
					const E = v.length;
					if (E === 0) return;
					const L = this._buff;
					let A = this._buffLen,
						w = this._leftoverHighSurrogate,
						c,
						r;
					for (w !== 0 ? ((c = w), (r = -1), (w = 0)) : ((c = v.charCodeAt(0)), (r = 0)); ; ) {
						let u = c;
						if (R.isHighSurrogate(c))
							if (r + 1 < E) {
								const h = v.charCodeAt(r + 1);
								R.isLowSurrogate(h) ? (r++, (u = R.computeCodePoint(c, h))) : (u = 65533);
							} else {
								w = c;
								break;
							}
						else R.isLowSurrogate(c) && (u = 65533);
						if (((A = this._push(L, A, u)), r++, r < E)) c = v.charCodeAt(r);
						else break;
					}
					(this._buffLen = A), (this._leftoverHighSurrogate = w);
				}
				_push(v, E, L) {
					return (
						L < 128
							? (v[E++] = L)
							: L < 2048
							? ((v[E++] = 192 | ((L & 1984) >>> 6)), (v[E++] = 128 | ((L & 63) >>> 0)))
							: L < 65536
							? ((v[E++] = 224 | ((L & 61440) >>> 12)),
							  (v[E++] = 128 | ((L & 4032) >>> 6)),
							  (v[E++] = 128 | ((L & 63) >>> 0)))
							: ((v[E++] = 240 | ((L & 1835008) >>> 18)),
							  (v[E++] = 128 | ((L & 258048) >>> 12)),
							  (v[E++] = 128 | ((L & 4032) >>> 6)),
							  (v[E++] = 128 | ((L & 63) >>> 0))),
						E >= 64 &&
							(this._step(),
							(E -= 64),
							(this._totalLen += 64),
							(v[0] = v[64 + 0]),
							(v[1] = v[64 + 1]),
							(v[2] = v[64 + 2])),
						E
					);
				}
				digest() {
					return (
						this._finished ||
							((this._finished = !0),
							this._leftoverHighSurrogate &&
								((this._leftoverHighSurrogate = 0),
								(this._buffLen = this._push(this._buff, this._buffLen, 65533))),
							(this._totalLen += this._buffLen),
							this._wrapUp()),
						g(this._h0) + g(this._h1) + g(this._h2) + g(this._h3) + g(this._h4)
					);
				}
				_wrapUp() {
					(this._buff[this._buffLen++] = 128),
						e(this._buff, this._buffLen),
						this._buffLen > 56 && (this._step(), e(this._buff));
					const v = 8 * this._totalLen;
					this._buffDV.setUint32(56, Math.floor(v / 4294967296), !1),
						this._buffDV.setUint32(60, v % 4294967296, !1),
						this._step();
				}
				_step() {
					const v = b._bigBlock32,
						E = this._buffDV;
					for (let l = 0; l < 64; l += 4) v.setUint32(l, E.getUint32(l, !1), !1);
					for (let l = 64; l < 320; l += 4)
						v.setUint32(
							l,
							p(
								v.getUint32(l - 12, !1) ^
									v.getUint32(l - 32, !1) ^
									v.getUint32(l - 56, !1) ^
									v.getUint32(l - 64, !1),
								1
							),
							!1
						);
					let L = this._h0,
						A = this._h1,
						w = this._h2,
						c = this._h3,
						r = this._h4,
						u,
						h,
						f;
					for (let l = 0; l < 80; l++)
						l < 20
							? ((u = (A & w) | (~A & c)), (h = 1518500249))
							: l < 40
							? ((u = A ^ w ^ c), (h = 1859775393))
							: l < 60
							? ((u = (A & w) | (A & c) | (w & c)), (h = 2400959708))
							: ((u = A ^ w ^ c), (h = 3395469782)),
							(f = (p(L, 5) + u + r + h + v.getUint32(l * 4, !1)) & 4294967295),
							(r = c),
							(c = w),
							(w = p(A, 30)),
							(A = L),
							(L = f);
					(this._h0 = (this._h0 + L) & 4294967295),
						(this._h1 = (this._h1 + A) & 4294967295),
						(this._h2 = (this._h2 + w) & 4294967295),
						(this._h3 = (this._h3 + c) & 4294967295),
						(this._h4 = (this._h4 + r) & 4294967295);
				}
			}
			(n.StringSHA1 = b), (b._bigBlock32 = new DataView(new ArrayBuffer(320)));
		}),
		Y(X[17], J([0, 1, 29, 32]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.LcsDiff = n.stringDiff = n.StringDiffSequence = void 0);
			class i {
				constructor(e) {
					this.source = e;
				}
				getElements() {
					const e = this.source,
						d = new Int32Array(e.length);
					for (let g = 0, b = e.length; g < b; g++) d[g] = e.charCodeAt(g);
					return d;
				}
			}
			n.StringDiffSequence = i;
			function a(p, e, d) {
				return new s(new i(p), new i(e)).ComputeDiff(d).changes;
			}
			n.stringDiff = a;
			class C {
				static Assert(e, d) {
					if (!e) throw new Error(d);
				}
			}
			class S {
				static Copy(e, d, g, b, m) {
					for (let v = 0; v < m; v++) g[b + v] = e[d + v];
				}
				static Copy2(e, d, g, b, m) {
					for (let v = 0; v < m; v++) g[b + v] = e[d + v];
				}
			}
			class o {
				constructor() {
					(this.m_changes = []),
						(this.m_originalStart = 1073741824),
						(this.m_modifiedStart = 1073741824),
						(this.m_originalCount = 0),
						(this.m_modifiedCount = 0);
				}
				MarkNextChange() {
					(this.m_originalCount > 0 || this.m_modifiedCount > 0) &&
						this.m_changes.push(
							new R.DiffChange(
								this.m_originalStart,
								this.m_originalCount,
								this.m_modifiedStart,
								this.m_modifiedCount
							)
						),
						(this.m_originalCount = 0),
						(this.m_modifiedCount = 0),
						(this.m_originalStart = 1073741824),
						(this.m_modifiedStart = 1073741824);
				}
				AddOriginalElement(e, d) {
					(this.m_originalStart = Math.min(this.m_originalStart, e)),
						(this.m_modifiedStart = Math.min(this.m_modifiedStart, d)),
						this.m_originalCount++;
				}
				AddModifiedElement(e, d) {
					(this.m_originalStart = Math.min(this.m_originalStart, e)),
						(this.m_modifiedStart = Math.min(this.m_modifiedStart, d)),
						this.m_modifiedCount++;
				}
				getChanges() {
					return (
						(this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(),
						this.m_changes
					);
				}
				getReverseChanges() {
					return (
						(this.m_originalCount > 0 || this.m_modifiedCount > 0) && this.MarkNextChange(),
						this.m_changes.reverse(),
						this.m_changes
					);
				}
			}
			class s {
				constructor(e, d, g = null) {
					(this.ContinueProcessingPredicate = g),
						(this._originalSequence = e),
						(this._modifiedSequence = d);
					const [b, m, v] = s._getElements(e),
						[E, L, A] = s._getElements(d);
					(this._hasStrings = v && A),
						(this._originalStringElements = b),
						(this._originalElementsOrHash = m),
						(this._modifiedStringElements = E),
						(this._modifiedElementsOrHash = L),
						(this.m_forwardHistory = []),
						(this.m_reverseHistory = []);
				}
				static _isStringArray(e) {
					return e.length > 0 && typeof e[0] == 'string';
				}
				static _getElements(e) {
					const d = e.getElements();
					if (s._isStringArray(d)) {
						const g = new Int32Array(d.length);
						for (let b = 0, m = d.length; b < m; b++) g[b] = (0, M.stringHash)(d[b], 0);
						return [d, g, !0];
					}
					return d instanceof Int32Array ? [[], d, !1] : [[], new Int32Array(d), !1];
				}
				ElementsAreEqual(e, d) {
					return this._originalElementsOrHash[e] !== this._modifiedElementsOrHash[d]
						? !1
						: this._hasStrings
						? this._originalStringElements[e] === this._modifiedStringElements[d]
						: !0;
				}
				ElementsAreStrictEqual(e, d) {
					if (!this.ElementsAreEqual(e, d)) return !1;
					const g = s._getStrictElement(this._originalSequence, e),
						b = s._getStrictElement(this._modifiedSequence, d);
					return g === b;
				}
				static _getStrictElement(e, d) {
					return typeof e.getStrictElement == 'function' ? e.getStrictElement(d) : null;
				}
				OriginalElementsAreEqual(e, d) {
					return this._originalElementsOrHash[e] !== this._originalElementsOrHash[d]
						? !1
						: this._hasStrings
						? this._originalStringElements[e] === this._originalStringElements[d]
						: !0;
				}
				ModifiedElementsAreEqual(e, d) {
					return this._modifiedElementsOrHash[e] !== this._modifiedElementsOrHash[d]
						? !1
						: this._hasStrings
						? this._modifiedStringElements[e] === this._modifiedStringElements[d]
						: !0;
				}
				ComputeDiff(e) {
					return this._ComputeDiff(
						0,
						this._originalElementsOrHash.length - 1,
						0,
						this._modifiedElementsOrHash.length - 1,
						e
					);
				}
				_ComputeDiff(e, d, g, b, m) {
					const v = [!1];
					let E = this.ComputeDiffRecursive(e, d, g, b, v);
					return m && (E = this.PrettifyChanges(E)), { quitEarly: v[0], changes: E };
				}
				ComputeDiffRecursive(e, d, g, b, m) {
					for (m[0] = !1; e <= d && g <= b && this.ElementsAreEqual(e, g); ) e++, g++;
					for (; d >= e && b >= g && this.ElementsAreEqual(d, b); ) d--, b--;
					if (e > d || g > b) {
						let c;
						return (
							g <= b
								? (C.Assert(e === d + 1, 'originalStart should only be one more than originalEnd'),
								  (c = [new R.DiffChange(e, 0, g, b - g + 1)]))
								: e <= d
								? (C.Assert(g === b + 1, 'modifiedStart should only be one more than modifiedEnd'),
								  (c = [new R.DiffChange(e, d - e + 1, g, 0)]))
								: (C.Assert(e === d + 1, 'originalStart should only be one more than originalEnd'),
								  C.Assert(g === b + 1, 'modifiedStart should only be one more than modifiedEnd'),
								  (c = [])),
							c
						);
					}
					const v = [0],
						E = [0],
						L = this.ComputeRecursionPoint(e, d, g, b, v, E, m),
						A = v[0],
						w = E[0];
					if (L !== null) return L;
					if (!m[0]) {
						const c = this.ComputeDiffRecursive(e, A, g, w, m);
						let r = [];
						return (
							m[0]
								? (r = [new R.DiffChange(A + 1, d - (A + 1) + 1, w + 1, b - (w + 1) + 1)])
								: (r = this.ComputeDiffRecursive(A + 1, d, w + 1, b, m)),
							this.ConcatenateChanges(c, r)
						);
					}
					return [new R.DiffChange(e, d - e + 1, g, b - g + 1)];
				}
				WALKTRACE(e, d, g, b, m, v, E, L, A, w, c, r, u, h, f, l, _, N) {
					let y = null,
						D = null,
						k = new o(),
						B = d,
						I = g,
						U = u[0] - l[0] - b,
						V = -1073741824,
						Q = this.m_forwardHistory.length - 1;
					do {
						const F = U + e;
						F === B || (F < I && A[F - 1] < A[F + 1])
							? ((c = A[F + 1]),
							  (h = c - U - b),
							  c < V && k.MarkNextChange(),
							  (V = c),
							  k.AddModifiedElement(c + 1, h),
							  (U = F + 1 - e))
							: ((c = A[F - 1] + 1),
							  (h = c - U - b),
							  c < V && k.MarkNextChange(),
							  (V = c - 1),
							  k.AddOriginalElement(c, h + 1),
							  (U = F - 1 - e)),
							Q >= 0 && ((A = this.m_forwardHistory[Q]), (e = A[0]), (B = 1), (I = A.length - 1));
					} while (--Q >= -1);
					if (((y = k.getReverseChanges()), N[0])) {
						let F = u[0] + 1,
							T = l[0] + 1;
						if (y !== null && y.length > 0) {
							const q = y[y.length - 1];
							(F = Math.max(F, q.getOriginalEnd())), (T = Math.max(T, q.getModifiedEnd()));
						}
						D = [new R.DiffChange(F, r - F + 1, T, f - T + 1)];
					} else {
						(k = new o()),
							(B = v),
							(I = E),
							(U = u[0] - l[0] - L),
							(V = 1073741824),
							(Q = _ ? this.m_reverseHistory.length - 1 : this.m_reverseHistory.length - 2);
						do {
							const F = U + m;
							F === B || (F < I && w[F - 1] >= w[F + 1])
								? ((c = w[F + 1] - 1),
								  (h = c - U - L),
								  c > V && k.MarkNextChange(),
								  (V = c + 1),
								  k.AddOriginalElement(c + 1, h + 1),
								  (U = F + 1 - m))
								: ((c = w[F - 1]),
								  (h = c - U - L),
								  c > V && k.MarkNextChange(),
								  (V = c),
								  k.AddModifiedElement(c + 1, h + 1),
								  (U = F - 1 - m)),
								Q >= 0 && ((w = this.m_reverseHistory[Q]), (m = w[0]), (B = 1), (I = w.length - 1));
						} while (--Q >= -1);
						D = k.getChanges();
					}
					return this.ConcatenateChanges(y, D);
				}
				ComputeRecursionPoint(e, d, g, b, m, v, E) {
					let L = 0,
						A = 0,
						w = 0,
						c = 0,
						r = 0,
						u = 0;
					e--,
						g--,
						(m[0] = 0),
						(v[0] = 0),
						(this.m_forwardHistory = []),
						(this.m_reverseHistory = []);
					const h = d - e + (b - g),
						f = h + 1,
						l = new Int32Array(f),
						_ = new Int32Array(f),
						N = b - g,
						y = d - e,
						D = e - g,
						k = d - b,
						I = (y - N) % 2 === 0;
					(l[N] = e), (_[y] = d), (E[0] = !1);
					for (let U = 1; U <= h / 2 + 1; U++) {
						let V = 0,
							Q = 0;
						(w = this.ClipDiagonalBound(N - U, U, N, f)),
							(c = this.ClipDiagonalBound(N + U, U, N, f));
						for (let T = w; T <= c; T += 2) {
							T === w || (T < c && l[T - 1] < l[T + 1]) ? (L = l[T + 1]) : (L = l[T - 1] + 1),
								(A = L - (T - N) - D);
							const q = L;
							for (; L < d && A < b && this.ElementsAreEqual(L + 1, A + 1); ) L++, A++;
							if (
								((l[T] = L),
								L + A > V + Q && ((V = L), (Q = A)),
								!I && Math.abs(T - y) <= U - 1 && L >= _[T])
							)
								return (
									(m[0] = L),
									(v[0] = A),
									q <= _[T] && 1447 > 0 && U <= 1447 + 1
										? this.WALKTRACE(N, w, c, D, y, r, u, k, l, _, L, d, m, A, b, v, I, E)
										: null
								);
						}
						const F = (V - e + (Q - g) - U) / 2;
						if (
							this.ContinueProcessingPredicate !== null &&
							!this.ContinueProcessingPredicate(V, F)
						)
							return (
								(E[0] = !0),
								(m[0] = V),
								(v[0] = Q),
								F > 0 && 1447 > 0 && U <= 1447 + 1
									? this.WALKTRACE(N, w, c, D, y, r, u, k, l, _, L, d, m, A, b, v, I, E)
									: (e++, g++, [new R.DiffChange(e, d - e + 1, g, b - g + 1)])
							);
						(r = this.ClipDiagonalBound(y - U, U, y, f)),
							(u = this.ClipDiagonalBound(y + U, U, y, f));
						for (let T = r; T <= u; T += 2) {
							T === r || (T < u && _[T - 1] >= _[T + 1]) ? (L = _[T + 1] - 1) : (L = _[T - 1]),
								(A = L - (T - y) - k);
							const q = L;
							for (; L > e && A > g && this.ElementsAreEqual(L, A); ) L--, A--;
							if (((_[T] = L), I && Math.abs(T - N) <= U && L <= l[T]))
								return (
									(m[0] = L),
									(v[0] = A),
									q >= l[T] && 1447 > 0 && U <= 1447 + 1
										? this.WALKTRACE(N, w, c, D, y, r, u, k, l, _, L, d, m, A, b, v, I, E)
										: null
								);
						}
						if (U <= 1447) {
							let T = new Int32Array(c - w + 2);
							(T[0] = N - w + 1),
								S.Copy2(l, w, T, 1, c - w + 1),
								this.m_forwardHistory.push(T),
								(T = new Int32Array(u - r + 2)),
								(T[0] = y - r + 1),
								S.Copy2(_, r, T, 1, u - r + 1),
								this.m_reverseHistory.push(T);
						}
					}
					return this.WALKTRACE(N, w, c, D, y, r, u, k, l, _, L, d, m, A, b, v, I, E);
				}
				PrettifyChanges(e) {
					for (let d = 0; d < e.length; d++) {
						const g = e[d],
							b = d < e.length - 1 ? e[d + 1].originalStart : this._originalElementsOrHash.length,
							m = d < e.length - 1 ? e[d + 1].modifiedStart : this._modifiedElementsOrHash.length,
							v = g.originalLength > 0,
							E = g.modifiedLength > 0;
						for (
							;
							g.originalStart + g.originalLength < b &&
							g.modifiedStart + g.modifiedLength < m &&
							(!v ||
								this.OriginalElementsAreEqual(
									g.originalStart,
									g.originalStart + g.originalLength
								)) &&
							(!E ||
								this.ModifiedElementsAreEqual(g.modifiedStart, g.modifiedStart + g.modifiedLength));

						) {
							const A = this.ElementsAreStrictEqual(g.originalStart, g.modifiedStart);
							if (
								this.ElementsAreStrictEqual(
									g.originalStart + g.originalLength,
									g.modifiedStart + g.modifiedLength
								) &&
								!A
							)
								break;
							g.originalStart++, g.modifiedStart++;
						}
						const L = [null];
						if (d < e.length - 1 && this.ChangesOverlap(e[d], e[d + 1], L)) {
							(e[d] = L[0]), e.splice(d + 1, 1), d--;
							continue;
						}
					}
					for (let d = e.length - 1; d >= 0; d--) {
						const g = e[d];
						let b = 0,
							m = 0;
						if (d > 0) {
							const c = e[d - 1];
							(b = c.originalStart + c.originalLength), (m = c.modifiedStart + c.modifiedLength);
						}
						const v = g.originalLength > 0,
							E = g.modifiedLength > 0;
						let L = 0,
							A = this._boundaryScore(
								g.originalStart,
								g.originalLength,
								g.modifiedStart,
								g.modifiedLength
							);
						for (let c = 1; ; c++) {
							const r = g.originalStart - c,
								u = g.modifiedStart - c;
							if (
								r < b ||
								u < m ||
								(v && !this.OriginalElementsAreEqual(r, r + g.originalLength)) ||
								(E && !this.ModifiedElementsAreEqual(u, u + g.modifiedLength))
							)
								break;
							const f =
								(r === b && u === m ? 5 : 0) +
								this._boundaryScore(r, g.originalLength, u, g.modifiedLength);
							f > A && ((A = f), (L = c));
						}
						(g.originalStart -= L), (g.modifiedStart -= L);
						const w = [null];
						if (d > 0 && this.ChangesOverlap(e[d - 1], e[d], w)) {
							(e[d - 1] = w[0]), e.splice(d, 1), d++;
							continue;
						}
					}
					if (this._hasStrings)
						for (let d = 1, g = e.length; d < g; d++) {
							const b = e[d - 1],
								m = e[d],
								v = m.originalStart - b.originalStart - b.originalLength,
								E = b.originalStart,
								L = m.originalStart + m.originalLength,
								A = L - E,
								w = b.modifiedStart,
								c = m.modifiedStart + m.modifiedLength,
								r = c - w;
							if (v < 5 && A < 20 && r < 20) {
								const u = this._findBetterContiguousSequence(E, A, w, r, v);
								if (u) {
									const [h, f] = u;
									(h !== b.originalStart + b.originalLength ||
										f !== b.modifiedStart + b.modifiedLength) &&
										((b.originalLength = h - b.originalStart),
										(b.modifiedLength = f - b.modifiedStart),
										(m.originalStart = h + v),
										(m.modifiedStart = f + v),
										(m.originalLength = L - m.originalStart),
										(m.modifiedLength = c - m.modifiedStart));
								}
							}
						}
					return e;
				}
				_findBetterContiguousSequence(e, d, g, b, m) {
					if (d < m || b < m) return null;
					const v = e + d - m + 1,
						E = g + b - m + 1;
					let L = 0,
						A = 0,
						w = 0;
					for (let c = e; c < v; c++)
						for (let r = g; r < E; r++) {
							const u = this._contiguousSequenceScore(c, r, m);
							u > 0 && u > L && ((L = u), (A = c), (w = r));
						}
					return L > 0 ? [A, w] : null;
				}
				_contiguousSequenceScore(e, d, g) {
					let b = 0;
					for (let m = 0; m < g; m++) {
						if (!this.ElementsAreEqual(e + m, d + m)) return 0;
						b += this._originalStringElements[e + m].length;
					}
					return b;
				}
				_OriginalIsBoundary(e) {
					return e <= 0 || e >= this._originalElementsOrHash.length - 1
						? !0
						: this._hasStrings && /^\s*$/.test(this._originalStringElements[e]);
				}
				_OriginalRegionIsBoundary(e, d) {
					if (this._OriginalIsBoundary(e) || this._OriginalIsBoundary(e - 1)) return !0;
					if (d > 0) {
						const g = e + d;
						if (this._OriginalIsBoundary(g - 1) || this._OriginalIsBoundary(g)) return !0;
					}
					return !1;
				}
				_ModifiedIsBoundary(e) {
					return e <= 0 || e >= this._modifiedElementsOrHash.length - 1
						? !0
						: this._hasStrings && /^\s*$/.test(this._modifiedStringElements[e]);
				}
				_ModifiedRegionIsBoundary(e, d) {
					if (this._ModifiedIsBoundary(e) || this._ModifiedIsBoundary(e - 1)) return !0;
					if (d > 0) {
						const g = e + d;
						if (this._ModifiedIsBoundary(g - 1) || this._ModifiedIsBoundary(g)) return !0;
					}
					return !1;
				}
				_boundaryScore(e, d, g, b) {
					const m = this._OriginalRegionIsBoundary(e, d) ? 1 : 0,
						v = this._ModifiedRegionIsBoundary(g, b) ? 1 : 0;
					return m + v;
				}
				ConcatenateChanges(e, d) {
					const g = [];
					if (e.length === 0 || d.length === 0) return d.length > 0 ? d : e;
					if (this.ChangesOverlap(e[e.length - 1], d[0], g)) {
						const b = new Array(e.length + d.length - 1);
						return (
							S.Copy(e, 0, b, 0, e.length - 1),
							(b[e.length - 1] = g[0]),
							S.Copy(d, 1, b, e.length, d.length - 1),
							b
						);
					} else {
						const b = new Array(e.length + d.length);
						return S.Copy(e, 0, b, 0, e.length), S.Copy(d, 0, b, e.length, d.length), b;
					}
				}
				ChangesOverlap(e, d, g) {
					if (
						(C.Assert(
							e.originalStart <= d.originalStart,
							'Left change is not less than or equal to right change'
						),
						C.Assert(
							e.modifiedStart <= d.modifiedStart,
							'Left change is not less than or equal to right change'
						),
						e.originalStart + e.originalLength >= d.originalStart ||
							e.modifiedStart + e.modifiedLength >= d.modifiedStart)
					) {
						const b = e.originalStart;
						let m = e.originalLength;
						const v = e.modifiedStart;
						let E = e.modifiedLength;
						return (
							e.originalStart + e.originalLength >= d.originalStart &&
								(m = d.originalStart + d.originalLength - e.originalStart),
							e.modifiedStart + e.modifiedLength >= d.modifiedStart &&
								(E = d.modifiedStart + d.modifiedLength - e.modifiedStart),
							(g[0] = new R.DiffChange(b, m, v, E)),
							!0
						);
					} else return (g[0] = null), !1;
				}
				ClipDiagonalBound(e, d, g, b) {
					if (e >= 0 && e < b) return e;
					const m = g,
						v = b - g - 1,
						E = d % 2 === 0;
					if (e < 0) {
						const L = m % 2 === 0;
						return E === L ? 0 : 1;
					} else {
						const L = v % 2 === 0;
						return E === L ? b - 1 : b - 2;
					}
				}
			}
			n.LcsDiff = s;
		}),
		Y(X[18], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.withUndefinedAsNull =
					n.withNullAsUndefined =
					n.validateConstraint =
					n.validateConstraints =
					n.isFunction =
					n.assertIsDefined =
					n.assertType =
					n.isUndefinedOrNull =
					n.isDefined =
					n.isUndefined =
					n.isBoolean =
					n.isIterable =
					n.isNumber =
					n.isTypedArray =
					n.isObject =
					n.isString =
						void 0);
			function R(L) {
				return typeof L == 'string';
			}
			n.isString = R;
			function M(L) {
				return (
					typeof L == 'object' &&
					L !== null &&
					!Array.isArray(L) &&
					!(L instanceof RegExp) &&
					!(L instanceof Date)
				);
			}
			n.isObject = M;
			function i(L) {
				const A = Object.getPrototypeOf(Uint8Array);
				return typeof L == 'object' && L instanceof A;
			}
			n.isTypedArray = i;
			function a(L) {
				return typeof L == 'number' && !isNaN(L);
			}
			n.isNumber = a;
			function C(L) {
				return !!L && typeof L[Symbol.iterator] == 'function';
			}
			n.isIterable = C;
			function S(L) {
				return L === !0 || L === !1;
			}
			n.isBoolean = S;
			function o(L) {
				return typeof L > 'u';
			}
			n.isUndefined = o;
			function s(L) {
				return !p(L);
			}
			n.isDefined = s;
			function p(L) {
				return o(L) || L === null;
			}
			n.isUndefinedOrNull = p;
			function e(L, A) {
				if (!L) throw new Error(A ? `Unexpected type, expected '${A}'` : 'Unexpected type');
			}
			n.assertType = e;
			function d(L) {
				if (p(L)) throw new Error('Assertion Failed: argument is undefined or null');
				return L;
			}
			n.assertIsDefined = d;
			function g(L) {
				return typeof L == 'function';
			}
			n.isFunction = g;
			function b(L, A) {
				const w = Math.min(L.length, A.length);
				for (let c = 0; c < w; c++) m(L[c], A[c]);
			}
			n.validateConstraints = b;
			function m(L, A) {
				if (R(A)) {
					if (typeof L !== A) throw new Error(`argument does not match constraint: typeof ${A}`);
				} else if (g(A)) {
					try {
						if (L instanceof A) return;
					} catch {}
					if ((!p(L) && L.constructor === A) || (A.length === 1 && A.call(void 0, L) === !0))
						return;
					throw new Error(
						'argument does not match one of these constraints: arg instanceof constraint, arg.constructor === constraint, nor constraint(arg) === true'
					);
				}
			}
			n.validateConstraint = m;
			function v(L) {
				return L === null ? void 0 : L;
			}
			n.withNullAsUndefined = v;
			function E(L) {
				return typeof L > 'u' ? null : L;
			}
			n.withUndefinedAsNull = E;
		}),
		Y(X[33], J([0, 1, 18]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.Codicon = n.getCodiconFontCharacters = void 0);
			const M = Object.create(null);
			function i(C, S) {
				if ((0, R.isString)(S)) {
					const o = M[S];
					if (o === void 0) throw new Error(`${C} references an unknown codicon: ${S}`);
					S = o;
				}
				return (M[C] = S), { id: C };
			}
			function a() {
				return M;
			}
			(n.getCodiconFontCharacters = a),
				(n.Codicon = {
					add: i('add', 6e4),
					plus: i('plus', 6e4),
					gistNew: i('gist-new', 6e4),
					repoCreate: i('repo-create', 6e4),
					lightbulb: i('lightbulb', 60001),
					lightBulb: i('light-bulb', 60001),
					repo: i('repo', 60002),
					repoDelete: i('repo-delete', 60002),
					gistFork: i('gist-fork', 60003),
					repoForked: i('repo-forked', 60003),
					gitPullRequest: i('git-pull-request', 60004),
					gitPullRequestAbandoned: i('git-pull-request-abandoned', 60004),
					recordKeys: i('record-keys', 60005),
					keyboard: i('keyboard', 60005),
					tag: i('tag', 60006),
					tagAdd: i('tag-add', 60006),
					tagRemove: i('tag-remove', 60006),
					person: i('person', 60007),
					personFollow: i('person-follow', 60007),
					personOutline: i('person-outline', 60007),
					personFilled: i('person-filled', 60007),
					gitBranch: i('git-branch', 60008),
					gitBranchCreate: i('git-branch-create', 60008),
					gitBranchDelete: i('git-branch-delete', 60008),
					sourceControl: i('source-control', 60008),
					mirror: i('mirror', 60009),
					mirrorPublic: i('mirror-public', 60009),
					star: i('star', 60010),
					starAdd: i('star-add', 60010),
					starDelete: i('star-delete', 60010),
					starEmpty: i('star-empty', 60010),
					comment: i('comment', 60011),
					commentAdd: i('comment-add', 60011),
					alert: i('alert', 60012),
					warning: i('warning', 60012),
					search: i('search', 60013),
					searchSave: i('search-save', 60013),
					logOut: i('log-out', 60014),
					signOut: i('sign-out', 60014),
					logIn: i('log-in', 60015),
					signIn: i('sign-in', 60015),
					eye: i('eye', 60016),
					eyeUnwatch: i('eye-unwatch', 60016),
					eyeWatch: i('eye-watch', 60016),
					circleFilled: i('circle-filled', 60017),
					primitiveDot: i('primitive-dot', 60017),
					closeDirty: i('close-dirty', 60017),
					debugBreakpoint: i('debug-breakpoint', 60017),
					debugBreakpointDisabled: i('debug-breakpoint-disabled', 60017),
					debugHint: i('debug-hint', 60017),
					primitiveSquare: i('primitive-square', 60018),
					edit: i('edit', 60019),
					pencil: i('pencil', 60019),
					info: i('info', 60020),
					issueOpened: i('issue-opened', 60020),
					gistPrivate: i('gist-private', 60021),
					gitForkPrivate: i('git-fork-private', 60021),
					lock: i('lock', 60021),
					mirrorPrivate: i('mirror-private', 60021),
					close: i('close', 60022),
					removeClose: i('remove-close', 60022),
					x: i('x', 60022),
					repoSync: i('repo-sync', 60023),
					sync: i('sync', 60023),
					clone: i('clone', 60024),
					desktopDownload: i('desktop-download', 60024),
					beaker: i('beaker', 60025),
					microscope: i('microscope', 60025),
					vm: i('vm', 60026),
					deviceDesktop: i('device-desktop', 60026),
					file: i('file', 60027),
					fileText: i('file-text', 60027),
					more: i('more', 60028),
					ellipsis: i('ellipsis', 60028),
					kebabHorizontal: i('kebab-horizontal', 60028),
					mailReply: i('mail-reply', 60029),
					reply: i('reply', 60029),
					organization: i('organization', 60030),
					organizationFilled: i('organization-filled', 60030),
					organizationOutline: i('organization-outline', 60030),
					newFile: i('new-file', 60031),
					fileAdd: i('file-add', 60031),
					newFolder: i('new-folder', 60032),
					fileDirectoryCreate: i('file-directory-create', 60032),
					trash: i('trash', 60033),
					trashcan: i('trashcan', 60033),
					history: i('history', 60034),
					clock: i('clock', 60034),
					folder: i('folder', 60035),
					fileDirectory: i('file-directory', 60035),
					symbolFolder: i('symbol-folder', 60035),
					logoGithub: i('logo-github', 60036),
					markGithub: i('mark-github', 60036),
					github: i('github', 60036),
					terminal: i('terminal', 60037),
					console: i('console', 60037),
					repl: i('repl', 60037),
					zap: i('zap', 60038),
					symbolEvent: i('symbol-event', 60038),
					error: i('error', 60039),
					stop: i('stop', 60039),
					variable: i('variable', 60040),
					symbolVariable: i('symbol-variable', 60040),
					array: i('array', 60042),
					symbolArray: i('symbol-array', 60042),
					symbolModule: i('symbol-module', 60043),
					symbolPackage: i('symbol-package', 60043),
					symbolNamespace: i('symbol-namespace', 60043),
					symbolObject: i('symbol-object', 60043),
					symbolMethod: i('symbol-method', 60044),
					symbolFunction: i('symbol-function', 60044),
					symbolConstructor: i('symbol-constructor', 60044),
					symbolBoolean: i('symbol-boolean', 60047),
					symbolNull: i('symbol-null', 60047),
					symbolNumeric: i('symbol-numeric', 60048),
					symbolNumber: i('symbol-number', 60048),
					symbolStructure: i('symbol-structure', 60049),
					symbolStruct: i('symbol-struct', 60049),
					symbolParameter: i('symbol-parameter', 60050),
					symbolTypeParameter: i('symbol-type-parameter', 60050),
					symbolKey: i('symbol-key', 60051),
					symbolText: i('symbol-text', 60051),
					symbolReference: i('symbol-reference', 60052),
					goToFile: i('go-to-file', 60052),
					symbolEnum: i('symbol-enum', 60053),
					symbolValue: i('symbol-value', 60053),
					symbolRuler: i('symbol-ruler', 60054),
					symbolUnit: i('symbol-unit', 60054),
					activateBreakpoints: i('activate-breakpoints', 60055),
					archive: i('archive', 60056),
					arrowBoth: i('arrow-both', 60057),
					arrowDown: i('arrow-down', 60058),
					arrowLeft: i('arrow-left', 60059),
					arrowRight: i('arrow-right', 60060),
					arrowSmallDown: i('arrow-small-down', 60061),
					arrowSmallLeft: i('arrow-small-left', 60062),
					arrowSmallRight: i('arrow-small-right', 60063),
					arrowSmallUp: i('arrow-small-up', 60064),
					arrowUp: i('arrow-up', 60065),
					bell: i('bell', 60066),
					bold: i('bold', 60067),
					book: i('book', 60068),
					bookmark: i('bookmark', 60069),
					debugBreakpointConditionalUnverified: i('debug-breakpoint-conditional-unverified', 60070),
					debugBreakpointConditional: i('debug-breakpoint-conditional', 60071),
					debugBreakpointConditionalDisabled: i('debug-breakpoint-conditional-disabled', 60071),
					debugBreakpointDataUnverified: i('debug-breakpoint-data-unverified', 60072),
					debugBreakpointData: i('debug-breakpoint-data', 60073),
					debugBreakpointDataDisabled: i('debug-breakpoint-data-disabled', 60073),
					debugBreakpointLogUnverified: i('debug-breakpoint-log-unverified', 60074),
					debugBreakpointLog: i('debug-breakpoint-log', 60075),
					debugBreakpointLogDisabled: i('debug-breakpoint-log-disabled', 60075),
					briefcase: i('briefcase', 60076),
					broadcast: i('broadcast', 60077),
					browser: i('browser', 60078),
					bug: i('bug', 60079),
					calendar: i('calendar', 60080),
					caseSensitive: i('case-sensitive', 60081),
					check: i('check', 60082),
					checklist: i('checklist', 60083),
					chevronDown: i('chevron-down', 60084),
					dropDownButton: i('drop-down-button', 60084),
					chevronLeft: i('chevron-left', 60085),
					chevronRight: i('chevron-right', 60086),
					chevronUp: i('chevron-up', 60087),
					chromeClose: i('chrome-close', 60088),
					chromeMaximize: i('chrome-maximize', 60089),
					chromeMinimize: i('chrome-minimize', 60090),
					chromeRestore: i('chrome-restore', 60091),
					circle: i('circle', 60092),
					circleOutline: i('circle-outline', 60092),
					debugBreakpointUnverified: i('debug-breakpoint-unverified', 60092),
					circleSlash: i('circle-slash', 60093),
					circuitBoard: i('circuit-board', 60094),
					clearAll: i('clear-all', 60095),
					clippy: i('clippy', 60096),
					closeAll: i('close-all', 60097),
					cloudDownload: i('cloud-download', 60098),
					cloudUpload: i('cloud-upload', 60099),
					code: i('code', 60100),
					collapseAll: i('collapse-all', 60101),
					colorMode: i('color-mode', 60102),
					commentDiscussion: i('comment-discussion', 60103),
					compareChanges: i('compare-changes', 60157),
					creditCard: i('credit-card', 60105),
					dash: i('dash', 60108),
					dashboard: i('dashboard', 60109),
					database: i('database', 60110),
					debugContinue: i('debug-continue', 60111),
					debugDisconnect: i('debug-disconnect', 60112),
					debugPause: i('debug-pause', 60113),
					debugRestart: i('debug-restart', 60114),
					debugStart: i('debug-start', 60115),
					debugStepInto: i('debug-step-into', 60116),
					debugStepOut: i('debug-step-out', 60117),
					debugStepOver: i('debug-step-over', 60118),
					debugStop: i('debug-stop', 60119),
					debug: i('debug', 60120),
					deviceCameraVideo: i('device-camera-video', 60121),
					deviceCamera: i('device-camera', 60122),
					deviceMobile: i('device-mobile', 60123),
					diffAdded: i('diff-added', 60124),
					diffIgnored: i('diff-ignored', 60125),
					diffModified: i('diff-modified', 60126),
					diffRemoved: i('diff-removed', 60127),
					diffRenamed: i('diff-renamed', 60128),
					diff: i('diff', 60129),
					discard: i('discard', 60130),
					editorLayout: i('editor-layout', 60131),
					emptyWindow: i('empty-window', 60132),
					exclude: i('exclude', 60133),
					extensions: i('extensions', 60134),
					eyeClosed: i('eye-closed', 60135),
					fileBinary: i('file-binary', 60136),
					fileCode: i('file-code', 60137),
					fileMedia: i('file-media', 60138),
					filePdf: i('file-pdf', 60139),
					fileSubmodule: i('file-submodule', 60140),
					fileSymlinkDirectory: i('file-symlink-directory', 60141),
					fileSymlinkFile: i('file-symlink-file', 60142),
					fileZip: i('file-zip', 60143),
					files: i('files', 60144),
					filter: i('filter', 60145),
					flame: i('flame', 60146),
					foldDown: i('fold-down', 60147),
					foldUp: i('fold-up', 60148),
					fold: i('fold', 60149),
					folderActive: i('folder-active', 60150),
					folderOpened: i('folder-opened', 60151),
					gear: i('gear', 60152),
					gift: i('gift', 60153),
					gistSecret: i('gist-secret', 60154),
					gist: i('gist', 60155),
					gitCommit: i('git-commit', 60156),
					gitCompare: i('git-compare', 60157),
					gitMerge: i('git-merge', 60158),
					githubAction: i('github-action', 60159),
					githubAlt: i('github-alt', 60160),
					globe: i('globe', 60161),
					grabber: i('grabber', 60162),
					graph: i('graph', 60163),
					gripper: i('gripper', 60164),
					heart: i('heart', 60165),
					home: i('home', 60166),
					horizontalRule: i('horizontal-rule', 60167),
					hubot: i('hubot', 60168),
					inbox: i('inbox', 60169),
					issueClosed: i('issue-closed', 60324),
					issueReopened: i('issue-reopened', 60171),
					issues: i('issues', 60172),
					italic: i('italic', 60173),
					jersey: i('jersey', 60174),
					json: i('json', 60175),
					bracket: i('bracket', 60175),
					kebabVertical: i('kebab-vertical', 60176),
					key: i('key', 60177),
					law: i('law', 60178),
					lightbulbAutofix: i('lightbulb-autofix', 60179),
					linkExternal: i('link-external', 60180),
					link: i('link', 60181),
					listOrdered: i('list-ordered', 60182),
					listUnordered: i('list-unordered', 60183),
					liveShare: i('live-share', 60184),
					loading: i('loading', 60185),
					location: i('location', 60186),
					mailRead: i('mail-read', 60187),
					mail: i('mail', 60188),
					markdown: i('markdown', 60189),
					megaphone: i('megaphone', 60190),
					mention: i('mention', 60191),
					milestone: i('milestone', 60192),
					mortarBoard: i('mortar-board', 60193),
					move: i('move', 60194),
					multipleWindows: i('multiple-windows', 60195),
					mute: i('mute', 60196),
					noNewline: i('no-newline', 60197),
					note: i('note', 60198),
					octoface: i('octoface', 60199),
					openPreview: i('open-preview', 60200),
					package_: i('package', 60201),
					paintcan: i('paintcan', 60202),
					pin: i('pin', 60203),
					play: i('play', 60204),
					run: i('run', 60204),
					plug: i('plug', 60205),
					preserveCase: i('preserve-case', 60206),
					preview: i('preview', 60207),
					project: i('project', 60208),
					pulse: i('pulse', 60209),
					question: i('question', 60210),
					quote: i('quote', 60211),
					radioTower: i('radio-tower', 60212),
					reactions: i('reactions', 60213),
					references: i('references', 60214),
					refresh: i('refresh', 60215),
					regex: i('regex', 60216),
					remoteExplorer: i('remote-explorer', 60217),
					remote: i('remote', 60218),
					remove: i('remove', 60219),
					replaceAll: i('replace-all', 60220),
					replace: i('replace', 60221),
					repoClone: i('repo-clone', 60222),
					repoForcePush: i('repo-force-push', 60223),
					repoPull: i('repo-pull', 60224),
					repoPush: i('repo-push', 60225),
					report: i('report', 60226),
					requestChanges: i('request-changes', 60227),
					rocket: i('rocket', 60228),
					rootFolderOpened: i('root-folder-opened', 60229),
					rootFolder: i('root-folder', 60230),
					rss: i('rss', 60231),
					ruby: i('ruby', 60232),
					saveAll: i('save-all', 60233),
					saveAs: i('save-as', 60234),
					save: i('save', 60235),
					screenFull: i('screen-full', 60236),
					screenNormal: i('screen-normal', 60237),
					searchStop: i('search-stop', 60238),
					server: i('server', 60240),
					settingsGear: i('settings-gear', 60241),
					settings: i('settings', 60242),
					shield: i('shield', 60243),
					smiley: i('smiley', 60244),
					sortPrecedence: i('sort-precedence', 60245),
					splitHorizontal: i('split-horizontal', 60246),
					splitVertical: i('split-vertical', 60247),
					squirrel: i('squirrel', 60248),
					starFull: i('star-full', 60249),
					starHalf: i('star-half', 60250),
					symbolClass: i('symbol-class', 60251),
					symbolColor: i('symbol-color', 60252),
					symbolCustomColor: i('symbol-customcolor', 60252),
					symbolConstant: i('symbol-constant', 60253),
					symbolEnumMember: i('symbol-enum-member', 60254),
					symbolField: i('symbol-field', 60255),
					symbolFile: i('symbol-file', 60256),
					symbolInterface: i('symbol-interface', 60257),
					symbolKeyword: i('symbol-keyword', 60258),
					symbolMisc: i('symbol-misc', 60259),
					symbolOperator: i('symbol-operator', 60260),
					symbolProperty: i('symbol-property', 60261),
					wrench: i('wrench', 60261),
					wrenchSubaction: i('wrench-subaction', 60261),
					symbolSnippet: i('symbol-snippet', 60262),
					tasklist: i('tasklist', 60263),
					telescope: i('telescope', 60264),
					textSize: i('text-size', 60265),
					threeBars: i('three-bars', 60266),
					thumbsdown: i('thumbsdown', 60267),
					thumbsup: i('thumbsup', 60268),
					tools: i('tools', 60269),
					triangleDown: i('triangle-down', 60270),
					triangleLeft: i('triangle-left', 60271),
					triangleRight: i('triangle-right', 60272),
					triangleUp: i('triangle-up', 60273),
					twitter: i('twitter', 60274),
					unfold: i('unfold', 60275),
					unlock: i('unlock', 60276),
					unmute: i('unmute', 60277),
					unverified: i('unverified', 60278),
					verified: i('verified', 60279),
					versions: i('versions', 60280),
					vmActive: i('vm-active', 60281),
					vmOutline: i('vm-outline', 60282),
					vmRunning: i('vm-running', 60283),
					watch: i('watch', 60284),
					whitespace: i('whitespace', 60285),
					wholeWord: i('whole-word', 60286),
					window: i('window', 60287),
					wordWrap: i('word-wrap', 60288),
					zoomIn: i('zoom-in', 60289),
					zoomOut: i('zoom-out', 60290),
					listFilter: i('list-filter', 60291),
					listFlat: i('list-flat', 60292),
					listSelection: i('list-selection', 60293),
					selection: i('selection', 60293),
					listTree: i('list-tree', 60294),
					debugBreakpointFunctionUnverified: i('debug-breakpoint-function-unverified', 60295),
					debugBreakpointFunction: i('debug-breakpoint-function', 60296),
					debugBreakpointFunctionDisabled: i('debug-breakpoint-function-disabled', 60296),
					debugStackframeActive: i('debug-stackframe-active', 60297),
					circleSmallFilled: i('circle-small-filled', 60298),
					debugStackframeDot: i('debug-stackframe-dot', 60298),
					debugStackframe: i('debug-stackframe', 60299),
					debugStackframeFocused: i('debug-stackframe-focused', 60299),
					debugBreakpointUnsupported: i('debug-breakpoint-unsupported', 60300),
					symbolString: i('symbol-string', 60301),
					debugReverseContinue: i('debug-reverse-continue', 60302),
					debugStepBack: i('debug-step-back', 60303),
					debugRestartFrame: i('debug-restart-frame', 60304),
					callIncoming: i('call-incoming', 60306),
					callOutgoing: i('call-outgoing', 60307),
					menu: i('menu', 60308),
					expandAll: i('expand-all', 60309),
					feedback: i('feedback', 60310),
					groupByRefType: i('group-by-ref-type', 60311),
					ungroupByRefType: i('ungroup-by-ref-type', 60312),
					account: i('account', 60313),
					bellDot: i('bell-dot', 60314),
					debugConsole: i('debug-console', 60315),
					library: i('library', 60316),
					output: i('output', 60317),
					runAll: i('run-all', 60318),
					syncIgnored: i('sync-ignored', 60319),
					pinned: i('pinned', 60320),
					githubInverted: i('github-inverted', 60321),
					debugAlt: i('debug-alt', 60305),
					serverProcess: i('server-process', 60322),
					serverEnvironment: i('server-environment', 60323),
					pass: i('pass', 60324),
					stopCircle: i('stop-circle', 60325),
					playCircle: i('play-circle', 60326),
					record: i('record', 60327),
					debugAltSmall: i('debug-alt-small', 60328),
					vmConnect: i('vm-connect', 60329),
					cloud: i('cloud', 60330),
					merge: i('merge', 60331),
					exportIcon: i('export', 60332),
					graphLeft: i('graph-left', 60333),
					magnet: i('magnet', 60334),
					notebook: i('notebook', 60335),
					redo: i('redo', 60336),
					checkAll: i('check-all', 60337),
					pinnedDirty: i('pinned-dirty', 60338),
					passFilled: i('pass-filled', 60339),
					circleLargeFilled: i('circle-large-filled', 60340),
					circleLarge: i('circle-large', 60341),
					circleLargeOutline: i('circle-large-outline', 60341),
					combine: i('combine', 60342),
					gather: i('gather', 60342),
					table: i('table', 60343),
					variableGroup: i('variable-group', 60344),
					typeHierarchy: i('type-hierarchy', 60345),
					typeHierarchySub: i('type-hierarchy-sub', 60346),
					typeHierarchySuper: i('type-hierarchy-super', 60347),
					gitPullRequestCreate: i('git-pull-request-create', 60348),
					runAbove: i('run-above', 60349),
					runBelow: i('run-below', 60350),
					notebookTemplate: i('notebook-template', 60351),
					debugRerun: i('debug-rerun', 60352),
					workspaceTrusted: i('workspace-trusted', 60353),
					workspaceUntrusted: i('workspace-untrusted', 60354),
					workspaceUnspecified: i('workspace-unspecified', 60355),
					terminalCmd: i('terminal-cmd', 60356),
					terminalDebian: i('terminal-debian', 60357),
					terminalLinux: i('terminal-linux', 60358),
					terminalPowershell: i('terminal-powershell', 60359),
					terminalTmux: i('terminal-tmux', 60360),
					terminalUbuntu: i('terminal-ubuntu', 60361),
					terminalBash: i('terminal-bash', 60362),
					arrowSwap: i('arrow-swap', 60363),
					copy: i('copy', 60364),
					personAdd: i('person-add', 60365),
					filterFilled: i('filter-filled', 60366),
					wand: i('wand', 60367),
					debugLineByLine: i('debug-line-by-line', 60368),
					inspect: i('inspect', 60369),
					layers: i('layers', 60370),
					layersDot: i('layers-dot', 60371),
					layersActive: i('layers-active', 60372),
					compass: i('compass', 60373),
					compassDot: i('compass-dot', 60374),
					compassActive: i('compass-active', 60375),
					azure: i('azure', 60376),
					issueDraft: i('issue-draft', 60377),
					gitPullRequestClosed: i('git-pull-request-closed', 60378),
					gitPullRequestDraft: i('git-pull-request-draft', 60379),
					debugAll: i('debug-all', 60380),
					debugCoverage: i('debug-coverage', 60381),
					runErrors: i('run-errors', 60382),
					folderLibrary: i('folder-library', 60383),
					debugContinueSmall: i('debug-continue-small', 60384),
					beakerStop: i('beaker-stop', 60385),
					graphLine: i('graph-line', 60386),
					graphScatter: i('graph-scatter', 60387),
					pieChart: i('pie-chart', 60388),
					bracketDot: i('bracket-dot', 60389),
					bracketError: i('bracket-error', 60390),
					lockSmall: i('lock-small', 60391),
					azureDevops: i('azure-devops', 60392),
					verifiedFilled: i('verified-filled', 60393),
					newLine: i('newline', 60394),
					layout: i('layout', 60395),
					layoutActivitybarLeft: i('layout-activitybar-left', 60396),
					layoutActivitybarRight: i('layout-activitybar-right', 60397),
					layoutPanelLeft: i('layout-panel-left', 60398),
					layoutPanelCenter: i('layout-panel-center', 60399),
					layoutPanelJustify: i('layout-panel-justify', 60400),
					layoutPanelRight: i('layout-panel-right', 60401),
					layoutPanel: i('layout-panel', 60402),
					layoutSidebarLeft: i('layout-sidebar-left', 60403),
					layoutSidebarRight: i('layout-sidebar-right', 60404),
					layoutStatusbar: i('layout-statusbar', 60405),
					layoutMenubar: i('layout-menubar', 60406),
					layoutCentered: i('layout-centered', 60407),
					layoutSidebarRightOff: i('layout-sidebar-right-off', 60416),
					layoutPanelOff: i('layout-panel-off', 60417),
					layoutSidebarLeftOff: i('layout-sidebar-left-off', 60418),
					target: i('target', 60408),
					indent: i('indent', 60409),
					recordSmall: i('record-small', 60410),
					errorSmall: i('error-small', 60411),
					arrowCircleDown: i('arrow-circle-down', 60412),
					arrowCircleLeft: i('arrow-circle-left', 60413),
					arrowCircleRight: i('arrow-circle-right', 60414),
					arrowCircleUp: i('arrow-circle-up', 60415),
					heartFilled: i('heart-filled', 60420),
					map: i('map', 60421),
					mapFilled: i('map-filled', 60422),
					circleSmall: i('circle-small', 60423),
					bellSlash: i('bell-slash', 60424),
					bellSlashDot: i('bell-slash-dot', 60425),
					commentUnresolved: i('comment-unresolved', 60426),
					gitPullRequestGoToChanges: i('git-pull-request-go-to-changes', 60427),
					gitPullRequestNewChanges: i('git-pull-request-new-changes', 60428),
					searchFuzzy: i('search-fuzzy', 60429),
					commentDraft: i('comment-draft', 60430),
					send: i('send', 60431),
					sparkle: i('sparkle', 60432),
					insert: i('insert', 60433),
					dialogError: i('dialog-error', 'error'),
					dialogWarning: i('dialog-warning', 'warning'),
					dialogInfo: i('dialog-info', 'info'),
					dialogClose: i('dialog-close', 'close'),
					treeItemExpanded: i('tree-item-expanded', 'chevron-down'),
					treeFilterOnTypeOn: i('tree-filter-on-type-on', 'list-filter'),
					treeFilterOnTypeOff: i('tree-filter-on-type-off', 'list-selection'),
					treeFilterClear: i('tree-filter-clear', 'close'),
					treeItemLoading: i('tree-item-loading', 'loading'),
					menuSelection: i('menu-selection', 'check'),
					menuSubmenu: i('menu-submenu', 'chevron-right'),
					menuBarMore: i('menubar-more', 'more'),
					scrollbarButtonLeft: i('scrollbar-button-left', 'triangle-left'),
					scrollbarButtonRight: i('scrollbar-button-right', 'triangle-right'),
					scrollbarButtonUp: i('scrollbar-button-up', 'triangle-up'),
					scrollbarButtonDown: i('scrollbar-button-down', 'triangle-down'),
					toolBarMore: i('toolbar-more', 'more'),
					quickInputBack: i('quick-input-back', 'arrow-left')
				});
		}),
		Y(X[12], J([0, 1, 18]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.createProxyObject =
					n.getAllMethodNames =
					n.getAllPropertyNames =
					n.equals =
					n.mixin =
					n.cloneAndChange =
					n.deepFreeze =
					n.deepClone =
						void 0);
			function M(g) {
				if (!g || typeof g != 'object' || g instanceof RegExp) return g;
				const b = Array.isArray(g) ? [] : {};
				return (
					Object.entries(g).forEach(([m, v]) => {
						b[m] = v && typeof v == 'object' ? M(v) : v;
					}),
					b
				);
			}
			n.deepClone = M;
			function i(g) {
				if (!g || typeof g != 'object') return g;
				const b = [g];
				for (; b.length > 0; ) {
					const m = b.shift();
					Object.freeze(m);
					for (const v in m)
						if (a.call(m, v)) {
							const E = m[v];
							typeof E == 'object' && !Object.isFrozen(E) && !(0, R.isTypedArray)(E) && b.push(E);
						}
				}
				return g;
			}
			n.deepFreeze = i;
			const a = Object.prototype.hasOwnProperty;
			function C(g, b) {
				return S(g, b, new Set());
			}
			n.cloneAndChange = C;
			function S(g, b, m) {
				if ((0, R.isUndefinedOrNull)(g)) return g;
				const v = b(g);
				if (typeof v < 'u') return v;
				if (Array.isArray(g)) {
					const E = [];
					for (const L of g) E.push(S(L, b, m));
					return E;
				}
				if ((0, R.isObject)(g)) {
					if (m.has(g)) throw new Error('Cannot clone recursive data-structure');
					m.add(g);
					const E = {};
					for (const L in g) a.call(g, L) && (E[L] = S(g[L], b, m));
					return m.delete(g), E;
				}
				return g;
			}
			function o(g, b, m = !0) {
				return (0, R.isObject)(g)
					? ((0, R.isObject)(b) &&
							Object.keys(b).forEach((v) => {
								v in g
									? m &&
									  ((0, R.isObject)(g[v]) && (0, R.isObject)(b[v])
											? o(g[v], b[v], m)
											: (g[v] = b[v]))
									: (g[v] = b[v]);
							}),
					  g)
					: b;
			}
			n.mixin = o;
			function s(g, b) {
				if (g === b) return !0;
				if (
					g == null ||
					b === null ||
					b === void 0 ||
					typeof g != typeof b ||
					typeof g != 'object' ||
					Array.isArray(g) !== Array.isArray(b)
				)
					return !1;
				let m, v;
				if (Array.isArray(g)) {
					if (g.length !== b.length) return !1;
					for (m = 0; m < g.length; m++) if (!s(g[m], b[m])) return !1;
				} else {
					const E = [];
					for (v in g) E.push(v);
					E.sort();
					const L = [];
					for (v in b) L.push(v);
					if ((L.sort(), !s(E, L))) return !1;
					for (m = 0; m < E.length; m++) if (!s(g[E[m]], b[E[m]])) return !1;
				}
				return !0;
			}
			n.equals = s;
			function p(g) {
				let b = [],
					m = Object.getPrototypeOf(g);
				for (; Object.prototype !== m; )
					(b = b.concat(Object.getOwnPropertyNames(m))), (m = Object.getPrototypeOf(m));
				return b;
			}
			n.getAllPropertyNames = p;
			function e(g) {
				const b = [];
				for (const m of p(g)) typeof g[m] == 'function' && b.push(m);
				return b;
			}
			n.getAllMethodNames = e;
			function d(g, b) {
				const m = (E) =>
						function () {
							const L = Array.prototype.slice.call(arguments, 0);
							return b(E, L);
						},
					v = {};
				for (const E of g) v[E] = m(E);
				return v;
			}
			n.createProxyObject = d;
		}),
		Y(X[19], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.toUint32 = n.toUint8 = void 0);
			function R(i) {
				return i < 0 ? 0 : i > 255 ? 255 : i | 0;
			}
			n.toUint8 = R;
			function M(i) {
				return i < 0 ? 0 : i > 4294967295 ? 4294967295 : i | 0;
			}
			n.toUint32 = M;
		}),
		Y(X[20], J([0, 1, 19]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.CharacterSet = n.CharacterClassifier = void 0);
			class M {
				constructor(C) {
					const S = (0, R.toUint8)(C);
					(this._defaultValue = S),
						(this._asciiMap = M._createAsciiMap(S)),
						(this._map = new Map());
				}
				static _createAsciiMap(C) {
					const S = new Uint8Array(256);
					return S.fill(C), S;
				}
				set(C, S) {
					const o = (0, R.toUint8)(S);
					C >= 0 && C < 256 ? (this._asciiMap[C] = o) : this._map.set(C, o);
				}
				get(C) {
					return C >= 0 && C < 256 ? this._asciiMap[C] : this._map.get(C) || this._defaultValue;
				}
				clear() {
					this._asciiMap.fill(this._defaultValue), this._map.clear();
				}
			}
			n.CharacterClassifier = M;
			class i {
				constructor() {
					this._actual = new M(0);
				}
				add(C) {
					this._actual.set(C, 1);
				}
				has(C) {
					return this._actual.get(C) === 1;
				}
				clear() {
					return this._actual.clear();
				}
			}
			n.CharacterSet = i;
		}),
		Y(X[21], J([0, 1, 4]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.LineRange = void 0);
			class M {
				static joinMany(a) {
					if (a.length === 0) return [];
					let C = a[0];
					for (let S = 1; S < a.length; S++) C = this.join(C, a[S]);
					return C;
				}
				static join(a, C) {
					if (a.length === 0) return C;
					if (C.length === 0) return a;
					const S = [];
					let o = 0,
						s = 0,
						p = null;
					for (; o < a.length || s < C.length; ) {
						let e = null;
						if (o < a.length && s < C.length) {
							const d = a[o],
								g = C[s];
							d.startLineNumber < g.startLineNumber ? ((e = d), o++) : ((e = g), s++);
						} else o < a.length ? ((e = a[o]), o++) : ((e = C[s]), s++);
						p === null
							? (p = e)
							: p.endLineNumberExclusive >= e.startLineNumber
							? (p = new M(
									p.startLineNumber,
									Math.max(p.endLineNumberExclusive, e.endLineNumberExclusive)
							  ))
							: (S.push(p), (p = e));
					}
					return p !== null && S.push(p), S;
				}
				constructor(a, C) {
					if (a > C)
						throw new R.BugIndicatingError(
							`startLineNumber ${a} cannot be after endLineNumberExclusive ${C}`
						);
					(this.startLineNumber = a), (this.endLineNumberExclusive = C);
				}
				contains(a) {
					return this.startLineNumber <= a && a < this.endLineNumberExclusive;
				}
				get isEmpty() {
					return this.startLineNumber === this.endLineNumberExclusive;
				}
				delta(a) {
					return new M(this.startLineNumber + a, this.endLineNumberExclusive + a);
				}
				get length() {
					return this.endLineNumberExclusive - this.startLineNumber;
				}
				join(a) {
					return new M(
						Math.min(this.startLineNumber, a.startLineNumber),
						Math.max(this.endLineNumberExclusive, a.endLineNumberExclusive)
					);
				}
				toString() {
					return `[${this.startLineNumber},${this.endLineNumberExclusive})`;
				}
				intersect(a) {
					const C = Math.max(this.startLineNumber, a.startLineNumber),
						S = Math.min(this.endLineNumberExclusive, a.endLineNumberExclusive);
					if (C <= S) return new M(C, S);
				}
				overlapOrTouch(a) {
					return (
						this.startLineNumber <= a.endLineNumberExclusive &&
						a.startLineNumber <= this.endLineNumberExclusive
					);
				}
				equals(a) {
					return (
						this.startLineNumber === a.startLineNumber &&
						this.endLineNumberExclusive === a.endLineNumberExclusive
					);
				}
			}
			n.LineRange = M;
		}),
		Y(X[6], J([0, 1, 4]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.OffsetRange = void 0);
			class M {
				static addRange(a, C) {
					let S = 0;
					for (; S < C.length && C[S].endExclusive < a.start; ) S++;
					let o = S;
					for (; o < C.length && C[o].start <= a.endExclusive; ) o++;
					if (S === o) C.splice(S, 0, a);
					else {
						const s = Math.min(a.start, C[S].start),
							p = Math.max(a.endExclusive, C[o - 1].endExclusive);
						C.splice(S, o - S, new M(s, p));
					}
				}
				static tryCreate(a, C) {
					if (!(a > C)) return new M(a, C);
				}
				constructor(a, C) {
					if (((this.start = a), (this.endExclusive = C), a > C))
						throw new R.BugIndicatingError(`Invalid range: ${this.toString()}`);
				}
				get isEmpty() {
					return this.start === this.endExclusive;
				}
				delta(a) {
					return new M(this.start + a, this.endExclusive + a);
				}
				get length() {
					return this.endExclusive - this.start;
				}
				toString() {
					return `[${this.start}, ${this.endExclusive})`;
				}
				equals(a) {
					return this.start === a.start && this.endExclusive === a.endExclusive;
				}
				containsRange(a) {
					return this.start <= a.start && a.endExclusive <= this.endExclusive;
				}
				join(a) {
					return new M(Math.min(this.start, a.start), Math.max(this.endExclusive, a.endExclusive));
				}
				intersect(a) {
					const C = Math.max(this.start, a.start),
						S = Math.min(this.endExclusive, a.endExclusive);
					if (C <= S) return new M(C, S);
				}
			}
			n.OffsetRange = M;
		}),
		Y(X[3], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.Position = void 0);
			class R {
				constructor(i, a) {
					(this.lineNumber = i), (this.column = a);
				}
				with(i = this.lineNumber, a = this.column) {
					return i === this.lineNumber && a === this.column ? this : new R(i, a);
				}
				delta(i = 0, a = 0) {
					return this.with(this.lineNumber + i, this.column + a);
				}
				equals(i) {
					return R.equals(this, i);
				}
				static equals(i, a) {
					return !i && !a
						? !0
						: !!i && !!a && i.lineNumber === a.lineNumber && i.column === a.column;
				}
				isBefore(i) {
					return R.isBefore(this, i);
				}
				static isBefore(i, a) {
					return i.lineNumber < a.lineNumber
						? !0
						: a.lineNumber < i.lineNumber
						? !1
						: i.column < a.column;
				}
				isBeforeOrEqual(i) {
					return R.isBeforeOrEqual(this, i);
				}
				static isBeforeOrEqual(i, a) {
					return i.lineNumber < a.lineNumber
						? !0
						: a.lineNumber < i.lineNumber
						? !1
						: i.column <= a.column;
				}
				static compare(i, a) {
					const C = i.lineNumber | 0,
						S = a.lineNumber | 0;
					if (C === S) {
						const o = i.column | 0,
							s = a.column | 0;
						return o - s;
					}
					return C - S;
				}
				clone() {
					return new R(this.lineNumber, this.column);
				}
				toString() {
					return '(' + this.lineNumber + ',' + this.column + ')';
				}
				static lift(i) {
					return new R(i.lineNumber, i.column);
				}
				static isIPosition(i) {
					return i && typeof i.lineNumber == 'number' && typeof i.column == 'number';
				}
			}
			n.Position = R;
		}),
		Y(X[2], J([0, 1, 3]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.Range = void 0);
			class M {
				constructor(a, C, S, o) {
					a > S || (a === S && C > o)
						? ((this.startLineNumber = S),
						  (this.startColumn = o),
						  (this.endLineNumber = a),
						  (this.endColumn = C))
						: ((this.startLineNumber = a),
						  (this.startColumn = C),
						  (this.endLineNumber = S),
						  (this.endColumn = o));
				}
				isEmpty() {
					return M.isEmpty(this);
				}
				static isEmpty(a) {
					return a.startLineNumber === a.endLineNumber && a.startColumn === a.endColumn;
				}
				containsPosition(a) {
					return M.containsPosition(this, a);
				}
				static containsPosition(a, C) {
					return !(
						C.lineNumber < a.startLineNumber ||
						C.lineNumber > a.endLineNumber ||
						(C.lineNumber === a.startLineNumber && C.column < a.startColumn) ||
						(C.lineNumber === a.endLineNumber && C.column > a.endColumn)
					);
				}
				static strictContainsPosition(a, C) {
					return !(
						C.lineNumber < a.startLineNumber ||
						C.lineNumber > a.endLineNumber ||
						(C.lineNumber === a.startLineNumber && C.column <= a.startColumn) ||
						(C.lineNumber === a.endLineNumber && C.column >= a.endColumn)
					);
				}
				containsRange(a) {
					return M.containsRange(this, a);
				}
				static containsRange(a, C) {
					return !(
						C.startLineNumber < a.startLineNumber ||
						C.endLineNumber < a.startLineNumber ||
						C.startLineNumber > a.endLineNumber ||
						C.endLineNumber > a.endLineNumber ||
						(C.startLineNumber === a.startLineNumber && C.startColumn < a.startColumn) ||
						(C.endLineNumber === a.endLineNumber && C.endColumn > a.endColumn)
					);
				}
				strictContainsRange(a) {
					return M.strictContainsRange(this, a);
				}
				static strictContainsRange(a, C) {
					return !(
						C.startLineNumber < a.startLineNumber ||
						C.endLineNumber < a.startLineNumber ||
						C.startLineNumber > a.endLineNumber ||
						C.endLineNumber > a.endLineNumber ||
						(C.startLineNumber === a.startLineNumber && C.startColumn <= a.startColumn) ||
						(C.endLineNumber === a.endLineNumber && C.endColumn >= a.endColumn)
					);
				}
				plusRange(a) {
					return M.plusRange(this, a);
				}
				static plusRange(a, C) {
					let S, o, s, p;
					return (
						C.startLineNumber < a.startLineNumber
							? ((S = C.startLineNumber), (o = C.startColumn))
							: C.startLineNumber === a.startLineNumber
							? ((S = C.startLineNumber), (o = Math.min(C.startColumn, a.startColumn)))
							: ((S = a.startLineNumber), (o = a.startColumn)),
						C.endLineNumber > a.endLineNumber
							? ((s = C.endLineNumber), (p = C.endColumn))
							: C.endLineNumber === a.endLineNumber
							? ((s = C.endLineNumber), (p = Math.max(C.endColumn, a.endColumn)))
							: ((s = a.endLineNumber), (p = a.endColumn)),
						new M(S, o, s, p)
					);
				}
				intersectRanges(a) {
					return M.intersectRanges(this, a);
				}
				static intersectRanges(a, C) {
					let S = a.startLineNumber,
						o = a.startColumn,
						s = a.endLineNumber,
						p = a.endColumn;
					const e = C.startLineNumber,
						d = C.startColumn,
						g = C.endLineNumber,
						b = C.endColumn;
					return (
						S < e ? ((S = e), (o = d)) : S === e && (o = Math.max(o, d)),
						s > g ? ((s = g), (p = b)) : s === g && (p = Math.min(p, b)),
						S > s || (S === s && o > p) ? null : new M(S, o, s, p)
					);
				}
				equalsRange(a) {
					return M.equalsRange(this, a);
				}
				static equalsRange(a, C) {
					return !a && !C
						? !0
						: !!a &&
								!!C &&
								a.startLineNumber === C.startLineNumber &&
								a.startColumn === C.startColumn &&
								a.endLineNumber === C.endLineNumber &&
								a.endColumn === C.endColumn;
				}
				getEndPosition() {
					return M.getEndPosition(this);
				}
				static getEndPosition(a) {
					return new R.Position(a.endLineNumber, a.endColumn);
				}
				getStartPosition() {
					return M.getStartPosition(this);
				}
				static getStartPosition(a) {
					return new R.Position(a.startLineNumber, a.startColumn);
				}
				toString() {
					return (
						'[' +
						this.startLineNumber +
						',' +
						this.startColumn +
						' -> ' +
						this.endLineNumber +
						',' +
						this.endColumn +
						']'
					);
				}
				setEndPosition(a, C) {
					return new M(this.startLineNumber, this.startColumn, a, C);
				}
				setStartPosition(a, C) {
					return new M(a, C, this.endLineNumber, this.endColumn);
				}
				collapseToStart() {
					return M.collapseToStart(this);
				}
				static collapseToStart(a) {
					return new M(a.startLineNumber, a.startColumn, a.startLineNumber, a.startColumn);
				}
				collapseToEnd() {
					return M.collapseToEnd(this);
				}
				static collapseToEnd(a) {
					return new M(a.endLineNumber, a.endColumn, a.endLineNumber, a.endColumn);
				}
				delta(a) {
					return new M(
						this.startLineNumber + a,
						this.startColumn,
						this.endLineNumber + a,
						this.endColumn
					);
				}
				static fromPositions(a, C = a) {
					return new M(a.lineNumber, a.column, C.lineNumber, C.column);
				}
				static lift(a) {
					return a ? new M(a.startLineNumber, a.startColumn, a.endLineNumber, a.endColumn) : null;
				}
				static isIRange(a) {
					return (
						a &&
						typeof a.startLineNumber == 'number' &&
						typeof a.startColumn == 'number' &&
						typeof a.endLineNumber == 'number' &&
						typeof a.endColumn == 'number'
					);
				}
				static areIntersectingOrTouching(a, C) {
					return !(
						a.endLineNumber < C.startLineNumber ||
						(a.endLineNumber === C.startLineNumber && a.endColumn < C.startColumn) ||
						C.endLineNumber < a.startLineNumber ||
						(C.endLineNumber === a.startLineNumber && C.endColumn < a.startColumn)
					);
				}
				static areIntersecting(a, C) {
					return !(
						a.endLineNumber < C.startLineNumber ||
						(a.endLineNumber === C.startLineNumber && a.endColumn <= C.startColumn) ||
						C.endLineNumber < a.startLineNumber ||
						(C.endLineNumber === a.startLineNumber && C.endColumn <= a.startColumn)
					);
				}
				static compareRangesUsingStarts(a, C) {
					if (a && C) {
						const s = a.startLineNumber | 0,
							p = C.startLineNumber | 0;
						if (s === p) {
							const e = a.startColumn | 0,
								d = C.startColumn | 0;
							if (e === d) {
								const g = a.endLineNumber | 0,
									b = C.endLineNumber | 0;
								if (g === b) {
									const m = a.endColumn | 0,
										v = C.endColumn | 0;
									return m - v;
								}
								return g - b;
							}
							return e - d;
						}
						return s - p;
					}
					return (a ? 1 : 0) - (C ? 1 : 0);
				}
				static compareRangesUsingEnds(a, C) {
					return a.endLineNumber === C.endLineNumber
						? a.endColumn === C.endColumn
							? a.startLineNumber === C.startLineNumber
								? a.startColumn - C.startColumn
								: a.startLineNumber - C.startLineNumber
							: a.endColumn - C.endColumn
						: a.endLineNumber - C.endLineNumber;
				}
				static spansMultipleLines(a) {
					return a.endLineNumber > a.startLineNumber;
				}
				toJSON() {
					return this;
				}
			}
			n.Range = M;
		}),
		Y(X[34], J([0, 1, 3, 2]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.Selection = void 0);
			class i extends M.Range {
				constructor(C, S, o, s) {
					super(C, S, o, s),
						(this.selectionStartLineNumber = C),
						(this.selectionStartColumn = S),
						(this.positionLineNumber = o),
						(this.positionColumn = s);
				}
				toString() {
					return (
						'[' +
						this.selectionStartLineNumber +
						',' +
						this.selectionStartColumn +
						' -> ' +
						this.positionLineNumber +
						',' +
						this.positionColumn +
						']'
					);
				}
				equalsSelection(C) {
					return i.selectionsEqual(this, C);
				}
				static selectionsEqual(C, S) {
					return (
						C.selectionStartLineNumber === S.selectionStartLineNumber &&
						C.selectionStartColumn === S.selectionStartColumn &&
						C.positionLineNumber === S.positionLineNumber &&
						C.positionColumn === S.positionColumn
					);
				}
				getDirection() {
					return this.selectionStartLineNumber === this.startLineNumber &&
						this.selectionStartColumn === this.startColumn
						? 0
						: 1;
				}
				setEndPosition(C, S) {
					return this.getDirection() === 0
						? new i(this.startLineNumber, this.startColumn, C, S)
						: new i(C, S, this.startLineNumber, this.startColumn);
				}
				getPosition() {
					return new R.Position(this.positionLineNumber, this.positionColumn);
				}
				getSelectionStart() {
					return new R.Position(this.selectionStartLineNumber, this.selectionStartColumn);
				}
				setStartPosition(C, S) {
					return this.getDirection() === 0
						? new i(C, S, this.endLineNumber, this.endColumn)
						: new i(this.endLineNumber, this.endColumn, C, S);
				}
				static fromPositions(C, S = C) {
					return new i(C.lineNumber, C.column, S.lineNumber, S.column);
				}
				static fromRange(C, S) {
					return S === 0
						? new i(C.startLineNumber, C.startColumn, C.endLineNumber, C.endColumn)
						: new i(C.endLineNumber, C.endColumn, C.startLineNumber, C.startColumn);
				}
				static liftSelection(C) {
					return new i(
						C.selectionStartLineNumber,
						C.selectionStartColumn,
						C.positionLineNumber,
						C.positionColumn
					);
				}
				static selectionsArrEqual(C, S) {
					if ((C && !S) || (!C && S)) return !1;
					if (!C && !S) return !0;
					if (C.length !== S.length) return !1;
					for (let o = 0, s = C.length; o < s; o++)
						if (!this.selectionsEqual(C[o], S[o])) return !1;
					return !0;
				}
				static isISelection(C) {
					return (
						C &&
						typeof C.selectionStartLineNumber == 'number' &&
						typeof C.selectionStartColumn == 'number' &&
						typeof C.positionLineNumber == 'number' &&
						typeof C.positionColumn == 'number'
					);
				}
				static createWithDirection(C, S, o, s, p) {
					return p === 0 ? new i(C, S, o, s) : new i(o, s, C, S);
				}
			}
			n.Selection = i;
		}),
		Y(X[35], J([0, 1, 20]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.getMapForWordSeparators = n.WordCharacterClassifier = void 0);
			class M extends R.CharacterClassifier {
				constructor(C) {
					super(0);
					for (let S = 0, o = C.length; S < o; S++) this.set(C.charCodeAt(S), 2);
					this.set(32, 1), this.set(9, 1);
				}
			}
			n.WordCharacterClassifier = M;
			function i(a) {
				const C = {};
				return (S) => (C.hasOwnProperty(S) || (C[S] = a(S)), C[S]);
			}
			n.getMapForWordSeparators = i((a) => new M(a));
		}),
		Y(X[22], J([0, 1, 15, 16]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.getWordAtText =
					n.ensureValidWordDefinition =
					n.DEFAULT_WORD_REGEXP =
					n.USUAL_WORD_SEPARATORS =
						void 0),
				(n.USUAL_WORD_SEPARATORS = '`~!@#$%^&*()-=+[{]}\\|;:\'",.<>/?');
			function i(s = '') {
				let p = '(-?\\d*\\.\\d\\w*)|([^';
				for (const e of n.USUAL_WORD_SEPARATORS) s.indexOf(e) >= 0 || (p += '\\' + e);
				return (p += '\\s]+)'), new RegExp(p, 'g');
			}
			n.DEFAULT_WORD_REGEXP = i();
			function a(s) {
				let p = n.DEFAULT_WORD_REGEXP;
				if (s && s instanceof RegExp)
					if (s.global) p = s;
					else {
						let e = 'g';
						s.ignoreCase && (e += 'i'),
							s.multiline && (e += 'm'),
							s.unicode && (e += 'u'),
							(p = new RegExp(s.source, e));
					}
				return (p.lastIndex = 0), p;
			}
			n.ensureValidWordDefinition = a;
			const C = new M.LinkedList();
			C.unshift({ maxLen: 1e3, windowSize: 15, timeBudget: 150 });
			function S(s, p, e, d, g) {
				if ((g || (g = R.Iterable.first(C)), e.length > g.maxLen)) {
					let L = s - g.maxLen / 2;
					return (
						L < 0 ? (L = 0) : (d += L), (e = e.substring(L, s + g.maxLen / 2)), S(s, p, e, d, g)
					);
				}
				const b = Date.now(),
					m = s - 1 - d;
				let v = -1,
					E = null;
				for (let L = 1; !(Date.now() - b >= g.timeBudget); L++) {
					const A = m - g.windowSize * L;
					p.lastIndex = Math.max(0, A);
					const w = o(p, e, m, v);
					if ((!w && E) || ((E = w), A <= 0)) break;
					v = A;
				}
				if (E) {
					const L = {
						word: E[0],
						startColumn: d + 1 + E.index,
						endColumn: d + 1 + E.index + E[0].length
					};
					return (p.lastIndex = 0), L;
				}
				return null;
			}
			n.getWordAtText = S;
			function o(s, p, e, d) {
				let g;
				for (; (g = s.exec(p)); ) {
					const b = g.index || 0;
					if (b <= e && s.lastIndex >= e) return g;
					if (d > 0 && b > d) return null;
				}
				return null;
			}
		}),
		Y(X[7], J([0, 1, 4, 6]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.DateTimeout = n.InfiniteTimeout = n.SequenceDiff = n.DiffAlgorithmResult = void 0);
			class i {
				static trivial(s, p) {
					return new i([new a(new M.OffsetRange(0, s.length), new M.OffsetRange(0, p.length))], !1);
				}
				static trivialTimedOut(s, p) {
					return new i([new a(new M.OffsetRange(0, s.length), new M.OffsetRange(0, p.length))], !0);
				}
				constructor(s, p) {
					(this.diffs = s), (this.hitTimeout = p);
				}
			}
			n.DiffAlgorithmResult = i;
			class a {
				constructor(s, p) {
					(this.seq1Range = s), (this.seq2Range = p);
				}
				reverse() {
					return new a(this.seq2Range, this.seq1Range);
				}
				toString() {
					return `${this.seq1Range} <-> ${this.seq2Range}`;
				}
				join(s) {
					return new a(this.seq1Range.join(s.seq1Range), this.seq2Range.join(s.seq2Range));
				}
			}
			n.SequenceDiff = a;
			class C {
				isValid() {
					return !0;
				}
			}
			(n.InfiniteTimeout = C), (C.instance = new C());
			class S {
				constructor(s) {
					if (((this.timeout = s), (this.startTime = Date.now()), (this.valid = !0), s <= 0))
						throw new R.BugIndicatingError('timeout must be positive');
				}
				isValid() {
					if (!(Date.now() - this.startTime < this.timeout) && this.valid) {
						this.valid = !1;
						debugger;
					}
					return this.valid;
				}
			}
			n.DateTimeout = S;
		}),
		Y(X[36], J([0, 1, 6, 7]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.shiftSequenceDiffs =
					n.joinSequenceDiffs =
					n.smoothenSequenceDiffs =
					n.optimizeSequenceDiffs =
						void 0);
			function i(s, p, e) {
				let d = e;
				return (d = C(s, p, d)), (d = S(s, p, d)), d;
			}
			n.optimizeSequenceDiffs = i;
			function a(s, p, e) {
				const d = [];
				for (const g of e) {
					const b = d[d.length - 1];
					if (!b) {
						d.push(g);
						continue;
					}
					g.seq1Range.start - b.seq1Range.endExclusive <= 2 ||
					g.seq2Range.start - b.seq2Range.endExclusive <= 2
						? (d[d.length - 1] = new M.SequenceDiff(
								b.seq1Range.join(g.seq1Range),
								b.seq2Range.join(g.seq2Range)
						  ))
						: d.push(g);
				}
				return d;
			}
			n.smoothenSequenceDiffs = a;
			function C(s, p, e) {
				const d = [];
				e.length > 0 && d.push(e[0]);
				for (let g = 1; g < e.length; g++) {
					const b = d[d.length - 1],
						m = e[g];
					if (m.seq1Range.isEmpty) {
						let v = !0;
						const E = m.seq1Range.start - b.seq1Range.endExclusive;
						for (let L = 1; L <= E; L++)
							if (
								p.getElement(m.seq2Range.start - L) !== p.getElement(m.seq2Range.endExclusive - L)
							) {
								v = !1;
								break;
							}
						if (v) {
							d[d.length - 1] = new M.SequenceDiff(
								b.seq1Range,
								new R.OffsetRange(b.seq2Range.start, m.seq2Range.endExclusive - E)
							);
							continue;
						}
					}
					d.push(m);
				}
				return d;
			}
			n.joinSequenceDiffs = C;
			function S(s, p, e) {
				if (!s.getBoundaryScore || !p.getBoundaryScore) return e;
				for (let d = 0; d < e.length; d++) {
					const g = e[d];
					if (g.seq1Range.isEmpty) {
						const b = d > 0 ? e[d - 1].seq2Range.endExclusive : -1,
							m = d + 1 < e.length ? e[d + 1].seq2Range.start : p.length;
						e[d] = o(g, s, p, m, b);
					} else if (g.seq2Range.isEmpty) {
						const b = d > 0 ? e[d - 1].seq1Range.endExclusive : -1,
							m = d + 1 < e.length ? e[d + 1].seq1Range.start : s.length;
						e[d] = o(g.reverse(), p, s, m, b).reverse();
					}
				}
				return e;
			}
			n.shiftSequenceDiffs = S;
			function o(s, p, e, d, g) {
				let m = 1;
				for (
					;
					s.seq2Range.start - m > g &&
					e.getElement(s.seq2Range.start - m) === e.getElement(s.seq2Range.endExclusive - m) &&
					m < 20;

				)
					m++;
				m--;
				let v = 0;
				for (
					;
					s.seq2Range.start + v < d &&
					e.getElement(s.seq2Range.start + v) === e.getElement(s.seq2Range.endExclusive + v) &&
					v < 20;

				)
					v++;
				if (m === 0 && v === 0) return s;
				let E = 0,
					L = -1;
				for (let A = -m; A <= v; A++) {
					const w = s.seq2Range.start + A,
						c = s.seq2Range.endExclusive + A,
						r = s.seq1Range.start + A,
						u = p.getBoundaryScore(r) + e.getBoundaryScore(w) + e.getBoundaryScore(c);
					u > L && ((L = u), (E = A));
				}
				return E !== 0 ? new M.SequenceDiff(s.seq1Range.delta(E), s.seq2Range.delta(E)) : s;
			}
		}),
		Y(X[37], J([0, 1, 6, 7]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.MyersDiffAlgorithm = void 0);
			class i {
				compute(s, p, e = M.InfiniteTimeout.instance) {
					if (s.length === 0 || p.length === 0) return M.DiffAlgorithmResult.trivial(s, p);
					function d(c, r) {
						for (; c < s.length && r < p.length && s.getElement(c) === p.getElement(r); ) c++, r++;
						return c;
					}
					let g = 0;
					const b = new C();
					b.set(0, d(0, 0));
					const m = new S();
					m.set(0, b.get(0) === 0 ? null : new a(null, 0, 0, b.get(0)));
					let v = 0;
					e: for (;;)
						for (g++, v = -g; v <= g; v += 2) {
							if (!e.isValid()) return M.DiffAlgorithmResult.trivialTimedOut(s, p);
							const c = v === g ? -1 : b.get(v + 1),
								r = v === -g ? -1 : b.get(v - 1) + 1,
								u = Math.min(Math.max(c, r), s.length),
								h = u - v,
								f = d(u, h);
							b.set(v, f);
							const l = u === c ? m.get(v + 1) : m.get(v - 1);
							if (
								(m.set(v, f !== u ? new a(l, u, h, f - u) : l),
								b.get(v) === s.length && b.get(v) - v === p.length)
							)
								break e;
						}
					let E = m.get(v);
					const L = [];
					let A = s.length,
						w = p.length;
					for (;;) {
						const c = E ? E.x + E.length : 0,
							r = E ? E.y + E.length : 0;
						if (
							((c !== A || r !== w) &&
								L.push(new M.SequenceDiff(new R.OffsetRange(c, A), new R.OffsetRange(r, w))),
							!E)
						)
							break;
						(A = E.x), (w = E.y), (E = E.prev);
					}
					return L.reverse(), new M.DiffAlgorithmResult(L, !1);
				}
			}
			n.MyersDiffAlgorithm = i;
			class a {
				constructor(s, p, e, d) {
					(this.prev = s), (this.x = p), (this.y = e), (this.length = d);
				}
			}
			class C {
				constructor() {
					(this.positiveArr = new Int32Array(10)), (this.negativeArr = new Int32Array(10));
				}
				get(s) {
					return s < 0 ? ((s = -s - 1), this.negativeArr[s]) : this.positiveArr[s];
				}
				set(s, p) {
					if (s < 0) {
						if (((s = -s - 1), s >= this.negativeArr.length)) {
							const e = this.negativeArr;
							(this.negativeArr = new Int32Array(e.length * 2)), this.negativeArr.set(e);
						}
						this.negativeArr[s] = p;
					} else {
						if (s >= this.positiveArr.length) {
							const e = this.positiveArr;
							(this.positiveArr = new Int32Array(e.length * 2)), this.positiveArr.set(e);
						}
						this.positiveArr[s] = p;
					}
				}
			}
			class S {
				constructor() {
					(this.positiveArr = []), (this.negativeArr = []);
				}
				get(s) {
					return s < 0 ? ((s = -s - 1), this.negativeArr[s]) : this.positiveArr[s];
				}
				set(s, p) {
					s < 0 ? ((s = -s - 1), (this.negativeArr[s] = p)) : (this.positiveArr[s] = p);
				}
			}
		}),
		Y(X[38], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.Array2D = void 0);
			class R {
				constructor(i, a) {
					(this.width = i), (this.height = a), (this.array = []), (this.array = new Array(i * a));
				}
				get(i, a) {
					return this.array[i + a * this.width];
				}
				set(i, a, C) {
					this.array[i + a * this.width] = C;
				}
			}
			n.Array2D = R;
		}),
		Y(X[39], J([0, 1, 6, 7, 38]), function (x, n, R, M, i) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.DynamicProgrammingDiffing = void 0);
			class a {
				compute(S, o, s = M.InfiniteTimeout.instance, p) {
					if (S.length === 0 || o.length === 0) return M.DiffAlgorithmResult.trivial(S, o);
					const e = new i.Array2D(S.length, o.length),
						d = new i.Array2D(S.length, o.length),
						g = new i.Array2D(S.length, o.length);
					for (let w = 0; w < S.length; w++)
						for (let c = 0; c < o.length; c++) {
							if (!s.isValid()) return M.DiffAlgorithmResult.trivialTimedOut(S, o);
							const r = w === 0 ? 0 : e.get(w - 1, c),
								u = c === 0 ? 0 : e.get(w, c - 1);
							let h;
							S.getElement(w) === o.getElement(c)
								? (w === 0 || c === 0 ? (h = 0) : (h = e.get(w - 1, c - 1)),
								  w > 0 && c > 0 && d.get(w - 1, c - 1) === 3 && (h += g.get(w - 1, c - 1)),
								  (h += p ? p(w, c) : 1))
								: (h = -1);
							const f = Math.max(r, u, h);
							if (f === h) {
								const l = w > 0 && c > 0 ? g.get(w - 1, c - 1) : 0;
								g.set(w, c, l + 1), d.set(w, c, 3);
							} else
								f === r
									? (g.set(w, c, 0), d.set(w, c, 1))
									: f === u && (g.set(w, c, 0), d.set(w, c, 2));
							e.set(w, c, f);
						}
					const b = [];
					let m = S.length,
						v = o.length;
					function E(w, c) {
						(w + 1 !== m || c + 1 !== v) &&
							b.push(new M.SequenceDiff(new R.OffsetRange(w + 1, m), new R.OffsetRange(c + 1, v))),
							(m = w),
							(v = c);
					}
					let L = S.length - 1,
						A = o.length - 1;
					for (; L >= 0 && A >= 0; )
						d.get(L, A) === 3 ? (E(L, A), L--, A--) : d.get(L, A) === 1 ? L-- : A--;
					return E(-1, -1), b.reverse(), new M.DiffAlgorithmResult(b, !1);
				}
			}
			n.DynamicProgrammingDiffing = a;
		}),
		Y(X[23], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.RangeMapping = n.LineRangeMapping = n.LinesDiff = void 0);
			class R {
				constructor(C, S) {
					(this.changes = C), (this.hitTimeout = S);
				}
			}
			n.LinesDiff = R;
			class M {
				constructor(C, S, o) {
					(this.originalRange = C), (this.modifiedRange = S), (this.innerChanges = o);
				}
				toString() {
					return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
				}
				get changedLineCount() {
					return Math.max(this.originalRange.length, this.modifiedRange.length);
				}
			}
			n.LineRangeMapping = M;
			class i {
				constructor(C, S) {
					(this.originalRange = C), (this.modifiedRange = S);
				}
				toString() {
					return `{${this.originalRange.toString()}->${this.modifiedRange.toString()}}`;
				}
			}
			n.RangeMapping = i;
		}),
		Y(X[40], J([0, 1, 17, 23, 5, 2, 10, 21]), function (x, n, R, M, i, a, C, S) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.DiffComputer = n.SmartLinesDiffComputer = void 0);
			const o = 3;
			class s {
				computeDiff(c, r, u) {
					var h;
					const l = new v(c, r, {
							maxComputationTime: u.maxComputationTimeMs,
							shouldIgnoreTrimWhitespace: u.ignoreTrimWhitespace,
							shouldComputeCharChanges: !0,
							shouldMakePrettyDiff: !0,
							shouldPostProcessCharChanges: !0
						}).computeDiff(),
						_ = [];
					let N = null;
					for (const y of l.changes) {
						let D;
						y.originalEndLineNumber === 0
							? (D = new S.LineRange(y.originalStartLineNumber + 1, y.originalStartLineNumber + 1))
							: (D = new S.LineRange(y.originalStartLineNumber, y.originalEndLineNumber + 1));
						let k;
						y.modifiedEndLineNumber === 0
							? (k = new S.LineRange(y.modifiedStartLineNumber + 1, y.modifiedStartLineNumber + 1))
							: (k = new S.LineRange(y.modifiedStartLineNumber, y.modifiedEndLineNumber + 1));
						let B = new M.LineRangeMapping(
							D,
							k,
							(h = y.charChanges) === null || h === void 0
								? void 0
								: h.map(
										(I) =>
											new M.RangeMapping(
												new a.Range(
													I.originalStartLineNumber,
													I.originalStartColumn,
													I.originalEndLineNumber,
													I.originalEndColumn
												),
												new a.Range(
													I.modifiedStartLineNumber,
													I.modifiedStartColumn,
													I.modifiedEndLineNumber,
													I.modifiedEndColumn
												)
											)
								  )
						);
						N &&
							(N.modifiedRange.endLineNumberExclusive === B.modifiedRange.startLineNumber ||
								N.originalRange.endLineNumberExclusive === B.originalRange.startLineNumber) &&
							((B = new M.LineRangeMapping(
								N.originalRange.join(B.originalRange),
								N.modifiedRange.join(B.modifiedRange),
								N.innerChanges && B.innerChanges ? N.innerChanges.concat(B.innerChanges) : void 0
							)),
							_.pop()),
							_.push(B),
							(N = B);
					}
					return (
						(0, C.assertFn)(() =>
							(0, C.checkAdjacentItems)(
								_,
								(y, D) =>
									D.originalRange.startLineNumber - y.originalRange.endLineNumberExclusive ===
										D.modifiedRange.startLineNumber - y.modifiedRange.endLineNumberExclusive &&
									y.originalRange.endLineNumberExclusive < D.originalRange.startLineNumber &&
									y.modifiedRange.endLineNumberExclusive < D.modifiedRange.startLineNumber
							)
						),
						new M.LinesDiff(_, l.quitEarly)
					);
				}
			}
			n.SmartLinesDiffComputer = s;
			function p(w, c, r, u) {
				return new R.LcsDiff(w, c, r).ComputeDiff(u);
			}
			class e {
				constructor(c) {
					const r = [],
						u = [];
					for (let h = 0, f = c.length; h < f; h++) (r[h] = E(c[h], 1)), (u[h] = L(c[h], 1));
					(this.lines = c), (this._startColumns = r), (this._endColumns = u);
				}
				getElements() {
					const c = [];
					for (let r = 0, u = this.lines.length; r < u; r++)
						c[r] = this.lines[r].substring(this._startColumns[r] - 1, this._endColumns[r] - 1);
					return c;
				}
				getStrictElement(c) {
					return this.lines[c];
				}
				getStartLineNumber(c) {
					return c + 1;
				}
				getEndLineNumber(c) {
					return c + 1;
				}
				createCharSequence(c, r, u) {
					const h = [],
						f = [],
						l = [];
					let _ = 0;
					for (let N = r; N <= u; N++) {
						const y = this.lines[N],
							D = c ? this._startColumns[N] : 1,
							k = c ? this._endColumns[N] : y.length + 1;
						for (let B = D; B < k; B++)
							(h[_] = y.charCodeAt(B - 1)), (f[_] = N + 1), (l[_] = B), _++;
						!c && N < u && ((h[_] = 10), (f[_] = N + 1), (l[_] = y.length + 1), _++);
					}
					return new d(h, f, l);
				}
			}
			class d {
				constructor(c, r, u) {
					(this._charCodes = c), (this._lineNumbers = r), (this._columns = u);
				}
				toString() {
					return (
						'[' +
						this._charCodes
							.map(
								(c, r) =>
									(c === 10 ? '\\n' : String.fromCharCode(c)) +
									`-(${this._lineNumbers[r]},${this._columns[r]})`
							)
							.join(', ') +
						']'
					);
				}
				_assertIndex(c, r) {
					if (c < 0 || c >= r.length) throw new Error('Illegal index');
				}
				getElements() {
					return this._charCodes;
				}
				getStartLineNumber(c) {
					return c > 0 && c === this._lineNumbers.length
						? this.getEndLineNumber(c - 1)
						: (this._assertIndex(c, this._lineNumbers), this._lineNumbers[c]);
				}
				getEndLineNumber(c) {
					return c === -1
						? this.getStartLineNumber(c + 1)
						: (this._assertIndex(c, this._lineNumbers),
						  this._charCodes[c] === 10 ? this._lineNumbers[c] + 1 : this._lineNumbers[c]);
				}
				getStartColumn(c) {
					return c > 0 && c === this._columns.length
						? this.getEndColumn(c - 1)
						: (this._assertIndex(c, this._columns), this._columns[c]);
				}
				getEndColumn(c) {
					return c === -1
						? this.getStartColumn(c + 1)
						: (this._assertIndex(c, this._columns),
						  this._charCodes[c] === 10 ? 1 : this._columns[c] + 1);
				}
			}
			class g {
				constructor(c, r, u, h, f, l, _, N) {
					(this.originalStartLineNumber = c),
						(this.originalStartColumn = r),
						(this.originalEndLineNumber = u),
						(this.originalEndColumn = h),
						(this.modifiedStartLineNumber = f),
						(this.modifiedStartColumn = l),
						(this.modifiedEndLineNumber = _),
						(this.modifiedEndColumn = N);
				}
				static createFromDiffChange(c, r, u) {
					const h = r.getStartLineNumber(c.originalStart),
						f = r.getStartColumn(c.originalStart),
						l = r.getEndLineNumber(c.originalStart + c.originalLength - 1),
						_ = r.getEndColumn(c.originalStart + c.originalLength - 1),
						N = u.getStartLineNumber(c.modifiedStart),
						y = u.getStartColumn(c.modifiedStart),
						D = u.getEndLineNumber(c.modifiedStart + c.modifiedLength - 1),
						k = u.getEndColumn(c.modifiedStart + c.modifiedLength - 1);
					return new g(h, f, l, _, N, y, D, k);
				}
			}
			function b(w) {
				if (w.length <= 1) return w;
				const c = [w[0]];
				let r = c[0];
				for (let u = 1, h = w.length; u < h; u++) {
					const f = w[u],
						l = f.originalStart - (r.originalStart + r.originalLength),
						_ = f.modifiedStart - (r.modifiedStart + r.modifiedLength);
					Math.min(l, _) < o
						? ((r.originalLength = f.originalStart + f.originalLength - r.originalStart),
						  (r.modifiedLength = f.modifiedStart + f.modifiedLength - r.modifiedStart))
						: (c.push(f), (r = f));
				}
				return c;
			}
			class m {
				constructor(c, r, u, h, f) {
					(this.originalStartLineNumber = c),
						(this.originalEndLineNumber = r),
						(this.modifiedStartLineNumber = u),
						(this.modifiedEndLineNumber = h),
						(this.charChanges = f);
				}
				static createFromDiffResult(c, r, u, h, f, l, _) {
					let N, y, D, k, B;
					if (
						(r.originalLength === 0
							? ((N = u.getStartLineNumber(r.originalStart) - 1), (y = 0))
							: ((N = u.getStartLineNumber(r.originalStart)),
							  (y = u.getEndLineNumber(r.originalStart + r.originalLength - 1))),
						r.modifiedLength === 0
							? ((D = h.getStartLineNumber(r.modifiedStart) - 1), (k = 0))
							: ((D = h.getStartLineNumber(r.modifiedStart)),
							  (k = h.getEndLineNumber(r.modifiedStart + r.modifiedLength - 1))),
						l &&
							r.originalLength > 0 &&
							r.originalLength < 20 &&
							r.modifiedLength > 0 &&
							r.modifiedLength < 20 &&
							f())
					) {
						const I = u.createCharSequence(
								c,
								r.originalStart,
								r.originalStart + r.originalLength - 1
							),
							U = h.createCharSequence(c, r.modifiedStart, r.modifiedStart + r.modifiedLength - 1);
						if (I.getElements().length > 0 && U.getElements().length > 0) {
							let V = p(I, U, f, !0).changes;
							_ && (V = b(V)), (B = []);
							for (let Q = 0, F = V.length; Q < F; Q++) B.push(g.createFromDiffChange(V[Q], I, U));
						}
					}
					return new m(N, y, D, k, B);
				}
			}
			class v {
				constructor(c, r, u) {
					(this.shouldComputeCharChanges = u.shouldComputeCharChanges),
						(this.shouldPostProcessCharChanges = u.shouldPostProcessCharChanges),
						(this.shouldIgnoreTrimWhitespace = u.shouldIgnoreTrimWhitespace),
						(this.shouldMakePrettyDiff = u.shouldMakePrettyDiff),
						(this.originalLines = c),
						(this.modifiedLines = r),
						(this.original = new e(c)),
						(this.modified = new e(r)),
						(this.continueLineDiff = A(u.maxComputationTime)),
						(this.continueCharDiff = A(
							u.maxComputationTime === 0 ? 0 : Math.min(u.maxComputationTime, 5e3)
						));
				}
				computeDiff() {
					if (this.original.lines.length === 1 && this.original.lines[0].length === 0)
						return this.modified.lines.length === 1 && this.modified.lines[0].length === 0
							? { quitEarly: !1, changes: [] }
							: {
									quitEarly: !1,
									changes: [
										{
											originalStartLineNumber: 1,
											originalEndLineNumber: 1,
											modifiedStartLineNumber: 1,
											modifiedEndLineNumber: this.modified.lines.length,
											charChanges: void 0
										}
									]
							  };
					if (this.modified.lines.length === 1 && this.modified.lines[0].length === 0)
						return {
							quitEarly: !1,
							changes: [
								{
									originalStartLineNumber: 1,
									originalEndLineNumber: this.original.lines.length,
									modifiedStartLineNumber: 1,
									modifiedEndLineNumber: 1,
									charChanges: void 0
								}
							]
						};
					const c = p(
							this.original,
							this.modified,
							this.continueLineDiff,
							this.shouldMakePrettyDiff
						),
						r = c.changes,
						u = c.quitEarly;
					if (this.shouldIgnoreTrimWhitespace) {
						const _ = [];
						for (let N = 0, y = r.length; N < y; N++)
							_.push(
								m.createFromDiffResult(
									this.shouldIgnoreTrimWhitespace,
									r[N],
									this.original,
									this.modified,
									this.continueCharDiff,
									this.shouldComputeCharChanges,
									this.shouldPostProcessCharChanges
								)
							);
						return { quitEarly: u, changes: _ };
					}
					const h = [];
					let f = 0,
						l = 0;
					for (let _ = -1, N = r.length; _ < N; _++) {
						const y = _ + 1 < N ? r[_ + 1] : null,
							D = y ? y.originalStart : this.originalLines.length,
							k = y ? y.modifiedStart : this.modifiedLines.length;
						for (; f < D && l < k; ) {
							const B = this.originalLines[f],
								I = this.modifiedLines[l];
							if (B !== I) {
								{
									let U = E(B, 1),
										V = E(I, 1);
									for (; U > 1 && V > 1; ) {
										const Q = B.charCodeAt(U - 2),
											F = I.charCodeAt(V - 2);
										if (Q !== F) break;
										U--, V--;
									}
									(U > 1 || V > 1) &&
										this._pushTrimWhitespaceCharChange(h, f + 1, 1, U, l + 1, 1, V);
								}
								{
									let U = L(B, 1),
										V = L(I, 1);
									const Q = B.length + 1,
										F = I.length + 1;
									for (; U < Q && V < F; ) {
										const T = B.charCodeAt(U - 1),
											q = B.charCodeAt(V - 1);
										if (T !== q) break;
										U++, V++;
									}
									(U < Q || V < F) &&
										this._pushTrimWhitespaceCharChange(h, f + 1, U, Q, l + 1, V, F);
								}
							}
							f++, l++;
						}
						y &&
							(h.push(
								m.createFromDiffResult(
									this.shouldIgnoreTrimWhitespace,
									y,
									this.original,
									this.modified,
									this.continueCharDiff,
									this.shouldComputeCharChanges,
									this.shouldPostProcessCharChanges
								)
							),
							(f += y.originalLength),
							(l += y.modifiedLength));
					}
					return { quitEarly: u, changes: h };
				}
				_pushTrimWhitespaceCharChange(c, r, u, h, f, l, _) {
					if (this._mergeTrimWhitespaceCharChange(c, r, u, h, f, l, _)) return;
					let N;
					this.shouldComputeCharChanges && (N = [new g(r, u, r, h, f, l, f, _)]),
						c.push(new m(r, r, f, f, N));
				}
				_mergeTrimWhitespaceCharChange(c, r, u, h, f, l, _) {
					const N = c.length;
					if (N === 0) return !1;
					const y = c[N - 1];
					return y.originalEndLineNumber === 0 || y.modifiedEndLineNumber === 0
						? !1
						: y.originalEndLineNumber === r && y.modifiedEndLineNumber === f
						? (this.shouldComputeCharChanges &&
								y.charChanges &&
								y.charChanges.push(new g(r, u, r, h, f, l, f, _)),
						  !0)
						: y.originalEndLineNumber + 1 === r && y.modifiedEndLineNumber + 1 === f
						? ((y.originalEndLineNumber = r),
						  (y.modifiedEndLineNumber = f),
						  this.shouldComputeCharChanges &&
								y.charChanges &&
								y.charChanges.push(new g(r, u, r, h, f, l, f, _)),
						  !0)
						: !1;
				}
			}
			n.DiffComputer = v;
			function E(w, c) {
				const r = i.firstNonWhitespaceIndex(w);
				return r === -1 ? c : r + 1;
			}
			function L(w, c) {
				const r = i.lastNonWhitespaceIndex(w);
				return r === -1 ? c : r + 2;
			}
			function A(w) {
				if (w === 0) return () => !0;
				const c = Date.now();
				return () => Date.now() - c < w;
			}
		}),
		Y(
			X[41],
			J([0, 1, 10, 21, 6, 3, 2, 7, 39, 36, 37, 23]),
			function (x, n, R, M, i, a, C, S, o, s, p, e) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.LineSequence =
						n.getLineRangeMapping =
						n.lineRangeMappingFromRangeMappings =
						n.StandardLinesDiffComputer =
							void 0);
				class d {
					constructor() {
						(this.dynamicProgrammingDiffing = new o.DynamicProgrammingDiffing()),
							(this.myersDiffingAlgorithm = new p.MyersDiffAlgorithm());
					}
					computeDiff(_, N, y) {
						const D =
								y.maxComputationTimeMs === 0
									? S.InfiniteTimeout.instance
									: new S.DateTimeout(y.maxComputationTimeMs),
							k = !y.ignoreTrimWhitespace,
							B = new Map();
						function I(re) {
							let se = B.get(re);
							return se === void 0 && ((se = B.size), B.set(re, se)), se;
						}
						const U = _.map((re) => I(re.trim())),
							V = N.map((re) => I(re.trim())),
							Q = new L(U, _),
							F = new L(V, N),
							T = (() =>
								Q.length + F.length < 1500
									? this.dynamicProgrammingDiffing.compute(Q, F, D, (re, se) =>
											_[re] === N[se]
												? N[se].length === 0
													? 0.1
													: 1 + Math.log(1 + N[se].length)
												: 0.99
									  )
									: this.myersDiffingAlgorithm.compute(Q, F))();
						let q = T.diffs,
							H = T.hitTimeout;
						q = (0, s.optimizeSequenceDiffs)(Q, F, q);
						const t = [],
							oe = (re) => {
								if (k)
									for (let se = 0; se < re; se++) {
										const ge = ne + se,
											Le = he + se;
										if (_[ge] !== N[Le]) {
											const Se = this.refineDiff(
												_,
												N,
												new S.SequenceDiff(
													new i.OffsetRange(ge, ge + 1),
													new i.OffsetRange(Le, Le + 1)
												),
												D,
												k
											);
											for (const Z of Se.mappings) t.push(Z);
											Se.hitTimeout && (H = !0);
										}
									}
							};
						let ne = 0,
							he = 0;
						for (const re of q) {
							(0, R.assertFn)(() => re.seq1Range.start - ne === re.seq2Range.start - he);
							const se = re.seq1Range.start - ne;
							oe(se), (ne = re.seq1Range.endExclusive), (he = re.seq2Range.endExclusive);
							const ge = this.refineDiff(_, N, re, D, k);
							ge.hitTimeout && (H = !0);
							for (const Le of ge.mappings) t.push(Le);
						}
						oe(_.length - ne);
						const be = m(t, _, N);
						return new e.LinesDiff(be, H);
					}
					refineDiff(_, N, y, D, k) {
						const B = new w(_, y.seq1Range, k),
							I = new w(N, y.seq2Range, k),
							U =
								B.length + I.length < 500
									? this.dynamicProgrammingDiffing.compute(B, I, D)
									: this.myersDiffingAlgorithm.compute(B, I, D);
						let V = U.diffs;
						return (
							(V = (0, s.optimizeSequenceDiffs)(B, I, V)),
							(V = g(B, I, V)),
							(V = (0, s.smoothenSequenceDiffs)(B, I, V)),
							{
								mappings: V.map(
									(F) =>
										new e.RangeMapping(B.translateRange(F.seq1Range), I.translateRange(F.seq2Range))
								),
								hitTimeout: U.hitTimeout
							}
						);
					}
				}
				n.StandardLinesDiffComputer = d;
				function g(l, _, N) {
					const y = [];
					let D;
					function k() {
						if (!D) return;
						const I = D.s1Range.length - D.deleted,
							U = D.s2Range.length - D.added;
						Math.max(D.deleted, D.added) + (D.count - 1) > I &&
							y.push(new S.SequenceDiff(D.s1Range, D.s2Range)),
							(D = void 0);
					}
					for (const I of N) {
						let U = function (q, H) {
							var t, oe, ne, he;
							if (!D || !D.s1Range.containsRange(q) || !D.s2Range.containsRange(H))
								if (D && !(D.s1Range.endExclusive < q.start && D.s2Range.endExclusive < H.start)) {
									const se = i.OffsetRange.tryCreate(D.s1Range.endExclusive, q.start),
										ge = i.OffsetRange.tryCreate(D.s2Range.endExclusive, H.start);
									(D.deleted += (t = se?.length) !== null && t !== void 0 ? t : 0),
										(D.added += (oe = ge?.length) !== null && oe !== void 0 ? oe : 0),
										(D.s1Range = D.s1Range.join(q)),
										(D.s2Range = D.s2Range.join(H));
								} else k(), (D = { added: 0, deleted: 0, count: 0, s1Range: q, s2Range: H });
							const be = q.intersect(I.seq1Range),
								re = H.intersect(I.seq2Range);
							D.count++,
								(D.deleted += (ne = be?.length) !== null && ne !== void 0 ? ne : 0),
								(D.added += (he = re?.length) !== null && he !== void 0 ? he : 0);
						};
						const V = l.findWordContaining(I.seq1Range.start - 1),
							Q = _.findWordContaining(I.seq2Range.start - 1),
							F = l.findWordContaining(I.seq1Range.endExclusive),
							T = _.findWordContaining(I.seq2Range.endExclusive);
						V && F && Q && T && V.equals(F) && Q.equals(T)
							? U(V, Q)
							: (V && Q && U(V, Q), F && T && U(F, T));
					}
					return k(), b(N, y);
				}
				function b(l, _) {
					const N = [];
					for (; l.length > 0 || _.length > 0; ) {
						const y = l[0],
							D = _[0];
						let k;
						y && (!D || y.seq1Range.start < D.seq1Range.start) ? (k = l.shift()) : (k = _.shift()),
							N.length > 0 && N[N.length - 1].seq1Range.endExclusive >= k.seq1Range.start
								? (N[N.length - 1] = N[N.length - 1].join(k))
								: N.push(k);
					}
					return N;
				}
				function m(l, _, N) {
					const y = [];
					for (const D of E(
						l.map((k) => v(k, _, N)),
						(k, B) =>
							k.originalRange.overlapOrTouch(B.originalRange) ||
							k.modifiedRange.overlapOrTouch(B.modifiedRange)
					)) {
						const k = D[0],
							B = D[D.length - 1];
						y.push(
							new e.LineRangeMapping(
								k.originalRange.join(B.originalRange),
								k.modifiedRange.join(B.modifiedRange),
								D.map((I) => I.innerChanges[0])
							)
						);
					}
					return (
						(0, R.assertFn)(() =>
							(0, R.checkAdjacentItems)(
								y,
								(D, k) =>
									k.originalRange.startLineNumber - D.originalRange.endLineNumberExclusive ===
										k.modifiedRange.startLineNumber - D.modifiedRange.endLineNumberExclusive &&
									D.originalRange.endLineNumberExclusive < k.originalRange.startLineNumber &&
									D.modifiedRange.endLineNumberExclusive < k.modifiedRange.startLineNumber
							)
						),
						y
					);
				}
				n.lineRangeMappingFromRangeMappings = m;
				function v(l, _, N) {
					let y = 0,
						D = 0;
					l.modifiedRange.startColumn - 1 >= N[l.modifiedRange.startLineNumber - 1].length &&
						l.originalRange.startColumn - 1 >= _[l.originalRange.startLineNumber - 1].length &&
						(y = 1),
						l.modifiedRange.endColumn === 1 &&
							l.originalRange.endColumn === 1 &&
							l.originalRange.startLineNumber + y <= l.originalRange.endLineNumber &&
							l.modifiedRange.startLineNumber + y <= l.modifiedRange.endLineNumber &&
							(D = -1);
					const k = new M.LineRange(
							l.originalRange.startLineNumber + y,
							l.originalRange.endLineNumber + 1 + D
						),
						B = new M.LineRange(
							l.modifiedRange.startLineNumber + y,
							l.modifiedRange.endLineNumber + 1 + D
						);
					return new e.LineRangeMapping(k, B, [l]);
				}
				n.getLineRangeMapping = v;
				function* E(l, _) {
					let N, y;
					for (const D of l)
						y !== void 0 && _(y, D) ? N.push(D) : (N && (yield N), (N = [D])), (y = D);
					N && (yield N);
				}
				class L {
					constructor(_, N) {
						(this.trimmedHash = _), (this.lines = N);
					}
					getElement(_) {
						return this.trimmedHash[_];
					}
					get length() {
						return this.trimmedHash.length;
					}
					getBoundaryScore(_) {
						const N = _ === 0 ? 0 : A(this.lines[_ - 1]),
							y = _ === this.lines.length ? 0 : A(this.lines[_]);
						return 1e3 - (N + y);
					}
				}
				n.LineSequence = L;
				function A(l) {
					let _ = 0;
					for (; _ < l.length && (l.charCodeAt(_) === 32 || l.charCodeAt(_) === 9); ) _++;
					return _;
				}
				class w {
					constructor(_, N, y) {
						(this.lines = _),
							(this.considerWhitespaceChanges = y),
							(this.elements = []),
							(this.firstCharOffsetByLineMinusOne = []),
							(this.offsetByLine = []);
						let D = !1;
						N.start > 0 &&
							N.endExclusive >= _.length &&
							((N = new i.OffsetRange(N.start - 1, N.endExclusive)), (D = !0)),
							(this.lineRange = N);
						for (let k = this.lineRange.start; k < this.lineRange.endExclusive; k++) {
							let B = _[k],
								I = 0;
							if (D) (I = B.length), (B = ''), (D = !1);
							else if (!y) {
								const U = B.trimStart();
								(I = B.length - U.length), (B = U.trimEnd());
							}
							this.offsetByLine.push(I);
							for (let U = 0; U < B.length; U++) this.elements.push(B.charCodeAt(U));
							k < _.length - 1 &&
								(this.elements.push(
									`
`.charCodeAt(0)
								),
								(this.firstCharOffsetByLineMinusOne[k - this.lineRange.start] =
									this.elements.length));
						}
						this.offsetByLine.push(0);
					}
					toString() {
						return `Slice: "${this.text}"`;
					}
					get text() {
						return [...this.elements].map((_) => String.fromCharCode(_)).join('');
					}
					getElement(_) {
						return this.elements[_];
					}
					get length() {
						return this.elements.length;
					}
					getBoundaryScore(_) {
						const N = h(_ > 0 ? this.elements[_ - 1] : -1),
							y = h(_ < this.elements.length ? this.elements[_] : -1);
						if (N === 6 && y === 7) return 0;
						let D = 0;
						return N !== y && ((D += 10), y === 1 && (D += 1)), (D += u(N)), (D += u(y)), D;
					}
					translateOffset(_) {
						if (this.lineRange.isEmpty) return new a.Position(this.lineRange.start + 1, 1);
						let N = 0,
							y = this.firstCharOffsetByLineMinusOne.length;
						for (; N < y; ) {
							const k = Math.floor((N + y) / 2);
							this.firstCharOffsetByLineMinusOne[k] > _ ? (y = k) : (N = k + 1);
						}
						const D = N === 0 ? 0 : this.firstCharOffsetByLineMinusOne[N - 1];
						return new a.Position(this.lineRange.start + N + 1, _ - D + 1 + this.offsetByLine[N]);
					}
					translateRange(_) {
						return C.Range.fromPositions(
							this.translateOffset(_.start),
							this.translateOffset(_.endExclusive)
						);
					}
					findWordContaining(_) {
						if (_ < 0 || _ >= this.elements.length || !c(this.elements[_])) return;
						let N = _;
						for (; N > 0 && c(this.elements[N - 1]); ) N--;
						let y = _;
						for (; y < this.elements.length && c(this.elements[y]); ) y++;
						return new i.OffsetRange(N, y);
					}
				}
				function c(l) {
					return (l >= 97 && l <= 122) || (l >= 65 && l <= 90) || (l >= 48 && l <= 57);
				}
				const r = { [0]: 0, [1]: 0, [2]: 0, [3]: 10, [4]: 2, [5]: 3, [6]: 10, [7]: 10 };
				function u(l) {
					return r[l];
				}
				function h(l) {
					return l === 10
						? 7
						: l === 13
						? 6
						: f(l)
						? 5
						: l >= 97 && l <= 122
						? 0
						: l >= 65 && l <= 90
						? 1
						: l >= 48 && l <= 57
						? 2
						: l === -1
						? 3
						: 4;
				}
				function f(l) {
					return l === 32 || l === 9;
				}
			}
		),
		Y(X[42], J([0, 1, 40, 41]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.linesDiffComputers = void 0),
				(n.linesDiffComputers = {
					legacy: new R.SmartLinesDiffComputer(),
					advanced: new M.StandardLinesDiffComputer()
				});
		}),
		Y(X[43], J([0, 1, 28]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.computeDefaultDocumentColors = void 0);
			function M(d) {
				const g = [];
				for (const b of d) {
					const m = Number(b);
					(m || (m === 0 && b.replace(/\s/g, '') !== '')) && g.push(m);
				}
				return g;
			}
			function i(d, g, b, m) {
				return { red: d / 255, blue: b / 255, green: g / 255, alpha: m };
			}
			function a(d, g) {
				const b = g.index,
					m = g[0].length;
				if (!b) return;
				const v = d.positionAt(b);
				return {
					startLineNumber: v.lineNumber,
					startColumn: v.column,
					endLineNumber: v.lineNumber,
					endColumn: v.column + m
				};
			}
			function C(d, g) {
				if (!d) return;
				const b = R.Color.Format.CSS.parseHex(g);
				if (b) return { range: d, color: i(b.rgba.r, b.rgba.g, b.rgba.b, b.rgba.a) };
			}
			function S(d, g, b) {
				if (!d || g.length !== 1) return;
				const v = g[0].values(),
					E = M(v);
				return { range: d, color: i(E[0], E[1], E[2], b ? E[3] : 1) };
			}
			function o(d, g, b) {
				if (!d || g.length !== 1) return;
				const v = g[0].values(),
					E = M(v),
					L = new R.Color(new R.HSLA(E[0], E[1] / 100, E[2] / 100, b ? E[3] : 1));
				return { range: d, color: i(L.rgba.r, L.rgba.g, L.rgba.b, L.rgba.a) };
			}
			function s(d, g) {
				return typeof d == 'string' ? [...d.matchAll(g)] : d.findMatches(g);
			}
			function p(d) {
				const g = [],
					m = s(
						d,
						/\b(rgb|rgba|hsl|hsla)(\([0-9\s,.\%]*\))|(#)([A-Fa-f0-9]{6})\b|(#)([A-Fa-f0-9]{8})\b/gm
					);
				if (m.length > 0)
					for (const v of m) {
						const E = v.filter((c) => c !== void 0),
							L = E[1],
							A = E[2];
						if (!A) continue;
						let w;
						if (L === 'rgb') {
							const c =
								/^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*\)$/gm;
							w = S(a(d, v), s(A, c), !1);
						} else if (L === 'rgba') {
							const c =
								/^\(\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]|[0-9])\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
							w = S(a(d, v), s(A, c), !0);
						} else if (L === 'hsl') {
							const c =
								/^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*\)$/gm;
							w = o(a(d, v), s(A, c), !1);
						} else if (L === 'hsla') {
							const c =
								/^\(\s*(36[0]|3[0-5][0-9]|[12][0-9][0-9]|[1-9]?[0-9])\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(100|\d{1,2}[.]\d*|\d{1,2})%\s*,\s*(0[.][0-9]+|[.][0-9]+|[01][.]|[01])\s*\)$/gm;
							w = o(a(d, v), s(A, c), !0);
						} else L === '#' && (w = C(a(d, v), L + A));
						w && g.push(w);
					}
				return g;
			}
			function e(d) {
				return !d || typeof d.getValue != 'function' || typeof d.positionAt != 'function'
					? []
					: p(d);
			}
			n.computeDefaultDocumentColors = e;
		}),
		Y(X[44], J([0, 1, 20]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.computeLinks = n.LinkComputer = n.StateMachine = void 0);
			class M {
				constructor(d, g, b) {
					const m = new Uint8Array(d * g);
					for (let v = 0, E = d * g; v < E; v++) m[v] = b;
					(this._data = m), (this.rows = d), (this.cols = g);
				}
				get(d, g) {
					return this._data[d * this.cols + g];
				}
				set(d, g, b) {
					this._data[d * this.cols + g] = b;
				}
			}
			class i {
				constructor(d) {
					let g = 0,
						b = 0;
					for (let v = 0, E = d.length; v < E; v++) {
						const [L, A, w] = d[v];
						A > g && (g = A), L > b && (b = L), w > b && (b = w);
					}
					g++, b++;
					const m = new M(b, g, 0);
					for (let v = 0, E = d.length; v < E; v++) {
						const [L, A, w] = d[v];
						m.set(L, A, w);
					}
					(this._states = m), (this._maxCharCode = g);
				}
				nextState(d, g) {
					return g < 0 || g >= this._maxCharCode ? 0 : this._states.get(d, g);
				}
			}
			n.StateMachine = i;
			let a = null;
			function C() {
				return (
					a === null &&
						(a = new i([
							[1, 104, 2],
							[1, 72, 2],
							[1, 102, 6],
							[1, 70, 6],
							[2, 116, 3],
							[2, 84, 3],
							[3, 116, 4],
							[3, 84, 4],
							[4, 112, 5],
							[4, 80, 5],
							[5, 115, 9],
							[5, 83, 9],
							[5, 58, 10],
							[6, 105, 7],
							[6, 73, 7],
							[7, 108, 8],
							[7, 76, 8],
							[8, 101, 9],
							[8, 69, 9],
							[9, 58, 10],
							[10, 47, 11],
							[11, 47, 12]
						])),
					a
				);
			}
			let S = null;
			function o() {
				if (S === null) {
					S = new R.CharacterClassifier(0);
					const e = ` 	<>'"\u3001\u3002\uFF61\uFF64\uFF0C\uFF0E\uFF1A\uFF1B\u2018\u3008\u300C\u300E\u3014\uFF08\uFF3B\uFF5B\uFF62\uFF63\uFF5D\uFF3D\uFF09\u3015\u300F\u300D\u3009\u2019\uFF40\uFF5E\u2026`;
					for (let g = 0; g < e.length; g++) S.set(e.charCodeAt(g), 1);
					const d = '.,;:';
					for (let g = 0; g < d.length; g++) S.set(d.charCodeAt(g), 2);
				}
				return S;
			}
			class s {
				static _createLink(d, g, b, m, v) {
					let E = v - 1;
					do {
						const L = g.charCodeAt(E);
						if (d.get(L) !== 2) break;
						E--;
					} while (E > m);
					if (m > 0) {
						const L = g.charCodeAt(m - 1),
							A = g.charCodeAt(E);
						((L === 40 && A === 41) || (L === 91 && A === 93) || (L === 123 && A === 125)) && E--;
					}
					return {
						range: { startLineNumber: b, startColumn: m + 1, endLineNumber: b, endColumn: E + 2 },
						url: g.substring(m, E + 1)
					};
				}
				static computeLinks(d, g = C()) {
					const b = o(),
						m = [];
					for (let v = 1, E = d.getLineCount(); v <= E; v++) {
						const L = d.getLineContent(v),
							A = L.length;
						let w = 0,
							c = 0,
							r = 0,
							u = 1,
							h = !1,
							f = !1,
							l = !1,
							_ = !1;
						for (; w < A; ) {
							let N = !1;
							const y = L.charCodeAt(w);
							if (u === 13) {
								let D;
								switch (y) {
									case 40:
										(h = !0), (D = 0);
										break;
									case 41:
										D = h ? 0 : 1;
										break;
									case 91:
										(l = !0), (f = !0), (D = 0);
										break;
									case 93:
										(l = !1), (D = f ? 0 : 1);
										break;
									case 123:
										(_ = !0), (D = 0);
										break;
									case 125:
										D = _ ? 0 : 1;
										break;
									case 39:
									case 34:
									case 96:
										r === y ? (D = 1) : r === 39 || r === 34 || r === 96 ? (D = 0) : (D = 1);
										break;
									case 42:
										D = r === 42 ? 1 : 0;
										break;
									case 124:
										D = r === 124 ? 1 : 0;
										break;
									case 32:
										D = l ? 0 : 1;
										break;
									default:
										D = b.get(y);
								}
								D === 1 && (m.push(s._createLink(b, L, v, c, w)), (N = !0));
							} else if (u === 12) {
								let D;
								y === 91 ? ((f = !0), (D = 0)) : (D = b.get(y)), D === 1 ? (N = !0) : (u = 13);
							} else (u = g.nextState(u, y)), u === 0 && (N = !0);
							N && ((u = 1), (h = !1), (f = !1), (_ = !1), (c = w + 1), (r = y)), w++;
						}
						u === 13 && m.push(s._createLink(b, L, v, c, A));
					}
					return m;
				}
			}
			n.LinkComputer = s;
			function p(e) {
				return !e || typeof e.getLineCount != 'function' || typeof e.getLineContent != 'function'
					? []
					: s.computeLinks(e);
			}
			n.computeLinks = p;
		}),
		Y(X[45], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.BasicInplaceReplace = void 0);
			class R {
				constructor() {
					this._defaultValueSet = [
						['true', 'false'],
						['True', 'False'],
						['Private', 'Public', 'Friend', 'ReadOnly', 'Partial', 'Protected', 'WriteOnly'],
						['public', 'protected', 'private']
					];
				}
				navigateValueSet(i, a, C, S, o) {
					if (i && a) {
						const s = this.doNavigateValueSet(a, o);
						if (s) return { range: i, value: s };
					}
					if (C && S) {
						const s = this.doNavigateValueSet(S, o);
						if (s) return { range: C, value: s };
					}
					return null;
				}
				doNavigateValueSet(i, a) {
					const C = this.numberReplace(i, a);
					return C !== null ? C : this.textReplace(i, a);
				}
				numberReplace(i, a) {
					const C = Math.pow(10, i.length - (i.lastIndexOf('.') + 1));
					let S = Number(i);
					const o = parseFloat(i);
					return !isNaN(S) && !isNaN(o) && S === o
						? S === 0 && !a
							? null
							: ((S = Math.floor(S * C)), (S += a ? C : -C), String(S / C))
						: null;
				}
				textReplace(i, a) {
					return this.valueSetsReplace(this._defaultValueSet, i, a);
				}
				valueSetsReplace(i, a, C) {
					let S = null;
					for (let o = 0, s = i.length; S === null && o < s; o++)
						S = this.valueSetReplace(i[o], a, C);
					return S;
				}
				valueSetReplace(i, a, C) {
					let S = i.indexOf(a);
					return S >= 0
						? ((S += C ? 1 : -1), S < 0 ? (S = i.length - 1) : (S %= i.length), i[S])
						: null;
				}
			}
			(n.BasicInplaceReplace = R), (R.INSTANCE = new R());
		}),
		Y(X[46], J([0, 1, 12]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.shouldSynchronizeModel =
					n.ApplyEditsResult =
					n.SearchData =
					n.ValidAnnotatedEditOperation =
					n.isITextSnapshot =
					n.FindMatch =
					n.TextModelResolvedOptions =
					n.InjectedTextCursorStops =
					n.MinimapPosition =
					n.GlyphMarginLane =
					n.OverviewRulerLane =
						void 0);
			var M;
			(function (b) {
				(b[(b.Left = 1)] = 'Left'),
					(b[(b.Center = 2)] = 'Center'),
					(b[(b.Right = 4)] = 'Right'),
					(b[(b.Full = 7)] = 'Full');
			})(M || (n.OverviewRulerLane = M = {}));
			var i;
			(function (b) {
				(b[(b.Left = 1)] = 'Left'), (b[(b.Right = 2)] = 'Right');
			})(i || (n.GlyphMarginLane = i = {}));
			var a;
			(function (b) {
				(b[(b.Inline = 1)] = 'Inline'), (b[(b.Gutter = 2)] = 'Gutter');
			})(a || (n.MinimapPosition = a = {}));
			var C;
			(function (b) {
				(b[(b.Both = 0)] = 'Both'),
					(b[(b.Right = 1)] = 'Right'),
					(b[(b.Left = 2)] = 'Left'),
					(b[(b.None = 3)] = 'None');
			})(C || (n.InjectedTextCursorStops = C = {}));
			class S {
				get originalIndentSize() {
					return this._indentSizeIsTabSize ? 'tabSize' : this.indentSize;
				}
				constructor(m) {
					(this._textModelResolvedOptionsBrand = void 0),
						(this.tabSize = Math.max(1, m.tabSize | 0)),
						m.indentSize === 'tabSize'
							? ((this.indentSize = this.tabSize), (this._indentSizeIsTabSize = !0))
							: ((this.indentSize = Math.max(1, m.indentSize | 0)),
							  (this._indentSizeIsTabSize = !1)),
						(this.insertSpaces = !!m.insertSpaces),
						(this.defaultEOL = m.defaultEOL | 0),
						(this.trimAutoWhitespace = !!m.trimAutoWhitespace),
						(this.bracketPairColorizationOptions = m.bracketPairColorizationOptions);
				}
				equals(m) {
					return (
						this.tabSize === m.tabSize &&
						this._indentSizeIsTabSize === m._indentSizeIsTabSize &&
						this.indentSize === m.indentSize &&
						this.insertSpaces === m.insertSpaces &&
						this.defaultEOL === m.defaultEOL &&
						this.trimAutoWhitespace === m.trimAutoWhitespace &&
						(0, R.equals)(this.bracketPairColorizationOptions, m.bracketPairColorizationOptions)
					);
				}
				createChangeEvent(m) {
					return {
						tabSize: this.tabSize !== m.tabSize,
						indentSize: this.indentSize !== m.indentSize,
						insertSpaces: this.insertSpaces !== m.insertSpaces,
						trimAutoWhitespace: this.trimAutoWhitespace !== m.trimAutoWhitespace
					};
				}
			}
			n.TextModelResolvedOptions = S;
			class o {
				constructor(m, v) {
					(this._findMatchBrand = void 0), (this.range = m), (this.matches = v);
				}
			}
			n.FindMatch = o;
			function s(b) {
				return b && typeof b.read == 'function';
			}
			n.isITextSnapshot = s;
			class p {
				constructor(m, v, E, L, A, w) {
					(this.identifier = m),
						(this.range = v),
						(this.text = E),
						(this.forceMoveMarkers = L),
						(this.isAutoWhitespaceEdit = A),
						(this._isTracked = w);
				}
			}
			n.ValidAnnotatedEditOperation = p;
			class e {
				constructor(m, v, E) {
					(this.regex = m), (this.wordSeparators = v), (this.simpleSearch = E);
				}
			}
			n.SearchData = e;
			class d {
				constructor(m, v, E) {
					(this.reverseEdits = m), (this.changes = v), (this.trimAutoWhitespaceLineNumbers = E);
				}
			}
			n.ApplyEditsResult = d;
			function g(b) {
				return !b.isTooLargeForSyncing() && !b.isForSimpleWidget;
			}
			n.shouldSynchronizeModel = g;
		}),
		Y(X[47], J([0, 1, 26, 19]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.PrefixSumIndexOfResult = n.ConstantTimePrefixSumComputer = n.PrefixSumComputer = void 0);
			class i {
				constructor(o) {
					(this.values = o),
						(this.prefixSum = new Uint32Array(o.length)),
						(this.prefixSumValidIndex = new Int32Array(1)),
						(this.prefixSumValidIndex[0] = -1);
				}
				insertValues(o, s) {
					o = (0, M.toUint32)(o);
					const p = this.values,
						e = this.prefixSum,
						d = s.length;
					return d === 0
						? !1
						: ((this.values = new Uint32Array(p.length + d)),
						  this.values.set(p.subarray(0, o), 0),
						  this.values.set(p.subarray(o), o + d),
						  this.values.set(s, o),
						  o - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = o - 1),
						  (this.prefixSum = new Uint32Array(this.values.length)),
						  this.prefixSumValidIndex[0] >= 0 &&
								this.prefixSum.set(e.subarray(0, this.prefixSumValidIndex[0] + 1)),
						  !0);
				}
				setValue(o, s) {
					return (
						(o = (0, M.toUint32)(o)),
						(s = (0, M.toUint32)(s)),
						this.values[o] === s
							? !1
							: ((this.values[o] = s),
							  o - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = o - 1),
							  !0)
					);
				}
				removeValues(o, s) {
					(o = (0, M.toUint32)(o)), (s = (0, M.toUint32)(s));
					const p = this.values,
						e = this.prefixSum;
					if (o >= p.length) return !1;
					const d = p.length - o;
					return (
						s >= d && (s = d),
						s === 0
							? !1
							: ((this.values = new Uint32Array(p.length - s)),
							  this.values.set(p.subarray(0, o), 0),
							  this.values.set(p.subarray(o + s), o),
							  (this.prefixSum = new Uint32Array(this.values.length)),
							  o - 1 < this.prefixSumValidIndex[0] && (this.prefixSumValidIndex[0] = o - 1),
							  this.prefixSumValidIndex[0] >= 0 &&
									this.prefixSum.set(e.subarray(0, this.prefixSumValidIndex[0] + 1)),
							  !0)
					);
				}
				getTotalSum() {
					return this.values.length === 0 ? 0 : this._getPrefixSum(this.values.length - 1);
				}
				getPrefixSum(o) {
					return o < 0 ? 0 : ((o = (0, M.toUint32)(o)), this._getPrefixSum(o));
				}
				_getPrefixSum(o) {
					if (o <= this.prefixSumValidIndex[0]) return this.prefixSum[o];
					let s = this.prefixSumValidIndex[0] + 1;
					s === 0 && ((this.prefixSum[0] = this.values[0]), s++),
						o >= this.values.length && (o = this.values.length - 1);
					for (let p = s; p <= o; p++) this.prefixSum[p] = this.prefixSum[p - 1] + this.values[p];
					return (
						(this.prefixSumValidIndex[0] = Math.max(this.prefixSumValidIndex[0], o)),
						this.prefixSum[o]
					);
				}
				getIndexOf(o) {
					(o = Math.floor(o)), this.getTotalSum();
					let s = 0,
						p = this.values.length - 1,
						e = 0,
						d = 0,
						g = 0;
					for (; s <= p; )
						if (
							((e = (s + (p - s) / 2) | 0),
							(d = this.prefixSum[e]),
							(g = d - this.values[e]),
							o < g)
						)
							p = e - 1;
						else if (o >= d) s = e + 1;
						else break;
					return new C(e, o - g);
				}
			}
			n.PrefixSumComputer = i;
			class a {
				constructor(o) {
					(this._values = o),
						(this._isValid = !1),
						(this._validEndIndex = -1),
						(this._prefixSum = []),
						(this._indexBySum = []);
				}
				getTotalSum() {
					return this._ensureValid(), this._indexBySum.length;
				}
				getPrefixSum(o) {
					return this._ensureValid(), o === 0 ? 0 : this._prefixSum[o - 1];
				}
				getIndexOf(o) {
					this._ensureValid();
					const s = this._indexBySum[o],
						p = s > 0 ? this._prefixSum[s - 1] : 0;
					return new C(s, o - p);
				}
				removeValues(o, s) {
					this._values.splice(o, s), this._invalidate(o);
				}
				insertValues(o, s) {
					(this._values = (0, R.arrayInsert)(this._values, o, s)), this._invalidate(o);
				}
				_invalidate(o) {
					(this._isValid = !1), (this._validEndIndex = Math.min(this._validEndIndex, o - 1));
				}
				_ensureValid() {
					if (!this._isValid) {
						for (let o = this._validEndIndex + 1, s = this._values.length; o < s; o++) {
							const p = this._values[o],
								e = o > 0 ? this._prefixSum[o - 1] : 0;
							this._prefixSum[o] = e + p;
							for (let d = 0; d < p; d++) this._indexBySum[e + d] = o;
						}
						(this._prefixSum.length = this._values.length),
							(this._indexBySum.length = this._prefixSum[this._prefixSum.length - 1]),
							(this._isValid = !0),
							(this._validEndIndex = this._values.length - 1);
					}
				}
				setValue(o, s) {
					this._values[o] !== s && ((this._values[o] = s), this._invalidate(o));
				}
			}
			n.ConstantTimePrefixSumComputer = a;
			class C {
				constructor(o, s) {
					(this.index = o),
						(this.remainder = s),
						(this._prefixSumIndexOfResultBrand = void 0),
						(this.index = o),
						(this.remainder = s);
				}
			}
			n.PrefixSumIndexOfResult = C;
		}),
		Y(X[48], J([0, 1, 5, 3, 47]), function (x, n, R, M, i) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.MirrorTextModel = void 0);
			class a {
				constructor(S, o, s, p) {
					(this._uri = S),
						(this._lines = o),
						(this._eol = s),
						(this._versionId = p),
						(this._lineStarts = null),
						(this._cachedTextValue = null);
				}
				dispose() {
					this._lines.length = 0;
				}
				get version() {
					return this._versionId;
				}
				getText() {
					return (
						this._cachedTextValue === null && (this._cachedTextValue = this._lines.join(this._eol)),
						this._cachedTextValue
					);
				}
				onEvents(S) {
					S.eol && S.eol !== this._eol && ((this._eol = S.eol), (this._lineStarts = null));
					const o = S.changes;
					for (const s of o)
						this._acceptDeleteRange(s.range),
							this._acceptInsertText(
								new M.Position(s.range.startLineNumber, s.range.startColumn),
								s.text
							);
					(this._versionId = S.versionId), (this._cachedTextValue = null);
				}
				_ensureLineStarts() {
					if (!this._lineStarts) {
						const S = this._eol.length,
							o = this._lines.length,
							s = new Uint32Array(o);
						for (let p = 0; p < o; p++) s[p] = this._lines[p].length + S;
						this._lineStarts = new i.PrefixSumComputer(s);
					}
				}
				_setLineText(S, o) {
					(this._lines[S] = o),
						this._lineStarts &&
							this._lineStarts.setValue(S, this._lines[S].length + this._eol.length);
				}
				_acceptDeleteRange(S) {
					if (S.startLineNumber === S.endLineNumber) {
						if (S.startColumn === S.endColumn) return;
						this._setLineText(
							S.startLineNumber - 1,
							this._lines[S.startLineNumber - 1].substring(0, S.startColumn - 1) +
								this._lines[S.startLineNumber - 1].substring(S.endColumn - 1)
						);
						return;
					}
					this._setLineText(
						S.startLineNumber - 1,
						this._lines[S.startLineNumber - 1].substring(0, S.startColumn - 1) +
							this._lines[S.endLineNumber - 1].substring(S.endColumn - 1)
					),
						this._lines.splice(S.startLineNumber, S.endLineNumber - S.startLineNumber),
						this._lineStarts &&
							this._lineStarts.removeValues(S.startLineNumber, S.endLineNumber - S.startLineNumber);
				}
				_acceptInsertText(S, o) {
					if (o.length === 0) return;
					const s = (0, R.splitLines)(o);
					if (s.length === 1) {
						this._setLineText(
							S.lineNumber - 1,
							this._lines[S.lineNumber - 1].substring(0, S.column - 1) +
								s[0] +
								this._lines[S.lineNumber - 1].substring(S.column - 1)
						);
						return;
					}
					(s[s.length - 1] += this._lines[S.lineNumber - 1].substring(S.column - 1)),
						this._setLineText(
							S.lineNumber - 1,
							this._lines[S.lineNumber - 1].substring(0, S.column - 1) + s[0]
						);
					const p = new Uint32Array(s.length - 1);
					for (let e = 1; e < s.length; e++)
						this._lines.splice(S.lineNumber + e - 1, 0, s[e]),
							(p[e - 1] = s[e].length + this._eol.length);
					this._lineStarts && this._lineStarts.insertValues(S.lineNumber, p);
				}
			}
			n.MirrorTextModel = a;
		}),
		Y(X[49], J([0, 1, 5, 35, 3, 2, 46]), function (x, n, R, M, i, a, C) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.Searcher =
					n.isValidMatch =
					n.TextModelSearch =
					n.createFindMatch =
					n.isMultilineRegexSource =
					n.SearchParams =
						void 0);
			const S = 999;
			class o {
				constructor(L, A, w, c) {
					(this.searchString = L),
						(this.isRegex = A),
						(this.matchCase = w),
						(this.wordSeparators = c);
				}
				parseSearchRequest() {
					if (this.searchString === '') return null;
					let L;
					this.isRegex
						? (L = s(this.searchString))
						: (L =
								this.searchString.indexOf(`
`) >= 0);
					let A = null;
					try {
						A = R.createRegExp(this.searchString, this.isRegex, {
							matchCase: this.matchCase,
							wholeWord: !1,
							multiline: L,
							global: !0,
							unicode: !0
						});
					} catch {
						return null;
					}
					if (!A) return null;
					let w = !this.isRegex && !L;
					return (
						w &&
							this.searchString.toLowerCase() !== this.searchString.toUpperCase() &&
							(w = this.matchCase),
						new C.SearchData(
							A,
							this.wordSeparators ? (0, M.getMapForWordSeparators)(this.wordSeparators) : null,
							w ? this.searchString : null
						)
					);
				}
			}
			n.SearchParams = o;
			function s(E) {
				if (!E || E.length === 0) return !1;
				for (let L = 0, A = E.length; L < A; L++) {
					const w = E.charCodeAt(L);
					if (w === 10) return !0;
					if (w === 92) {
						if ((L++, L >= A)) break;
						const c = E.charCodeAt(L);
						if (c === 110 || c === 114 || c === 87) return !0;
					}
				}
				return !1;
			}
			n.isMultilineRegexSource = s;
			function p(E, L, A) {
				if (!A) return new C.FindMatch(E, null);
				const w = [];
				for (let c = 0, r = L.length; c < r; c++) w[c] = L[c];
				return new C.FindMatch(E, w);
			}
			n.createFindMatch = p;
			class e {
				constructor(L) {
					const A = [];
					let w = 0;
					for (let c = 0, r = L.length; c < r; c++) L.charCodeAt(c) === 10 && (A[w++] = c);
					this._lineFeedsOffsets = A;
				}
				findLineFeedCountBeforeOffset(L) {
					const A = this._lineFeedsOffsets;
					let w = 0,
						c = A.length - 1;
					if (c === -1 || L <= A[0]) return 0;
					for (; w < c; ) {
						const r = w + (((c - w) / 2) >> 0);
						A[r] >= L ? (c = r - 1) : A[r + 1] >= L ? ((w = r), (c = r)) : (w = r + 1);
					}
					return w + 1;
				}
			}
			class d {
				static findMatches(L, A, w, c, r) {
					const u = A.parseSearchRequest();
					return u
						? u.regex.multiline
							? this._doFindMatchesMultiline(L, w, new v(u.wordSeparators, u.regex), c, r)
							: this._doFindMatchesLineByLine(L, w, u, c, r)
						: [];
				}
				static _getMultilineMatchRange(L, A, w, c, r, u) {
					let h,
						f = 0;
					c ? ((f = c.findLineFeedCountBeforeOffset(r)), (h = A + r + f)) : (h = A + r);
					let l;
					if (c) {
						const D = c.findLineFeedCountBeforeOffset(r + u.length) - f;
						l = h + u.length + D;
					} else l = h + u.length;
					const _ = L.getPositionAt(h),
						N = L.getPositionAt(l);
					return new a.Range(_.lineNumber, _.column, N.lineNumber, N.column);
				}
				static _doFindMatchesMultiline(L, A, w, c, r) {
					const u = L.getOffsetAt(A.getStartPosition()),
						h = L.getValueInRange(A, 1),
						f =
							L.getEOL() ===
							`\r
`
								? new e(h)
								: null,
						l = [];
					let _ = 0,
						N;
					for (w.reset(0); (N = w.next(h)); )
						if (
							((l[_++] = p(this._getMultilineMatchRange(L, u, h, f, N.index, N[0]), N, c)), _ >= r)
						)
							return l;
					return l;
				}
				static _doFindMatchesLineByLine(L, A, w, c, r) {
					const u = [];
					let h = 0;
					if (A.startLineNumber === A.endLineNumber) {
						const l = L.getLineContent(A.startLineNumber).substring(
							A.startColumn - 1,
							A.endColumn - 1
						);
						return (
							(h = this._findMatchesInLine(w, l, A.startLineNumber, A.startColumn - 1, h, u, c, r)),
							u
						);
					}
					const f = L.getLineContent(A.startLineNumber).substring(A.startColumn - 1);
					h = this._findMatchesInLine(w, f, A.startLineNumber, A.startColumn - 1, h, u, c, r);
					for (let l = A.startLineNumber + 1; l < A.endLineNumber && h < r; l++)
						h = this._findMatchesInLine(w, L.getLineContent(l), l, 0, h, u, c, r);
					if (h < r) {
						const l = L.getLineContent(A.endLineNumber).substring(0, A.endColumn - 1);
						h = this._findMatchesInLine(w, l, A.endLineNumber, 0, h, u, c, r);
					}
					return u;
				}
				static _findMatchesInLine(L, A, w, c, r, u, h, f) {
					const l = L.wordSeparators;
					if (!h && L.simpleSearch) {
						const y = L.simpleSearch,
							D = y.length,
							k = A.length;
						let B = -D;
						for (; (B = A.indexOf(y, B + D)) !== -1; )
							if (
								(!l || m(l, A, k, B, D)) &&
								((u[r++] = new C.FindMatch(new a.Range(w, B + 1 + c, w, B + 1 + D + c), null)),
								r >= f)
							)
								return r;
						return r;
					}
					const _ = new v(L.wordSeparators, L.regex);
					let N;
					_.reset(0);
					do
						if (
							((N = _.next(A)),
							N &&
								((u[r++] = p(
									new a.Range(w, N.index + 1 + c, w, N.index + 1 + N[0].length + c),
									N,
									h
								)),
								r >= f))
						)
							return r;
					while (N);
					return r;
				}
				static findNextMatch(L, A, w, c) {
					const r = A.parseSearchRequest();
					if (!r) return null;
					const u = new v(r.wordSeparators, r.regex);
					return r.regex.multiline
						? this._doFindNextMatchMultiline(L, w, u, c)
						: this._doFindNextMatchLineByLine(L, w, u, c);
				}
				static _doFindNextMatchMultiline(L, A, w, c) {
					const r = new i.Position(A.lineNumber, 1),
						u = L.getOffsetAt(r),
						h = L.getLineCount(),
						f = L.getValueInRange(new a.Range(r.lineNumber, r.column, h, L.getLineMaxColumn(h)), 1),
						l =
							L.getEOL() ===
							`\r
`
								? new e(f)
								: null;
					w.reset(A.column - 1);
					const _ = w.next(f);
					return _
						? p(this._getMultilineMatchRange(L, u, f, l, _.index, _[0]), _, c)
						: A.lineNumber !== 1 || A.column !== 1
						? this._doFindNextMatchMultiline(L, new i.Position(1, 1), w, c)
						: null;
				}
				static _doFindNextMatchLineByLine(L, A, w, c) {
					const r = L.getLineCount(),
						u = A.lineNumber,
						h = L.getLineContent(u),
						f = this._findFirstMatchInLine(w, h, u, A.column, c);
					if (f) return f;
					for (let l = 1; l <= r; l++) {
						const _ = (u + l - 1) % r,
							N = L.getLineContent(_ + 1),
							y = this._findFirstMatchInLine(w, N, _ + 1, 1, c);
						if (y) return y;
					}
					return null;
				}
				static _findFirstMatchInLine(L, A, w, c, r) {
					L.reset(c - 1);
					const u = L.next(A);
					return u ? p(new a.Range(w, u.index + 1, w, u.index + 1 + u[0].length), u, r) : null;
				}
				static findPreviousMatch(L, A, w, c) {
					const r = A.parseSearchRequest();
					if (!r) return null;
					const u = new v(r.wordSeparators, r.regex);
					return r.regex.multiline
						? this._doFindPreviousMatchMultiline(L, w, u, c)
						: this._doFindPreviousMatchLineByLine(L, w, u, c);
				}
				static _doFindPreviousMatchMultiline(L, A, w, c) {
					const r = this._doFindMatchesMultiline(
						L,
						new a.Range(1, 1, A.lineNumber, A.column),
						w,
						c,
						10 * S
					);
					if (r.length > 0) return r[r.length - 1];
					const u = L.getLineCount();
					return A.lineNumber !== u || A.column !== L.getLineMaxColumn(u)
						? this._doFindPreviousMatchMultiline(L, new i.Position(u, L.getLineMaxColumn(u)), w, c)
						: null;
				}
				static _doFindPreviousMatchLineByLine(L, A, w, c) {
					const r = L.getLineCount(),
						u = A.lineNumber,
						h = L.getLineContent(u).substring(0, A.column - 1),
						f = this._findLastMatchInLine(w, h, u, c);
					if (f) return f;
					for (let l = 1; l <= r; l++) {
						const _ = (r + u - l - 1) % r,
							N = L.getLineContent(_ + 1),
							y = this._findLastMatchInLine(w, N, _ + 1, c);
						if (y) return y;
					}
					return null;
				}
				static _findLastMatchInLine(L, A, w, c) {
					let r = null,
						u;
					for (L.reset(0); (u = L.next(A)); )
						r = p(new a.Range(w, u.index + 1, w, u.index + 1 + u[0].length), u, c);
					return r;
				}
			}
			n.TextModelSearch = d;
			function g(E, L, A, w, c) {
				if (w === 0) return !0;
				const r = L.charCodeAt(w - 1);
				if (E.get(r) !== 0 || r === 13 || r === 10) return !0;
				if (c > 0) {
					const u = L.charCodeAt(w);
					if (E.get(u) !== 0) return !0;
				}
				return !1;
			}
			function b(E, L, A, w, c) {
				if (w + c === A) return !0;
				const r = L.charCodeAt(w + c);
				if (E.get(r) !== 0 || r === 13 || r === 10) return !0;
				if (c > 0) {
					const u = L.charCodeAt(w + c - 1);
					if (E.get(u) !== 0) return !0;
				}
				return !1;
			}
			function m(E, L, A, w, c) {
				return g(E, L, A, w, c) && b(E, L, A, w, c);
			}
			n.isValidMatch = m;
			class v {
				constructor(L, A) {
					(this._wordSeparators = L),
						(this._searchRegex = A),
						(this._prevMatchStartIndex = -1),
						(this._prevMatchLength = 0);
				}
				reset(L) {
					(this._searchRegex.lastIndex = L),
						(this._prevMatchStartIndex = -1),
						(this._prevMatchLength = 0);
				}
				next(L) {
					const A = L.length;
					let w;
					do {
						if (
							this._prevMatchStartIndex + this._prevMatchLength === A ||
							((w = this._searchRegex.exec(L)), !w)
						)
							return null;
						const c = w.index,
							r = w[0].length;
						if (c === this._prevMatchStartIndex && r === this._prevMatchLength) {
							if (r === 0) {
								R.getNextCodePoint(L, A, this._searchRegex.lastIndex) > 65535
									? (this._searchRegex.lastIndex += 2)
									: (this._searchRegex.lastIndex += 1);
								continue;
							}
							return null;
						}
						if (
							((this._prevMatchStartIndex = c),
							(this._prevMatchLength = r),
							!this._wordSeparators || m(this._wordSeparators, L, A, c, r))
						)
							return w;
					} while (w);
					return null;
				}
			}
			n.Searcher = v;
		}),
		Y(X[50], J([0, 1, 2, 49, 5, 10, 22]), function (x, n, R, M, i, a, C) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.UnicodeTextModelHighlighter = void 0);
			class S {
				static computeUnicodeHighlights(d, g, b) {
					const m = b ? b.startLineNumber : 1,
						v = b ? b.endLineNumber : d.getLineCount(),
						E = new s(g),
						L = E.getCandidateCodePoints();
					let A;
					L === 'allNonBasicAscii'
						? (A = new RegExp('[^\\t\\n\\r\\x20-\\x7E]', 'g'))
						: (A = new RegExp(`${o(Array.from(L))}`, 'g'));
					const w = new M.Searcher(null, A),
						c = [];
					let r = !1,
						u,
						h = 0,
						f = 0,
						l = 0;
					e: for (let _ = m, N = v; _ <= N; _++) {
						const y = d.getLineContent(_),
							D = y.length;
						w.reset(0);
						do
							if (((u = w.next(y)), u)) {
								let k = u.index,
									B = u.index + u[0].length;
								if (k > 0) {
									const Q = y.charCodeAt(k - 1);
									i.isHighSurrogate(Q) && k--;
								}
								if (B + 1 < D) {
									const Q = y.charCodeAt(B - 1);
									i.isHighSurrogate(Q) && B++;
								}
								const I = y.substring(k, B);
								let U = (0, C.getWordAtText)(k + 1, C.DEFAULT_WORD_REGEXP, y, 0);
								U && U.endColumn <= k + 1 && (U = null);
								const V = E.shouldHighlightNonBasicASCII(I, U ? U.word : null);
								if (V !== 0) {
									V === 3 ? h++ : V === 2 ? f++ : V === 1 ? l++ : (0, a.assertNever)(V);
									const Q = 1e3;
									if (c.length >= Q) {
										r = !0;
										break e;
									}
									c.push(new R.Range(_, k + 1, _, B + 1));
								}
							}
						while (u);
					}
					return {
						ranges: c,
						hasMore: r,
						ambiguousCharacterCount: h,
						invisibleCharacterCount: f,
						nonBasicAsciiCharacterCount: l
					};
				}
				static computeUnicodeHighlightReason(d, g) {
					const b = new s(g);
					switch (b.shouldHighlightNonBasicASCII(d, null)) {
						case 0:
							return null;
						case 2:
							return { kind: 1 };
						case 3: {
							const v = d.codePointAt(0),
								E = b.ambiguousCharacters.getPrimaryConfusable(v),
								L = i.AmbiguousCharacters.getLocales().filter(
									(A) =>
										!i.AmbiguousCharacters.getInstance(
											new Set([...g.allowedLocales, A])
										).isAmbiguous(v)
								);
							return { kind: 0, confusableWith: String.fromCodePoint(E), notAmbiguousInLocales: L };
						}
						case 1:
							return { kind: 2 };
					}
				}
			}
			n.UnicodeTextModelHighlighter = S;
			function o(e, d) {
				return `[${i.escapeRegExpCharacters(e.map((b) => String.fromCodePoint(b)).join(''))}]`;
			}
			class s {
				constructor(d) {
					(this.options = d),
						(this.allowedCodePoints = new Set(d.allowedCodePoints)),
						(this.ambiguousCharacters = i.AmbiguousCharacters.getInstance(
							new Set(d.allowedLocales)
						));
				}
				getCandidateCodePoints() {
					if (this.options.nonBasicASCII) return 'allNonBasicAscii';
					const d = new Set();
					if (this.options.invisibleCharacters)
						for (const g of i.InvisibleCharacters.codePoints)
							p(String.fromCodePoint(g)) || d.add(g);
					if (this.options.ambiguousCharacters)
						for (const g of this.ambiguousCharacters.getConfusableCodePoints()) d.add(g);
					for (const g of this.allowedCodePoints) d.delete(g);
					return d;
				}
				shouldHighlightNonBasicASCII(d, g) {
					const b = d.codePointAt(0);
					if (this.allowedCodePoints.has(b)) return 0;
					if (this.options.nonBasicASCII) return 1;
					let m = !1,
						v = !1;
					if (g)
						for (const E of g) {
							const L = E.codePointAt(0),
								A = i.isBasicASCII(E);
							(m = m || A),
								!A &&
									!this.ambiguousCharacters.isAmbiguous(L) &&
									!i.InvisibleCharacters.isInvisibleCharacter(L) &&
									(v = !0);
						}
					return !m && v
						? 0
						: this.options.invisibleCharacters &&
						  !p(d) &&
						  i.InvisibleCharacters.isInvisibleCharacter(b)
						? 2
						: this.options.ambiguousCharacters && this.ambiguousCharacters.isAmbiguous(b)
						? 3
						: 0;
				}
			}
			function p(e) {
				return (
					e === ' ' ||
					e ===
						`
` ||
					e === '	'
				);
			}
		}),
		Y(X[51], J([0, 1]), function (x, n) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.WrappingIndent =
					n.TrackedRangeStickiness =
					n.TextEditorCursorStyle =
					n.TextEditorCursorBlinkingStyle =
					n.SymbolTag =
					n.SymbolKind =
					n.SignatureHelpTriggerKind =
					n.SelectionDirection =
					n.ScrollbarVisibility =
					n.ScrollType =
					n.RenderMinimap =
					n.RenderLineNumbersType =
					n.PositionAffinity =
					n.OverviewRulerLane =
					n.OverlayWidgetPositionPreference =
					n.MouseTargetType =
					n.MinimapPosition =
					n.MarkerTag =
					n.MarkerSeverity =
					n.KeyCode =
					n.InlineCompletionTriggerKind =
					n.InlayHintKind =
					n.InjectedTextCursorStops =
					n.IndentAction =
					n.GlyphMarginLane =
					n.EndOfLineSequence =
					n.EndOfLinePreference =
					n.EditorOption =
					n.EditorAutoIndentStrategy =
					n.DocumentHighlightKind =
					n.DefaultEndOfLine =
					n.CursorChangeReason =
					n.ContentWidgetPositionPreference =
					n.CompletionTriggerKind =
					n.CompletionItemTag =
					n.CompletionItemKind =
					n.CompletionItemInsertTextRule =
					n.CodeActionTriggerType =
					n.AccessibilitySupport =
						void 0);
			var R;
			(function (t) {
				(t[(t.Unknown = 0)] = 'Unknown'),
					(t[(t.Disabled = 1)] = 'Disabled'),
					(t[(t.Enabled = 2)] = 'Enabled');
			})(R || (n.AccessibilitySupport = R = {}));
			var M;
			(function (t) {
				(t[(t.Invoke = 1)] = 'Invoke'), (t[(t.Auto = 2)] = 'Auto');
			})(M || (n.CodeActionTriggerType = M = {}));
			var i;
			(function (t) {
				(t[(t.None = 0)] = 'None'),
					(t[(t.KeepWhitespace = 1)] = 'KeepWhitespace'),
					(t[(t.InsertAsSnippet = 4)] = 'InsertAsSnippet');
			})(i || (n.CompletionItemInsertTextRule = i = {}));
			var a;
			(function (t) {
				(t[(t.Method = 0)] = 'Method'),
					(t[(t.Function = 1)] = 'Function'),
					(t[(t.Constructor = 2)] = 'Constructor'),
					(t[(t.Field = 3)] = 'Field'),
					(t[(t.Variable = 4)] = 'Variable'),
					(t[(t.Class = 5)] = 'Class'),
					(t[(t.Struct = 6)] = 'Struct'),
					(t[(t.Interface = 7)] = 'Interface'),
					(t[(t.Module = 8)] = 'Module'),
					(t[(t.Property = 9)] = 'Property'),
					(t[(t.Event = 10)] = 'Event'),
					(t[(t.Operator = 11)] = 'Operator'),
					(t[(t.Unit = 12)] = 'Unit'),
					(t[(t.Value = 13)] = 'Value'),
					(t[(t.Constant = 14)] = 'Constant'),
					(t[(t.Enum = 15)] = 'Enum'),
					(t[(t.EnumMember = 16)] = 'EnumMember'),
					(t[(t.Keyword = 17)] = 'Keyword'),
					(t[(t.Text = 18)] = 'Text'),
					(t[(t.Color = 19)] = 'Color'),
					(t[(t.File = 20)] = 'File'),
					(t[(t.Reference = 21)] = 'Reference'),
					(t[(t.Customcolor = 22)] = 'Customcolor'),
					(t[(t.Folder = 23)] = 'Folder'),
					(t[(t.TypeParameter = 24)] = 'TypeParameter'),
					(t[(t.User = 25)] = 'User'),
					(t[(t.Issue = 26)] = 'Issue'),
					(t[(t.Snippet = 27)] = 'Snippet');
			})(a || (n.CompletionItemKind = a = {}));
			var C;
			(function (t) {
				t[(t.Deprecated = 1)] = 'Deprecated';
			})(C || (n.CompletionItemTag = C = {}));
			var S;
			(function (t) {
				(t[(t.Invoke = 0)] = 'Invoke'),
					(t[(t.TriggerCharacter = 1)] = 'TriggerCharacter'),
					(t[(t.TriggerForIncompleteCompletions = 2)] = 'TriggerForIncompleteCompletions');
			})(S || (n.CompletionTriggerKind = S = {}));
			var o;
			(function (t) {
				(t[(t.EXACT = 0)] = 'EXACT'), (t[(t.ABOVE = 1)] = 'ABOVE'), (t[(t.BELOW = 2)] = 'BELOW');
			})(o || (n.ContentWidgetPositionPreference = o = {}));
			var s;
			(function (t) {
				(t[(t.NotSet = 0)] = 'NotSet'),
					(t[(t.ContentFlush = 1)] = 'ContentFlush'),
					(t[(t.RecoverFromMarkers = 2)] = 'RecoverFromMarkers'),
					(t[(t.Explicit = 3)] = 'Explicit'),
					(t[(t.Paste = 4)] = 'Paste'),
					(t[(t.Undo = 5)] = 'Undo'),
					(t[(t.Redo = 6)] = 'Redo');
			})(s || (n.CursorChangeReason = s = {}));
			var p;
			(function (t) {
				(t[(t.LF = 1)] = 'LF'), (t[(t.CRLF = 2)] = 'CRLF');
			})(p || (n.DefaultEndOfLine = p = {}));
			var e;
			(function (t) {
				(t[(t.Text = 0)] = 'Text'), (t[(t.Read = 1)] = 'Read'), (t[(t.Write = 2)] = 'Write');
			})(e || (n.DocumentHighlightKind = e = {}));
			var d;
			(function (t) {
				(t[(t.None = 0)] = 'None'),
					(t[(t.Keep = 1)] = 'Keep'),
					(t[(t.Brackets = 2)] = 'Brackets'),
					(t[(t.Advanced = 3)] = 'Advanced'),
					(t[(t.Full = 4)] = 'Full');
			})(d || (n.EditorAutoIndentStrategy = d = {}));
			var g;
			(function (t) {
				(t[(t.acceptSuggestionOnCommitCharacter = 0)] = 'acceptSuggestionOnCommitCharacter'),
					(t[(t.acceptSuggestionOnEnter = 1)] = 'acceptSuggestionOnEnter'),
					(t[(t.accessibilitySupport = 2)] = 'accessibilitySupport'),
					(t[(t.accessibilityPageSize = 3)] = 'accessibilityPageSize'),
					(t[(t.ariaLabel = 4)] = 'ariaLabel'),
					(t[(t.autoClosingBrackets = 5)] = 'autoClosingBrackets'),
					(t[(t.screenReaderAnnounceInlineSuggestion = 6)] =
						'screenReaderAnnounceInlineSuggestion'),
					(t[(t.autoClosingDelete = 7)] = 'autoClosingDelete'),
					(t[(t.autoClosingOvertype = 8)] = 'autoClosingOvertype'),
					(t[(t.autoClosingQuotes = 9)] = 'autoClosingQuotes'),
					(t[(t.autoIndent = 10)] = 'autoIndent'),
					(t[(t.automaticLayout = 11)] = 'automaticLayout'),
					(t[(t.autoSurround = 12)] = 'autoSurround'),
					(t[(t.bracketPairColorization = 13)] = 'bracketPairColorization'),
					(t[(t.guides = 14)] = 'guides'),
					(t[(t.codeLens = 15)] = 'codeLens'),
					(t[(t.codeLensFontFamily = 16)] = 'codeLensFontFamily'),
					(t[(t.codeLensFontSize = 17)] = 'codeLensFontSize'),
					(t[(t.colorDecorators = 18)] = 'colorDecorators'),
					(t[(t.colorDecoratorsLimit = 19)] = 'colorDecoratorsLimit'),
					(t[(t.columnSelection = 20)] = 'columnSelection'),
					(t[(t.comments = 21)] = 'comments'),
					(t[(t.contextmenu = 22)] = 'contextmenu'),
					(t[(t.copyWithSyntaxHighlighting = 23)] = 'copyWithSyntaxHighlighting'),
					(t[(t.cursorBlinking = 24)] = 'cursorBlinking'),
					(t[(t.cursorSmoothCaretAnimation = 25)] = 'cursorSmoothCaretAnimation'),
					(t[(t.cursorStyle = 26)] = 'cursorStyle'),
					(t[(t.cursorSurroundingLines = 27)] = 'cursorSurroundingLines'),
					(t[(t.cursorSurroundingLinesStyle = 28)] = 'cursorSurroundingLinesStyle'),
					(t[(t.cursorWidth = 29)] = 'cursorWidth'),
					(t[(t.disableLayerHinting = 30)] = 'disableLayerHinting'),
					(t[(t.disableMonospaceOptimizations = 31)] = 'disableMonospaceOptimizations'),
					(t[(t.domReadOnly = 32)] = 'domReadOnly'),
					(t[(t.dragAndDrop = 33)] = 'dragAndDrop'),
					(t[(t.dropIntoEditor = 34)] = 'dropIntoEditor'),
					(t[(t.emptySelectionClipboard = 35)] = 'emptySelectionClipboard'),
					(t[(t.experimentalWhitespaceRendering = 36)] = 'experimentalWhitespaceRendering'),
					(t[(t.extraEditorClassName = 37)] = 'extraEditorClassName'),
					(t[(t.fastScrollSensitivity = 38)] = 'fastScrollSensitivity'),
					(t[(t.find = 39)] = 'find'),
					(t[(t.fixedOverflowWidgets = 40)] = 'fixedOverflowWidgets'),
					(t[(t.folding = 41)] = 'folding'),
					(t[(t.foldingStrategy = 42)] = 'foldingStrategy'),
					(t[(t.foldingHighlight = 43)] = 'foldingHighlight'),
					(t[(t.foldingImportsByDefault = 44)] = 'foldingImportsByDefault'),
					(t[(t.foldingMaximumRegions = 45)] = 'foldingMaximumRegions'),
					(t[(t.unfoldOnClickAfterEndOfLine = 46)] = 'unfoldOnClickAfterEndOfLine'),
					(t[(t.fontFamily = 47)] = 'fontFamily'),
					(t[(t.fontInfo = 48)] = 'fontInfo'),
					(t[(t.fontLigatures = 49)] = 'fontLigatures'),
					(t[(t.fontSize = 50)] = 'fontSize'),
					(t[(t.fontWeight = 51)] = 'fontWeight'),
					(t[(t.fontVariations = 52)] = 'fontVariations'),
					(t[(t.formatOnPaste = 53)] = 'formatOnPaste'),
					(t[(t.formatOnType = 54)] = 'formatOnType'),
					(t[(t.glyphMargin = 55)] = 'glyphMargin'),
					(t[(t.gotoLocation = 56)] = 'gotoLocation'),
					(t[(t.hideCursorInOverviewRuler = 57)] = 'hideCursorInOverviewRuler'),
					(t[(t.hover = 58)] = 'hover'),
					(t[(t.inDiffEditor = 59)] = 'inDiffEditor'),
					(t[(t.inlineSuggest = 60)] = 'inlineSuggest'),
					(t[(t.letterSpacing = 61)] = 'letterSpacing'),
					(t[(t.lightbulb = 62)] = 'lightbulb'),
					(t[(t.lineDecorationsWidth = 63)] = 'lineDecorationsWidth'),
					(t[(t.lineHeight = 64)] = 'lineHeight'),
					(t[(t.lineNumbers = 65)] = 'lineNumbers'),
					(t[(t.lineNumbersMinChars = 66)] = 'lineNumbersMinChars'),
					(t[(t.linkedEditing = 67)] = 'linkedEditing'),
					(t[(t.links = 68)] = 'links'),
					(t[(t.matchBrackets = 69)] = 'matchBrackets'),
					(t[(t.minimap = 70)] = 'minimap'),
					(t[(t.mouseStyle = 71)] = 'mouseStyle'),
					(t[(t.mouseWheelScrollSensitivity = 72)] = 'mouseWheelScrollSensitivity'),
					(t[(t.mouseWheelZoom = 73)] = 'mouseWheelZoom'),
					(t[(t.multiCursorMergeOverlapping = 74)] = 'multiCursorMergeOverlapping'),
					(t[(t.multiCursorModifier = 75)] = 'multiCursorModifier'),
					(t[(t.multiCursorPaste = 76)] = 'multiCursorPaste'),
					(t[(t.multiCursorLimit = 77)] = 'multiCursorLimit'),
					(t[(t.occurrencesHighlight = 78)] = 'occurrencesHighlight'),
					(t[(t.overviewRulerBorder = 79)] = 'overviewRulerBorder'),
					(t[(t.overviewRulerLanes = 80)] = 'overviewRulerLanes'),
					(t[(t.padding = 81)] = 'padding'),
					(t[(t.parameterHints = 82)] = 'parameterHints'),
					(t[(t.peekWidgetDefaultFocus = 83)] = 'peekWidgetDefaultFocus'),
					(t[(t.definitionLinkOpensInPeek = 84)] = 'definitionLinkOpensInPeek'),
					(t[(t.quickSuggestions = 85)] = 'quickSuggestions'),
					(t[(t.quickSuggestionsDelay = 86)] = 'quickSuggestionsDelay'),
					(t[(t.readOnly = 87)] = 'readOnly'),
					(t[(t.renameOnType = 88)] = 'renameOnType'),
					(t[(t.renderControlCharacters = 89)] = 'renderControlCharacters'),
					(t[(t.renderFinalNewline = 90)] = 'renderFinalNewline'),
					(t[(t.renderLineHighlight = 91)] = 'renderLineHighlight'),
					(t[(t.renderLineHighlightOnlyWhenFocus = 92)] = 'renderLineHighlightOnlyWhenFocus'),
					(t[(t.renderValidationDecorations = 93)] = 'renderValidationDecorations'),
					(t[(t.renderWhitespace = 94)] = 'renderWhitespace'),
					(t[(t.revealHorizontalRightPadding = 95)] = 'revealHorizontalRightPadding'),
					(t[(t.roundedSelection = 96)] = 'roundedSelection'),
					(t[(t.rulers = 97)] = 'rulers'),
					(t[(t.scrollbar = 98)] = 'scrollbar'),
					(t[(t.scrollBeyondLastColumn = 99)] = 'scrollBeyondLastColumn'),
					(t[(t.scrollBeyondLastLine = 100)] = 'scrollBeyondLastLine'),
					(t[(t.scrollPredominantAxis = 101)] = 'scrollPredominantAxis'),
					(t[(t.selectionClipboard = 102)] = 'selectionClipboard'),
					(t[(t.selectionHighlight = 103)] = 'selectionHighlight'),
					(t[(t.selectOnLineNumbers = 104)] = 'selectOnLineNumbers'),
					(t[(t.showFoldingControls = 105)] = 'showFoldingControls'),
					(t[(t.showUnused = 106)] = 'showUnused'),
					(t[(t.snippetSuggestions = 107)] = 'snippetSuggestions'),
					(t[(t.smartSelect = 108)] = 'smartSelect'),
					(t[(t.smoothScrolling = 109)] = 'smoothScrolling'),
					(t[(t.stickyScroll = 110)] = 'stickyScroll'),
					(t[(t.stickyTabStops = 111)] = 'stickyTabStops'),
					(t[(t.stopRenderingLineAfter = 112)] = 'stopRenderingLineAfter'),
					(t[(t.suggest = 113)] = 'suggest'),
					(t[(t.suggestFontSize = 114)] = 'suggestFontSize'),
					(t[(t.suggestLineHeight = 115)] = 'suggestLineHeight'),
					(t[(t.suggestOnTriggerCharacters = 116)] = 'suggestOnTriggerCharacters'),
					(t[(t.suggestSelection = 117)] = 'suggestSelection'),
					(t[(t.tabCompletion = 118)] = 'tabCompletion'),
					(t[(t.tabIndex = 119)] = 'tabIndex'),
					(t[(t.unicodeHighlighting = 120)] = 'unicodeHighlighting'),
					(t[(t.unusualLineTerminators = 121)] = 'unusualLineTerminators'),
					(t[(t.useShadowDOM = 122)] = 'useShadowDOM'),
					(t[(t.useTabStops = 123)] = 'useTabStops'),
					(t[(t.wordBreak = 124)] = 'wordBreak'),
					(t[(t.wordSeparators = 125)] = 'wordSeparators'),
					(t[(t.wordWrap = 126)] = 'wordWrap'),
					(t[(t.wordWrapBreakAfterCharacters = 127)] = 'wordWrapBreakAfterCharacters'),
					(t[(t.wordWrapBreakBeforeCharacters = 128)] = 'wordWrapBreakBeforeCharacters'),
					(t[(t.wordWrapColumn = 129)] = 'wordWrapColumn'),
					(t[(t.wordWrapOverride1 = 130)] = 'wordWrapOverride1'),
					(t[(t.wordWrapOverride2 = 131)] = 'wordWrapOverride2'),
					(t[(t.wrappingIndent = 132)] = 'wrappingIndent'),
					(t[(t.wrappingStrategy = 133)] = 'wrappingStrategy'),
					(t[(t.showDeprecated = 134)] = 'showDeprecated'),
					(t[(t.inlayHints = 135)] = 'inlayHints'),
					(t[(t.editorClassName = 136)] = 'editorClassName'),
					(t[(t.pixelRatio = 137)] = 'pixelRatio'),
					(t[(t.tabFocusMode = 138)] = 'tabFocusMode'),
					(t[(t.layoutInfo = 139)] = 'layoutInfo'),
					(t[(t.wrappingInfo = 140)] = 'wrappingInfo'),
					(t[(t.defaultColorDecorators = 141)] = 'defaultColorDecorators');
			})(g || (n.EditorOption = g = {}));
			var b;
			(function (t) {
				(t[(t.TextDefined = 0)] = 'TextDefined'),
					(t[(t.LF = 1)] = 'LF'),
					(t[(t.CRLF = 2)] = 'CRLF');
			})(b || (n.EndOfLinePreference = b = {}));
			var m;
			(function (t) {
				(t[(t.LF = 0)] = 'LF'), (t[(t.CRLF = 1)] = 'CRLF');
			})(m || (n.EndOfLineSequence = m = {}));
			var v;
			(function (t) {
				(t[(t.Left = 1)] = 'Left'), (t[(t.Right = 2)] = 'Right');
			})(v || (n.GlyphMarginLane = v = {}));
			var E;
			(function (t) {
				(t[(t.None = 0)] = 'None'),
					(t[(t.Indent = 1)] = 'Indent'),
					(t[(t.IndentOutdent = 2)] = 'IndentOutdent'),
					(t[(t.Outdent = 3)] = 'Outdent');
			})(E || (n.IndentAction = E = {}));
			var L;
			(function (t) {
				(t[(t.Both = 0)] = 'Both'),
					(t[(t.Right = 1)] = 'Right'),
					(t[(t.Left = 2)] = 'Left'),
					(t[(t.None = 3)] = 'None');
			})(L || (n.InjectedTextCursorStops = L = {}));
			var A;
			(function (t) {
				(t[(t.Type = 1)] = 'Type'), (t[(t.Parameter = 2)] = 'Parameter');
			})(A || (n.InlayHintKind = A = {}));
			var w;
			(function (t) {
				(t[(t.Automatic = 0)] = 'Automatic'), (t[(t.Explicit = 1)] = 'Explicit');
			})(w || (n.InlineCompletionTriggerKind = w = {}));
			var c;
			(function (t) {
				(t[(t.DependsOnKbLayout = -1)] = 'DependsOnKbLayout'),
					(t[(t.Unknown = 0)] = 'Unknown'),
					(t[(t.Backspace = 1)] = 'Backspace'),
					(t[(t.Tab = 2)] = 'Tab'),
					(t[(t.Enter = 3)] = 'Enter'),
					(t[(t.Shift = 4)] = 'Shift'),
					(t[(t.Ctrl = 5)] = 'Ctrl'),
					(t[(t.Alt = 6)] = 'Alt'),
					(t[(t.PauseBreak = 7)] = 'PauseBreak'),
					(t[(t.CapsLock = 8)] = 'CapsLock'),
					(t[(t.Escape = 9)] = 'Escape'),
					(t[(t.Space = 10)] = 'Space'),
					(t[(t.PageUp = 11)] = 'PageUp'),
					(t[(t.PageDown = 12)] = 'PageDown'),
					(t[(t.End = 13)] = 'End'),
					(t[(t.Home = 14)] = 'Home'),
					(t[(t.LeftArrow = 15)] = 'LeftArrow'),
					(t[(t.UpArrow = 16)] = 'UpArrow'),
					(t[(t.RightArrow = 17)] = 'RightArrow'),
					(t[(t.DownArrow = 18)] = 'DownArrow'),
					(t[(t.Insert = 19)] = 'Insert'),
					(t[(t.Delete = 20)] = 'Delete'),
					(t[(t.Digit0 = 21)] = 'Digit0'),
					(t[(t.Digit1 = 22)] = 'Digit1'),
					(t[(t.Digit2 = 23)] = 'Digit2'),
					(t[(t.Digit3 = 24)] = 'Digit3'),
					(t[(t.Digit4 = 25)] = 'Digit4'),
					(t[(t.Digit5 = 26)] = 'Digit5'),
					(t[(t.Digit6 = 27)] = 'Digit6'),
					(t[(t.Digit7 = 28)] = 'Digit7'),
					(t[(t.Digit8 = 29)] = 'Digit8'),
					(t[(t.Digit9 = 30)] = 'Digit9'),
					(t[(t.KeyA = 31)] = 'KeyA'),
					(t[(t.KeyB = 32)] = 'KeyB'),
					(t[(t.KeyC = 33)] = 'KeyC'),
					(t[(t.KeyD = 34)] = 'KeyD'),
					(t[(t.KeyE = 35)] = 'KeyE'),
					(t[(t.KeyF = 36)] = 'KeyF'),
					(t[(t.KeyG = 37)] = 'KeyG'),
					(t[(t.KeyH = 38)] = 'KeyH'),
					(t[(t.KeyI = 39)] = 'KeyI'),
					(t[(t.KeyJ = 40)] = 'KeyJ'),
					(t[(t.KeyK = 41)] = 'KeyK'),
					(t[(t.KeyL = 42)] = 'KeyL'),
					(t[(t.KeyM = 43)] = 'KeyM'),
					(t[(t.KeyN = 44)] = 'KeyN'),
					(t[(t.KeyO = 45)] = 'KeyO'),
					(t[(t.KeyP = 46)] = 'KeyP'),
					(t[(t.KeyQ = 47)] = 'KeyQ'),
					(t[(t.KeyR = 48)] = 'KeyR'),
					(t[(t.KeyS = 49)] = 'KeyS'),
					(t[(t.KeyT = 50)] = 'KeyT'),
					(t[(t.KeyU = 51)] = 'KeyU'),
					(t[(t.KeyV = 52)] = 'KeyV'),
					(t[(t.KeyW = 53)] = 'KeyW'),
					(t[(t.KeyX = 54)] = 'KeyX'),
					(t[(t.KeyY = 55)] = 'KeyY'),
					(t[(t.KeyZ = 56)] = 'KeyZ'),
					(t[(t.Meta = 57)] = 'Meta'),
					(t[(t.ContextMenu = 58)] = 'ContextMenu'),
					(t[(t.F1 = 59)] = 'F1'),
					(t[(t.F2 = 60)] = 'F2'),
					(t[(t.F3 = 61)] = 'F3'),
					(t[(t.F4 = 62)] = 'F4'),
					(t[(t.F5 = 63)] = 'F5'),
					(t[(t.F6 = 64)] = 'F6'),
					(t[(t.F7 = 65)] = 'F7'),
					(t[(t.F8 = 66)] = 'F8'),
					(t[(t.F9 = 67)] = 'F9'),
					(t[(t.F10 = 68)] = 'F10'),
					(t[(t.F11 = 69)] = 'F11'),
					(t[(t.F12 = 70)] = 'F12'),
					(t[(t.F13 = 71)] = 'F13'),
					(t[(t.F14 = 72)] = 'F14'),
					(t[(t.F15 = 73)] = 'F15'),
					(t[(t.F16 = 74)] = 'F16'),
					(t[(t.F17 = 75)] = 'F17'),
					(t[(t.F18 = 76)] = 'F18'),
					(t[(t.F19 = 77)] = 'F19'),
					(t[(t.F20 = 78)] = 'F20'),
					(t[(t.F21 = 79)] = 'F21'),
					(t[(t.F22 = 80)] = 'F22'),
					(t[(t.F23 = 81)] = 'F23'),
					(t[(t.F24 = 82)] = 'F24'),
					(t[(t.NumLock = 83)] = 'NumLock'),
					(t[(t.ScrollLock = 84)] = 'ScrollLock'),
					(t[(t.Semicolon = 85)] = 'Semicolon'),
					(t[(t.Equal = 86)] = 'Equal'),
					(t[(t.Comma = 87)] = 'Comma'),
					(t[(t.Minus = 88)] = 'Minus'),
					(t[(t.Period = 89)] = 'Period'),
					(t[(t.Slash = 90)] = 'Slash'),
					(t[(t.Backquote = 91)] = 'Backquote'),
					(t[(t.BracketLeft = 92)] = 'BracketLeft'),
					(t[(t.Backslash = 93)] = 'Backslash'),
					(t[(t.BracketRight = 94)] = 'BracketRight'),
					(t[(t.Quote = 95)] = 'Quote'),
					(t[(t.OEM_8 = 96)] = 'OEM_8'),
					(t[(t.IntlBackslash = 97)] = 'IntlBackslash'),
					(t[(t.Numpad0 = 98)] = 'Numpad0'),
					(t[(t.Numpad1 = 99)] = 'Numpad1'),
					(t[(t.Numpad2 = 100)] = 'Numpad2'),
					(t[(t.Numpad3 = 101)] = 'Numpad3'),
					(t[(t.Numpad4 = 102)] = 'Numpad4'),
					(t[(t.Numpad5 = 103)] = 'Numpad5'),
					(t[(t.Numpad6 = 104)] = 'Numpad6'),
					(t[(t.Numpad7 = 105)] = 'Numpad7'),
					(t[(t.Numpad8 = 106)] = 'Numpad8'),
					(t[(t.Numpad9 = 107)] = 'Numpad9'),
					(t[(t.NumpadMultiply = 108)] = 'NumpadMultiply'),
					(t[(t.NumpadAdd = 109)] = 'NumpadAdd'),
					(t[(t.NUMPAD_SEPARATOR = 110)] = 'NUMPAD_SEPARATOR'),
					(t[(t.NumpadSubtract = 111)] = 'NumpadSubtract'),
					(t[(t.NumpadDecimal = 112)] = 'NumpadDecimal'),
					(t[(t.NumpadDivide = 113)] = 'NumpadDivide'),
					(t[(t.KEY_IN_COMPOSITION = 114)] = 'KEY_IN_COMPOSITION'),
					(t[(t.ABNT_C1 = 115)] = 'ABNT_C1'),
					(t[(t.ABNT_C2 = 116)] = 'ABNT_C2'),
					(t[(t.AudioVolumeMute = 117)] = 'AudioVolumeMute'),
					(t[(t.AudioVolumeUp = 118)] = 'AudioVolumeUp'),
					(t[(t.AudioVolumeDown = 119)] = 'AudioVolumeDown'),
					(t[(t.BrowserSearch = 120)] = 'BrowserSearch'),
					(t[(t.BrowserHome = 121)] = 'BrowserHome'),
					(t[(t.BrowserBack = 122)] = 'BrowserBack'),
					(t[(t.BrowserForward = 123)] = 'BrowserForward'),
					(t[(t.MediaTrackNext = 124)] = 'MediaTrackNext'),
					(t[(t.MediaTrackPrevious = 125)] = 'MediaTrackPrevious'),
					(t[(t.MediaStop = 126)] = 'MediaStop'),
					(t[(t.MediaPlayPause = 127)] = 'MediaPlayPause'),
					(t[(t.LaunchMediaPlayer = 128)] = 'LaunchMediaPlayer'),
					(t[(t.LaunchMail = 129)] = 'LaunchMail'),
					(t[(t.LaunchApp2 = 130)] = 'LaunchApp2'),
					(t[(t.Clear = 131)] = 'Clear'),
					(t[(t.MAX_VALUE = 132)] = 'MAX_VALUE');
			})(c || (n.KeyCode = c = {}));
			var r;
			(function (t) {
				(t[(t.Hint = 1)] = 'Hint'),
					(t[(t.Info = 2)] = 'Info'),
					(t[(t.Warning = 4)] = 'Warning'),
					(t[(t.Error = 8)] = 'Error');
			})(r || (n.MarkerSeverity = r = {}));
			var u;
			(function (t) {
				(t[(t.Unnecessary = 1)] = 'Unnecessary'), (t[(t.Deprecated = 2)] = 'Deprecated');
			})(u || (n.MarkerTag = u = {}));
			var h;
			(function (t) {
				(t[(t.Inline = 1)] = 'Inline'), (t[(t.Gutter = 2)] = 'Gutter');
			})(h || (n.MinimapPosition = h = {}));
			var f;
			(function (t) {
				(t[(t.UNKNOWN = 0)] = 'UNKNOWN'),
					(t[(t.TEXTAREA = 1)] = 'TEXTAREA'),
					(t[(t.GUTTER_GLYPH_MARGIN = 2)] = 'GUTTER_GLYPH_MARGIN'),
					(t[(t.GUTTER_LINE_NUMBERS = 3)] = 'GUTTER_LINE_NUMBERS'),
					(t[(t.GUTTER_LINE_DECORATIONS = 4)] = 'GUTTER_LINE_DECORATIONS'),
					(t[(t.GUTTER_VIEW_ZONE = 5)] = 'GUTTER_VIEW_ZONE'),
					(t[(t.CONTENT_TEXT = 6)] = 'CONTENT_TEXT'),
					(t[(t.CONTENT_EMPTY = 7)] = 'CONTENT_EMPTY'),
					(t[(t.CONTENT_VIEW_ZONE = 8)] = 'CONTENT_VIEW_ZONE'),
					(t[(t.CONTENT_WIDGET = 9)] = 'CONTENT_WIDGET'),
					(t[(t.OVERVIEW_RULER = 10)] = 'OVERVIEW_RULER'),
					(t[(t.SCROLLBAR = 11)] = 'SCROLLBAR'),
					(t[(t.OVERLAY_WIDGET = 12)] = 'OVERLAY_WIDGET'),
					(t[(t.OUTSIDE_EDITOR = 13)] = 'OUTSIDE_EDITOR');
			})(f || (n.MouseTargetType = f = {}));
			var l;
			(function (t) {
				(t[(t.TOP_RIGHT_CORNER = 0)] = 'TOP_RIGHT_CORNER'),
					(t[(t.BOTTOM_RIGHT_CORNER = 1)] = 'BOTTOM_RIGHT_CORNER'),
					(t[(t.TOP_CENTER = 2)] = 'TOP_CENTER');
			})(l || (n.OverlayWidgetPositionPreference = l = {}));
			var _;
			(function (t) {
				(t[(t.Left = 1)] = 'Left'),
					(t[(t.Center = 2)] = 'Center'),
					(t[(t.Right = 4)] = 'Right'),
					(t[(t.Full = 7)] = 'Full');
			})(_ || (n.OverviewRulerLane = _ = {}));
			var N;
			(function (t) {
				(t[(t.Left = 0)] = 'Left'),
					(t[(t.Right = 1)] = 'Right'),
					(t[(t.None = 2)] = 'None'),
					(t[(t.LeftOfInjectedText = 3)] = 'LeftOfInjectedText'),
					(t[(t.RightOfInjectedText = 4)] = 'RightOfInjectedText');
			})(N || (n.PositionAffinity = N = {}));
			var y;
			(function (t) {
				(t[(t.Off = 0)] = 'Off'),
					(t[(t.On = 1)] = 'On'),
					(t[(t.Relative = 2)] = 'Relative'),
					(t[(t.Interval = 3)] = 'Interval'),
					(t[(t.Custom = 4)] = 'Custom');
			})(y || (n.RenderLineNumbersType = y = {}));
			var D;
			(function (t) {
				(t[(t.None = 0)] = 'None'), (t[(t.Text = 1)] = 'Text'), (t[(t.Blocks = 2)] = 'Blocks');
			})(D || (n.RenderMinimap = D = {}));
			var k;
			(function (t) {
				(t[(t.Smooth = 0)] = 'Smooth'), (t[(t.Immediate = 1)] = 'Immediate');
			})(k || (n.ScrollType = k = {}));
			var B;
			(function (t) {
				(t[(t.Auto = 1)] = 'Auto'),
					(t[(t.Hidden = 2)] = 'Hidden'),
					(t[(t.Visible = 3)] = 'Visible');
			})(B || (n.ScrollbarVisibility = B = {}));
			var I;
			(function (t) {
				(t[(t.LTR = 0)] = 'LTR'), (t[(t.RTL = 1)] = 'RTL');
			})(I || (n.SelectionDirection = I = {}));
			var U;
			(function (t) {
				(t[(t.Invoke = 1)] = 'Invoke'),
					(t[(t.TriggerCharacter = 2)] = 'TriggerCharacter'),
					(t[(t.ContentChange = 3)] = 'ContentChange');
			})(U || (n.SignatureHelpTriggerKind = U = {}));
			var V;
			(function (t) {
				(t[(t.File = 0)] = 'File'),
					(t[(t.Module = 1)] = 'Module'),
					(t[(t.Namespace = 2)] = 'Namespace'),
					(t[(t.Package = 3)] = 'Package'),
					(t[(t.Class = 4)] = 'Class'),
					(t[(t.Method = 5)] = 'Method'),
					(t[(t.Property = 6)] = 'Property'),
					(t[(t.Field = 7)] = 'Field'),
					(t[(t.Constructor = 8)] = 'Constructor'),
					(t[(t.Enum = 9)] = 'Enum'),
					(t[(t.Interface = 10)] = 'Interface'),
					(t[(t.Function = 11)] = 'Function'),
					(t[(t.Variable = 12)] = 'Variable'),
					(t[(t.Constant = 13)] = 'Constant'),
					(t[(t.String = 14)] = 'String'),
					(t[(t.Number = 15)] = 'Number'),
					(t[(t.Boolean = 16)] = 'Boolean'),
					(t[(t.Array = 17)] = 'Array'),
					(t[(t.Object = 18)] = 'Object'),
					(t[(t.Key = 19)] = 'Key'),
					(t[(t.Null = 20)] = 'Null'),
					(t[(t.EnumMember = 21)] = 'EnumMember'),
					(t[(t.Struct = 22)] = 'Struct'),
					(t[(t.Event = 23)] = 'Event'),
					(t[(t.Operator = 24)] = 'Operator'),
					(t[(t.TypeParameter = 25)] = 'TypeParameter');
			})(V || (n.SymbolKind = V = {}));
			var Q;
			(function (t) {
				t[(t.Deprecated = 1)] = 'Deprecated';
			})(Q || (n.SymbolTag = Q = {}));
			var F;
			(function (t) {
				(t[(t.Hidden = 0)] = 'Hidden'),
					(t[(t.Blink = 1)] = 'Blink'),
					(t[(t.Smooth = 2)] = 'Smooth'),
					(t[(t.Phase = 3)] = 'Phase'),
					(t[(t.Expand = 4)] = 'Expand'),
					(t[(t.Solid = 5)] = 'Solid');
			})(F || (n.TextEditorCursorBlinkingStyle = F = {}));
			var T;
			(function (t) {
				(t[(t.Line = 1)] = 'Line'),
					(t[(t.Block = 2)] = 'Block'),
					(t[(t.Underline = 3)] = 'Underline'),
					(t[(t.LineThin = 4)] = 'LineThin'),
					(t[(t.BlockOutline = 5)] = 'BlockOutline'),
					(t[(t.UnderlineThin = 6)] = 'UnderlineThin');
			})(T || (n.TextEditorCursorStyle = T = {}));
			var q;
			(function (t) {
				(t[(t.AlwaysGrowsWhenTypingAtEdges = 0)] = 'AlwaysGrowsWhenTypingAtEdges'),
					(t[(t.NeverGrowsWhenTypingAtEdges = 1)] = 'NeverGrowsWhenTypingAtEdges'),
					(t[(t.GrowsOnlyWhenTypingBefore = 2)] = 'GrowsOnlyWhenTypingBefore'),
					(t[(t.GrowsOnlyWhenTypingAfter = 3)] = 'GrowsOnlyWhenTypingAfter');
			})(q || (n.TrackedRangeStickiness = q = {}));
			var H;
			(function (t) {
				(t[(t.None = 0)] = 'None'),
					(t[(t.Same = 1)] = 'Same'),
					(t[(t.Indent = 2)] = 'Indent'),
					(t[(t.DeepIndent = 3)] = 'DeepIndent');
			})(H || (n.WrappingIndent = H = {}));
		}),
		Y(X[52], J([25, 59]), function (x, n) {
			return x.create('vs/base/common/platform', n);
		}),
		Y(X[8], J([0, 1, 52]), function (x, n, R) {
			'use strict';
			var M;
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.isAndroid =
					n.isEdge =
					n.isSafari =
					n.isFirefox =
					n.isChrome =
					n.isLittleEndian =
					n.OS =
					n.setTimeout0 =
					n.setTimeout0IsFaster =
					n.language =
					n.userAgent =
					n.isMobile =
					n.isIOS =
					n.isWebWorker =
					n.isWeb =
					n.isNative =
					n.isLinux =
					n.isMacintosh =
					n.isWindows =
					n.globals =
					n.LANGUAGE_DEFAULT =
						void 0),
				(n.LANGUAGE_DEFAULT = 'en');
			let i = !1,
				a = !1,
				C = !1,
				S = !1,
				o = !1,
				s = !1,
				p = !1,
				e = !1,
				d = !1,
				g = !1,
				b,
				m = n.LANGUAGE_DEFAULT,
				v = n.LANGUAGE_DEFAULT,
				E,
				L;
			n.globals = typeof self == 'object' ? self : typeof global == 'object' ? global : {};
			let A;
			typeof n.globals.vscode < 'u' && typeof n.globals.vscode.process < 'u'
				? (A = n.globals.vscode.process)
				: typeof process < 'u' && (A = process);
			const w =
					typeof ((M = A?.versions) === null || M === void 0 ? void 0 : M.electron) == 'string',
				c = w && A?.type === 'renderer';
			if (typeof navigator == 'object' && !c)
				(L = navigator.userAgent),
					(i = L.indexOf('Windows') >= 0),
					(a = L.indexOf('Macintosh') >= 0),
					(e =
						(L.indexOf('Macintosh') >= 0 || L.indexOf('iPad') >= 0 || L.indexOf('iPhone') >= 0) &&
						!!navigator.maxTouchPoints &&
						navigator.maxTouchPoints > 0),
					(C = L.indexOf('Linux') >= 0),
					(g = L?.indexOf('Mobi') >= 0),
					(s = !0),
					(b = R.getConfiguredDefaultLocale(R.localize(0, null)) || n.LANGUAGE_DEFAULT),
					(m = b),
					(v = navigator.language);
			else if (typeof A == 'object') {
				(i = A.platform === 'win32'),
					(a = A.platform === 'darwin'),
					(C = A.platform === 'linux'),
					(S = C && !!A.env.SNAP && !!A.env.SNAP_REVISION),
					(p = w),
					(d = !!A.env.CI || !!A.env.BUILD_ARTIFACTSTAGINGDIRECTORY),
					(b = n.LANGUAGE_DEFAULT),
					(m = n.LANGUAGE_DEFAULT);
				const l = A.env.VSCODE_NLS_CONFIG;
				if (l)
					try {
						const _ = JSON.parse(l),
							N = _.availableLanguages['*'];
						(b = _.locale),
							(v = _.osLocale),
							(m = N || n.LANGUAGE_DEFAULT),
							(E = _._translationsConfigFile);
					} catch {}
				o = !0;
			} else console.error('Unable to resolve platform.');
			let r = 0;
			a ? (r = 1) : i ? (r = 3) : C && (r = 2),
				(n.isWindows = i),
				(n.isMacintosh = a),
				(n.isLinux = C),
				(n.isNative = o),
				(n.isWeb = s),
				(n.isWebWorker = s && typeof n.globals.importScripts == 'function'),
				(n.isIOS = e),
				(n.isMobile = g),
				(n.userAgent = L),
				(n.language = m),
				(n.setTimeout0IsFaster =
					typeof n.globals.postMessage == 'function' && !n.globals.importScripts),
				(n.setTimeout0 = (() => {
					if (n.setTimeout0IsFaster) {
						const l = [];
						n.globals.addEventListener('message', (N) => {
							if (N.data && N.data.vscodeScheduleAsyncWork)
								for (let y = 0, D = l.length; y < D; y++) {
									const k = l[y];
									if (k.id === N.data.vscodeScheduleAsyncWork) {
										l.splice(y, 1), k.callback();
										return;
									}
								}
						});
						let _ = 0;
						return (N) => {
							const y = ++_;
							l.push({ id: y, callback: N }),
								n.globals.postMessage({ vscodeScheduleAsyncWork: y }, '*');
						};
					}
					return (l) => setTimeout(l);
				})()),
				(n.OS = a || e ? 2 : i ? 1 : 3);
			let u = !0,
				h = !1;
			function f() {
				if (!h) {
					h = !0;
					const l = new Uint8Array(2);
					(l[0] = 1), (l[1] = 2), (u = new Uint16Array(l.buffer)[0] === (2 << 8) + 1);
				}
				return u;
			}
			(n.isLittleEndian = f),
				(n.isChrome = !!(n.userAgent && n.userAgent.indexOf('Chrome') >= 0)),
				(n.isFirefox = !!(n.userAgent && n.userAgent.indexOf('Firefox') >= 0)),
				(n.isSafari = !!(!n.isChrome && n.userAgent && n.userAgent.indexOf('Safari') >= 0)),
				(n.isEdge = !!(n.userAgent && n.userAgent.indexOf('Edg/') >= 0)),
				(n.isAndroid = !!(n.userAgent && n.userAgent.indexOf('Android') >= 0));
		}),
		Y(X[53], J([0, 1, 8]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.platform = n.env = n.cwd = void 0);
			let M;
			if (typeof R.globals.vscode < 'u' && typeof R.globals.vscode.process < 'u') {
				const i = R.globals.vscode.process;
				M = {
					get platform() {
						return i.platform;
					},
					get arch() {
						return i.arch;
					},
					get env() {
						return i.env;
					},
					cwd() {
						return i.cwd();
					}
				};
			} else
				typeof process < 'u'
					? (M = {
							get platform() {
								return process.platform;
							},
							get arch() {
								return process.arch;
							},
							get env() {
								return process.env;
							},
							cwd() {
								return process.env.VSCODE_CWD || process.cwd();
							}
					  })
					: (M = {
							get platform() {
								return R.isWindows ? 'win32' : R.isMacintosh ? 'darwin' : 'linux';
							},
							get arch() {},
							get env() {
								return {};
							},
							cwd() {
								return '/';
							}
					  });
			(n.cwd = M.cwd), (n.env = M.env), (n.platform = M.platform);
		}),
		Y(X[54], J([0, 1, 53]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.sep =
					n.extname =
					n.basename =
					n.dirname =
					n.relative =
					n.resolve =
					n.normalize =
					n.posix =
					n.win32 =
						void 0);
			const M = 65,
				i = 97,
				a = 90,
				C = 122,
				S = 46,
				o = 47,
				s = 92,
				p = 58,
				e = 63;
			class d extends Error {
				constructor(u, h, f) {
					let l;
					typeof h == 'string' && h.indexOf('not ') === 0
						? ((l = 'must not be'), (h = h.replace(/^not /, '')))
						: (l = 'must be');
					const _ = u.indexOf('.') !== -1 ? 'property' : 'argument';
					let N = `The "${u}" ${_} ${l} of type ${h}`;
					(N += `. Received type ${typeof f}`), super(N), (this.code = 'ERR_INVALID_ARG_TYPE');
				}
			}
			function g(r, u) {
				if (r === null || typeof r != 'object') throw new d(u, 'Object', r);
			}
			function b(r, u) {
				if (typeof r != 'string') throw new d(u, 'string', r);
			}
			const m = R.platform === 'win32';
			function v(r) {
				return r === o || r === s;
			}
			function E(r) {
				return r === o;
			}
			function L(r) {
				return (r >= M && r <= a) || (r >= i && r <= C);
			}
			function A(r, u, h, f) {
				let l = '',
					_ = 0,
					N = -1,
					y = 0,
					D = 0;
				for (let k = 0; k <= r.length; ++k) {
					if (k < r.length) D = r.charCodeAt(k);
					else {
						if (f(D)) break;
						D = o;
					}
					if (f(D)) {
						if (!(N === k - 1 || y === 1))
							if (y === 2) {
								if (
									l.length < 2 ||
									_ !== 2 ||
									l.charCodeAt(l.length - 1) !== S ||
									l.charCodeAt(l.length - 2) !== S
								) {
									if (l.length > 2) {
										const B = l.lastIndexOf(h);
										B === -1
											? ((l = ''), (_ = 0))
											: ((l = l.slice(0, B)), (_ = l.length - 1 - l.lastIndexOf(h))),
											(N = k),
											(y = 0);
										continue;
									} else if (l.length !== 0) {
										(l = ''), (_ = 0), (N = k), (y = 0);
										continue;
									}
								}
								u && ((l += l.length > 0 ? `${h}..` : '..'), (_ = 2));
							} else
								l.length > 0 ? (l += `${h}${r.slice(N + 1, k)}`) : (l = r.slice(N + 1, k)),
									(_ = k - N - 1);
						(N = k), (y = 0);
					} else D === S && y !== -1 ? ++y : (y = -1);
				}
				return l;
			}
			function w(r, u) {
				g(u, 'pathObject');
				const h = u.dir || u.root,
					f = u.base || `${u.name || ''}${u.ext || ''}`;
				return h ? (h === u.root ? `${h}${f}` : `${h}${r}${f}`) : f;
			}
			n.win32 = {
				resolve(...r) {
					let u = '',
						h = '',
						f = !1;
					for (let l = r.length - 1; l >= -1; l--) {
						let _;
						if (l >= 0) {
							if (((_ = r[l]), b(_, 'path'), _.length === 0)) continue;
						} else
							u.length === 0
								? (_ = R.cwd())
								: ((_ = R.env[`=${u}`] || R.cwd()),
								  (_ === void 0 ||
										(_.slice(0, 2).toLowerCase() !== u.toLowerCase() && _.charCodeAt(2) === s)) &&
										(_ = `${u}\\`));
						const N = _.length;
						let y = 0,
							D = '',
							k = !1;
						const B = _.charCodeAt(0);
						if (N === 1) v(B) && ((y = 1), (k = !0));
						else if (v(B))
							if (((k = !0), v(_.charCodeAt(1)))) {
								let I = 2,
									U = I;
								for (; I < N && !v(_.charCodeAt(I)); ) I++;
								if (I < N && I !== U) {
									const V = _.slice(U, I);
									for (U = I; I < N && v(_.charCodeAt(I)); ) I++;
									if (I < N && I !== U) {
										for (U = I; I < N && !v(_.charCodeAt(I)); ) I++;
										(I === N || I !== U) && ((D = `\\\\${V}\\${_.slice(U, I)}`), (y = I));
									}
								}
							} else y = 1;
						else
							L(B) &&
								_.charCodeAt(1) === p &&
								((D = _.slice(0, 2)), (y = 2), N > 2 && v(_.charCodeAt(2)) && ((k = !0), (y = 3)));
						if (D.length > 0)
							if (u.length > 0) {
								if (D.toLowerCase() !== u.toLowerCase()) continue;
							} else u = D;
						if (f) {
							if (u.length > 0) break;
						} else if (((h = `${_.slice(y)}\\${h}`), (f = k), k && u.length > 0)) break;
					}
					return (h = A(h, !f, '\\', v)), f ? `${u}\\${h}` : `${u}${h}` || '.';
				},
				normalize(r) {
					b(r, 'path');
					const u = r.length;
					if (u === 0) return '.';
					let h = 0,
						f,
						l = !1;
					const _ = r.charCodeAt(0);
					if (u === 1) return E(_) ? '\\' : r;
					if (v(_))
						if (((l = !0), v(r.charCodeAt(1)))) {
							let y = 2,
								D = y;
							for (; y < u && !v(r.charCodeAt(y)); ) y++;
							if (y < u && y !== D) {
								const k = r.slice(D, y);
								for (D = y; y < u && v(r.charCodeAt(y)); ) y++;
								if (y < u && y !== D) {
									for (D = y; y < u && !v(r.charCodeAt(y)); ) y++;
									if (y === u) return `\\\\${k}\\${r.slice(D)}\\`;
									y !== D && ((f = `\\\\${k}\\${r.slice(D, y)}`), (h = y));
								}
							}
						} else h = 1;
					else
						L(_) &&
							r.charCodeAt(1) === p &&
							((f = r.slice(0, 2)), (h = 2), u > 2 && v(r.charCodeAt(2)) && ((l = !0), (h = 3)));
					let N = h < u ? A(r.slice(h), !l, '\\', v) : '';
					return (
						N.length === 0 && !l && (N = '.'),
						N.length > 0 && v(r.charCodeAt(u - 1)) && (N += '\\'),
						f === void 0 ? (l ? `\\${N}` : N) : l ? `${f}\\${N}` : `${f}${N}`
					);
				},
				isAbsolute(r) {
					b(r, 'path');
					const u = r.length;
					if (u === 0) return !1;
					const h = r.charCodeAt(0);
					return v(h) || (u > 2 && L(h) && r.charCodeAt(1) === p && v(r.charCodeAt(2)));
				},
				join(...r) {
					if (r.length === 0) return '.';
					let u, h;
					for (let _ = 0; _ < r.length; ++_) {
						const N = r[_];
						b(N, 'path'), N.length > 0 && (u === void 0 ? (u = h = N) : (u += `\\${N}`));
					}
					if (u === void 0) return '.';
					let f = !0,
						l = 0;
					if (typeof h == 'string' && v(h.charCodeAt(0))) {
						++l;
						const _ = h.length;
						_ > 1 && v(h.charCodeAt(1)) && (++l, _ > 2 && (v(h.charCodeAt(2)) ? ++l : (f = !1)));
					}
					if (f) {
						for (; l < u.length && v(u.charCodeAt(l)); ) l++;
						l >= 2 && (u = `\\${u.slice(l)}`);
					}
					return n.win32.normalize(u);
				},
				relative(r, u) {
					if ((b(r, 'from'), b(u, 'to'), r === u)) return '';
					const h = n.win32.resolve(r),
						f = n.win32.resolve(u);
					if (h === f || ((r = h.toLowerCase()), (u = f.toLowerCase()), r === u)) return '';
					let l = 0;
					for (; l < r.length && r.charCodeAt(l) === s; ) l++;
					let _ = r.length;
					for (; _ - 1 > l && r.charCodeAt(_ - 1) === s; ) _--;
					const N = _ - l;
					let y = 0;
					for (; y < u.length && u.charCodeAt(y) === s; ) y++;
					let D = u.length;
					for (; D - 1 > y && u.charCodeAt(D - 1) === s; ) D--;
					const k = D - y,
						B = N < k ? N : k;
					let I = -1,
						U = 0;
					for (; U < B; U++) {
						const Q = r.charCodeAt(l + U);
						if (Q !== u.charCodeAt(y + U)) break;
						Q === s && (I = U);
					}
					if (U !== B) {
						if (I === -1) return f;
					} else {
						if (k > B) {
							if (u.charCodeAt(y + U) === s) return f.slice(y + U + 1);
							if (U === 2) return f.slice(y + U);
						}
						N > B && (r.charCodeAt(l + U) === s ? (I = U) : U === 2 && (I = 3)),
							I === -1 && (I = 0);
					}
					let V = '';
					for (U = l + I + 1; U <= _; ++U)
						(U === _ || r.charCodeAt(U) === s) && (V += V.length === 0 ? '..' : '\\..');
					return (
						(y += I),
						V.length > 0 ? `${V}${f.slice(y, D)}` : (f.charCodeAt(y) === s && ++y, f.slice(y, D))
					);
				},
				toNamespacedPath(r) {
					if (typeof r != 'string' || r.length === 0) return r;
					const u = n.win32.resolve(r);
					if (u.length <= 2) return r;
					if (u.charCodeAt(0) === s) {
						if (u.charCodeAt(1) === s) {
							const h = u.charCodeAt(2);
							if (h !== e && h !== S) return `\\\\?\\UNC\\${u.slice(2)}`;
						}
					} else if (L(u.charCodeAt(0)) && u.charCodeAt(1) === p && u.charCodeAt(2) === s)
						return `\\\\?\\${u}`;
					return r;
				},
				dirname(r) {
					b(r, 'path');
					const u = r.length;
					if (u === 0) return '.';
					let h = -1,
						f = 0;
					const l = r.charCodeAt(0);
					if (u === 1) return v(l) ? r : '.';
					if (v(l)) {
						if (((h = f = 1), v(r.charCodeAt(1)))) {
							let y = 2,
								D = y;
							for (; y < u && !v(r.charCodeAt(y)); ) y++;
							if (y < u && y !== D) {
								for (D = y; y < u && v(r.charCodeAt(y)); ) y++;
								if (y < u && y !== D) {
									for (D = y; y < u && !v(r.charCodeAt(y)); ) y++;
									if (y === u) return r;
									y !== D && (h = f = y + 1);
								}
							}
						}
					} else
						L(l) && r.charCodeAt(1) === p && ((h = u > 2 && v(r.charCodeAt(2)) ? 3 : 2), (f = h));
					let _ = -1,
						N = !0;
					for (let y = u - 1; y >= f; --y)
						if (v(r.charCodeAt(y))) {
							if (!N) {
								_ = y;
								break;
							}
						} else N = !1;
					if (_ === -1) {
						if (h === -1) return '.';
						_ = h;
					}
					return r.slice(0, _);
				},
				basename(r, u) {
					u !== void 0 && b(u, 'ext'), b(r, 'path');
					let h = 0,
						f = -1,
						l = !0,
						_;
					if (
						(r.length >= 2 && L(r.charCodeAt(0)) && r.charCodeAt(1) === p && (h = 2),
						u !== void 0 && u.length > 0 && u.length <= r.length)
					) {
						if (u === r) return '';
						let N = u.length - 1,
							y = -1;
						for (_ = r.length - 1; _ >= h; --_) {
							const D = r.charCodeAt(_);
							if (v(D)) {
								if (!l) {
									h = _ + 1;
									break;
								}
							} else
								y === -1 && ((l = !1), (y = _ + 1)),
									N >= 0 && (D === u.charCodeAt(N) ? --N === -1 && (f = _) : ((N = -1), (f = y)));
						}
						return h === f ? (f = y) : f === -1 && (f = r.length), r.slice(h, f);
					}
					for (_ = r.length - 1; _ >= h; --_)
						if (v(r.charCodeAt(_))) {
							if (!l) {
								h = _ + 1;
								break;
							}
						} else f === -1 && ((l = !1), (f = _ + 1));
					return f === -1 ? '' : r.slice(h, f);
				},
				extname(r) {
					b(r, 'path');
					let u = 0,
						h = -1,
						f = 0,
						l = -1,
						_ = !0,
						N = 0;
					r.length >= 2 && r.charCodeAt(1) === p && L(r.charCodeAt(0)) && (u = f = 2);
					for (let y = r.length - 1; y >= u; --y) {
						const D = r.charCodeAt(y);
						if (v(D)) {
							if (!_) {
								f = y + 1;
								break;
							}
							continue;
						}
						l === -1 && ((_ = !1), (l = y + 1)),
							D === S ? (h === -1 ? (h = y) : N !== 1 && (N = 1)) : h !== -1 && (N = -1);
					}
					return h === -1 || l === -1 || N === 0 || (N === 1 && h === l - 1 && h === f + 1)
						? ''
						: r.slice(h, l);
				},
				format: w.bind(null, '\\'),
				parse(r) {
					b(r, 'path');
					const u = { root: '', dir: '', base: '', ext: '', name: '' };
					if (r.length === 0) return u;
					const h = r.length;
					let f = 0,
						l = r.charCodeAt(0);
					if (h === 1) return v(l) ? ((u.root = u.dir = r), u) : ((u.base = u.name = r), u);
					if (v(l)) {
						if (((f = 1), v(r.charCodeAt(1)))) {
							let I = 2,
								U = I;
							for (; I < h && !v(r.charCodeAt(I)); ) I++;
							if (I < h && I !== U) {
								for (U = I; I < h && v(r.charCodeAt(I)); ) I++;
								if (I < h && I !== U) {
									for (U = I; I < h && !v(r.charCodeAt(I)); ) I++;
									I === h ? (f = I) : I !== U && (f = I + 1);
								}
							}
						}
					} else if (L(l) && r.charCodeAt(1) === p) {
						if (h <= 2) return (u.root = u.dir = r), u;
						if (((f = 2), v(r.charCodeAt(2)))) {
							if (h === 3) return (u.root = u.dir = r), u;
							f = 3;
						}
					}
					f > 0 && (u.root = r.slice(0, f));
					let _ = -1,
						N = f,
						y = -1,
						D = !0,
						k = r.length - 1,
						B = 0;
					for (; k >= f; --k) {
						if (((l = r.charCodeAt(k)), v(l))) {
							if (!D) {
								N = k + 1;
								break;
							}
							continue;
						}
						y === -1 && ((D = !1), (y = k + 1)),
							l === S ? (_ === -1 ? (_ = k) : B !== 1 && (B = 1)) : _ !== -1 && (B = -1);
					}
					return (
						y !== -1 &&
							(_ === -1 || B === 0 || (B === 1 && _ === y - 1 && _ === N + 1)
								? (u.base = u.name = r.slice(N, y))
								: ((u.name = r.slice(N, _)), (u.base = r.slice(N, y)), (u.ext = r.slice(_, y)))),
						N > 0 && N !== f ? (u.dir = r.slice(0, N - 1)) : (u.dir = u.root),
						u
					);
				},
				sep: '\\',
				delimiter: ';',
				win32: null,
				posix: null
			};
			const c = (() => {
				if (m) {
					const r = /\\/g;
					return () => {
						const u = R.cwd().replace(r, '/');
						return u.slice(u.indexOf('/'));
					};
				}
				return () => R.cwd();
			})();
			(n.posix = {
				resolve(...r) {
					let u = '',
						h = !1;
					for (let f = r.length - 1; f >= -1 && !h; f--) {
						const l = f >= 0 ? r[f] : c();
						b(l, 'path'), l.length !== 0 && ((u = `${l}/${u}`), (h = l.charCodeAt(0) === o));
					}
					return (u = A(u, !h, '/', E)), h ? `/${u}` : u.length > 0 ? u : '.';
				},
				normalize(r) {
					if ((b(r, 'path'), r.length === 0)) return '.';
					const u = r.charCodeAt(0) === o,
						h = r.charCodeAt(r.length - 1) === o;
					return (
						(r = A(r, !u, '/', E)),
						r.length === 0 ? (u ? '/' : h ? './' : '.') : (h && (r += '/'), u ? `/${r}` : r)
					);
				},
				isAbsolute(r) {
					return b(r, 'path'), r.length > 0 && r.charCodeAt(0) === o;
				},
				join(...r) {
					if (r.length === 0) return '.';
					let u;
					for (let h = 0; h < r.length; ++h) {
						const f = r[h];
						b(f, 'path'), f.length > 0 && (u === void 0 ? (u = f) : (u += `/${f}`));
					}
					return u === void 0 ? '.' : n.posix.normalize(u);
				},
				relative(r, u) {
					if (
						(b(r, 'from'),
						b(u, 'to'),
						r === u || ((r = n.posix.resolve(r)), (u = n.posix.resolve(u)), r === u))
					)
						return '';
					const h = 1,
						f = r.length,
						l = f - h,
						_ = 1,
						N = u.length - _,
						y = l < N ? l : N;
					let D = -1,
						k = 0;
					for (; k < y; k++) {
						const I = r.charCodeAt(h + k);
						if (I !== u.charCodeAt(_ + k)) break;
						I === o && (D = k);
					}
					if (k === y)
						if (N > y) {
							if (u.charCodeAt(_ + k) === o) return u.slice(_ + k + 1);
							if (k === 0) return u.slice(_ + k);
						} else l > y && (r.charCodeAt(h + k) === o ? (D = k) : k === 0 && (D = 0));
					let B = '';
					for (k = h + D + 1; k <= f; ++k)
						(k === f || r.charCodeAt(k) === o) && (B += B.length === 0 ? '..' : '/..');
					return `${B}${u.slice(_ + D)}`;
				},
				toNamespacedPath(r) {
					return r;
				},
				dirname(r) {
					if ((b(r, 'path'), r.length === 0)) return '.';
					const u = r.charCodeAt(0) === o;
					let h = -1,
						f = !0;
					for (let l = r.length - 1; l >= 1; --l)
						if (r.charCodeAt(l) === o) {
							if (!f) {
								h = l;
								break;
							}
						} else f = !1;
					return h === -1 ? (u ? '/' : '.') : u && h === 1 ? '//' : r.slice(0, h);
				},
				basename(r, u) {
					u !== void 0 && b(u, 'ext'), b(r, 'path');
					let h = 0,
						f = -1,
						l = !0,
						_;
					if (u !== void 0 && u.length > 0 && u.length <= r.length) {
						if (u === r) return '';
						let N = u.length - 1,
							y = -1;
						for (_ = r.length - 1; _ >= 0; --_) {
							const D = r.charCodeAt(_);
							if (D === o) {
								if (!l) {
									h = _ + 1;
									break;
								}
							} else
								y === -1 && ((l = !1), (y = _ + 1)),
									N >= 0 && (D === u.charCodeAt(N) ? --N === -1 && (f = _) : ((N = -1), (f = y)));
						}
						return h === f ? (f = y) : f === -1 && (f = r.length), r.slice(h, f);
					}
					for (_ = r.length - 1; _ >= 0; --_)
						if (r.charCodeAt(_) === o) {
							if (!l) {
								h = _ + 1;
								break;
							}
						} else f === -1 && ((l = !1), (f = _ + 1));
					return f === -1 ? '' : r.slice(h, f);
				},
				extname(r) {
					b(r, 'path');
					let u = -1,
						h = 0,
						f = -1,
						l = !0,
						_ = 0;
					for (let N = r.length - 1; N >= 0; --N) {
						const y = r.charCodeAt(N);
						if (y === o) {
							if (!l) {
								h = N + 1;
								break;
							}
							continue;
						}
						f === -1 && ((l = !1), (f = N + 1)),
							y === S ? (u === -1 ? (u = N) : _ !== 1 && (_ = 1)) : u !== -1 && (_ = -1);
					}
					return u === -1 || f === -1 || _ === 0 || (_ === 1 && u === f - 1 && u === h + 1)
						? ''
						: r.slice(u, f);
				},
				format: w.bind(null, '/'),
				parse(r) {
					b(r, 'path');
					const u = { root: '', dir: '', base: '', ext: '', name: '' };
					if (r.length === 0) return u;
					const h = r.charCodeAt(0) === o;
					let f;
					h ? ((u.root = '/'), (f = 1)) : (f = 0);
					let l = -1,
						_ = 0,
						N = -1,
						y = !0,
						D = r.length - 1,
						k = 0;
					for (; D >= f; --D) {
						const B = r.charCodeAt(D);
						if (B === o) {
							if (!y) {
								_ = D + 1;
								break;
							}
							continue;
						}
						N === -1 && ((y = !1), (N = D + 1)),
							B === S ? (l === -1 ? (l = D) : k !== 1 && (k = 1)) : l !== -1 && (k = -1);
					}
					if (N !== -1) {
						const B = _ === 0 && h ? 1 : _;
						l === -1 || k === 0 || (k === 1 && l === N - 1 && l === _ + 1)
							? (u.base = u.name = r.slice(B, N))
							: ((u.name = r.slice(B, l)), (u.base = r.slice(B, N)), (u.ext = r.slice(l, N)));
					}
					return _ > 0 ? (u.dir = r.slice(0, _ - 1)) : h && (u.dir = '/'), u;
				},
				sep: '/',
				delimiter: ':',
				win32: null,
				posix: null
			}),
				(n.posix.win32 = n.win32.win32 = n.win32),
				(n.posix.posix = n.win32.posix = n.posix),
				(n.normalize = m ? n.win32.normalize : n.posix.normalize),
				(n.resolve = m ? n.win32.resolve : n.posix.resolve),
				(n.relative = m ? n.win32.relative : n.posix.relative),
				(n.dirname = m ? n.win32.dirname : n.posix.dirname),
				(n.basename = m ? n.win32.basename : n.posix.basename),
				(n.extname = m ? n.win32.extname : n.posix.extname),
				(n.sep = m ? n.win32.sep : n.posix.sep);
		}),
		Y(X[24], J([0, 1, 8]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.StopWatch = void 0);
			const M = R.globals.performance && typeof R.globals.performance.now == 'function';
			class i {
				static create(C = !0) {
					return new i(C);
				}
				constructor(C) {
					(this._highResolution = M && C), (this._startTime = this._now()), (this._stopTime = -1);
				}
				stop() {
					this._stopTime = this._now();
				}
				elapsed() {
					return this._stopTime !== -1
						? this._stopTime - this._startTime
						: this._now() - this._startTime;
				}
				_now() {
					return this._highResolution ? R.globals.performance.now() : Date.now();
				}
			}
			n.StopWatch = i;
		}),
		Y(X[9], J([0, 1, 4, 14, 11, 16, 24]), function (x, n, R, M, i, a, C) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.Relay =
					n.EventBufferer =
					n.EventMultiplexer =
					n.MicrotaskEmitter =
					n.DebounceEmitter =
					n.PauseableEmitter =
					n.EventDeliveryQueue =
					n.Emitter =
					n.EventProfiling =
					n.Event =
						void 0);
			const S = !1,
				o = !1;
			var s;
			(function (f) {
				f.None = () => i.Disposable.None;
				function l(Z) {
					if (o) {
						const { onDidAddListener: z } = Z,
							G = g.create();
						let j = 0;
						Z.onDidAddListener = () => {
							++j === 2 &&
								(console.warn(
									'snapshotted emitter LIKELY used public and SHOULD HAVE BEEN created with DisposableStore. snapshotted here'
								),
								G.print()),
								z?.();
						};
					}
				}
				function _(Z, z) {
					return Q(Z, () => {}, 0, void 0, !0, void 0, z);
				}
				f.defer = _;
				function N(Z) {
					return (z, G = null, j) => {
						let K = !1,
							te;
						return (
							(te = Z(
								(ie) => {
									if (!K) return te ? te.dispose() : (K = !0), z.call(G, ie);
								},
								null,
								j
							)),
							K && te.dispose(),
							te
						);
					};
				}
				f.once = N;
				function y(Z, z, G) {
					return V((j, K = null, te) => Z((ie) => j.call(K, z(ie)), null, te), G);
				}
				f.map = y;
				function D(Z, z, G) {
					return V(
						(j, K = null, te) =>
							Z(
								(ie) => {
									z(ie), j.call(K, ie);
								},
								null,
								te
							),
						G
					);
				}
				f.forEach = D;
				function k(Z, z, G) {
					return V((j, K = null, te) => Z((ie) => z(ie) && j.call(K, ie), null, te), G);
				}
				f.filter = k;
				function B(Z) {
					return Z;
				}
				f.signal = B;
				function I(...Z) {
					return (z, G = null, j) =>
						(0, i.combinedDisposable)(...Z.map((K) => K((te) => z.call(G, te), null, j)));
				}
				f.any = I;
				function U(Z, z, G, j) {
					let K = G;
					return y(Z, (te) => ((K = z(K, te)), K), j);
				}
				f.reduce = U;
				function V(Z, z) {
					let G;
					const j = {
						onWillAddFirstListener() {
							G = Z(K.fire, K);
						},
						onDidRemoveLastListener() {
							G?.dispose();
						}
					};
					z || l(j);
					const K = new m(j);
					return z?.add(K), K.event;
				}
				function Q(Z, z, G = 100, j = !1, K = !1, te, ie) {
					let fe,
						we,
						ce,
						ve = 0,
						P;
					const O = {
						leakWarningThreshold: te,
						onWillAddFirstListener() {
							fe = Z(($) => {
								ve++,
									(we = z(we, $)),
									j && !ce && (W.fire(we), (we = void 0)),
									(P = () => {
										const ee = we;
										(we = void 0), (ce = void 0), (!j || ve > 1) && W.fire(ee), (ve = 0);
									}),
									typeof G == 'number'
										? (clearTimeout(ce), (ce = setTimeout(P, G)))
										: ce === void 0 && ((ce = 0), queueMicrotask(P));
							});
						},
						onWillRemoveListener() {
							K && ve > 0 && P?.();
						},
						onDidRemoveLastListener() {
							(P = void 0), fe.dispose();
						}
					};
					ie || l(O);
					const W = new m(O);
					return ie?.add(W), W.event;
				}
				f.debounce = Q;
				function F(Z, z = 0, G) {
					return f.debounce(Z, (j, K) => (j ? (j.push(K), j) : [K]), z, void 0, !0, void 0, G);
				}
				f.accumulate = F;
				function T(Z, z = (j, K) => j === K, G) {
					let j = !0,
						K;
					return k(
						Z,
						(te) => {
							const ie = j || !z(te, K);
							return (j = !1), (K = te), ie;
						},
						G
					);
				}
				f.latch = T;
				function q(Z, z, G) {
					return [f.filter(Z, z, G), f.filter(Z, (j) => !z(j), G)];
				}
				f.split = q;
				function H(Z, z = !1, G = []) {
					let j = G.slice(),
						K = Z((fe) => {
							j ? j.push(fe) : ie.fire(fe);
						});
					const te = () => {
							j?.forEach((fe) => ie.fire(fe)), (j = null);
						},
						ie = new m({
							onWillAddFirstListener() {
								K || (K = Z((fe) => ie.fire(fe)));
							},
							onDidAddFirstListener() {
								j && (z ? setTimeout(te) : te());
							},
							onDidRemoveLastListener() {
								K && K.dispose(), (K = null);
							}
						});
					return ie.event;
				}
				f.buffer = H;
				class t {
					constructor(z) {
						(this.event = z), (this.disposables = new i.DisposableStore());
					}
					map(z) {
						return new t(y(this.event, z, this.disposables));
					}
					forEach(z) {
						return new t(D(this.event, z, this.disposables));
					}
					filter(z) {
						return new t(k(this.event, z, this.disposables));
					}
					reduce(z, G) {
						return new t(U(this.event, z, G, this.disposables));
					}
					latch() {
						return new t(T(this.event, void 0, this.disposables));
					}
					debounce(z, G = 100, j = !1, K = !1, te) {
						return new t(Q(this.event, z, G, j, K, te, this.disposables));
					}
					on(z, G, j) {
						return this.event(z, G, j);
					}
					once(z, G, j) {
						return N(this.event)(z, G, j);
					}
					dispose() {
						this.disposables.dispose();
					}
				}
				function oe(Z) {
					return new t(Z);
				}
				f.chain = oe;
				function ne(Z, z, G = (j) => j) {
					const j = (...fe) => ie.fire(G(...fe)),
						K = () => Z.on(z, j),
						te = () => Z.removeListener(z, j),
						ie = new m({ onWillAddFirstListener: K, onDidRemoveLastListener: te });
					return ie.event;
				}
				f.fromNodeEventEmitter = ne;
				function he(Z, z, G = (j) => j) {
					const j = (...fe) => ie.fire(G(...fe)),
						K = () => Z.addEventListener(z, j),
						te = () => Z.removeEventListener(z, j),
						ie = new m({ onWillAddFirstListener: K, onDidRemoveLastListener: te });
					return ie.event;
				}
				f.fromDOMEventEmitter = he;
				function be(Z) {
					return new Promise((z) => N(Z)(z));
				}
				f.toPromise = be;
				function re(Z, z) {
					return z(void 0), Z((G) => z(G));
				}
				f.runAndSubscribe = re;
				function se(Z, z) {
					let G = null;
					function j(te) {
						G?.dispose(), (G = new i.DisposableStore()), z(te, G);
					}
					j(void 0);
					const K = Z((te) => j(te));
					return (0, i.toDisposable)(() => {
						K.dispose(), G?.dispose();
					});
				}
				f.runAndSubscribeWithStore = se;
				class ge {
					constructor(z, G) {
						(this._observable = z), (this._counter = 0), (this._hasChanged = !1);
						const j = {
							onWillAddFirstListener: () => {
								z.addObserver(this);
							},
							onDidRemoveLastListener: () => {
								z.removeObserver(this);
							}
						};
						G || l(j), (this.emitter = new m(j)), G && G.add(this.emitter);
					}
					beginUpdate(z) {
						this._counter++;
					}
					handlePossibleChange(z) {}
					handleChange(z, G) {
						this._hasChanged = !0;
					}
					endUpdate(z) {
						this._counter--,
							this._counter === 0 &&
								(this._observable.reportChanges(),
								this._hasChanged &&
									((this._hasChanged = !1), this.emitter.fire(this._observable.get())));
					}
				}
				function Le(Z, z) {
					return new ge(Z, z).emitter.event;
				}
				f.fromObservable = Le;
				function Se(Z) {
					return (z) => {
						let G = 0,
							j = !1;
						const K = {
							beginUpdate() {
								G++;
							},
							endUpdate() {
								G--, G === 0 && (Z.reportChanges(), j && ((j = !1), z()));
							},
							handlePossibleChange() {},
							handleChange() {
								j = !0;
							}
						};
						return (
							Z.addObserver(K),
							{
								dispose() {
									Z.removeObserver(K);
								}
							}
						);
					};
				}
				f.fromObservableLight = Se;
			})(s || (n.Event = s = {}));
			class p {
				constructor(l) {
					(this.listenerCount = 0),
						(this.invocationCount = 0),
						(this.elapsedOverall = 0),
						(this.durations = []),
						(this.name = `${l}_${p._idPool++}`),
						p.all.add(this);
				}
				start(l) {
					(this._stopWatch = new C.StopWatch(!0)), (this.listenerCount = l);
				}
				stop() {
					if (this._stopWatch) {
						const l = this._stopWatch.elapsed();
						this.durations.push(l),
							(this.elapsedOverall += l),
							(this.invocationCount += 1),
							(this._stopWatch = void 0);
					}
				}
			}
			(n.EventProfiling = p), (p.all = new Set()), (p._idPool = 0);
			let e = -1;
			class d {
				constructor(l, _ = Math.random().toString(18).slice(2, 5)) {
					(this.threshold = l), (this.name = _), (this._warnCountdown = 0);
				}
				dispose() {
					var l;
					(l = this._stacks) === null || l === void 0 || l.clear();
				}
				check(l, _) {
					const N = this.threshold;
					if (N <= 0 || _ < N) return;
					this._stacks || (this._stacks = new Map());
					const y = this._stacks.get(l.value) || 0;
					if (
						(this._stacks.set(l.value, y + 1), (this._warnCountdown -= 1), this._warnCountdown <= 0)
					) {
						this._warnCountdown = N * 0.5;
						let D,
							k = 0;
						for (const [B, I] of this._stacks) (!D || k < I) && ((D = B), (k = I));
						console.warn(
							`[${this.name}] potential listener LEAK detected, having ${_} listeners already. MOST frequent listener (${k}):`
						),
							console.warn(D);
					}
					return () => {
						const D = this._stacks.get(l.value) || 0;
						this._stacks.set(l.value, D - 1);
					};
				}
			}
			class g {
				static create() {
					var l;
					return new g((l = new Error().stack) !== null && l !== void 0 ? l : '');
				}
				constructor(l) {
					this.value = l;
				}
				print() {
					console.warn(
						this.value
							.split(
								`
`
							)
							.slice(2).join(`
`)
					);
				}
			}
			class b {
				constructor(l, _, N) {
					(this.callback = l),
						(this.callbackThis = _),
						(this.stack = N),
						(this.subscription = new i.SafeDisposable());
				}
				invoke(l) {
					this.callback.call(this.callbackThis, l);
				}
			}
			class m {
				constructor(l) {
					var _, N, y, D, k;
					(this._disposed = !1),
						(this._options = l),
						(this._leakageMon =
							e > 0 || (!((_ = this._options) === null || _ === void 0) && _.leakWarningThreshold)
								? new d(
										(y =
											(N = this._options) === null || N === void 0
												? void 0
												: N.leakWarningThreshold) !== null && y !== void 0
											? y
											: e
								  )
								: void 0),
						(this._perfMon =
							!((D = this._options) === null || D === void 0) && D._profName
								? new p(this._options._profName)
								: void 0),
						(this._deliveryQueue =
							(k = this._options) === null || k === void 0 ? void 0 : k.deliveryQueue);
				}
				dispose() {
					var l, _, N, y;
					if (!this._disposed) {
						if (((this._disposed = !0), this._listeners)) {
							if (S) {
								const D = Array.from(this._listeners);
								queueMicrotask(() => {
									var k;
									for (const B of D)
										B.subscription.isset() &&
											(B.subscription.unset(), (k = B.stack) === null || k === void 0 || k.print());
								});
							}
							this._listeners.clear();
						}
						(l = this._deliveryQueue) === null || l === void 0 || l.clear(this),
							(N =
								(_ = this._options) === null || _ === void 0
									? void 0
									: _.onDidRemoveLastListener) === null ||
								N === void 0 ||
								N.call(_),
							(y = this._leakageMon) === null || y === void 0 || y.dispose();
					}
				}
				get event() {
					return (
						this._event ||
							(this._event = (l, _, N) => {
								var y, D, k;
								if (
									(this._listeners || (this._listeners = new a.LinkedList()),
									this._leakageMon && this._listeners.size > this._leakageMon.threshold * 3)
								)
									return (
										console.warn(
											`[${this._leakageMon.name}] REFUSES to accept new listeners because it exceeded its threshold by far`
										),
										i.Disposable.None
									);
								const B = this._listeners.isEmpty();
								B &&
									!((y = this._options) === null || y === void 0) &&
									y.onWillAddFirstListener &&
									this._options.onWillAddFirstListener(this);
								let I, U;
								this._leakageMon &&
									this._listeners.size >= Math.ceil(this._leakageMon.threshold * 0.2) &&
									((U = g.create()), (I = this._leakageMon.check(U, this._listeners.size + 1))),
									S && (U = U ?? g.create());
								const V = new b(l, _, U),
									Q = this._listeners.push(V);
								B &&
									!((D = this._options) === null || D === void 0) &&
									D.onDidAddFirstListener &&
									this._options.onDidAddFirstListener(this),
									!((k = this._options) === null || k === void 0) &&
										k.onDidAddListener &&
										this._options.onDidAddListener(this, l, _);
								const F = V.subscription.set(() => {
									var T, q;
									I?.(),
										this._disposed ||
											((q =
												(T = this._options) === null || T === void 0
													? void 0
													: T.onWillRemoveListener) === null ||
												q === void 0 ||
												q.call(T, this),
											Q(),
											this._options &&
												this._options.onDidRemoveLastListener &&
												((this._listeners && !this._listeners.isEmpty()) ||
													this._options.onDidRemoveLastListener(this)));
								});
								return N instanceof i.DisposableStore ? N.add(F) : Array.isArray(N) && N.push(F), F;
							}),
						this._event
					);
				}
				fire(l) {
					var _, N, y;
					if (this._listeners) {
						this._deliveryQueue ||
							(this._deliveryQueue = new E(
								(_ = this._options) === null || _ === void 0 ? void 0 : _.onListenerError
							));
						for (const D of this._listeners) this._deliveryQueue.push(this, D, l);
						(N = this._perfMon) === null || N === void 0 || N.start(this._deliveryQueue.size),
							this._deliveryQueue.deliver(),
							(y = this._perfMon) === null || y === void 0 || y.stop();
					}
				}
				hasListeners() {
					return this._listeners ? !this._listeners.isEmpty() : !1;
				}
			}
			n.Emitter = m;
			class v {
				constructor(l = R.onUnexpectedError) {
					(this._onListenerError = l), (this._queue = new a.LinkedList());
				}
				get size() {
					return this._queue.size;
				}
				push(l, _, N) {
					this._queue.push(new L(l, _, N));
				}
				clear(l) {
					const _ = new a.LinkedList();
					for (const N of this._queue) N.emitter !== l && _.push(N);
					this._queue = _;
				}
				deliver() {
					for (; this._queue.size > 0; ) {
						const l = this._queue.shift();
						try {
							l.listener.invoke(l.event);
						} catch (_) {
							this._onListenerError(_);
						}
					}
				}
			}
			n.EventDeliveryQueue = v;
			class E extends v {
				clear(l) {
					this._queue.clear();
				}
			}
			class L {
				constructor(l, _, N) {
					(this.emitter = l), (this.listener = _), (this.event = N);
				}
			}
			class A extends m {
				constructor(l) {
					super(l),
						(this._isPaused = 0),
						(this._eventQueue = new a.LinkedList()),
						(this._mergeFn = l?.merge);
				}
				pause() {
					this._isPaused++;
				}
				resume() {
					if (this._isPaused !== 0 && --this._isPaused === 0)
						if (this._mergeFn) {
							if (this._eventQueue.size > 0) {
								const l = Array.from(this._eventQueue);
								this._eventQueue.clear(), super.fire(this._mergeFn(l));
							}
						} else
							for (; !this._isPaused && this._eventQueue.size !== 0; )
								super.fire(this._eventQueue.shift());
				}
				fire(l) {
					this._listeners && (this._isPaused !== 0 ? this._eventQueue.push(l) : super.fire(l));
				}
			}
			n.PauseableEmitter = A;
			class w extends A {
				constructor(l) {
					var _;
					super(l), (this._delay = (_ = l.delay) !== null && _ !== void 0 ? _ : 100);
				}
				fire(l) {
					this._handle ||
						(this.pause(),
						(this._handle = setTimeout(() => {
							(this._handle = void 0), this.resume();
						}, this._delay))),
						super.fire(l);
				}
			}
			n.DebounceEmitter = w;
			class c extends m {
				constructor(l) {
					super(l), (this._queuedEvents = []), (this._mergeFn = l?.merge);
				}
				fire(l) {
					this.hasListeners() &&
						(this._queuedEvents.push(l),
						this._queuedEvents.length === 1 &&
							queueMicrotask(() => {
								this._mergeFn
									? super.fire(this._mergeFn(this._queuedEvents))
									: this._queuedEvents.forEach((_) => super.fire(_)),
									(this._queuedEvents = []);
							}));
				}
			}
			n.MicrotaskEmitter = c;
			class r {
				constructor() {
					(this.hasListeners = !1),
						(this.events = []),
						(this.emitter = new m({
							onWillAddFirstListener: () => this.onFirstListenerAdd(),
							onDidRemoveLastListener: () => this.onLastListenerRemove()
						}));
				}
				get event() {
					return this.emitter.event;
				}
				add(l) {
					const _ = { event: l, listener: null };
					this.events.push(_), this.hasListeners && this.hook(_);
					const N = () => {
						this.hasListeners && this.unhook(_);
						const y = this.events.indexOf(_);
						this.events.splice(y, 1);
					};
					return (0, i.toDisposable)((0, M.once)(N));
				}
				onFirstListenerAdd() {
					(this.hasListeners = !0), this.events.forEach((l) => this.hook(l));
				}
				onLastListenerRemove() {
					(this.hasListeners = !1), this.events.forEach((l) => this.unhook(l));
				}
				hook(l) {
					l.listener = l.event((_) => this.emitter.fire(_));
				}
				unhook(l) {
					l.listener && l.listener.dispose(), (l.listener = null);
				}
				dispose() {
					this.emitter.dispose();
				}
			}
			n.EventMultiplexer = r;
			class u {
				constructor() {
					this.buffers = [];
				}
				wrapEvent(l) {
					return (_, N, y) =>
						l(
							(D) => {
								const k = this.buffers[this.buffers.length - 1];
								k ? k.push(() => _.call(N, D)) : _.call(N, D);
							},
							void 0,
							y
						);
				}
				bufferEvents(l) {
					const _ = [];
					this.buffers.push(_);
					const N = l();
					return this.buffers.pop(), _.forEach((y) => y()), N;
				}
			}
			n.EventBufferer = u;
			class h {
				constructor() {
					(this.listening = !1),
						(this.inputEvent = s.None),
						(this.inputEventListener = i.Disposable.None),
						(this.emitter = new m({
							onDidAddFirstListener: () => {
								(this.listening = !0),
									(this.inputEventListener = this.inputEvent(this.emitter.fire, this.emitter));
							},
							onDidRemoveLastListener: () => {
								(this.listening = !1), this.inputEventListener.dispose();
							}
						})),
						(this.event = this.emitter.event);
				}
				set input(l) {
					(this.inputEvent = l),
						this.listening &&
							(this.inputEventListener.dispose(),
							(this.inputEventListener = l(this.emitter.fire, this.emitter)));
				}
				dispose() {
					this.inputEventListener.dispose(), this.emitter.dispose();
				}
			}
			n.Relay = h;
		}),
		Y(X[55], J([0, 1, 9]), function (x, n, R) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.CancellationTokenSource = n.CancellationToken = void 0);
			const M = Object.freeze(function (S, o) {
				const s = setTimeout(S.bind(o), 0);
				return {
					dispose() {
						clearTimeout(s);
					}
				};
			});
			var i;
			(function (S) {
				function o(s) {
					return s === S.None || s === S.Cancelled || s instanceof a
						? !0
						: !s || typeof s != 'object'
						? !1
						: typeof s.isCancellationRequested == 'boolean' &&
						  typeof s.onCancellationRequested == 'function';
				}
				(S.isCancellationToken = o),
					(S.None = Object.freeze({
						isCancellationRequested: !1,
						onCancellationRequested: R.Event.None
					})),
					(S.Cancelled = Object.freeze({
						isCancellationRequested: !0,
						onCancellationRequested: M
					}));
			})(i || (n.CancellationToken = i = {}));
			class a {
				constructor() {
					(this._isCancelled = !1), (this._emitter = null);
				}
				cancel() {
					this._isCancelled ||
						((this._isCancelled = !0),
						this._emitter && (this._emitter.fire(void 0), this.dispose()));
				}
				get isCancellationRequested() {
					return this._isCancelled;
				}
				get onCancellationRequested() {
					return this._isCancelled
						? M
						: (this._emitter || (this._emitter = new R.Emitter()), this._emitter.event);
				}
				dispose() {
					this._emitter && (this._emitter.dispose(), (this._emitter = null));
				}
			}
			class C {
				constructor(o) {
					(this._token = void 0),
						(this._parentListener = void 0),
						(this._parentListener = o && o.onCancellationRequested(this.cancel, this));
				}
				get token() {
					return this._token || (this._token = new a()), this._token;
				}
				cancel() {
					this._token
						? this._token instanceof a && this._token.cancel()
						: (this._token = i.Cancelled);
				}
				dispose(o = !1) {
					var s;
					o && this.cancel(),
						(s = this._parentListener) === null || s === void 0 || s.dispose(),
						this._token
							? this._token instanceof a && this._token.dispose()
							: (this._token = i.None);
				}
			}
			n.CancellationTokenSource = C;
		}),
		Y(X[13], J([0, 1, 54, 8]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.uriToFsPath = n.URI = void 0);
			const i = /^\w[\w\d+.-]*$/,
				a = /^\//,
				C = /^\/\//;
			function S(h, f) {
				if (!h.scheme && f)
					throw new Error(
						`[UriError]: Scheme is missing: {scheme: "", authority: "${h.authority}", path: "${h.path}", query: "${h.query}", fragment: "${h.fragment}"}`
					);
				if (h.scheme && !i.test(h.scheme))
					throw new Error('[UriError]: Scheme contains illegal characters.');
				if (h.path) {
					if (h.authority) {
						if (!a.test(h.path))
							throw new Error(
								'[UriError]: If a URI contains an authority component, then the path component must either be empty or begin with a slash ("/") character'
							);
					} else if (C.test(h.path))
						throw new Error(
							'[UriError]: If a URI does not contain an authority component, then the path cannot begin with two slash characters ("//")'
						);
				}
			}
			function o(h, f) {
				return !h && !f ? 'file' : h;
			}
			function s(h, f) {
				switch (h) {
					case 'https':
					case 'http':
					case 'file':
						f ? f[0] !== e && (f = e + f) : (f = e);
						break;
				}
				return f;
			}
			const p = '',
				e = '/',
				d = /^(([^:/?#]+?):)?(\/\/([^/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?/;
			class g {
				static isUri(f) {
					return f instanceof g
						? !0
						: f
						? typeof f.authority == 'string' &&
						  typeof f.fragment == 'string' &&
						  typeof f.path == 'string' &&
						  typeof f.query == 'string' &&
						  typeof f.scheme == 'string' &&
						  typeof f.fsPath == 'string' &&
						  typeof f.with == 'function' &&
						  typeof f.toString == 'function'
						: !1;
				}
				constructor(f, l, _, N, y, D = !1) {
					typeof f == 'object'
						? ((this.scheme = f.scheme || p),
						  (this.authority = f.authority || p),
						  (this.path = f.path || p),
						  (this.query = f.query || p),
						  (this.fragment = f.fragment || p))
						: ((this.scheme = o(f, D)),
						  (this.authority = l || p),
						  (this.path = s(this.scheme, _ || p)),
						  (this.query = N || p),
						  (this.fragment = y || p),
						  S(this, D));
				}
				get fsPath() {
					return A(this, !1);
				}
				with(f) {
					if (!f) return this;
					let { scheme: l, authority: _, path: N, query: y, fragment: D } = f;
					return (
						l === void 0 ? (l = this.scheme) : l === null && (l = p),
						_ === void 0 ? (_ = this.authority) : _ === null && (_ = p),
						N === void 0 ? (N = this.path) : N === null && (N = p),
						y === void 0 ? (y = this.query) : y === null && (y = p),
						D === void 0 ? (D = this.fragment) : D === null && (D = p),
						l === this.scheme &&
						_ === this.authority &&
						N === this.path &&
						y === this.query &&
						D === this.fragment
							? this
							: new m(l, _, N, y, D)
					);
				}
				static parse(f, l = !1) {
					const _ = d.exec(f);
					return _
						? new m(_[2] || p, u(_[4] || p), u(_[5] || p), u(_[7] || p), u(_[9] || p), l)
						: new m(p, p, p, p, p);
				}
				static file(f) {
					let l = p;
					if ((M.isWindows && (f = f.replace(/\\/g, e)), f[0] === e && f[1] === e)) {
						const _ = f.indexOf(e, 2);
						_ === -1
							? ((l = f.substring(2)), (f = e))
							: ((l = f.substring(2, _)), (f = f.substring(_) || e));
					}
					return new m('file', l, f, p, p);
				}
				static from(f) {
					const l = new m(f.scheme, f.authority, f.path, f.query, f.fragment);
					return S(l, !0), l;
				}
				static joinPath(f, ...l) {
					if (!f.path) throw new Error('[UriError]: cannot call joinPath on URI without path');
					let _;
					return (
						M.isWindows && f.scheme === 'file'
							? (_ = g.file(R.win32.join(A(f, !0), ...l)).path)
							: (_ = R.posix.join(f.path, ...l)),
						f.with({ path: _ })
					);
				}
				toString(f = !1) {
					return w(this, f);
				}
				toJSON() {
					return this;
				}
				static revive(f) {
					if (f) {
						if (f instanceof g) return f;
						{
							const l = new m(f);
							return (l._formatted = f.external), (l._fsPath = f._sep === b ? f.fsPath : null), l;
						}
					} else return f;
				}
			}
			n.URI = g;
			const b = M.isWindows ? 1 : void 0;
			class m extends g {
				constructor() {
					super(...arguments), (this._formatted = null), (this._fsPath = null);
				}
				get fsPath() {
					return this._fsPath || (this._fsPath = A(this, !1)), this._fsPath;
				}
				toString(f = !1) {
					return f
						? w(this, !0)
						: (this._formatted || (this._formatted = w(this, !1)), this._formatted);
				}
				toJSON() {
					const f = { $mid: 1 };
					return (
						this._fsPath && ((f.fsPath = this._fsPath), (f._sep = b)),
						this._formatted && (f.external = this._formatted),
						this.path && (f.path = this.path),
						this.scheme && (f.scheme = this.scheme),
						this.authority && (f.authority = this.authority),
						this.query && (f.query = this.query),
						this.fragment && (f.fragment = this.fragment),
						f
					);
				}
			}
			const v = {
				[58]: '%3A',
				[47]: '%2F',
				[63]: '%3F',
				[35]: '%23',
				[91]: '%5B',
				[93]: '%5D',
				[64]: '%40',
				[33]: '%21',
				[36]: '%24',
				[38]: '%26',
				[39]: '%27',
				[40]: '%28',
				[41]: '%29',
				[42]: '%2A',
				[43]: '%2B',
				[44]: '%2C',
				[59]: '%3B',
				[61]: '%3D',
				[32]: '%20'
			};
			function E(h, f, l) {
				let _,
					N = -1;
				for (let y = 0; y < h.length; y++) {
					const D = h.charCodeAt(y);
					if (
						(D >= 97 && D <= 122) ||
						(D >= 65 && D <= 90) ||
						(D >= 48 && D <= 57) ||
						D === 45 ||
						D === 46 ||
						D === 95 ||
						D === 126 ||
						(f && D === 47) ||
						(l && D === 91) ||
						(l && D === 93) ||
						(l && D === 58)
					)
						N !== -1 && ((_ += encodeURIComponent(h.substring(N, y))), (N = -1)),
							_ !== void 0 && (_ += h.charAt(y));
					else {
						_ === void 0 && (_ = h.substr(0, y));
						const k = v[D];
						k !== void 0
							? (N !== -1 && ((_ += encodeURIComponent(h.substring(N, y))), (N = -1)), (_ += k))
							: N === -1 && (N = y);
					}
				}
				return N !== -1 && (_ += encodeURIComponent(h.substring(N))), _ !== void 0 ? _ : h;
			}
			function L(h) {
				let f;
				for (let l = 0; l < h.length; l++) {
					const _ = h.charCodeAt(l);
					_ === 35 || _ === 63
						? (f === void 0 && (f = h.substr(0, l)), (f += v[_]))
						: f !== void 0 && (f += h[l]);
				}
				return f !== void 0 ? f : h;
			}
			function A(h, f) {
				let l;
				return (
					h.authority && h.path.length > 1 && h.scheme === 'file'
						? (l = `//${h.authority}${h.path}`)
						: h.path.charCodeAt(0) === 47 &&
						  ((h.path.charCodeAt(1) >= 65 && h.path.charCodeAt(1) <= 90) ||
								(h.path.charCodeAt(1) >= 97 && h.path.charCodeAt(1) <= 122)) &&
						  h.path.charCodeAt(2) === 58
						? f
							? (l = h.path.substr(1))
							: (l = h.path[1].toLowerCase() + h.path.substr(2))
						: (l = h.path),
					M.isWindows && (l = l.replace(/\//g, '\\')),
					l
				);
			}
			n.uriToFsPath = A;
			function w(h, f) {
				const l = f ? L : E;
				let _ = '',
					{ scheme: N, authority: y, path: D, query: k, fragment: B } = h;
				if ((N && ((_ += N), (_ += ':')), (y || N === 'file') && ((_ += e), (_ += e)), y)) {
					let I = y.indexOf('@');
					if (I !== -1) {
						const U = y.substr(0, I);
						(y = y.substr(I + 1)),
							(I = U.lastIndexOf(':')),
							I === -1
								? (_ += l(U, !1, !1))
								: ((_ += l(U.substr(0, I), !1, !1)), (_ += ':'), (_ += l(U.substr(I + 1), !1, !0))),
							(_ += '@');
					}
					(y = y.toLowerCase()),
						(I = y.lastIndexOf(':')),
						I === -1 ? (_ += l(y, !1, !0)) : ((_ += l(y.substr(0, I), !1, !0)), (_ += y.substr(I)));
				}
				if (D) {
					if (D.length >= 3 && D.charCodeAt(0) === 47 && D.charCodeAt(2) === 58) {
						const I = D.charCodeAt(1);
						I >= 65 && I <= 90 && (D = `/${String.fromCharCode(I + 32)}:${D.substr(3)}`);
					} else if (D.length >= 2 && D.charCodeAt(1) === 58) {
						const I = D.charCodeAt(0);
						I >= 65 && I <= 90 && (D = `${String.fromCharCode(I + 32)}:${D.substr(2)}`);
					}
					_ += l(D, !0, !1);
				}
				return (
					k && ((_ += '?'), (_ += l(k, !1, !1))), B && ((_ += '#'), (_ += f ? B : E(B, !1, !1))), _
				);
			}
			function c(h) {
				try {
					return decodeURIComponent(h);
				} catch {
					return h.length > 3 ? h.substr(0, 3) + c(h.substr(3)) : h;
				}
			}
			const r = /(%[0-9A-Za-z][0-9A-Za-z])+/g;
			function u(h) {
				return h.match(r) ? h.replace(r, (f) => c(f)) : h;
			}
		}),
		Y(X[60], J([0, 1, 4, 9, 11, 12, 8, 5]), function (x, n, R, M, i, a, C, S) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.create =
					n.SimpleWorkerServer =
					n.SimpleWorkerClient =
					n.logOnceWebWorkerWarning =
						void 0);
			const o = '$initialize';
			let s = !1;
			function p(u) {
				C.isWeb &&
					(s ||
						((s = !0),
						console.warn(
							'Could not create web worker(s). Falling back to loading web worker code in main thread, which might cause UI freezes. Please see https://github.com/microsoft/monaco-editor#faq'
						)),
					console.warn(u.message));
			}
			n.logOnceWebWorkerWarning = p;
			class e {
				constructor(h, f, l, _) {
					(this.vsWorker = h), (this.req = f), (this.method = l), (this.args = _), (this.type = 0);
				}
			}
			class d {
				constructor(h, f, l, _) {
					(this.vsWorker = h), (this.seq = f), (this.res = l), (this.err = _), (this.type = 1);
				}
			}
			class g {
				constructor(h, f, l, _) {
					(this.vsWorker = h),
						(this.req = f),
						(this.eventName = l),
						(this.arg = _),
						(this.type = 2);
				}
			}
			class b {
				constructor(h, f, l) {
					(this.vsWorker = h), (this.req = f), (this.event = l), (this.type = 3);
				}
			}
			class m {
				constructor(h, f) {
					(this.vsWorker = h), (this.req = f), (this.type = 4);
				}
			}
			class v {
				constructor(h) {
					(this._workerId = -1),
						(this._handler = h),
						(this._lastSentReq = 0),
						(this._pendingReplies = Object.create(null)),
						(this._pendingEmitters = new Map()),
						(this._pendingEvents = new Map());
				}
				setWorkerId(h) {
					this._workerId = h;
				}
				sendMessage(h, f) {
					const l = String(++this._lastSentReq);
					return new Promise((_, N) => {
						(this._pendingReplies[l] = { resolve: _, reject: N }),
							this._send(new e(this._workerId, l, h, f));
					});
				}
				listen(h, f) {
					let l = null;
					const _ = new M.Emitter({
						onWillAddFirstListener: () => {
							(l = String(++this._lastSentReq)),
								this._pendingEmitters.set(l, _),
								this._send(new g(this._workerId, l, h, f));
						},
						onDidRemoveLastListener: () => {
							this._pendingEmitters.delete(l), this._send(new m(this._workerId, l)), (l = null);
						}
					});
					return _.event;
				}
				handleMessage(h) {
					!h ||
						!h.vsWorker ||
						(this._workerId !== -1 && h.vsWorker !== this._workerId) ||
						this._handleMessage(h);
				}
				_handleMessage(h) {
					switch (h.type) {
						case 1:
							return this._handleReplyMessage(h);
						case 0:
							return this._handleRequestMessage(h);
						case 2:
							return this._handleSubscribeEventMessage(h);
						case 3:
							return this._handleEventMessage(h);
						case 4:
							return this._handleUnsubscribeEventMessage(h);
					}
				}
				_handleReplyMessage(h) {
					if (!this._pendingReplies[h.seq]) {
						console.warn('Got reply to unknown seq');
						return;
					}
					const f = this._pendingReplies[h.seq];
					if ((delete this._pendingReplies[h.seq], h.err)) {
						let l = h.err;
						h.err.$isError &&
							((l = new Error()),
							(l.name = h.err.name),
							(l.message = h.err.message),
							(l.stack = h.err.stack)),
							f.reject(l);
						return;
					}
					f.resolve(h.res);
				}
				_handleRequestMessage(h) {
					const f = h.req;
					this._handler.handleMessage(h.method, h.args).then(
						(_) => {
							this._send(new d(this._workerId, f, _, void 0));
						},
						(_) => {
							_.detail instanceof Error &&
								(_.detail = (0, R.transformErrorForSerialization)(_.detail)),
								this._send(
									new d(this._workerId, f, void 0, (0, R.transformErrorForSerialization)(_))
								);
						}
					);
				}
				_handleSubscribeEventMessage(h) {
					const f = h.req,
						l = this._handler.handleEvent(
							h.eventName,
							h.arg
						)((_) => {
							this._send(new b(this._workerId, f, _));
						});
					this._pendingEvents.set(f, l);
				}
				_handleEventMessage(h) {
					if (!this._pendingEmitters.has(h.req)) {
						console.warn('Got event for unknown req');
						return;
					}
					this._pendingEmitters.get(h.req).fire(h.event);
				}
				_handleUnsubscribeEventMessage(h) {
					if (!this._pendingEvents.has(h.req)) {
						console.warn('Got unsubscribe for unknown req');
						return;
					}
					this._pendingEvents.get(h.req).dispose(), this._pendingEvents.delete(h.req);
				}
				_send(h) {
					const f = [];
					if (h.type === 0)
						for (let l = 0; l < h.args.length; l++)
							h.args[l] instanceof ArrayBuffer && f.push(h.args[l]);
					else h.type === 1 && h.res instanceof ArrayBuffer && f.push(h.res);
					this._handler.sendMessage(h, f);
				}
			}
			class E extends i.Disposable {
				constructor(h, f, l) {
					super();
					let _ = null;
					(this._worker = this._register(
						h.create(
							'vs/base/common/worker/simpleWorker',
							(I) => {
								this._protocol.handleMessage(I);
							},
							(I) => {
								_?.(I);
							}
						)
					)),
						(this._protocol = new v({
							sendMessage: (I, U) => {
								this._worker.postMessage(I, U);
							},
							handleMessage: (I, U) => {
								if (typeof l[I] != 'function')
									return Promise.reject(new Error('Missing method ' + I + ' on main thread host.'));
								try {
									return Promise.resolve(l[I].apply(l, U));
								} catch (V) {
									return Promise.reject(V);
								}
							},
							handleEvent: (I, U) => {
								if (A(I)) {
									const V = l[I].call(l, U);
									if (typeof V != 'function')
										throw new Error(`Missing dynamic event ${I} on main thread host.`);
									return V;
								}
								if (L(I)) {
									const V = l[I];
									if (typeof V != 'function')
										throw new Error(`Missing event ${I} on main thread host.`);
									return V;
								}
								throw new Error(`Malformed event name ${I}`);
							}
						})),
						this._protocol.setWorkerId(this._worker.getId());
					let N = null;
					const y = globalThis.require;
					typeof y < 'u' && typeof y.getConfig == 'function'
						? (N = y.getConfig())
						: typeof globalThis.requirejs < 'u' && (N = globalThis.requirejs.s.contexts._.config);
					const D = (0, a.getAllMethodNames)(l);
					this._onModuleLoaded = this._protocol.sendMessage(o, [
						this._worker.getId(),
						JSON.parse(JSON.stringify(N)),
						f,
						D
					]);
					const k = (I, U) => this._request(I, U),
						B = (I, U) => this._protocol.listen(I, U);
					this._lazyProxy = new Promise((I, U) => {
						(_ = U),
							this._onModuleLoaded.then(
								(V) => {
									I(w(V, k, B));
								},
								(V) => {
									U(V), this._onError('Worker failed to load ' + f, V);
								}
							);
					});
				}
				getProxyObject() {
					return this._lazyProxy;
				}
				_request(h, f) {
					return new Promise((l, _) => {
						this._onModuleLoaded.then(() => {
							this._protocol.sendMessage(h, f).then(l, _);
						}, _);
					});
				}
				_onError(h, f) {
					console.error(h), console.info(f);
				}
			}
			n.SimpleWorkerClient = E;
			function L(u) {
				return u[0] === 'o' && u[1] === 'n' && S.isUpperAsciiLetter(u.charCodeAt(2));
			}
			function A(u) {
				return /^onDynamic/.test(u) && S.isUpperAsciiLetter(u.charCodeAt(9));
			}
			function w(u, h, f) {
				const l = (y) =>
						function () {
							const D = Array.prototype.slice.call(arguments, 0);
							return h(y, D);
						},
					_ = (y) =>
						function (D) {
							return f(y, D);
						},
					N = {};
				for (const y of u) {
					if (A(y)) {
						N[y] = _(y);
						continue;
					}
					if (L(y)) {
						N[y] = f(y, void 0);
						continue;
					}
					N[y] = l(y);
				}
				return N;
			}
			class c {
				constructor(h, f) {
					(this._requestHandlerFactory = f),
						(this._requestHandler = null),
						(this._protocol = new v({
							sendMessage: (l, _) => {
								h(l, _);
							},
							handleMessage: (l, _) => this._handleMessage(l, _),
							handleEvent: (l, _) => this._handleEvent(l, _)
						}));
				}
				onmessage(h) {
					this._protocol.handleMessage(h);
				}
				_handleMessage(h, f) {
					if (h === o) return this.initialize(f[0], f[1], f[2], f[3]);
					if (!this._requestHandler || typeof this._requestHandler[h] != 'function')
						return Promise.reject(new Error('Missing requestHandler or method: ' + h));
					try {
						return Promise.resolve(this._requestHandler[h].apply(this._requestHandler, f));
					} catch (l) {
						return Promise.reject(l);
					}
				}
				_handleEvent(h, f) {
					if (!this._requestHandler) throw new Error('Missing requestHandler');
					if (A(h)) {
						const l = this._requestHandler[h].call(this._requestHandler, f);
						if (typeof l != 'function')
							throw new Error(`Missing dynamic event ${h} on request handler.`);
						return l;
					}
					if (L(h)) {
						const l = this._requestHandler[h];
						if (typeof l != 'function') throw new Error(`Missing event ${h} on request handler.`);
						return l;
					}
					throw new Error(`Malformed event name ${h}`);
				}
				initialize(h, f, l, _) {
					this._protocol.setWorkerId(h);
					const D = w(
						_,
						(k, B) => this._protocol.sendMessage(k, B),
						(k, B) => this._protocol.listen(k, B)
					);
					return this._requestHandlerFactory
						? ((this._requestHandler = this._requestHandlerFactory(D)),
						  Promise.resolve((0, a.getAllMethodNames)(this._requestHandler)))
						: (f &&
								(typeof f.baseUrl < 'u' && delete f.baseUrl,
								typeof f.paths < 'u' && typeof f.paths.vs < 'u' && delete f.paths.vs,
								typeof f.trustedTypesPolicy !== void 0 && delete f.trustedTypesPolicy,
								(f.catchError = !0),
								globalThis.require.config(f)),
						  new Promise((k, B) => {
								(globalThis.require || x)(
									[l],
									(U) => {
										if (((this._requestHandler = U.create(D)), !this._requestHandler)) {
											B(new Error('No RequestHandler!'));
											return;
										}
										k((0, a.getAllMethodNames)(this._requestHandler));
									},
									B
								);
						  }));
				}
			}
			n.SimpleWorkerServer = c;
			function r(u) {
				return new c(u, null);
			}
			n.create = r;
		}),
		Y(X[56], J([0, 1, 9, 11]), function (x, n, R, M) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }), (n.TokenizationRegistry = void 0);
			class i {
				constructor() {
					(this._tokenizationSupports = new Map()),
						(this._factories = new Map()),
						(this._onDidChange = new R.Emitter()),
						(this.onDidChange = this._onDidChange.event),
						(this._colorMap = null);
				}
				handleChange(S) {
					this._onDidChange.fire({ changedLanguages: S, changedColorMap: !1 });
				}
				register(S, o) {
					return (
						this._tokenizationSupports.set(S, o),
						this.handleChange([S]),
						(0, M.toDisposable)(() => {
							this._tokenizationSupports.get(S) === o &&
								(this._tokenizationSupports.delete(S), this.handleChange([S]));
						})
					);
				}
				get(S) {
					return this._tokenizationSupports.get(S) || null;
				}
				registerFactory(S, o) {
					var s;
					(s = this._factories.get(S)) === null || s === void 0 || s.dispose();
					const p = new a(this, S, o);
					return (
						this._factories.set(S, p),
						(0, M.toDisposable)(() => {
							const e = this._factories.get(S);
							!e || e !== p || (this._factories.delete(S), e.dispose());
						})
					);
				}
				getOrCreate(S) {
					return me(this, void 0, void 0, function* () {
						const o = this.get(S);
						if (o) return o;
						const s = this._factories.get(S);
						return !s || s.isResolved ? null : (yield s.resolve(), this.get(S));
					});
				}
				isResolved(S) {
					if (this.get(S)) return !0;
					const s = this._factories.get(S);
					return !!(!s || s.isResolved);
				}
				setColorMap(S) {
					(this._colorMap = S),
						this._onDidChange.fire({
							changedLanguages: Array.from(this._tokenizationSupports.keys()),
							changedColorMap: !0
						});
				}
				getColorMap() {
					return this._colorMap;
				}
				getDefaultBackground() {
					return this._colorMap && this._colorMap.length > 2 ? this._colorMap[2] : null;
				}
			}
			n.TokenizationRegistry = i;
			class a extends M.Disposable {
				get isResolved() {
					return this._isResolved;
				}
				constructor(S, o, s) {
					super(),
						(this._registry = S),
						(this._languageId = o),
						(this._factory = s),
						(this._isDisposed = !1),
						(this._resolvePromise = null),
						(this._isResolved = !1);
				}
				dispose() {
					(this._isDisposed = !0), super.dispose();
				}
				resolve() {
					return me(this, void 0, void 0, function* () {
						return (
							this._resolvePromise || (this._resolvePromise = this._create()), this._resolvePromise
						);
					});
				}
				_create() {
					return me(this, void 0, void 0, function* () {
						const S = yield this._factory.tokenizationSupport;
						(this._isResolved = !0),
							S &&
								!this._isDisposed &&
								this._register(this._registry.register(this._languageId, S));
					});
				}
			}
		}),
		Y(X[57], J([0, 1, 33, 13, 2, 56]), function (x, n, R, M, i, a) {
			'use strict';
			Object.defineProperty(n, '__esModule', { value: !0 }),
				(n.TokenizationRegistry =
					n.LazyTokenizationSupport =
					n.InlayHintKind =
					n.Command =
					n.FoldingRangeKind =
					n.SymbolKinds =
					n.isLocationLink =
					n.DocumentHighlightKind =
					n.SignatureHelpTriggerKind =
					n.SelectedSuggestionInfo =
					n.InlineCompletionTriggerKind =
					n.CompletionItemKinds =
					n.EncodedTokenizationResult =
					n.TokenizationResult =
					n.Token =
						void 0);
			class C {
				constructor(c, r, u) {
					(this.offset = c), (this.type = r), (this.language = u), (this._tokenBrand = void 0);
				}
				toString() {
					return '(' + this.offset + ', ' + this.type + ')';
				}
			}
			n.Token = C;
			class S {
				constructor(c, r) {
					(this.tokens = c), (this.endState = r), (this._tokenizationResultBrand = void 0);
				}
			}
			n.TokenizationResult = S;
			class o {
				constructor(c, r) {
					(this.tokens = c), (this.endState = r), (this._encodedTokenizationResultBrand = void 0);
				}
			}
			n.EncodedTokenizationResult = o;
			var s;
			(function (w) {
				const c = new Map();
				c.set(0, R.Codicon.symbolMethod),
					c.set(1, R.Codicon.symbolFunction),
					c.set(2, R.Codicon.symbolConstructor),
					c.set(3, R.Codicon.symbolField),
					c.set(4, R.Codicon.symbolVariable),
					c.set(5, R.Codicon.symbolClass),
					c.set(6, R.Codicon.symbolStruct),
					c.set(7, R.Codicon.symbolInterface),
					c.set(8, R.Codicon.symbolModule),
					c.set(9, R.Codicon.symbolProperty),
					c.set(10, R.Codicon.symbolEvent),
					c.set(11, R.Codicon.symbolOperator),
					c.set(12, R.Codicon.symbolUnit),
					c.set(13, R.Codicon.symbolValue),
					c.set(15, R.Codicon.symbolEnum),
					c.set(14, R.Codicon.symbolConstant),
					c.set(15, R.Codicon.symbolEnum),
					c.set(16, R.Codicon.symbolEnumMember),
					c.set(17, R.Codicon.symbolKeyword),
					c.set(27, R.Codicon.symbolSnippet),
					c.set(18, R.Codicon.symbolText),
					c.set(19, R.Codicon.symbolColor),
					c.set(20, R.Codicon.symbolFile),
					c.set(21, R.Codicon.symbolReference),
					c.set(22, R.Codicon.symbolCustomColor),
					c.set(23, R.Codicon.symbolFolder),
					c.set(24, R.Codicon.symbolTypeParameter),
					c.set(25, R.Codicon.account),
					c.set(26, R.Codicon.issues);
				function r(f) {
					let l = c.get(f);
					return (
						l ||
							(console.info('No codicon found for CompletionItemKind ' + f),
							(l = R.Codicon.symbolProperty)),
						l
					);
				}
				w.toIcon = r;
				const u = new Map();
				u.set('method', 0),
					u.set('function', 1),
					u.set('constructor', 2),
					u.set('field', 3),
					u.set('variable', 4),
					u.set('class', 5),
					u.set('struct', 6),
					u.set('interface', 7),
					u.set('module', 8),
					u.set('property', 9),
					u.set('event', 10),
					u.set('operator', 11),
					u.set('unit', 12),
					u.set('value', 13),
					u.set('constant', 14),
					u.set('enum', 15),
					u.set('enum-member', 16),
					u.set('enumMember', 16),
					u.set('keyword', 17),
					u.set('snippet', 27),
					u.set('text', 18),
					u.set('color', 19),
					u.set('file', 20),
					u.set('reference', 21),
					u.set('customcolor', 22),
					u.set('folder', 23),
					u.set('type-parameter', 24),
					u.set('typeParameter', 24),
					u.set('account', 25),
					u.set('issue', 26);
				function h(f, l) {
					let _ = u.get(f);
					return typeof _ > 'u' && !l && (_ = 9), _;
				}
				w.fromString = h;
			})(s || (n.CompletionItemKinds = s = {}));
			var p;
			(function (w) {
				(w[(w.Automatic = 0)] = 'Automatic'), (w[(w.Explicit = 1)] = 'Explicit');
			})(p || (n.InlineCompletionTriggerKind = p = {}));
			class e {
				constructor(c, r, u, h) {
					(this.range = c), (this.text = r), (this.completionKind = u), (this.isSnippetText = h);
				}
				equals(c) {
					return (
						i.Range.lift(this.range).equalsRange(c.range) &&
						this.text === c.text &&
						this.completionKind === c.completionKind &&
						this.isSnippetText === c.isSnippetText
					);
				}
			}
			n.SelectedSuggestionInfo = e;
			var d;
			(function (w) {
				(w[(w.Invoke = 1)] = 'Invoke'),
					(w[(w.TriggerCharacter = 2)] = 'TriggerCharacter'),
					(w[(w.ContentChange = 3)] = 'ContentChange');
			})(d || (n.SignatureHelpTriggerKind = d = {}));
			var g;
			(function (w) {
				(w[(w.Text = 0)] = 'Text'), (w[(w.Read = 1)] = 'Read'), (w[(w.Write = 2)] = 'Write');
			})(g || (n.DocumentHighlightKind = g = {}));
			function b(w) {
				return (
					w &&
					M.URI.isUri(w.uri) &&
					i.Range.isIRange(w.range) &&
					(i.Range.isIRange(w.originSelectionRange) || i.Range.isIRange(w.targetSelectionRange))
				);
			}
			n.isLocationLink = b;
			var m;
			(function (w) {
				const c = new Map();
				c.set(0, R.Codicon.symbolFile),
					c.set(1, R.Codicon.symbolModule),
					c.set(2, R.Codicon.symbolNamespace),
					c.set(3, R.Codicon.symbolPackage),
					c.set(4, R.Codicon.symbolClass),
					c.set(5, R.Codicon.symbolMethod),
					c.set(6, R.Codicon.symbolProperty),
					c.set(7, R.Codicon.symbolField),
					c.set(8, R.Codicon.symbolConstructor),
					c.set(9, R.Codicon.symbolEnum),
					c.set(10, R.Codicon.symbolInterface),
					c.set(11, R.Codicon.symbolFunction),
					c.set(12, R.Codicon.symbolVariable),
					c.set(13, R.Codicon.symbolConstant),
					c.set(14, R.Codicon.symbolString),
					c.set(15, R.Codicon.symbolNumber),
					c.set(16, R.Codicon.symbolBoolean),
					c.set(17, R.Codicon.symbolArray),
					c.set(18, R.Codicon.symbolObject),
					c.set(19, R.Codicon.symbolKey),
					c.set(20, R.Codicon.symbolNull),
					c.set(21, R.Codicon.symbolEnumMember),
					c.set(22, R.Codicon.symbolStruct),
					c.set(23, R.Codicon.symbolEvent),
					c.set(24, R.Codicon.symbolOperator),
					c.set(25, R.Codicon.symbolTypeParameter);
				function r(u) {
					let h = c.get(u);
					return (
						h ||
							(console.info('No codicon found for SymbolKind ' + u),
							(h = R.Codicon.symbolProperty)),
						h
					);
				}
				w.toIcon = r;
			})(m || (n.SymbolKinds = m = {}));
			class v {
				static fromValue(c) {
					switch (c) {
						case 'comment':
							return v.Comment;
						case 'imports':
							return v.Imports;
						case 'region':
							return v.Region;
					}
					return new v(c);
				}
				constructor(c) {
					this.value = c;
				}
			}
			(n.FoldingRangeKind = v),
				(v.Comment = new v('comment')),
				(v.Imports = new v('imports')),
				(v.Region = new v('region'));
			var E;
			(function (w) {
				function c(r) {
					return !r || typeof r != 'object'
						? !1
						: typeof r.id == 'string' && typeof r.title == 'string';
				}
				w.is = c;
			})(E || (n.Command = E = {}));
			var L;
			(function (w) {
				(w[(w.Type = 1)] = 'Type'), (w[(w.Parameter = 2)] = 'Parameter');
			})(L || (n.InlayHintKind = L = {}));
			class A {
				constructor(c) {
					(this.createSupport = c), (this._tokenizationSupport = null);
				}
				dispose() {
					this._tokenizationSupport &&
						this._tokenizationSupport.then((c) => {
							c && c.dispose();
						});
				}
				get tokenizationSupport() {
					return (
						this._tokenizationSupport || (this._tokenizationSupport = this.createSupport()),
						this._tokenizationSupport
					);
				}
			}
			(n.LazyTokenizationSupport = A), (n.TokenizationRegistry = new a.TokenizationRegistry());
		}),
		Y(
			X[58],
			J([0, 1, 55, 9, 30, 13, 3, 2, 34, 57, 51]),
			function (x, n, R, M, i, a, C, S, o, s, p) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.createMonacoBaseAPI = n.KeyMod = void 0);
				class e {
					static chord(b, m) {
						return (0, i.KeyChord)(b, m);
					}
				}
				(n.KeyMod = e), (e.CtrlCmd = 2048), (e.Shift = 1024), (e.Alt = 512), (e.WinCtrl = 256);
				function d() {
					return {
						editor: void 0,
						languages: void 0,
						CancellationTokenSource: R.CancellationTokenSource,
						Emitter: M.Emitter,
						KeyCode: p.KeyCode,
						KeyMod: e,
						Position: C.Position,
						Range: S.Range,
						Selection: o.Selection,
						SelectionDirection: p.SelectionDirection,
						MarkerSeverity: p.MarkerSeverity,
						MarkerTag: p.MarkerTag,
						Uri: a.URI,
						Token: s.Token
					};
				}
				n.createMonacoBaseAPI = d;
			}
		),
		Y(
			X[61],
			J([0, 1, 17, 13, 3, 2, 48, 22, 44, 45, 58, 24, 50, 42, 12, 43]),
			function (x, n, R, M, i, a, C, S, o, s, p, e, d, g, b, m) {
				'use strict';
				Object.defineProperty(n, '__esModule', { value: !0 }),
					(n.create = n.EditorSimpleWorker = void 0);
				class v extends C.MirrorTextModel {
					get uri() {
						return this._uri;
					}
					get eol() {
						return this._eol;
					}
					getValue() {
						return this.getText();
					}
					findMatches(w) {
						const c = [];
						for (let r = 0; r < this._lines.length; r++) {
							const u = this._lines[r],
								h = this.offsetAt(new i.Position(r + 1, 1)),
								f = u.matchAll(w);
							for (const l of f) (l.index || l.index === 0) && (l.index = l.index + h), c.push(l);
						}
						return c;
					}
					getLinesContent() {
						return this._lines.slice(0);
					}
					getLineCount() {
						return this._lines.length;
					}
					getLineContent(w) {
						return this._lines[w - 1];
					}
					getWordAtPosition(w, c) {
						const r = (0, S.getWordAtText)(
							w.column,
							(0, S.ensureValidWordDefinition)(c),
							this._lines[w.lineNumber - 1],
							0
						);
						return r ? new a.Range(w.lineNumber, r.startColumn, w.lineNumber, r.endColumn) : null;
					}
					words(w) {
						const c = this._lines,
							r = this._wordenize.bind(this);
						let u = 0,
							h = '',
							f = 0,
							l = [];
						return {
							*[Symbol.iterator]() {
								for (;;)
									if (f < l.length) {
										const _ = h.substring(l[f].start, l[f].end);
										(f += 1), yield _;
									} else if (u < c.length) (h = c[u]), (l = r(h, w)), (f = 0), (u += 1);
									else break;
							}
						};
					}
					getLineWords(w, c) {
						const r = this._lines[w - 1],
							u = this._wordenize(r, c),
							h = [];
						for (const f of u)
							h.push({
								word: r.substring(f.start, f.end),
								startColumn: f.start + 1,
								endColumn: f.end + 1
							});
						return h;
					}
					_wordenize(w, c) {
						const r = [];
						let u;
						for (c.lastIndex = 0; (u = c.exec(w)) && u[0].length !== 0; )
							r.push({ start: u.index, end: u.index + u[0].length });
						return r;
					}
					getValueInRange(w) {
						if (((w = this._validateRange(w)), w.startLineNumber === w.endLineNumber))
							return this._lines[w.startLineNumber - 1].substring(
								w.startColumn - 1,
								w.endColumn - 1
							);
						const c = this._eol,
							r = w.startLineNumber - 1,
							u = w.endLineNumber - 1,
							h = [];
						h.push(this._lines[r].substring(w.startColumn - 1));
						for (let f = r + 1; f < u; f++) h.push(this._lines[f]);
						return h.push(this._lines[u].substring(0, w.endColumn - 1)), h.join(c);
					}
					offsetAt(w) {
						return (
							(w = this._validatePosition(w)),
							this._ensureLineStarts(),
							this._lineStarts.getPrefixSum(w.lineNumber - 2) + (w.column - 1)
						);
					}
					positionAt(w) {
						(w = Math.floor(w)), (w = Math.max(0, w)), this._ensureLineStarts();
						const c = this._lineStarts.getIndexOf(w),
							r = this._lines[c.index].length;
						return { lineNumber: 1 + c.index, column: 1 + Math.min(c.remainder, r) };
					}
					_validateRange(w) {
						const c = this._validatePosition({
								lineNumber: w.startLineNumber,
								column: w.startColumn
							}),
							r = this._validatePosition({ lineNumber: w.endLineNumber, column: w.endColumn });
						return c.lineNumber !== w.startLineNumber ||
							c.column !== w.startColumn ||
							r.lineNumber !== w.endLineNumber ||
							r.column !== w.endColumn
							? {
									startLineNumber: c.lineNumber,
									startColumn: c.column,
									endLineNumber: r.lineNumber,
									endColumn: r.column
							  }
							: w;
					}
					_validatePosition(w) {
						if (!i.Position.isIPosition(w)) throw new Error('bad position');
						let { lineNumber: c, column: r } = w,
							u = !1;
						if (c < 1) (c = 1), (r = 1), (u = !0);
						else if (c > this._lines.length)
							(c = this._lines.length), (r = this._lines[c - 1].length + 1), (u = !0);
						else {
							const h = this._lines[c - 1].length + 1;
							r < 1 ? ((r = 1), (u = !0)) : r > h && ((r = h), (u = !0));
						}
						return u ? { lineNumber: c, column: r } : w;
					}
				}
				class E {
					constructor(w, c) {
						(this._host = w),
							(this._models = Object.create(null)),
							(this._foreignModuleFactory = c),
							(this._foreignModule = null);
					}
					dispose() {
						this._models = Object.create(null);
					}
					_getModel(w) {
						return this._models[w];
					}
					_getModels() {
						const w = [];
						return Object.keys(this._models).forEach((c) => w.push(this._models[c])), w;
					}
					acceptNewModel(w) {
						this._models[w.url] = new v(M.URI.parse(w.url), w.lines, w.EOL, w.versionId);
					}
					acceptModelChanged(w, c) {
						if (!this._models[w]) return;
						this._models[w].onEvents(c);
					}
					acceptRemovedModel(w) {
						this._models[w] && delete this._models[w];
					}
					computeUnicodeHighlights(w, c, r) {
						return me(this, void 0, void 0, function* () {
							const u = this._getModel(w);
							return u
								? d.UnicodeTextModelHighlighter.computeUnicodeHighlights(u, c, r)
								: {
										ranges: [],
										hasMore: !1,
										ambiguousCharacterCount: 0,
										invisibleCharacterCount: 0,
										nonBasicAsciiCharacterCount: 0
								  };
						});
					}
					computeDiff(w, c, r, u) {
						return me(this, void 0, void 0, function* () {
							const h = this._getModel(w),
								f = this._getModel(c);
							return !h || !f ? null : E.computeDiff(h, f, r, u);
						});
					}
					static computeDiff(w, c, r, u) {
						const h =
								u === 'advanced' ? g.linesDiffComputers.advanced : g.linesDiffComputers.legacy,
							f = w.getLinesContent(),
							l = c.getLinesContent(),
							_ = h.computeDiff(f, l, r);
						return {
							identical: _.changes.length > 0 ? !1 : this._modelsAreIdentical(w, c),
							quitEarly: _.hitTimeout,
							changes: _.changes.map((y) => {
								var D;
								return [
									y.originalRange.startLineNumber,
									y.originalRange.endLineNumberExclusive,
									y.modifiedRange.startLineNumber,
									y.modifiedRange.endLineNumberExclusive,
									(D = y.innerChanges) === null || D === void 0
										? void 0
										: D.map((k) => [
												k.originalRange.startLineNumber,
												k.originalRange.startColumn,
												k.originalRange.endLineNumber,
												k.originalRange.endColumn,
												k.modifiedRange.startLineNumber,
												k.modifiedRange.startColumn,
												k.modifiedRange.endLineNumber,
												k.modifiedRange.endColumn
										  ])
								];
							})
						};
					}
					static _modelsAreIdentical(w, c) {
						const r = w.getLineCount(),
							u = c.getLineCount();
						if (r !== u) return !1;
						for (let h = 1; h <= r; h++) {
							const f = w.getLineContent(h),
								l = c.getLineContent(h);
							if (f !== l) return !1;
						}
						return !0;
					}
					computeMoreMinimalEdits(w, c, r) {
						return me(this, void 0, void 0, function* () {
							const u = this._getModel(w);
							if (!u) return c;
							const h = [];
							let f;
							c = c.slice(0).sort((l, _) => {
								if (l.range && _.range) return a.Range.compareRangesUsingStarts(l.range, _.range);
								const N = l.range ? 0 : 1,
									y = _.range ? 0 : 1;
								return N - y;
							});
							for (let { range: l, text: _, eol: N } of c) {
								if ((typeof N == 'number' && (f = N), a.Range.isEmpty(l) && !_)) continue;
								const y = u.getValueInRange(l);
								if (((_ = _.replace(/\r\n|\n|\r/g, u.eol)), y === _)) continue;
								if (Math.max(_.length, y.length) > E._diffLimit) {
									h.push({ range: l, text: _ });
									continue;
								}
								const D = (0, R.stringDiff)(y, _, r),
									k = u.offsetAt(a.Range.lift(l).getStartPosition());
								for (const B of D) {
									const I = u.positionAt(k + B.originalStart),
										U = u.positionAt(k + B.originalStart + B.originalLength),
										V = {
											text: _.substr(B.modifiedStart, B.modifiedLength),
											range: {
												startLineNumber: I.lineNumber,
												startColumn: I.column,
												endLineNumber: U.lineNumber,
												endColumn: U.column
											}
										};
									u.getValueInRange(V.range) !== V.text && h.push(V);
								}
							}
							return (
								typeof f == 'number' &&
									h.push({
										eol: f,
										text: '',
										range: { startLineNumber: 0, startColumn: 0, endLineNumber: 0, endColumn: 0 }
									}),
								h
							);
						});
					}
					computeLinks(w) {
						return me(this, void 0, void 0, function* () {
							const c = this._getModel(w);
							return c ? (0, o.computeLinks)(c) : null;
						});
					}
					computeDefaultDocumentColors(w) {
						return me(this, void 0, void 0, function* () {
							const c = this._getModel(w);
							return c ? (0, m.computeDefaultDocumentColors)(c) : null;
						});
					}
					textualSuggest(w, c, r, u) {
						return me(this, void 0, void 0, function* () {
							const h = new e.StopWatch(!0),
								f = new RegExp(r, u),
								l = new Set();
							e: for (const _ of w) {
								const N = this._getModel(_);
								if (N) {
									for (const y of N.words(f))
										if (!(y === c || !isNaN(Number(y))) && (l.add(y), l.size > E._suggestionsLimit))
											break e;
								}
							}
							return { words: Array.from(l), duration: h.elapsed() };
						});
					}
					computeWordRanges(w, c, r, u) {
						return me(this, void 0, void 0, function* () {
							const h = this._getModel(w);
							if (!h) return Object.create(null);
							const f = new RegExp(r, u),
								l = Object.create(null);
							for (let _ = c.startLineNumber; _ < c.endLineNumber; _++) {
								const N = h.getLineWords(_, f);
								for (const y of N) {
									if (!isNaN(Number(y.word))) continue;
									let D = l[y.word];
									D || ((D = []), (l[y.word] = D)),
										D.push({
											startLineNumber: _,
											startColumn: y.startColumn,
											endLineNumber: _,
											endColumn: y.endColumn
										});
								}
							}
							return l;
						});
					}
					navigateValueSet(w, c, r, u, h) {
						return me(this, void 0, void 0, function* () {
							const f = this._getModel(w);
							if (!f) return null;
							const l = new RegExp(u, h);
							c.startColumn === c.endColumn &&
								(c = {
									startLineNumber: c.startLineNumber,
									startColumn: c.startColumn,
									endLineNumber: c.endLineNumber,
									endColumn: c.endColumn + 1
								});
							const _ = f.getValueInRange(c),
								N = f.getWordAtPosition(
									{ lineNumber: c.startLineNumber, column: c.startColumn },
									l
								);
							if (!N) return null;
							const y = f.getValueInRange(N);
							return s.BasicInplaceReplace.INSTANCE.navigateValueSet(c, _, N, y, r);
						});
					}
					loadForeignModule(w, c, r) {
						const u = (l, _) => this._host.fhr(l, _),
							f = {
								host: (0, b.createProxyObject)(r, u),
								getMirrorModels: () => this._getModels()
							};
						return this._foreignModuleFactory
							? ((this._foreignModule = this._foreignModuleFactory(f, c)),
							  Promise.resolve((0, b.getAllMethodNames)(this._foreignModule)))
							: new Promise((l, _) => {
									x(
										[w],
										(N) => {
											(this._foreignModule = N.create(f, c)),
												l((0, b.getAllMethodNames)(this._foreignModule));
										},
										_
									);
							  });
					}
					fmr(w, c) {
						if (!this._foreignModule || typeof this._foreignModule[w] != 'function')
							return Promise.reject(new Error('Missing requestHandler or method: ' + w));
						try {
							return Promise.resolve(this._foreignModule[w].apply(this._foreignModule, c));
						} catch (r) {
							return Promise.reject(r);
						}
					}
				}
				(n.EditorSimpleWorker = E), (E._diffLimit = 1e5), (E._suggestionsLimit = 1e4);
				function L(A) {
					return new E(A, null);
				}
				(n.create = L),
					typeof importScripts == 'function' && (globalThis.monaco = (0, p.createMonacoBaseAPI)());
			}
		);
}.call(this));

//# sourceMappingURL=../../../../min-maps/vs/base/worker/workerMain.js.map
