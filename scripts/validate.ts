import assert from 'node:assert/strict'
import { promises as fs } from 'node:fs'
import { palette } from '../src/colors'

type Rgb = readonly [number, number, number]

const rgb = (hex: string): Rgb => [
  Number.parseInt(hex.slice(1, 3), 16),
  Number.parseInt(hex.slice(3, 5), 16),
  Number.parseInt(hex.slice(5, 7), 16),
]

const luminance = ([r, g, b]: Rgb) => {
  const channel = (value: number) => {
    const normalized = value / 255
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

const contrast = (a: string, b: string) => {
  const [lighter, darker] = [luminance(rgb(a)), luminance(rgb(b))].sort((x, y) => y - x)
  assert.ok(lighter !== undefined && darker !== undefined)
  return (lighter + 0.05) / (darker + 0.05)
}

for (const mode of [0, 1] as const) {
  const background = palette.background[mode]
  for (const key of ['foreground', 'muted', 'red', 'violet', 'green', 'blue', 'cyan', 'orange'] as const) {
    assert.ok(
      contrast(palette[key][mode], background) >= 4.5,
      `${key} must meet WCAG AA contrast in ${mode === 0 ? 'dark' : 'light'} mode`,
    )
  }
}

const requiredFiles = [
  'themes/angrboda-dark-color-theme.json',
  'themes/angrboda-light-color-theme.json',
  'ports/alacritty/angrboda-dark.toml',
  'ports/alacritty/angrboda-light.toml',
  'ports/base16/angrboda-dark.yaml',
  'ports/base16/angrboda-light.yaml',
  'ports/chrome/manifest.json',
  'ports/ghostty/Angrboda Dark',
  'ports/ghostty/Angrboda Light',
  'ports/helix/angrboda-dark.toml',
  'ports/helix/angrboda-light.toml',
  'ports/iterm2/Angrboda Dark.itermcolors',
  'ports/iterm2/Angrboda Light.itermcolors',
  'ports/kitty/angrboda-dark.conf',
  'ports/kitty/angrboda-light.conf',
  'ports/opencode/angrboda.json',
  'ports/sublime-text/Angrboda Dark.sublime-color-scheme',
  'ports/sublime-text/Angrboda Light.sublime-color-scheme',
  'ports/warp/angrboda-dark.yaml',
  'ports/warp/angrboda-light.yaml',
  'ports/wezterm/angrboda.lua',
  'ports/windows-terminal/angrboda.json',
  'ports/zed/angrboda.json',
]

await Promise.all(
  requiredFiles.map(async (path) => {
    const stat = await fs.stat(path)
    assert.ok(stat.size > 50, `${path} should be generated and non-empty`)
  }),
)

JSON.parse(await fs.readFile('themes/angrboda-dark-color-theme.json', 'utf8'))
JSON.parse(await fs.readFile('themes/angrboda-light-color-theme.json', 'utf8'))
JSON.parse(await fs.readFile('ports/chrome/manifest.json', 'utf8'))
JSON.parse(await fs.readFile('ports/opencode/angrboda.json', 'utf8'))
JSON.parse(await fs.readFile('ports/windows-terminal/angrboda.json', 'utf8'))
const zed = JSON.parse(await fs.readFile('ports/zed/angrboda.json', 'utf8')) as {
  $schema: string
  themes: Array<{ appearance: string; style: Record<string, unknown> }>
}
assert.equal(zed.$schema, 'https://zed.dev/schema/themes/v0.2.0.json')
assert.deepEqual(
  zed.themes.map(({ appearance }) => appearance),
  ['dark', 'light'],
)
for (const theme of zed.themes) {
  assert.ok(theme.style.syntax)
  assert.ok(theme.style['terminal.ansi.bright_white'])
}

for (const mode of ['Dark', 'Light']) {
  const sublimeSource = await fs.readFile(`ports/sublime-text/Angrboda ${mode}.sublime-color-scheme`, 'utf8')
  const sublime = JSON.parse(sublimeSource.replace(/,\s*([}\]])/g, '$1')) as {
    globals: Record<string, string>
    rules: unknown[]
  }
  assert.ok(sublime.globals.background)
  assert.ok(sublime.rules.length >= 10)

  const iTerm = await fs.readFile(`ports/iterm2/Angrboda ${mode}.itermcolors`, 'utf8')
  assert.match(iTerm, /^<\?xml version="1\.0"/)
  assert.match(iTerm, /<plist version="1\.0">/)
  assert.equal(iTerm.match(/<key>Ansi \d+ Color<\/key>/g)?.length, 16)
}

for (const mode of ['dark', 'light']) {
  const helix = await fs.readFile(`ports/helix/angrboda-${mode}.toml`, 'utf8')
  assert.match(helix, /\[palette\]/)
  assert.match(helix, /"ui\.background"/)

  const base16 = await fs.readFile(`ports/base16/angrboda-${mode}.yaml`, 'utf8')
  assert.equal(base16.match(/  base[0-9A-F]{2}: ['"]#[0-9A-F]{6}['"]/g)?.length, 16)
}

console.log('Validated palette contrast and generated theme formats.')
