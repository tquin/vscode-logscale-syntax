import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  updateGrammar(context);

  // If the user updates the config, prompt them to reload the window to apply it
  context.subscriptions.push(
    vscode.workspace.onDidChangeConfiguration((e) => {
      if (e.affectsConfiguration("logscale-syntax.yamlHighlightedKeys")) {
        updateGrammar(context);
        vscode.window
          .showInformationMessage(
            "Query keys updated. Reload window for changes to take effect.",
            "Reload"
          )
          .then((selection) => {
            if (selection === "Reload") {
              vscode.commands.executeCommand("workbench.action.reloadWindow");
            }
          });
      }
    })
  );
}

function updateGrammar(context: vscode.ExtensionContext) {
  const config = vscode.workspace.getConfiguration("logscale-syntax");
  const keys = config.get<string[]>("yamlHighlightedKeys", ["queryString"]);

  // Turn the array of keys ["queryString", "customKey"]
  // into a regex group (queryString|customKey)
  const keysPattern = keys
    // Escape special characters
    .map((key) => key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");

  // Read the template grammar
  const templatePath = path.join(
    context.extensionPath,
    "syntaxes",
    "yaml-injection-template.tmLanguage.json"
  );
  const template = JSON.parse(fs.readFileSync(templatePath, "utf8"));

  // Replace placeholder with actual keys
  let grammarJson = JSON.stringify(template, null, 2);
  grammarJson = grammarJson.replace(/\{\{QUERY_KEYS\}\}/g, keysPattern);

  // Write the generated grammar
  const outputPath = path.join(
    context.extensionPath,
    "syntaxes",
    "yaml-injection.tmLanguage.json"
  );
  fs.writeFileSync(outputPath, grammarJson);
}

export function deactivate() {}
