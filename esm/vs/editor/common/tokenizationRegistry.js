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
import { Emitter } from '../../base/common/event.js';
import { Disposable, toDisposable } from '../../base/common/lifecycle.js';
export class TokenizationRegistry {
	constructor() {
		this._tokenizationSupports = new Map();
		this._factories = new Map();
		this._onDidChange = new Emitter();
		this.onDidChange = this._onDidChange.event;
		this._colorMap = null;
	}
	handleChange(languageIds) {
		this._onDidChange.fire({
			changedLanguages: languageIds,
			changedColorMap: false
		});
	}
	register(languageId, support) {
		this._tokenizationSupports.set(languageId, support);
		this.handleChange([languageId]);
		return toDisposable(() => {
			if (this._tokenizationSupports.get(languageId) !== support) {
				return;
			}
			this._tokenizationSupports.delete(languageId);
			this.handleChange([languageId]);
		});
	}
	get(languageId) {
		return this._tokenizationSupports.get(languageId) || null;
	}
	registerFactory(languageId, factory) {
		var _a;
		(_a = this._factories.get(languageId)) === null || _a === void 0 ? void 0 : _a.dispose();
		const myData = new TokenizationSupportFactoryData(this, languageId, factory);
		this._factories.set(languageId, myData);
		return toDisposable(() => {
			const v = this._factories.get(languageId);
			if (!v || v !== myData) {
				return;
			}
			this._factories.delete(languageId);
			v.dispose();
		});
	}
	getOrCreate(languageId) {
		return __awaiter(this, void 0, void 0, function* () {
			// check first if the support is already set
			const tokenizationSupport = this.get(languageId);
			if (tokenizationSupport) {
				return tokenizationSupport;
			}
			const factory = this._factories.get(languageId);
			if (!factory || factory.isResolved) {
				// no factory or factory.resolve already finished
				return null;
			}
			yield factory.resolve();
			return this.get(languageId);
		});
	}
	isResolved(languageId) {
		const tokenizationSupport = this.get(languageId);
		if (tokenizationSupport) {
			return true;
		}
		const factory = this._factories.get(languageId);
		if (!factory || factory.isResolved) {
			return true;
		}
		return false;
	}
	setColorMap(colorMap) {
		this._colorMap = colorMap;
		this._onDidChange.fire({
			changedLanguages: Array.from(this._tokenizationSupports.keys()),
			changedColorMap: true
		});
	}
	getColorMap() {
		return this._colorMap;
	}
	getDefaultBackground() {
		if (this._colorMap && this._colorMap.length > 2 /* ColorId.DefaultBackground */) {
			return this._colorMap[2 /* ColorId.DefaultBackground */];
		}
		return null;
	}
}
class TokenizationSupportFactoryData extends Disposable {
	get isResolved() {
		return this._isResolved;
	}
	constructor(_registry, _languageId, _factory) {
		super();
		this._registry = _registry;
		this._languageId = _languageId;
		this._factory = _factory;
		this._isDisposed = false;
		this._resolvePromise = null;
		this._isResolved = false;
	}
	dispose() {
		this._isDisposed = true;
		super.dispose();
	}
	resolve() {
		return __awaiter(this, void 0, void 0, function* () {
			if (!this._resolvePromise) {
				this._resolvePromise = this._create();
			}
			return this._resolvePromise;
		});
	}
	_create() {
		return __awaiter(this, void 0, void 0, function* () {
			const value = yield this._factory.tokenizationSupport;
			this._isResolved = true;
			if (value && !this._isDisposed) {
				this._register(this._registry.register(this._languageId, value));
			}
		});
	}
}
