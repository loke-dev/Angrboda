# Contributing to Angrboða

Angrboða is generated from one typed palette. Change the source in `src/`, not
the generated files in `themes/` or `ports/`.

## Local workflow

1. Install Node.js 22 or newer and run `npm ci`.
2. Run `npm run dev` while adjusting the palette or theme mappings.
3. Run `npm run check` before opening a change.
4. Test the VS Code extension with `F5`, or build a local package with
   `npm run package:vsix`.

Palette changes must retain WCAG AA contrast for ordinary text in both modes.
The validation script enforces the core pairs; visual testing should still cover
selections, diffs, diagnostics, and several languages.
