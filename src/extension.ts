import * as vscode from 'vscode';
import {formatFromString} from '@quilicicf/markdown-formatter';

export function activate(context: vscode.ExtensionContext) {
    vscode.languages.registerDocumentFormattingEditProvider('markdown', {
        provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
            const fullText = document.getText();
            return formatFromString(fullText)
                .then(({contents: newText}) => {
                    const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
                    return [vscode.TextEdit.replace(fullRange, newText)];
                });
        }
    });
}
