import { promises as fs } from 'node:fs'
import { format, resolveConfig } from 'prettier'
import { palette } from './colors'

type Mode = 'dark' | 'light'
type PaletteKey = keyof typeof palette

const index = (mode: Mode) => (mode === 'dark' ? 0 : 1)
const color = (key: PaletteKey, mode: Mode) => palette[key][index(mode)]
const bare = (value: string) => value.slice(1)

const ansiKeys = ['background', 'red', 'green', 'yellow', 'blue', 'violet', 'cyan', 'foreground'] as const

const ansi = (mode: Mode) => ansiKeys.map((key) => color(key, mode))
const brightAnsi = (mode: Mode) => [
  color('subtle', mode),
  color('red', mode),
  color('green', mode),
  color('yellow', mode),
  color('blue', mode),
  color('violet', mode),
  color('cyan', mode),
  color('foreground', mode),
]

function ghostty(mode: Mode) {
  return [
    `# Angrboða ${mode[0]?.toUpperCase()}${mode.slice(1)}`,
    `background = ${color('background', mode)}`,
    `foreground = ${color('foreground', mode)}`,
    `cursor-color = ${color('red', mode)}`,
    `cursor-text = ${color('background', mode)}`,
    `selection-background = ${color('surfaceRaised', mode)}`,
    `selection-foreground = ${color('foreground', mode)}`,
    ...[...ansi(mode), ...brightAnsi(mode)].map((value, i) => `palette = ${i}=${value}`),
    '',
  ].join('\n')
}

function kitty(mode: Mode) {
  const normal = ansi(mode)
  const bright = brightAnsi(mode)
  return [
    `# Angrboða ${mode}`,
    `background ${color('background', mode)}`,
    `foreground ${color('foreground', mode)}`,
    `cursor ${color('red', mode)}`,
    `cursor_text_color ${color('background', mode)}`,
    `selection_background ${color('surfaceRaised', mode)}`,
    `selection_foreground ${color('foreground', mode)}`,
    ...normal.map((value, i) => `color${i} ${value}`),
    ...bright.map((value, i) => `color${i + 8} ${value}`),
    '',
  ].join('\n')
}

function alacritty(mode: Mode) {
  const normal = ansi(mode)
  const bright = brightAnsi(mode)
  const names = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white']
  const section = (heading: string, values: string[]) => [
    `[colors.${heading}]`,
    ...values.map((value, i) => `${names[i]} = "${value}"`),
  ]
  return [
    '[colors.primary]',
    `background = "${color('background', mode)}"`,
    `foreground = "${color('foreground', mode)}"`,
    '',
    '[colors.cursor]',
    `cursor = "${color('red', mode)}"`,
    `text = "${color('background', mode)}"`,
    '',
    '[colors.selection]',
    `background = "${color('surfaceRaised', mode)}"`,
    `text = "${color('foreground', mode)}"`,
    '',
    ...section('normal', normal),
    '',
    ...section('bright', bright),
    '',
  ].join('\n')
}

function warp(mode: Mode) {
  const normal = ansi(mode)
  const bright = brightAnsi(mode)
  const row = (values: string[]) => values.map((value) => `    - '${value}'`).join('\n')
  return `name: Angrboða ${mode[0]?.toUpperCase()}${mode.slice(1)}
accent: '${color('red', mode)}'
cursor: '${color('red', mode)}'
background: '${color('background', mode)}'
foreground: '${color('foreground', mode)}'
details: '${mode === 'dark' ? 'darker' : 'lighter'}'
terminal_colors:
  normal:
${row(normal)}
  bright:
${row(bright)}
`
}

function windowsTerminal() {
  const scheme = (mode: Mode) => {
    const [black, red, green, yellow, blue, purple, cyan, white] = ansi(mode)
    const [brightBlack, brightRed, brightGreen, brightYellow, brightBlue, brightPurple, brightCyan, brightWhite] =
      brightAnsi(mode)
    return {
      name: `Angrboda ${mode[0]?.toUpperCase()}${mode.slice(1)}`,
      background: color('background', mode),
      foreground: color('foreground', mode),
      cursorColor: color('red', mode),
      selectionBackground: color('surfaceRaised', mode),
      black,
      red,
      green,
      yellow,
      blue,
      purple,
      cyan,
      white,
      brightBlack,
      brightRed,
      brightGreen,
      brightYellow,
      brightBlue,
      brightPurple,
      brightCyan,
      brightWhite,
    }
  }
  return `${JSON.stringify({ schemes: [scheme('dark'), scheme('light')] }, null, 2)}\n`
}

function wezterm() {
  const scheme = (mode: Mode) => ({
    foreground: color('foreground', mode),
    background: color('background', mode),
    cursor_bg: color('red', mode),
    cursor_fg: color('background', mode),
    cursor_border: color('red', mode),
    selection_fg: color('foreground', mode),
    selection_bg: color('surfaceRaised', mode),
    ansi: ansi(mode),
    brights: brightAnsi(mode),
  })
  const lua = (value: unknown): string => {
    if (typeof value === 'string') return `"${value}"`
    if (Array.isArray(value)) return `{ ${value.map(lua).join(', ')} }`
    return `{ ${Object.entries(value as Record<string, unknown>)
      .map(([key, item]) => `${key} = ${lua(item)}`)
      .join(', ')} }`
  }
  return `return {\n  ["Angrboda Dark"] = ${lua(scheme('dark'))},\n  ["Angrboda Light"] = ${lua(scheme('light'))},\n}\n`
}

function openCode() {
  const pair = (key: PaletteKey) => ({ dark: color(key, 'dark'), light: color(key, 'light') })
  return `${JSON.stringify(
    {
      $schema: 'https://opencode.ai/theme.json',
      theme: {
        primary: pair('red'),
        secondary: pair('violet'),
        accent: pair('cyan'),
        error: pair('red'),
        warning: pair('yellow'),
        success: pair('green'),
        info: pair('blue'),
        text: pair('foreground'),
        textMuted: pair('muted'),
        background: pair('background'),
        backgroundPanel: pair('surface'),
        backgroundElement: pair('surfaceRaised'),
        border: pair('border'),
        borderActive: pair('violet'),
        borderSubtle: pair('border'),
        diffAdded: pair('green'),
        diffRemoved: pair('red'),
        diffContext: pair('muted'),
        diffHunkHeader: pair('violet'),
        markdownText: pair('foreground'),
        markdownHeading: pair('red'),
        markdownLink: pair('violet'),
        markdownLinkText: pair('cyan'),
        markdownCode: pair('red'),
        markdownBlockQuote: pair('muted'),
        markdownEmph: pair('orange'),
        markdownStrong: pair('yellow'),
        markdownHorizontalRule: pair('border'),
        markdownListItem: pair('red'),
        syntaxComment: pair('muted'),
        syntaxKeyword: pair('violet'),
        syntaxFunction: pair('violet'),
        syntaxVariable: pair('foreground'),
        syntaxString: pair('red'),
        syntaxNumber: pair('orange'),
        syntaxType: pair('yellow'),
        syntaxOperator: pair('cyan'),
        syntaxPunctuation: pair('subtle'),
      },
    },
    null,
    2,
  )}\n`
}

function chromeTheme() {
  const rgb = (value: string) => [1, 3, 5].map((offset) => Number.parseInt(value.slice(offset, offset + 2), 16))
  return `${JSON.stringify(
    {
      manifest_version: 3,
      name: 'Angrboða for Chrome',
      version: '1.0.0',
      description: 'Angrboða colors for Chrome and its dynamic DevTools appearance.',
      theme: {
        colors: {
          frame: rgb(color('background', 'dark')),
          frame_inactive: rgb(color('surface', 'dark')),
          toolbar: rgb(color('surface', 'dark')),
          tab_text: rgb(color('foreground', 'dark')),
          tab_background_text: rgb(color('muted', 'dark')),
          bookmark_text: rgb(color('foreground', 'dark')),
          ntp_background: rgb(color('background', 'dark')),
          ntp_text: rgb(color('foreground', 'dark')),
          button_background: rgb(color('surfaceRaised', 'dark')),
        },
      },
    },
    null,
    2,
  )}\n`
}

export async function generatePorts() {
  const prettierConfig = (await resolveConfig('package.json')) ?? {}
  const files: Record<string, string> = {
    'ports/alacritty/angrboda-dark.toml': alacritty('dark'),
    'ports/alacritty/angrboda-light.toml': alacritty('light'),
    'ports/chrome/manifest.json': chromeTheme(),
    'ports/ghostty/Angrboda Dark': ghostty('dark'),
    'ports/ghostty/Angrboda Light': ghostty('light'),
    'ports/kitty/angrboda-dark.conf': kitty('dark'),
    'ports/kitty/angrboda-light.conf': kitty('light'),
    'ports/opencode/angrboda.json': openCode(),
    'ports/warp/angrboda-dark.yaml': warp('dark'),
    'ports/warp/angrboda-light.yaml': warp('light'),
    'ports/wezterm/angrboda.lua': wezterm(),
    'ports/windows-terminal/angrboda.json': windowsTerminal(),
  }

  await Promise.all(
    Object.entries(files).map(async ([path, contents]) => {
      await fs.mkdir(path.slice(0, path.lastIndexOf('/')), { recursive: true })
      const output = path.endsWith('.json')
        ? await format(contents, {
            ...prettierConfig,
            parser: 'json',
          })
        : contents
      await fs.writeFile(path, output)
    }),
  )
}
