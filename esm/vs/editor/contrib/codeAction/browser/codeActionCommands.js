/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import { escapeRegExpCharacters } from '../../../../base/common/strings.js';
import { EditorAction, EditorCommand } from '../../../browser/editorExtensions.js';
import { EditorContextKeys } from '../../../common/editorContextKeys.js';
import {
	autoFixCommandId,
	codeActionCommandId,
	fixAllCommandId,
	organizeImportsCommandId,
	quickFixCommandId,
	refactorCommandId,
	sourceActionCommandId
} from './codeAction.js';
import * as nls from '../../../../nls.js';
import { ContextKeyExpr } from '../../../../platform/contextkey/common/contextkey.js';
import { CodeActionCommandArgs, CodeActionKind, CodeActionTriggerSource } from '../common/types.js';
import { CodeActionController } from './codeActionController.js';
import { SUPPORTED_CODE_ACTIONS } from './codeActionModel.js';
function contextKeyForSupportedActions(kind) {
	return ContextKeyExpr.regex(
		SUPPORTED_CODE_ACTIONS.keys()[0],
		new RegExp('(\\s|^)' + escapeRegExpCharacters(kind.value) + '\\b')
	);
}
const argsSchema = {
	type: 'object',
	defaultSnippets: [{ body: { kind: '' } }],
	properties: {
		kind: {
			type: 'string',
			description: nls.localize('args.schema.kind', 'Kind of the code action to run.')
		},
		apply: {
			type: 'string',
			description: nls.localize(
				'args.schema.apply',
				'Controls when the returned actions are applied.'
			),
			default: 'ifSingle' /* CodeActionAutoApply.IfSingle */,
			enum: [
				'first' /* CodeActionAutoApply.First */,
				'ifSingle' /* CodeActionAutoApply.IfSingle */,
				'never' /* CodeActionAutoApply.Never */
			],
			enumDescriptions: [
				nls.localize('args.schema.apply.first', 'Always apply the first returned code action.'),
				nls.localize(
					'args.schema.apply.ifSingle',
					'Apply the first returned code action if it is the only one.'
				),
				nls.localize('args.schema.apply.never', 'Do not apply the returned code actions.')
			]
		},
		preferred: {
			type: 'boolean',
			default: false,
			description: nls.localize(
				'args.schema.preferred',
				'Controls if only preferred code actions should be returned.'
			)
		}
	}
};
function triggerCodeActionsForEditorSelection(
	editor,
	notAvailableMessage,
	filter,
	autoApply,
	triggerAction = CodeActionTriggerSource.Default
) {
	if (editor.hasModel()) {
		const controller = CodeActionController.get(editor);
		controller === null || controller === void 0
			? void 0
			: controller.manualTriggerAtCurrentPosition(
					notAvailableMessage,
					triggerAction,
					filter,
					autoApply
			  );
	}
}
export class QuickFixAction extends EditorAction {
	constructor() {
		super({
			id: quickFixCommandId,
			label: nls.localize('quickfix.trigger.label', 'Quick Fix...'),
			alias: 'Quick Fix...',
			precondition: ContextKeyExpr.and(
				EditorContextKeys.writable,
				EditorContextKeys.hasCodeActionsProvider
			),
			kbOpts: {
				kbExpr: EditorContextKeys.textInputFocus,
				primary: 2048 /* KeyMod.CtrlCmd */ | 89 /* KeyCode.Period */,
				weight: 100 /* KeybindingWeight.EditorContrib */
			}
		});
	}
	run(_accessor, editor) {
		return triggerCodeActionsForEditorSelection(
			editor,
			nls.localize('editor.action.quickFix.noneMessage', 'No code actions available'),
			undefined,
			undefined,
			CodeActionTriggerSource.QuickFix
		);
	}
}
export class CodeActionCommand extends EditorCommand {
	constructor() {
		super({
			id: codeActionCommandId,
			precondition: ContextKeyExpr.and(
				EditorContextKeys.writable,
				EditorContextKeys.hasCodeActionsProvider
			),
			description: {
				description: 'Trigger a code action',
				args: [{ name: 'args', schema: argsSchema }]
			}
		});
	}
	runEditorCommand(_accessor, editor, userArgs) {
		const args = CodeActionCommandArgs.fromUser(userArgs, {
			kind: CodeActionKind.Empty,
			apply: 'ifSingle' /* CodeActionAutoApply.IfSingle */
		});
		return triggerCodeActionsForEditorSelection(
			editor,
			typeof (userArgs === null || userArgs === void 0 ? void 0 : userArgs.kind) === 'string'
				? args.preferred
					? nls.localize(
							'editor.action.codeAction.noneMessage.preferred.kind',
							"No preferred code actions for '{0}' available",
							userArgs.kind
					  )
					: nls.localize(
							'editor.action.codeAction.noneMessage.kind',
							"No code actions for '{0}' available",
							userArgs.kind
					  )
				: args.preferred
				? nls.localize(
						'editor.action.codeAction.noneMessage.preferred',
						'No preferred code actions available'
				  )
				: nls.localize('editor.action.codeAction.noneMessage', 'No code actions available'),
			{
				include: args.kind,
				includeSourceActions: true,
				onlyIncludePreferredActions: args.preferred
			},
			args.apply
		);
	}
}
export class RefactorAction extends EditorAction {
	constructor() {
		super({
			id: refactorCommandId,
			label: nls.localize('refactor.label', 'Refactor...'),
			alias: 'Refactor...',
			precondition: ContextKeyExpr.and(
				EditorContextKeys.writable,
				EditorContextKeys.hasCodeActionsProvider
			),
			kbOpts: {
				kbExpr: EditorContextKeys.textInputFocus,
				primary: 2048 /* KeyMod.CtrlCmd */ | 1024 /* KeyMod.Shift */ | 48 /* KeyCode.KeyR */,
				mac: {
					primary: 256 /* KeyMod.WinCtrl */ | 1024 /* KeyMod.Shift */ | 48 /* KeyCode.KeyR */
				},
				weight: 100 /* KeybindingWeight.EditorContrib */
			},
			contextMenuOpts: {
				group: '1_modification',
				order: 2,
				when: ContextKeyExpr.and(
					EditorContextKeys.writable,
					contextKeyForSupportedActions(CodeActionKind.Refactor)
				)
			},
			description: {
				description: 'Refactor...',
				args: [{ name: 'args', schema: argsSchema }]
			}
		});
	}
	run(_accessor, editor, userArgs) {
		const args = CodeActionCommandArgs.fromUser(userArgs, {
			kind: CodeActionKind.Refactor,
			apply: 'never' /* CodeActionAutoApply.Never */
		});
		return triggerCodeActionsForEditorSelection(
			editor,
			typeof (userArgs === null || userArgs === void 0 ? void 0 : userArgs.kind) === 'string'
				? args.preferred
					? nls.localize(
							'editor.action.refactor.noneMessage.preferred.kind',
							"No preferred refactorings for '{0}' available",
							userArgs.kind
					  )
					: nls.localize(
							'editor.action.refactor.noneMessage.kind',
							"No refactorings for '{0}' available",
							userArgs.kind
					  )
				: args.preferred
				? nls.localize(
						'editor.action.refactor.noneMessage.preferred',
						'No preferred refactorings available'
				  )
				: nls.localize('editor.action.refactor.noneMessage', 'No refactorings available'),
			{
				include: CodeActionKind.Refactor.contains(args.kind) ? args.kind : CodeActionKind.None,
				onlyIncludePreferredActions: args.preferred
			},
			args.apply,
			CodeActionTriggerSource.Refactor
		);
	}
}
export class SourceAction extends EditorAction {
	constructor() {
		super({
			id: sourceActionCommandId,
			label: nls.localize('source.label', 'Source Action...'),
			alias: 'Source Action...',
			precondition: ContextKeyExpr.and(
				EditorContextKeys.writable,
				EditorContextKeys.hasCodeActionsProvider
			),
			contextMenuOpts: {
				group: '1_modification',
				order: 2.1,
				when: ContextKeyExpr.and(
					EditorContextKeys.writable,
					contextKeyForSupportedActions(CodeActionKind.Source)
				)
			},
			description: {
				description: 'Source Action...',
				args: [{ name: 'args', schema: argsSchema }]
			}
		});
	}
	run(_accessor, editor, userArgs) {
		const args = CodeActionCommandArgs.fromUser(userArgs, {
			kind: CodeActionKind.Source,
			apply: 'never' /* CodeActionAutoApply.Never */
		});
		return triggerCodeActionsForEditorSelection(
			editor,
			typeof (userArgs === null || userArgs === void 0 ? void 0 : userArgs.kind) === 'string'
				? args.preferred
					? nls.localize(
							'editor.action.source.noneMessage.preferred.kind',
							"No preferred source actions for '{0}' available",
							userArgs.kind
					  )
					: nls.localize(
							'editor.action.source.noneMessage.kind',
							"No source actions for '{0}' available",
							userArgs.kind
					  )
				: args.preferred
				? nls.localize(
						'editor.action.source.noneMessage.preferred',
						'No preferred source actions available'
				  )
				: nls.localize('editor.action.source.noneMessage', 'No source actions available'),
			{
				include: CodeActionKind.Source.contains(args.kind) ? args.kind : CodeActionKind.None,
				includeSourceActions: true,
				onlyIncludePreferredActions: args.preferred
			},
			args.apply,
			CodeActionTriggerSource.SourceAction
		);
	}
}
export class OrganizeImportsAction extends EditorAction {
	constructor() {
		super({
			id: organizeImportsCommandId,
			label: nls.localize('organizeImports.label', 'Organize Imports'),
			alias: 'Organize Imports',
			precondition: ContextKeyExpr.and(
				EditorContextKeys.writable,
				contextKeyForSupportedActions(CodeActionKind.SourceOrganizeImports)
			),
			kbOpts: {
				kbExpr: EditorContextKeys.textInputFocus,
				primary: 1024 /* KeyMod.Shift */ | 512 /* KeyMod.Alt */ | 45 /* KeyCode.KeyO */,
				weight: 100 /* KeybindingWeight.EditorContrib */
			}
		});
	}
	run(_accessor, editor) {
		return triggerCodeActionsForEditorSelection(
			editor,
			nls.localize('editor.action.organize.noneMessage', 'No organize imports action available'),
			{ include: CodeActionKind.SourceOrganizeImports, includeSourceActions: true },
			'ifSingle' /* CodeActionAutoApply.IfSingle */,
			CodeActionTriggerSource.OrganizeImports
		);
	}
}
export class FixAllAction extends EditorAction {
	constructor() {
		super({
			id: fixAllCommandId,
			label: nls.localize('fixAll.label', 'Fix All'),
			alias: 'Fix All',
			precondition: ContextKeyExpr.and(
				EditorContextKeys.writable,
				contextKeyForSupportedActions(CodeActionKind.SourceFixAll)
			)
		});
	}
	run(_accessor, editor) {
		return triggerCodeActionsForEditorSelection(
			editor,
			nls.localize('fixAll.noneMessage', 'No fix all action available'),
			{ include: CodeActionKind.SourceFixAll, includeSourceActions: true },
			'ifSingle' /* CodeActionAutoApply.IfSingle */,
			CodeActionTriggerSource.FixAll
		);
	}
}
export class AutoFixAction extends EditorAction {
	constructor() {
		super({
			id: autoFixCommandId,
			label: nls.localize('autoFix.label', 'Auto Fix...'),
			alias: 'Auto Fix...',
			precondition: ContextKeyExpr.and(
				EditorContextKeys.writable,
				contextKeyForSupportedActions(CodeActionKind.QuickFix)
			),
			kbOpts: {
				kbExpr: EditorContextKeys.textInputFocus,
				primary: 512 /* KeyMod.Alt */ | 1024 /* KeyMod.Shift */ | 89 /* KeyCode.Period */,
				mac: {
					primary: 2048 /* KeyMod.CtrlCmd */ | 512 /* KeyMod.Alt */ | 89 /* KeyCode.Period */
				},
				weight: 100 /* KeybindingWeight.EditorContrib */
			}
		});
	}
	run(_accessor, editor) {
		return triggerCodeActionsForEditorSelection(
			editor,
			nls.localize('editor.action.autoFix.noneMessage', 'No auto fixes available'),
			{
				include: CodeActionKind.QuickFix,
				onlyIncludePreferredActions: true
			},
			'ifSingle' /* CodeActionAutoApply.IfSingle */,
			CodeActionTriggerSource.AutoFix
		);
	}
}
