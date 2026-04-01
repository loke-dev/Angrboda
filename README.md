<h1 align="center">Angrboða</h1>

<p align="center">
  <img alt="Logo" src="https://github.com/user-attachments/assets/5b89e445-6397-49a3-936b-468bfb306548" width="200">
</p>

<p align="center">
  <a href="https://github.com/lokecarlsson/Angrboda/releases/latest">
    <img alt="GitHub release" src="https://img.shields.io/github/v/release/lokecarlsson/Angrboda?style=for-the-badge&labelColor=1e1e2e&color=f4b8e4">
  </a>
  <a href="https://github.com/lokecarlsson/Angrboda/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/lokecarlsson/Angrboda?style=for-the-badge&labelColor=1e1e2e&color=f4b8e4">
  </a>
</p>

<p align="center">
  <strong>A dark and light theme for long coding sessions — built for VS Code and Cursor.</strong>
</p>

<p align="center">
  Inspired by the giantess from Norse mythology, this theme brings a touch of myth and magic to your editor. Pick the shadowy dark variant or the crisp light variant; both are tuned for readability.
</p>

<p align="center">
<img alt="Preview" src="https://user-images.githubusercontent.com/14079937/110474445-f4ea7300-80df-11eb-88d3-db2bb57ac7e9.png">
</p>

## Installation

Releases ship as a **`.vsix`** file attached to each [GitHub Release](https://github.com/lokecarlsson/Angrboda/releases).

1. Open the **latest release** and download **`angrboda-&lt;version&gt;.vsix`**.
2. In **Cursor** or **VS Code**: open the **Extensions** view → **⋯** menu → **Install from VSIX…** (or run the “Install from VSIX” command in the palette).
3. Choose the downloaded file. Reload the window if prompted.
4. Run **Preferences: Color Theme** and select **Angrboða Light** or **Angrboða Dark**.

## Releasing (maintainers)

1. Run **`npm run release`** — [bumpp](https://github.com/antfu/bumpp) updates `package.json`, commits, creates tag `v*`, and pushes.
2. On GitHub, open **Releases** → **Draft a new release** → select that tag → **Publish release**.  
   Alternatively: `gh release create vX.Y.Z --verify-tag --generate-notes`
3. GitHub Actions attaches the built **`.vsix`** to that release automatically.

## Thanks

Based on the excellent [vscode-theme-vitesse](https://github.com/antfu/vscode-theme-vitesse) by Anthony Fu.

## License

[MIT](LICENSE).
