"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var vscode = require("vscode");
var markdown_formatter_1 = require("@quilicicf/markdown-formatter");
function activate(context) {
    vscode.languages.registerDocumentFormattingEditProvider('markdown', {
        provideDocumentFormattingEdits: function (document) {
            var fullText = document.getText();
            return markdown_formatter_1.formatFromString(fullText)
                .then(function (_a) {
                var newText = _a.contents;
                console.log('New text: ', newText);
                var fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
                return [vscode.TextEdit.replace(fullRange, newText)];
            });
        }
    });
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map