import { VFile } from 'vfile';
import * as vscode from 'vscode';
import { formatFromString } from '@quilicicf/markdown-formatter';

export function activate () {
  vscode.languages.registerDocumentFormattingEditProvider('markdown', {
    async provideDocumentFormattingEdits (document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
      const fullText = document.getText();
      const virtualFile: VFile = await formatFromString(fullText);
      const newText: string = virtualFile.value as string;
      const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
      return [ vscode.TextEdit.replace(fullRange, newText) ];
    },
  });
}
