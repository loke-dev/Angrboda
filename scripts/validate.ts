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
  'ports/chrome/manifest.json',
  'ports/ghostty/Angrboda Dark',
  'ports/kitty/angrboda-dark.conf',
  'ports/opencode/angrboda.json',
  'ports/warp/angrboda-dark.yaml',
  'ports/wezterm/angrboda.lua',
  'ports/windows-terminal/angrboda.json',
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

console.log('Validated palette contrast and generated theme formats.')
