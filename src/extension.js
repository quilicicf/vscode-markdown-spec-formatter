const vscode = require('vscode');

module.exports = {
  activate (context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Active!');

    context.subscriptions.push();
  },

  // this method is called when your extension is deactivated
  deactivate () {},
};
