/*!-----------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.38.0(0e330ae453813de4e6cf272460fb79c7117073d0)
 * Released under the MIT license
 * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
 *-----------------------------------------------------------------------------*/

// src/basic-languages/msdax/msdax.contribution.ts
import { registerLanguage } from '../_.contribution.js';
registerLanguage({
	id: 'msdax',
	extensions: ['.dax', '.msdax'],
	aliases: ['DAX', 'MSDAX'],
	loader: () => {
		if (false) {
			return new Promise((resolve, reject) => {
				__require(['vs/basic-languages/msdax/msdax'], resolve, reject);
			});
		} else {
			return import('./msdax.js');
		}
	}
});
