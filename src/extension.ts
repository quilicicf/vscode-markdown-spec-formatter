// Objects
import formatFromString from '@quilicicf/markdown-formatter/lib/formatFromString.js';

// Types
import { VFile } from 'vfile';
// eslint-disable-next-line import/no-unresolved
import * as vscode from 'vscode';
import { MarkdownFormatterOptions, RemarkStringifyOptions } from '@quilicicf/markdown-formatter';

interface PluginOptions {
  markdownFormatterOptions?: MarkdownFormatterOptions,
  stringifyOptions?: RemarkStringifyOptions,
}

function loadSettings (): PluginOptions {
  return vscode.workspace.getConfiguration('markdown-spec-formatter') as PluginOptions;
}

// eslint-disable-next-line import/prefer-default-export
export function activate () {
  vscode.languages.registerDocumentFormattingEditProvider('markdown', {
    async provideDocumentFormattingEdits (document: vscode.TextDocument): Promise<vscode.TextEdit[]> {
      const settings: PluginOptions = loadSettings();
      const fullText = document.getText();
      const virtualFile: VFile = await formatFromString(
        fullText,
        settings.markdownFormatterOptions || {}, settings.stringifyOptions || {},
      );
      const newText: string = virtualFile.value as string;
      const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(fullText.length));
      return [ vscode.TextEdit.replace(fullRange, newText) ];
    },
  });
}
