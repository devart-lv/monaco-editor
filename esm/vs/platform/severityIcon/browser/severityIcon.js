/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import './media/severityIcon.css';
import { Codicon } from '../../../base/common/codicons.js';
import { ThemeIcon } from '../../../base/common/themables.js';
import Severity from '../../../base/common/severity.js';
export var SeverityIcon;
(function (SeverityIcon) {
	function className(severity) {
		switch (severity) {
			case Severity.Ignore:
				return 'severity-ignore ' + ThemeIcon.asClassName(Codicon.info);
			case Severity.Info:
				return ThemeIcon.asClassName(Codicon.info);
			case Severity.Warning:
				return ThemeIcon.asClassName(Codicon.warning);
			case Severity.Error:
				return ThemeIcon.asClassName(Codicon.error);
			default:
				return '';
		}
	}
	SeverityIcon.className = className;
})(SeverityIcon || (SeverityIcon = {}));
