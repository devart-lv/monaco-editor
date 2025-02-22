/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './linesDecorations.css';
import { DecorationToRender, DedupOverlay } from '../glyphMargin/glyphMargin.js';
export class LinesDecorationsOverlay extends DedupOverlay {
	constructor(context) {
		super();
		this._context = context;
		const options = this._context.configuration.options;
		const layoutInfo = options.get(139 /* EditorOption.layoutInfo */);
		this._decorationsLeft = layoutInfo.decorationsLeft;
		this._decorationsWidth = layoutInfo.decorationsWidth;
		this._renderResult = null;
		this._context.addEventHandler(this);
	}
	dispose() {
		this._context.removeEventHandler(this);
		this._renderResult = null;
		super.dispose();
	}
	// --- begin event handlers
	onConfigurationChanged(e) {
		const options = this._context.configuration.options;
		const layoutInfo = options.get(139 /* EditorOption.layoutInfo */);
		this._decorationsLeft = layoutInfo.decorationsLeft;
		this._decorationsWidth = layoutInfo.decorationsWidth;
		return true;
	}
	onDecorationsChanged(e) {
		return true;
	}
	onFlushed(e) {
		return true;
	}
	onLinesChanged(e) {
		return true;
	}
	onLinesDeleted(e) {
		return true;
	}
	onLinesInserted(e) {
		return true;
	}
	onScrollChanged(e) {
		return e.scrollTopChanged;
	}
	onZonesChanged(e) {
		return true;
	}
	// --- end event handlers
	_getDecorations(ctx) {
		const decorations = ctx.getDecorationsInViewport();
		const r = [];
		let rLen = 0;
		for (let i = 0, len = decorations.length; i < len; i++) {
			const d = decorations[i];
			const linesDecorationsClassName = d.options.linesDecorationsClassName;
			const zIndex = d.options.zIndex;
			if (linesDecorationsClassName) {
				r[rLen++] = new DecorationToRender(
					d.range.startLineNumber,
					d.range.endLineNumber,
					linesDecorationsClassName,
					zIndex
				);
			}
			const firstLineDecorationClassName = d.options.firstLineDecorationClassName;
			if (firstLineDecorationClassName) {
				r[rLen++] = new DecorationToRender(
					d.range.startLineNumber,
					d.range.startLineNumber,
					firstLineDecorationClassName,
					zIndex
				);
			}
		}
		return r;
	}
	prepareRender(ctx) {
		const visibleStartLineNumber = ctx.visibleRange.startLineNumber;
		const visibleEndLineNumber = ctx.visibleRange.endLineNumber;
		const toRender = this._render(
			visibleStartLineNumber,
			visibleEndLineNumber,
			this._getDecorations(ctx),
			1
		);
		const left = this._decorationsLeft.toString();
		const width = this._decorationsWidth.toString();
		const common = '" style="left:' + left + 'px;width:' + width + 'px;"></div>';
		const output = [];
		for (
			let lineNumber = visibleStartLineNumber;
			lineNumber <= visibleEndLineNumber;
			lineNumber++
		) {
			const lineIndex = lineNumber - visibleStartLineNumber;
			const decorations = toRender[lineIndex].getLaneDecorations(1); // there is only one lane, see _render call above
			let lineOutput = '';
			for (const decoration of decorations) {
				lineOutput += '<div class="cldr ' + decoration.className + common;
			}
			output[lineIndex] = lineOutput;
		}
		this._renderResult = output;
	}
	render(startLineNumber, lineNumber) {
		if (!this._renderResult) {
			return '';
		}
		return this._renderResult[lineNumber - startLineNumber];
	}
}
