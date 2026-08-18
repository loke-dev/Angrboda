# Changelog

## 2.0.0

- Restored the original red and violet syntax colouring. The generator rewrite
  had quietly re-coloured 41 of 89 syntax scopes, inventing cyan for storage,
  operators, properties and constants, moving numbers to orange and regex to
  yellow. Operators, storage, literals and regex are red again, keywords, names,
  properties and types are violet, and numbers, constants and identifiers stay
  neutral. Updating from 1.8.x visibly changes your editor.
- Restored translucent comments and punctuation, at the original alpha per mode.
- Added native dark and light themes for Claude Code, installable with
  `npx angrboda claude`.
- Aligned the Zed, OpenCode, Sublime Text, Codex and Helix ports with the same
  syntax roles, so no port contradicts the editor theme. ANSI slots are
  unchanged, since terminals still need a cyan.
- Fixed the website mockup misrepresenting the theme: it painted property access
  and `const` in colours the editor never produced. Both are now pinned to the
  generated theme, along with the palette, so the demo cannot drift again.
- Fixed the light theme painting bracket highlights white on white.

## 1.8.1

- Fixed horizontal page overflow at mobile widths.
- Added npm Trusted Publishing through GitHub Actions with short-lived OIDC
  credentials and automatic provenance.
- Normalized npm executable and repository metadata.

## 1.8.0

- Added dependency-free installation through `npx angrboda`.
- Added npm package-content validation so installer themes cannot be omitted
  from a release.
- Added optional npm publishing to the tagged release workflow.

## 1.7.0

- Added native dark and light custom themes for Gemini CLI.
- Added safe Gemini CLI installation to the cross-tool installer.
- Expanded AI-harness guidance and public site coverage.

## 1.6.0

- Replaced the rough editor crop with polished, mode-matched dark and light
  screenshots.
- Added a deterministic website capture surface so marketing previews can be
  reproduced without manual cropping.
- Added a dependency-free installer for Alacritty, Ghostty, Helix, Kitty,
  OpenCode, WezTerm, and Zed.
- Added dry runs, conflict refusal, recoverable forced replacements, and
  installer regression tests.

## 1.5.2

- Restored the selected angular A mark with its pale and violet beams and coral
  ember across the extension, website, favicon, and social artwork.
- Removed the circular Ironwood mark from every active brand surface.

## 1.5.1

- Fixed ANSI black being indistinguishable from the terminal background in both
  dark and light modes.
- Added WCAG AA contrast validation for every normal and bright ANSI color.
- Regenerated all terminal-aware ports from the corrected canonical palette.

## 1.5.0

- Added generated Zed, Sublime Text, Helix, iTerm2, and Base16 ports.
- Added a checksummed cross-tool ZIP bundle to builds and GitHub releases.
- Replaced the original angular letterform with the crafted Ironwood-and-ember
  brand mark across the extension, website, favicon, and social artwork.
- Expanded format validation, installation guidance, and AI harness support
  documentation.

## 1.4.0

- Rebuilt the dark and light palette around accessible opaque text colors.
- Expanded syntax roles for numbers, types, properties, regex, diagnostics, and
  source-control states.
- Added generated ports for Ghostty, Kitty, Alacritty, Warp, WezTerm, Windows
  Terminal, OpenCode, and Chrome.
- Modernized the TypeScript toolchain and added palette/output validation.
- Added automated VSIX packaging and optional registry publishing.
- Introduced a new logo, marketing screenshots, and dedicated website.
