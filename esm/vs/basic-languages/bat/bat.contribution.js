/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.38.0(0e330ae453813de4e6cf272460fb79c7117073d0)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/bat/bat.contribution.ts
import { registerLanguage } from '../_.contribution.js';
registerLanguage({
	id: 'bat',
	extensions: ['.bat', '.cmd'],
	aliases: ['Batch', 'bat'],
	loader: () => {
		if (false) {
			return new Promise((resolve, reject) => {
				__require(['vs/basic-languages/bat/bat'], resolve, reject);
			});
		} else {
			return import('./bat.js');
		}
	}
});
