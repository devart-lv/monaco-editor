/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d;
		if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __param =
	(this && this.__param) ||
	function (paramIndex, decorator) {
		return function (target, key) {
			decorator(target, key, paramIndex);
		};
	};
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
import * as dom from '../../../base/browser/dom.js';
import { CancellationToken } from '../../../base/common/cancellation.js';
import { LinkedList } from '../../../base/common/linkedList.js';
import { ResourceMap } from '../../../base/common/map.js';
import { parse } from '../../../base/common/marshalling.js';
import { Schemas } from '../../../base/common/network.js';
import { normalizePath } from '../../../base/common/resources.js';
import { URI } from '../../../base/common/uri.js';
import { ICodeEditorService } from './codeEditorService.js';
import { ICommandService } from '../../../platform/commands/common/commands.js';
import { EditorOpenSource } from '../../../platform/editor/common/editor.js';
import {
	extractSelection,
	matchesScheme,
	matchesSomeScheme
} from '../../../platform/opener/common/opener.js';
let CommandOpener = class CommandOpener {
	constructor(_commandService) {
		this._commandService = _commandService;
	}
	open(target, options) {
		return __awaiter(this, void 0, void 0, function* () {
			if (!matchesScheme(target, Schemas.command)) {
				return false;
			}
			if (!(options === null || options === void 0 ? void 0 : options.allowCommands)) {
				// silently ignore commands when command-links are disabled, also
				// suppress other openers by returning TRUE
				return true;
			}
			if (typeof target === 'string') {
				target = URI.parse(target);
			}
			if (Array.isArray(options.allowCommands)) {
				// Only allow specific commands
				if (!options.allowCommands.includes(target.path)) {
					// Suppress other openers by returning TRUE
					return true;
				}
			}
			// execute as command
			let args = [];
			try {
				args = parse(decodeURIComponent(target.query));
			} catch (_a) {
				// ignore and retry
				try {
					args = parse(target.query);
				} catch (_b) {
					// ignore error
				}
			}
			if (!Array.isArray(args)) {
				args = [args];
			}
			yield this._commandService.executeCommand(target.path, ...args);
			return true;
		});
	}
};
CommandOpener = __decorate([__param(0, ICommandService)], CommandOpener);
let EditorOpener = class EditorOpener {
	constructor(_editorService) {
		this._editorService = _editorService;
	}
	open(target, options) {
		return __awaiter(this, void 0, void 0, function* () {
			if (typeof target === 'string') {
				target = URI.parse(target);
			}
			const { selection, uri } = extractSelection(target);
			target = uri;
			if (target.scheme === Schemas.file) {
				target = normalizePath(target); // workaround for non-normalized paths (https://github.com/microsoft/vscode/issues/12954)
			}
			yield this._editorService.openCodeEditor(
				{
					resource: target,
					options: Object.assign(
						{
							selection,
							source: (options === null || options === void 0 ? void 0 : options.fromUserGesture)
								? EditorOpenSource.USER
								: EditorOpenSource.API
						},
						options === null || options === void 0 ? void 0 : options.editorOptions
					)
				},
				this._editorService.getFocusedCodeEditor(),
				options === null || options === void 0 ? void 0 : options.openToSide
			);
			return true;
		});
	}
};
EditorOpener = __decorate([__param(0, ICodeEditorService)], EditorOpener);
export let OpenerService = class OpenerService {
	constructor(editorService, commandService) {
		this._openers = new LinkedList();
		this._validators = new LinkedList();
		this._resolvers = new LinkedList();
		this._resolvedUriTargets = new ResourceMap((uri) =>
			uri.with({ path: null, fragment: null, query: null }).toString()
		);
		this._externalOpeners = new LinkedList();
		// Default external opener is going through window.open()
		this._defaultExternalOpener = {
			openExternal: (href) =>
				__awaiter(this, void 0, void 0, function* () {
					// ensure to open HTTP/HTTPS links into new windows
					// to not trigger a navigation. Any other link is
					// safe to be set as HREF to prevent a blank window
					// from opening.
					if (matchesSomeScheme(href, Schemas.http, Schemas.https)) {
						dom.windowOpenNoOpener(href);
					} else {
						window.location.href = href;
					}
					return true;
				})
		};
		// Default opener: any external, maito, http(s), command, and catch-all-editors
		this._openers.push({
			open: (target, options) =>
				__awaiter(this, void 0, void 0, function* () {
					if (
						(options === null || options === void 0 ? void 0 : options.openExternal) ||
						matchesSomeScheme(target, Schemas.mailto, Schemas.http, Schemas.https, Schemas.vsls)
					) {
						// open externally
						yield this._doOpenExternal(target, options);
						return true;
					}
					return false;
				})
		});
		this._openers.push(new CommandOpener(commandService));
		this._openers.push(new EditorOpener(editorService));
	}
	registerOpener(opener) {
		const remove = this._openers.unshift(opener);
		return { dispose: remove };
	}
	open(target, options) {
		var _a;
		return __awaiter(this, void 0, void 0, function* () {
			// check with contributed validators
			const targetURI = typeof target === 'string' ? URI.parse(target) : target;
			// validate against the original URI that this URI resolves to, if one exists
			const validationTarget =
				(_a = this._resolvedUriTargets.get(targetURI)) !== null && _a !== void 0 ? _a : target;
			for (const validator of this._validators) {
				if (!(yield validator.shouldOpen(validationTarget, options))) {
					return false;
				}
			}
			// check with contributed openers
			for (const opener of this._openers) {
				const handled = yield opener.open(target, options);
				if (handled) {
					return true;
				}
			}
			return false;
		});
	}
	resolveExternalUri(resource, options) {
		return __awaiter(this, void 0, void 0, function* () {
			for (const resolver of this._resolvers) {
				try {
					const result = yield resolver.resolveExternalUri(resource, options);
					if (result) {
						if (!this._resolvedUriTargets.has(result.resolved)) {
							this._resolvedUriTargets.set(result.resolved, resource);
						}
						return result;
					}
				} catch (_a) {
					// noop
				}
			}
			throw new Error('Could not resolve external URI: ' + resource.toString());
		});
	}
	_doOpenExternal(resource, options) {
		return __awaiter(this, void 0, void 0, function* () {
			//todo@jrieken IExternalUriResolver should support `uri: URI | string`
			const uri = typeof resource === 'string' ? URI.parse(resource) : resource;
			let externalUri;
			try {
				externalUri = (yield this.resolveExternalUri(uri, options)).resolved;
			} catch (_a) {
				externalUri = uri;
			}
			let href;
			if (typeof resource === 'string' && uri.toString() === externalUri.toString()) {
				// open the url-string AS IS
				href = resource;
			} else {
				// open URI using the toString(noEncode)+encodeURI-trick
				href = encodeURI(externalUri.toString(true));
			}
			if (options === null || options === void 0 ? void 0 : options.allowContributedOpeners) {
				const preferredOpenerId =
					typeof (options === null || options === void 0
						? void 0
						: options.allowContributedOpeners) === 'string'
						? options === null || options === void 0
							? void 0
							: options.allowContributedOpeners
						: undefined;
				for (const opener of this._externalOpeners) {
					const didOpen = yield opener.openExternal(
						href,
						{
							sourceUri: uri,
							preferredOpenerId
						},
						CancellationToken.None
					);
					if (didOpen) {
						return true;
					}
				}
			}
			return this._defaultExternalOpener.openExternal(
				href,
				{ sourceUri: uri },
				CancellationToken.None
			);
		});
	}
	dispose() {
		this._validators.clear();
	}
};
OpenerService = __decorate(
	[__param(0, ICodeEditorService), __param(1, ICommandService)],
	OpenerService
);
