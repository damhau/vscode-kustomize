import { exec } from 'child_process';
import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('kustomizeAddResource.add', async (uri: vscode.Uri) => {
		const fullPath = uri.fsPath;
		const fileName = path.basename(fullPath);
		const dirPath = path.dirname(fullPath);

		exec(`kustomize edit add resource "${fileName}"`, { cwd: dirPath }, (error, stdout, stderr) => {
			if (error) {
				vscode.window.showErrorMessage(`Error: ${stderr || error.message}`);
				return;
			}
			vscode.window.setStatusBarMessage(`Resource added: ${fileName}`, 3000);
		});
	});

	context.subscriptions.push(disposable);
}
