import Image from 'next/image'
import { showcaseCode } from './showcase-data'
import { ThemeShowcase } from './theme-showcase'

const platforms = [
  ['VS Code', 'Two complete workbench and syntax themes', 'themes'],
  ['Cursor', 'Install the same extension from a VSIX', 'themes'],
  ['Zed', 'Native theme family with integrated terminal colors', 'ports/zed'],
  ['Sublime Text', 'Complete dark and light color schemes', 'ports/sublime-text'],
  ['Helix', 'Native editor and tree-sitter theme files', 'ports/helix'],
  ['Ghostty', 'Native light and dark theme files', 'ports/ghostty'],
  ['Kitty', 'Drop-in terminal configuration', 'ports/kitty'],
  ['Alacritty', 'Modern TOML color imports', 'ports/alacritty'],
  ['Warp', 'Custom YAML themes', 'ports/warp'],
  ['WezTerm', 'A ready-to-require Lua module', 'ports/wezterm'],
  ['iTerm2', 'Importable macOS color presets', 'ports/iterm2'],
  ['Windows Terminal', 'Importable color schemes', 'ports/windows-terminal'],
  ['Gemini CLI', 'Native dark and light AI harness themes', 'ports/gemini-cli'],
  ['OpenCode', 'A native adaptive AI harness theme', 'ports/opencode'],
  ['Chrome', 'Browser chrome with matching DevTools', 'ports/chrome'],
  ['Base16', 'Universal palettes for dozens more tools', 'ports/base16'],
]

export default function Home() {
  return (
    <main>
      <nav className="nav shell" aria-label="Primary navigation">
        <a className="brand" href="#top" aria-label="Angrboða home">
          <Image src="/angrboda-mark-v3.svg" alt="" width={34} height={34} />
          <span>Angrboða</span>
        </a>
        <div className="nav-links">
          <a href="#install">Install</a>
          <a href="#palette">Palette</a>
          <a href="#everywhere">Everywhere</a>
          <a href="https://github.com/loke-dev/Angrboda">GitHub</a>
        </div>
      </nav>

      <section className="hero shell" id="top">
        <div className="eyebrow">
          <span />A theme system for focused work
        </div>
        <h1>
          Color for the <em>bright</em>
          <br />
          and the <strong>buried.</strong>
        </h1>
        <p className="hero-copy">
          Angrboða is a carefully balanced red and violet theme for editors, terminals, browsers, and AI coding
          tools—with dark and light modes built from one accessible palette.
        </p>
        <div className="hero-actions">
          <a
            className="button primary"
            href="https://marketplace.visualstudio.com/items?itemName=carlssonloke.angrboda"
          >
            Install for VS Code
            <span aria-hidden="true">↗</span>
          </a>
          <a className="button secondary" href="#everywhere">
            Explore every port
          </a>
          <a className="text-link" href="https://github.com/loke-dev/Angrboda/releases/latest">
            Download the complete bundle <span aria-hidden="true">↓</span>
          </a>
        </div>

        <ThemeShowcase code={showcaseCode} />
      </section>

      <section className="manifesto shell">
        <p>
          Named for the giantess of the Ironwood, Angrboða pairs an ember-red pulse with spectral violet. It is
          expressive without shouting and calm without disappearing.
        </p>
        <span>Designed in Stockholm · Open source forever</span>
      </section>

      <section className="palette-section" id="palette">
        <div className="shell">
          <div className="section-heading">
            <div>
              <span className="kicker">One palette · two worlds</span>
              <h2>Contrast you can feel.</h2>
            </div>
            <p>
              Text colors are opaque and measured. Transparency is reserved for selections and surfaces, where it
              belongs.
            </p>
          </div>
          <div className="palette-grid" aria-label="Angrboða color palette">
            {[
              ['Ember', '#FF718A', 'red'],
              ['Seiðr', '#D6A4FF', 'violet'],
              ['Ironwood', '#141216', 'ink'],
              ['Mist', '#F5EFF8', 'mist'],
              ['Moss', '#78C98D', 'green'],
              ['Sky', '#78B9F2', 'blue'],
            ].map(([name, hex, className]) => (
              <div className={`swatch ${className}`} key={name}>
                <span>{name}</span>
                <code>{hex}</code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="platforms shell" id="everywhere">
        <div className="section-heading">
          <div>
            <span className="kicker">From editor to agent</span>
            <h2>Keep your atmosphere.</h2>
          </div>
          <p>
            Every port is generated from the same typed palette, so fixes and refinements travel across the whole
            system.
          </p>
        </div>
        <div className="platform-grid">
          {platforms.map(([name, description, path], index) => (
            <article key={name}>
              <span className="platform-number">{String(index + 1).padStart(2, '0')}</span>
              <h3>{name}</h3>
              <p>{description}</p>
              <a href={`https://github.com/loke-dev/Angrboda/tree/master/${path}`} aria-label={`Get the ${name} theme`}>
                Get theme <span aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="installer-section shell" id="install">
        <div className="installer-copy">
          <span className="kicker">One bundle · eight direct installs</span>
          <h2>Skip the config scavenger hunt.</h2>
          <p>
            Install directly with npx—no cloning, global package, or config scavenger hunt. Preview every change first;
            existing files are protected and forced replacements are backed up.
          </p>
        </div>
        <div className="command-card" aria-label="Angrboða installer commands">
          <div className="command-bar">
            <div className="traffic-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <span>angrboda / install</span>
          </div>
          <pre>
            <code>
              <span>$</span> npx angrboda list{'\n'}
              <span>$</span> npx angrboda zed --dry-run{'\n'}
              <span>$</span> npx angrboda zed
            </code>
          </pre>
          <p>Alacritty · Gemini CLI · Ghostty · Helix · Kitty · OpenCode · WezTerm · Zed</p>
        </div>
      </section>

      <section className="cta">
        <div className="shell cta-inner">
          <Image src="/angrboda-mark-v3.svg" alt="" width={110} height={110} />
          <div>
            <span className="kicker">MIT licensed · community shaped</span>
            <h2>Bring the Ironwood with you.</h2>
          </div>
          <a className="button primary" href="https://github.com/loke-dev/Angrboda/releases/latest">
            Download every port <span aria-hidden="true">↓</span>
          </a>
        </div>
      </section>

      <footer className="shell">
        <a className="brand" href="#top">
          <Image src="/angrboda-mark-v3.svg" alt="" width={34} height={34} />
          <span>Angrboða</span>
        </a>
        <p>Made by Loke · Built for long sessions.</p>
        <div>
          <a href="https://github.com/loke-dev/Angrboda/blob/master/LICENSE">MIT License</a>
          <a href="https://github.com/loke-dev/Angrboda/issues">Issues</a>
        </div>
      </footer>
    </main>
  )
}
