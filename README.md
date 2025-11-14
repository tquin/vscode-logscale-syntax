# logscale-syntax

A VS Code extension for LogScale/CrowdStrike Query Language (formerly Humio) syntax highlighting. [Get it here for VS Code](https://marketplace.visualstudio.com/items?itemName=tquin.logscale-syntax), or [here for VSCodium.](https://open-vsx.org/extension/tquin/logscale-syntax)

## Features

- Syntax highlighting for `.logscale`, `.cql`, `.lql`, or `.humio` files. Plain and simple.
- Syntax highlighting for embedded queries within `.yaml` files using the alerts schema
- Full language functions support up to LogScale version 1.159.1.

## Configuration

### YAML Highlighted Keys
By default, the extension will apply syntax highlighting to text under `queryString` inside YAML files, which is the key used by LogScale packages.

You can customise this if you want to apply highlighting to other keys, such as `script` for parser files. To change this, either:
- go to `Preferences: Open User Settings -> Extensions -> LogScale Syntax Highlighting -> YAML Highlighted Keys` and click `Add Item`.
- or in `settings.json`, configure `logscale-syntax.yamlHighlightedKeys` as a list.

## Demo

Syntax highlighting:

![screenshot_files](images/demo_dark_modern_v2.png)

Embedded within yaml:

![screenshot_alert](images/demo_alerts_dark_modern.png)

## Development

To test the extension, either use the `F5` shortcut or `Debug: Start Debugging` from the Command Palette to launch an instance with the extension loaded.
