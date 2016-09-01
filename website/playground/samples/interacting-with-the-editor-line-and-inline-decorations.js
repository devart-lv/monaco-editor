// This is a generated file. Please do not edit directly.
var SAMPLES = this.SAMPLES || [];
SAMPLES.push({"id":"interacting-with-the-editor-line-and-inline-decorations","js":"//---------------------------------------------------\n// Interacting with the editor > Line and Inline decorations\n//---------------------------------------------------\n\nvar jsCode = [\n\t'\"use strict\";',\n\t'function Person(age) {',\n\t'\tif (age) {',\n\t'\t\tthis.age = age;',\n\t'\t}',\n\t'}',\n\t'Person.prototype.getAge = function () {',\n\t'\treturn this.age;',\n\t'};'\n].join('\\n');\n\nvar editor = monaco.editor.create(document.getElementById(\"container\"), {\n\tvalue: jsCode,\n\tlanguage: \"javascript\"\n});\n\nvar decorations = editor.deltaDecorations([], [\n\t{ range: new monaco.Range(3,1,5,1), options: { isWholeLine: true, linesDecorationsClassName: 'myLineDecoration' }},\n\t{ range: new monaco.Range(7,1,7,24), options: { inlineClassName: 'myInlineDecoration' }},\n]);\n","html":"<div id=\"container\" style=\"height:100%;\"></div>\n","css":".myInlineDecoration {\n\tcolor: red !important;\n\tcursor: pointer;\n\ttext-decoration: underline;\n\tfont-weight: bold;\n\tfont-style: oblique;\n}\n.myLineDecoration {\n\tbackground: lightblue;\n\twidth: 5px !important;\n\tleft: 3px;\n}\n"});