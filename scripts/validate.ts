import assert from 'node:assert/strict'
import { promises as fs } from 'node:fs'
import { ansiPalette, brightAnsiPalette, palette } from '../src/colors'

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
  for (const key of [
    'foreground',
    'muted',
    'terminalBlack',
    'red',
    'violet',
    'green',
    'blue',
    'cyan',
    'orange',
  ] as const) {
    assert.ok(
      contrast(palette[key][mode], background) >= 4.5,
      `${key} must meet WCAG AA contrast in ${mode === 0 ? 'dark' : 'light'} mode`,
    )
  }

  for (const [index, pair] of [...ansiPalette, ...brightAnsiPalette].entries()) {
    assert.ok(
      contrast(pair[mode], background) >= 4.5,
      `ANSI color ${index} must meet WCAG AA contrast in ${mode === 0 ? 'dark' : 'light'} mode`,
    )
  }
}

const requiredFiles = [
  'themes/angrboda-dark-color-theme.json',
  'themes/angrboda-light-color-theme.json',
  'install.mjs',
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

const brandMark = await fs.readFile('assets/logo-mark.svg', 'utf8')
assert.match(brandMark, /An angular A formed by pale and violet beams above a coral ember/)
assert.doesNotMatch(brandMark, /Ironwood branches|stroke-linecap/)
for (const path of [
  'website/public/logo.svg',
  'website/public/favicon.svg',
  'website/public/ironwood-mark-v2.svg',
  'website/public/ironwood-favicon-v2.svg',
  'website/public/angrboda-mark-v3.svg',
  'website/public/angrboda-favicon-v3.svg',
]) {
  assert.equal(await fs.readFile(path, 'utf8'), brandMark, `${path} must use the canonical Angrboða mark`)
}

const socialCard = await fs.readFile('assets/marketing/angrboda-social-card.png')
for (const path of [
  'website/public/og.png',
  'website/public/angrboda-social-v2.png',
  'website/public/angrboda-social-v3.png',
]) {
  assert.deepEqual(await fs.readFile(path), socialCard, `${path} must use the canonical Angrboða social artwork`)
}

for (const path of ['assets/screenshots/editor-preview.png', 'assets/screenshots/editor-preview-light.png']) {
  const screenshot = await fs.readFile(path)
  assert.deepEqual(
    screenshot.subarray(0, 8),
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    `${path} must be a real PNG`,
  )
  assert.equal(screenshot.readUInt32BE(16), 1280, `${path} must be 1280 px wide`)
  assert.equal(screenshot.readUInt32BE(20), 720, `${path} must be 720 px high`)
}

JSON.parse(await fs.readFile('themes/angrboda-dark-color-theme.json', 'utf8'))
JSON.parse(await fs.readFile('themes/angrboda-light-color-theme.json', 'utf8'))
JSON.parse(await fs.readFile('ports/chrome/manifest.json', 'utf8'))
JSON.parse(await fs.readFile('ports/opencode/angrboda.json', 'utf8'))
const windowsTerminal = JSON.parse(await fs.readFile('ports/windows-terminal/angrboda.json', 'utf8')) as {
  schemes: Array<{ background: string; black: string; brightBlack: string }>
}
assert.equal(windowsTerminal.schemes.length, 2)
for (const scheme of windowsTerminal.schemes) {
  assert.notEqual(scheme.black, scheme.background)
  assert.ok(contrast(scheme.black, scheme.background) >= 4.5)
  assert.ok(contrast(scheme.brightBlack, scheme.background) >= 4.5)
}

const zed = JSON.parse(await fs.readFile('ports/zed/angrboda.json', 'utf8')) as {
  $schema: string
  themes: Array<{ appearance: string; style: Record<string, unknown> & { 'terminal.background': string } }>
}
assert.equal(zed.$schema, 'https://zed.dev/schema/themes/v0.2.0.json')
assert.deepEqual(
  zed.themes.map(({ appearance }) => appearance),
  ['dark', 'light'],
)
for (const theme of zed.themes) {
  assert.ok(theme.style.syntax)
  assert.ok(theme.style['terminal.ansi.bright_white'])
  const terminalBackground = theme.style['terminal.background']
  for (const key of ['terminal.ansi.black', 'terminal.ansi.bright_black'] as const) {
    const terminalColor = theme.style[key]
    assert.ok(typeof terminalColor === 'string')
    assert.notEqual(terminalColor, terminalBackground)
    assert.ok(contrast(terminalColor, terminalBackground) >= 4.5)
  }
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
