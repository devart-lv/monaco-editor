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
import { mapFind } from '../../../../base/common/arrays.js';
import { BugIndicatingError, onUnexpectedExternalError } from '../../../../base/common/errors.js';
import { Disposable } from '../../../../base/common/lifecycle.js';
import {
	autorun,
	autorunHandleChanges,
	derived,
	observableSignal,
	observableValue,
	transaction
} from '../../../../base/common/observable.js';
import { isDefined } from '../../../../base/common/types.js';
import { EditOperation } from '../../../common/core/editOperation.js';
import { Position } from '../../../common/core/position.js';
import { Range } from '../../../common/core/range.js';
import { InlineCompletionTriggerKind } from '../../../common/languages.js';
import { ILanguageConfigurationService } from '../../../common/languages/languageConfigurationRegistry.js';
import { GhostText } from './ghostText.js';
import { addPositions, lengthOfText } from './utils.js';
import { InlineCompletionsSource } from './inlineCompletionsSource.js';
import { SnippetController2 } from '../../snippet/browser/snippetController2.js';
import { ICommandService } from '../../../../platform/commands/common/commands.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
export var VersionIdChangeReason;
(function (VersionIdChangeReason) {
	VersionIdChangeReason[(VersionIdChangeReason['Undo'] = 0)] = 'Undo';
	VersionIdChangeReason[(VersionIdChangeReason['Redo'] = 1)] = 'Redo';
	VersionIdChangeReason[(VersionIdChangeReason['AcceptWord'] = 2)] = 'AcceptWord';
	VersionIdChangeReason[(VersionIdChangeReason['Other'] = 3)] = 'Other';
})(VersionIdChangeReason || (VersionIdChangeReason = {}));
export let InlineCompletionsModel = class InlineCompletionsModel extends Disposable {
	get isAcceptingPartially() {
		return this._isAcceptingPartially;
	}
	get isNavigatingCurrentInlineCompletion() {
		return this._isNavigatingCurrentInlineCompletion;
	}
	constructor(
		textModel,
		selectedSuggestItem,
		cursorPosition,
		textModelVersionId,
		_debounceValue,
		_suggestPreviewEnabled,
		_suggestPreviewMode,
		_inlineSuggestMode,
		_enabled,
		_instantiationService,
		_commandService,
		_languageConfigurationService
	) {
		super();
		this.textModel = textModel;
		this.selectedSuggestItem = selectedSuggestItem;
		this.cursorPosition = cursorPosition;
		this.textModelVersionId = textModelVersionId;
		this._debounceValue = _debounceValue;
		this._suggestPreviewEnabled = _suggestPreviewEnabled;
		this._suggestPreviewMode = _suggestPreviewMode;
		this._inlineSuggestMode = _inlineSuggestMode;
		this._enabled = _enabled;
		this._instantiationService = _instantiationService;
		this._commandService = _commandService;
		this._languageConfigurationService = _languageConfigurationService;
		this._source = this._register(
			this._instantiationService.createInstance(
				InlineCompletionsSource,
				this.textModel,
				this.textModelVersionId,
				this._debounceValue
			)
		);
		this._isActive = observableValue('isActive', false);
		this._forceUpdate = observableSignal('forceUpdate');
		this._isAcceptingPartially = false;
		this._isNavigatingCurrentInlineCompletion = false;
		this._filteredInlineCompletionItems = derived('filteredInlineCompletionItems', (reader) => {
			const c = this._source.inlineCompletions.read(reader);
			if (!c) {
				return [];
			}
			const cursorPosition = this.cursorPosition.read(reader);
			const filteredCompletions = c.inlineCompletions.filter((c) =>
				c.isVisible(this.textModel, cursorPosition, reader)
			);
			return filteredCompletions;
		});
		// We use a semantic id to keep the same inline completion selected even if the provider reorders the completions.
		this._selectedInlineCompletionId = undefined;
		this._selectedInlineCompletionIdChangeSignal = observableSignal('selectedCompletionIdChanged');
		this.selectedInlineCompletionIndex = derived('selectedCachedCompletionIndex', (reader) => {
			this._selectedInlineCompletionIdChangeSignal.read(reader);
			const filteredCompletions = this._filteredInlineCompletionItems.read(reader);
			const idx =
				this._selectedInlineCompletionId === undefined
					? -1
					: filteredCompletions.findIndex((v) => v.semanticId === this._selectedInlineCompletionId);
			if (idx === -1) {
				// Reset the selection so that the selection does not jump back when it appears again
				this._selectedInlineCompletionId = undefined;
				return 0;
			}
			return idx;
		});
		this.selectedInlineCompletion = derived('selectedCachedCompletion', (reader) => {
			const filteredCompletions = this._filteredInlineCompletionItems.read(reader);
			const idx = this.selectedInlineCompletionIndex.read(reader);
			return filteredCompletions[idx];
		});
		this.lastTriggerKind = this._source.inlineCompletions.map((v) =>
			v === null || v === void 0 ? void 0 : v.request.context.triggerKind
		);
		this.inlineCompletionsCount = derived('selectedInlineCompletionsCount', (reader) => {
			if (this.lastTriggerKind.read(reader) === InlineCompletionTriggerKind.Explicit) {
				return this._filteredInlineCompletionItems.read(reader).length;
			} else {
				return undefined;
			}
		});
		this.ghostTextAndCompletion = derived('ghostTextAndCompletion', (reader) => {
			var _a;
			const model = this.textModel;
			const suggestItem = this.selectedSuggestItem.read(reader);
			if (suggestItem) {
				const suggestWidgetInlineCompletions =
					this._source.suggestWidgetInlineCompletions.read(reader);
				const candidateInlineCompletions = suggestWidgetInlineCompletions
					? suggestWidgetInlineCompletions.inlineCompletions
					: [this.selectedInlineCompletion.read(reader)].filter(isDefined);
				const suggestCompletion = suggestItem.toSingleTextEdit().removeCommonPrefix(model);
				const augmentedCompletion = mapFind(candidateInlineCompletions, (completion) => {
					let r = completion.toSingleTextEdit(reader);
					r = r.removeCommonPrefix(
						model,
						Range.fromPositions(r.range.getStartPosition(), suggestItem.range.getEndPosition())
					);
					return r.augments(suggestCompletion) ? { edit: r, completion } : undefined;
				});
				const isSuggestionPreviewEnabled = this._suggestPreviewEnabled.read(reader);
				if (!isSuggestionPreviewEnabled && !augmentedCompletion) {
					return undefined;
				}
				const edit =
					(_a =
						augmentedCompletion === null || augmentedCompletion === void 0
							? void 0
							: augmentedCompletion.edit) !== null && _a !== void 0
						? _a
						: suggestCompletion;
				const editPreviewLength = augmentedCompletion
					? augmentedCompletion.edit.text.length - suggestCompletion.text.length
					: 0;
				const mode = this._suggestPreviewMode.read(reader);
				const cursor = this.cursorPosition.read(reader);
				const newGhostText = edit.computeGhostText(model, mode, cursor, editPreviewLength);
				// Show an invisible ghost text to reserve space
				const ghostText =
					newGhostText !== null && newGhostText !== void 0
						? newGhostText
						: new GhostText(edit.range.endLineNumber, []);
				return {
					ghostText,
					completion:
						augmentedCompletion === null || augmentedCompletion === void 0
							? void 0
							: augmentedCompletion.completion
				};
			} else {
				if (!this._isActive.read(reader)) {
					return undefined;
				}
				const item = this.selectedInlineCompletion.read(reader);
				if (!item) {
					return undefined;
				}
				const replacement = item.toSingleTextEdit(reader);
				const mode = this._inlineSuggestMode.read(reader);
				const cursor = this.cursorPosition.read(reader);
				const ghostText = replacement.computeGhostText(model, mode, cursor);
				return ghostText ? { ghostText, completion: item } : undefined;
			}
		});
		this.ghostText = derived('ghostText', (reader) => {
			const v = this.ghostTextAndCompletion.read(reader);
			if (!v) {
				return undefined;
			}
			return v.ghostText;
		});
		const preserveCurrentCompletionReasons = new Set([
			VersionIdChangeReason.Redo,
			VersionIdChangeReason.Undo,
			VersionIdChangeReason.AcceptWord
		]);
		// TODO implement ChangeHandler concept
		let preserveCurrentCompletion = false;
		let inlineCompletionTriggerKind = InlineCompletionTriggerKind.Automatic;
		this._register(
			autorunHandleChanges(
				'update',
				{
					handleChange: (ctx) => {
						if (
							ctx.didChange(this.textModelVersionId) &&
							preserveCurrentCompletionReasons.has(ctx.change)
						) {
							preserveCurrentCompletion = true;
						} else if (ctx.didChange(this._forceUpdate)) {
							inlineCompletionTriggerKind = ctx.change;
						}
						return true;
					}
				},
				(reader) => {
					var _a, _b;
					this._forceUpdate.read(reader);
					if (
						(this._enabled.read(reader) && this.selectedSuggestItem.read(reader)) ||
						this._isActive.read(reader)
					) {
						const shouldPreserveCurrentCompletion =
							preserveCurrentCompletion ||
							((_b =
								(_a = this.selectedInlineCompletion.get()) === null || _a === void 0
									? void 0
									: _a.inlineCompletion.source.inlineCompletions.enableForwardStability) !== null &&
							_b !== void 0
								? _b
								: false);
						const suggestItem = this.selectedSuggestItem.read(reader);
						const cursorPosition = this.cursorPosition.read(reader);
						this.textModelVersionId.read(reader);
						const suggestWidgetInlineCompletions =
							this._source.suggestWidgetInlineCompletions.get();
						if (suggestWidgetInlineCompletions && !suggestItem) {
							const inlineCompletions = this._source.inlineCompletions.get();
							if (
								inlineCompletions &&
								suggestWidgetInlineCompletions.request.versionId >
									inlineCompletions.request.versionId
							) {
								this._source.inlineCompletions.set(
									suggestWidgetInlineCompletions.clone(),
									undefined
								);
							}
							this._source.clearSuggestWidgetInlineCompletions();
						}
						this._updatePromise = this._source.update(
							cursorPosition,
							{
								triggerKind: inlineCompletionTriggerKind,
								selectedSuggestionInfo:
									suggestItem === null || suggestItem === void 0
										? void 0
										: suggestItem.toSelectedSuggestionInfo()
							},
							shouldPreserveCurrentCompletion ? this.selectedInlineCompletion.get() : undefined
						);
					} else {
						this._updatePromise = undefined;
					}
					// Reset local state
					preserveCurrentCompletion = false;
					inlineCompletionTriggerKind = InlineCompletionTriggerKind.Automatic;
				}
			)
		);
		let lastItem = undefined;
		this._register(
			autorun('call handleItemDidShow', (reader) => {
				var _a, _b;
				const item = this.ghostTextAndCompletion.read(reader);
				const completion = item === null || item === void 0 ? void 0 : item.completion;
				if (
					(completion === null || completion === void 0 ? void 0 : completion.semanticId) !==
					(lastItem === null || lastItem === void 0 ? void 0 : lastItem.semanticId)
				) {
					lastItem = completion;
					if (completion) {
						const i = completion.inlineCompletion;
						const src = i.source;
						(_b = (_a = src.provider).handleItemDidShow) === null || _b === void 0
							? void 0
							: _b.call(_a, src.inlineCompletions, i.sourceInlineCompletion, i.insertText);
					}
				}
			})
		);
	}
	trigger(tx) {
		return __awaiter(this, void 0, void 0, function* () {
			this._isActive.set(true, tx);
			yield this._updatePromise;
		});
	}
	triggerExplicitly() {
		return __awaiter(this, void 0, void 0, function* () {
			transaction((tx) => {
				this._isActive.set(true, tx);
				this._forceUpdate.trigger(tx, InlineCompletionTriggerKind.Explicit);
			});
			yield this._updatePromise;
		});
	}
	stop(tx) {
		if (!tx) {
			transaction((tx) => this.stop(tx));
			return;
		}
		this._isActive.set(false, tx);
		this._source.clear(tx);
	}
	deltaIndex(delta) {
		return __awaiter(this, void 0, void 0, function* () {
			yield this.triggerExplicitly();
			this._isNavigatingCurrentInlineCompletion = true;
			try {
				const completions = this._filteredInlineCompletionItems.get() || [];
				if (completions.length > 0) {
					const newIdx =
						(this.selectedInlineCompletionIndex.get() + delta + completions.length) %
						completions.length;
					this._selectedInlineCompletionId = completions[newIdx].semanticId;
				} else {
					this._selectedInlineCompletionId = undefined;
				}
				this._selectedInlineCompletionIdChangeSignal.trigger(undefined);
			} finally {
				this._isNavigatingCurrentInlineCompletion = false;
			}
		});
	}
	next() {
		return __awaiter(this, void 0, void 0, function* () {
			yield this.deltaIndex(1);
		});
	}
	previous() {
		return __awaiter(this, void 0, void 0, function* () {
			yield this.deltaIndex(-1);
		});
	}
	accept(editor) {
		var _a, _b;
		if (editor.getModel() !== this.textModel) {
			throw new BugIndicatingError();
		}
		const ghostText = this.ghostText.get();
		const completion =
			(_a = this.selectedInlineCompletion.get()) === null || _a === void 0
				? void 0
				: _a.toInlineCompletion(undefined);
		if (!ghostText || !completion) {
			return;
		}
		editor.pushUndoStop();
		if (completion.snippetInfo) {
			editor.executeEdits('inlineSuggestion.accept', [
				EditOperation.replaceMove(completion.range, ''),
				...completion.additionalTextEdits
			]);
			editor.setPosition(completion.snippetInfo.range.getStartPosition());
			(_b = SnippetController2.get(editor)) === null || _b === void 0
				? void 0
				: _b.insert(completion.snippetInfo.snippet, { undoStopBefore: false });
		} else {
			editor.executeEdits('inlineSuggestion.accept', [
				EditOperation.replaceMove(completion.range, completion.insertText),
				...completion.additionalTextEdits
			]);
		}
		if (completion.command) {
			this._commandService
				.executeCommand(completion.command.id, ...(completion.command.arguments || []))
				.finally(() => {
					transaction((tx) => {
						this._source.clear(tx);
					});
				})
				.then(undefined, onUnexpectedExternalError);
		} else {
			transaction((tx) => {
				this._source.clear(tx);
			});
		}
	}
	acceptNextWord(editor) {
		this.acceptNext(editor, (pos, text) => {
			const langId = this.textModel.getLanguageIdAtPosition(pos.lineNumber, pos.column);
			const config = this._languageConfigurationService.getLanguageConfiguration(langId);
			const wordRegExp = new RegExp(
				config.wordDefinition.source,
				config.wordDefinition.flags.replace('g', '')
			);
			const m1 = text.match(wordRegExp);
			let acceptUntilIndexExclusive = 0;
			if (m1 && m1.index !== undefined) {
				if (m1.index === 0) {
					acceptUntilIndexExclusive = m1[0].length;
				} else {
					acceptUntilIndexExclusive = m1.index;
				}
			} else {
				acceptUntilIndexExclusive = text.length;
			}
			const wsRegExp = /\s+/g;
			const m2 = wsRegExp.exec(text);
			if (m2 && m2.index !== undefined) {
				if (m2.index + m2[0].length < acceptUntilIndexExclusive) {
					acceptUntilIndexExclusive = m2.index + m2[0].length;
				}
			}
			return acceptUntilIndexExclusive;
		});
	}
	acceptNextLine(editor) {
		this.acceptNext(editor, (pos, text) => {
			const m = text.match(/\n/);
			if (m && m.index !== undefined) {
				return m.index + 1;
			}
			return text.length;
		});
	}
	acceptNext(editor, getAcceptUntilIndex) {
		var _a;
		if (editor.getModel() !== this.textModel) {
			throw new BugIndicatingError();
		}
		const ghostText = this.ghostText.get();
		const completion =
			(_a = this.selectedInlineCompletion.get()) === null || _a === void 0
				? void 0
				: _a.toInlineCompletion(undefined);
		if (!ghostText || !completion) {
			return;
		}
		if (completion.snippetInfo || completion.filterText !== completion.insertText) {
			// not in WYSIWYG mode, partial commit might change completion, thus it is not supported
			this.accept(editor);
			return;
		}
		if (ghostText.parts.length === 0) {
			return;
		}
		const firstPart = ghostText.parts[0];
		const position = new Position(ghostText.lineNumber, firstPart.column);
		const line = firstPart.lines.join('\n');
		const acceptUntilIndexExclusive = getAcceptUntilIndex(position, line);
		if (acceptUntilIndexExclusive === line.length && ghostText.parts.length === 1) {
			this.accept(editor);
			return;
		}
		const partialText = line.substring(0, acceptUntilIndexExclusive);
		this._isAcceptingPartially = true;
		try {
			editor.pushUndoStop();
			editor.executeEdits('inlineSuggestion.accept', [
				EditOperation.replace(Range.fromPositions(position), partialText)
			]);
			const length = lengthOfText(partialText);
			editor.setPosition(addPositions(position, length));
		} finally {
			this._isAcceptingPartially = false;
		}
		if (completion.source.provider.handlePartialAccept) {
			const acceptedRange = Range.fromPositions(
				completion.range.getStartPosition(),
				addPositions(position, lengthOfText(partialText))
			);
			// This assumes that the inline completion and the model use the same EOL style.
			const text = editor.getModel().getValueInRange(acceptedRange, 1 /* EndOfLinePreference.LF */);
			completion.source.provider.handlePartialAccept(
				completion.source.inlineCompletions,
				completion.sourceInlineCompletion,
				text.length
			);
		}
	}
};
InlineCompletionsModel = __decorate(
	[
		__param(9, IInstantiationService),
		__param(10, ICommandService),
		__param(11, ILanguageConfigurationService)
	],
	InlineCompletionsModel
);
