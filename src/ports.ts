import { promises as fs } from 'node:fs'
import { format, resolveConfig } from 'prettier'
import { ansiPalette, brightAnsiPalette, palette } from './colors'

type Mode = 'dark' | 'light'
type PaletteKey = keyof typeof palette

const index = (mode: Mode) => (mode === 'dark' ? 0 : 1)
const color = (key: PaletteKey, mode: Mode) => palette[key][index(mode)]

const ansi = (mode: Mode) => ansiPalette.map((pair) => pair[index(mode)])
const brightAnsi = (mode: Mode) => brightAnsiPalette.map((pair) => pair[index(mode)])

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

function geminiCli(mode: Mode) {
  const title = mode[0]?.toUpperCase() + mode.slice(1)
  return `${JSON.stringify(
    {
      name: `Angrboða ${title}`,
      type: 'custom',
      background: {
        primary: color('background', mode),
      },
      text: {
        primary: color('foreground', mode),
        secondary: color('muted', mode),
        link: color('cyan', mode),
        accent: color('violet', mode),
        response: color('foreground', mode),
      },
      border: {
        default: color('border', mode),
        focused: color('violet', mode),
      },
      status: {
        success: color('green', mode),
        warning: color('yellow', mode),
        error: color('red', mode),
      },
      ui: {
        comment: color('muted', mode),
        symbol: color('cyan', mode),
        gradient: [color('red', mode), color('violet', mode), color('cyan', mode)],
      },
    },
    null,
    2,
  )}\n`
}

function codexCliTheme(mode: Mode) {
  const title = mode[0]?.toUpperCase() + mode.slice(1)
  const rule = (scope: string, settings: Array<[string, string]>, name?: string) => {
    const scopeSettings = settings
      .map(([key, value]) => [`<key>${key}</key>`, `<string>${value}</string>`].join('\n'))
      .join('\n')

    return [
      '    <dict>',
      ...(name ? ['      <key>name</key>', `      <string>${name}</string>`] : []),
      '      <key>scope</key>',
      `      <string>${scope}</string>`,
      '      <key>settings</key>',
      '      <dict>',
      ...scopeSettings.split('\n').map((line) => `        ${line}`),
      '      </dict>',
      '    </dict>',
    ].join('\n')
  }

  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
  <key>name</key>
  <string>Angrboða ${title}</string>
  <key>settings</key>
  <array>
    <dict>
      <key>settings</key>
      <dict>
        <key>background</key>
        <string>${color('background', mode)}</string>
        <key>foreground</key>
        <string>${color('foreground', mode)}</string>
        <key>caret</key>
        <string>${color('red', mode)}</string>
        <key>invisibles</key>
        <string>${color('subtle', mode)}</string>
        <key>selection</key>
        <string>${color('surfaceRaised', mode)}</string>
        <key>selectionForeground</key>
        <string>${color('foreground', mode)}</string>
        <key>lineHighlight</key>
        <string>${color('surface', mode)}</string>
        <key>findHighlight</key>
        <string>${color('violet', mode)}</string>
        <key>findHighlightForeground</key>
        <string>${color('foreground', mode)}</string>
        <key>inactiveSelection</key>
        <string>${color('surface', mode)}</string>
        <key>gutterForeground</key>
        <string>${color('muted', mode)}</string>
        <key>gutterForegroundHighlight</key>
        <string>${color('foreground', mode)}</string>
      </dict>
    </dict>
${rule(
  'comment',
  [
    ['foreground', color('muted', mode)],
    ['fontStyle', 'italic'],
  ],
  'Comments',
)}
${rule('constant', [['foreground', color('cyan', mode)]], 'Constants')}
${rule('constant.numeric', [['foreground', color('orange', mode)]], 'Numbers')}
${rule('entity.name.function', [['foreground', color('violet', mode)]], 'Functions')}
${rule('entity.name.type', [['foreground', color('yellow', mode)]], 'Types')}
${rule('entity.name.tag', [['foreground', color('red', mode)]], 'Tags')}
${rule(
  'markup.changed',
  [
    ['background', color('yellow', mode)],
    ['foreground', color('foreground', mode)],
  ],
  'Changed',
)}
${rule(
  'markup.inserted',
  [
    ['background', color('green', mode)],
    ['foreground', color('foreground', mode)],
  ],
  'Inserted',
)}
${rule(
  'markup.deleted',
  [
    ['background', color('red', mode)],
    ['foreground', color('foreground', mode)],
  ],
  'Deleted',
)}
${rule('keyword', [['foreground', color('violet', mode)]], 'Keywords')}
${rule('keyword.operator', [['foreground', color('cyan', mode)]], 'Operators')}
${rule('support.function', [['foreground', color('violet', mode)]], 'Support')}
${rule('string', [['foreground', color('red', mode)]], 'Strings')}
${rule('variable', [['foreground', color('foreground', mode)]], 'Variables')}
${rule('punctuation', [['foreground', color('subtle', mode)]], 'Punctuation')}
${rule('diff.header', [['foreground', color('violet', mode)]], 'Diff Headers')}
${rule('diff.deleted', [['foreground', color('red', mode)]], 'Diff Deleted')}
${rule('diff.inserted', [['foreground', color('green', mode)]], 'Diff Inserted')}
  </array>
</dict>
</plist>
`
}

function codexAppTheme(mode: Mode) {
  return `codex-theme-v1:${JSON.stringify({
    codeThemeId: 'one',
    theme: {
      accent: color('red', mode),
      contrast: 48,
      fonts: {
        code: null,
        ui: null,
      },
      ink: color('foreground', mode),
      opaqueWindows: true,
      semanticColors: {
        diffAdded: color('green', mode),
        diffRemoved: color('red', mode),
        skill: color('violet', mode),
      },
      surface: color('surface', mode),
    },
    variant: mode,
  })}\n`
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

function zed() {
  const terminalNames = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'] as const
  const theme = (mode: Mode) => {
    const terminal = Object.fromEntries([
      ...terminalNames.map((name, i) => [`terminal.ansi.${name}`, ansi(mode)[i]]),
      ...terminalNames.map((name, i) => [`terminal.ansi.bright_${name}`, brightAnsi(mode)[i]]),
    ])

    return {
      name: `Angrboða ${mode[0]?.toUpperCase()}${mode.slice(1)}`,
      appearance: mode,
      style: {
        background: color('background', mode),
        'surface.background': color('surface', mode),
        'elevated_surface.background': color('surfaceRaised', mode),
        border: color('border', mode),
        'border.variant': color('border', mode),
        'border.focused': color('violet', mode),
        'element.background': color('surface', mode),
        'element.hover': color('surfaceRaised', mode),
        'element.selected': color('surfaceRaised', mode),
        text: color('foreground', mode),
        'text.muted': color('muted', mode),
        'text.accent': color('red', mode),
        'editor.background': color('background', mode),
        'editor.foreground': color('foreground', mode),
        'editor.gutter.background': color('background', mode),
        'editor.line_number': color('subtle', mode),
        'editor.active_line_number': color('foreground', mode),
        'editor.active_line.background': color('surface', mode),
        'editor.indent_guide': color('border', mode),
        'editor.indent_guide_active': color('subtle', mode),
        'status_bar.background': color('surface', mode),
        'tab_bar.background': color('surface', mode),
        'tab.active_background': color('background', mode),
        'tab.inactive_background': color('surface', mode),
        'terminal.background': color('background', mode),
        'terminal.foreground': color('foreground', mode),
        ...terminal,
        syntax: {
          comment: { color: color('muted', mode), font_style: 'italic' },
          keyword: { color: color('violet', mode) },
          function: { color: color('violet', mode) },
          type: { color: color('yellow', mode) },
          string: { color: color('red', mode) },
          number: { color: color('orange', mode) },
          constant: { color: color('cyan', mode) },
          variable: { color: color('foreground', mode) },
          property: { color: color('cyan', mode) },
          operator: { color: color('cyan', mode) },
          punctuation: { color: color('subtle', mode) },
        },
      },
    }
  }

  return `${JSON.stringify(
    {
      $schema: 'https://zed.dev/schema/themes/v0.2.0.json',
      name: 'Angrboða',
      author: 'Loke Carlsson',
      themes: [theme('dark'), theme('light')],
    },
    null,
    2,
  )}\n`
}

function helix(mode: Mode) {
  const roles: Array<[string, PaletteKey]> = [
    ['attribute', 'red'],
    ['type', 'yellow'],
    ['constructor', 'yellow'],
    ['constant', 'cyan'],
    ['string', 'red'],
    ['variable', 'foreground'],
    ['label', 'cyan'],
    ['punctuation', 'subtle'],
    ['keyword', 'violet'],
    ['operator', 'cyan'],
    ['function', 'violet'],
    ['tag', 'red'],
    ['namespace', 'foreground'],
    ['special', 'orange'],
    ['error', 'red'],
    ['warning', 'yellow'],
    ['info', 'blue'],
    ['hint', 'cyan'],
    ['diff.plus', 'green'],
    ['diff.minus', 'red'],
    ['diff.delta', 'violet'],
  ]
  const lines = roles.map(([role, key]) => `"${role}" = "${key}"`)
  return [
    `# Angrboða ${mode[0]?.toUpperCase()}${mode.slice(1)} for Helix`,
    ...lines,
    `"comment" = { fg = "muted", modifiers = ["italic"] }`,
    `"ui.background" = { bg = "background" }`,
    `"ui.text" = "foreground"`,
    `"ui.text.focus" = { fg = "foreground", bg = "surface-raised" }`,
    `"ui.text.inactive" = "muted"`,
    `"ui.cursor" = { fg = "background", bg = "red" }`,
    `"ui.cursor.match" = { fg = "background", bg = "violet" }`,
    `"ui.cursorline.primary" = { bg = "surface" }`,
    `"ui.selection" = { bg = "surface-raised" }`,
    `"ui.selection.primary" = { bg = "surface-raised" }`,
    `"ui.gutter" = { bg = "background" }`,
    `"ui.linenr" = "subtle"`,
    `"ui.linenr.selected" = "foreground"`,
    `"ui.statusline" = { fg = "foreground", bg = "surface" }`,
    `"ui.statusline.inactive" = { fg = "muted", bg = "surface" }`,
    `"ui.menu" = { fg = "foreground", bg = "surface" }`,
    `"ui.menu.selected" = { fg = "foreground", bg = "surface-raised" }`,
    `"ui.popup" = { fg = "foreground", bg = "surface" }`,
    `"ui.window" = "border"`,
    `"ui.virtual.indent-guide" = "border"`,
    `"ui.virtual.inlay-hint" = "muted"`,
    '',
    '[palette]',
    ...Object.entries(palette).map(
      ([name, values]) => `${name.replace(/[A-Z]/g, (c) => `-${c.toLowerCase()}`)} = "${values[index(mode)]}"`,
    ),
    '',
  ].join('\n')
}

function sublime(mode: Mode) {
  const variables = Object.fromEntries(Object.entries(palette).map(([key, values]) => [key, values[index(mode)]]))
  const rule = (name: string, scope: string, foreground: PaletteKey, fontStyle?: string) => ({
    name,
    scope,
    foreground: `var(${foreground})`,
    ...(fontStyle ? { font_style: fontStyle } : {}),
  })

  return `${JSON.stringify(
    {
      name: `Angrboða ${mode[0]?.toUpperCase()}${mode.slice(1)}`,
      variables,
      globals: {
        background: 'var(background)',
        foreground: 'var(foreground)',
        caret: 'var(red)',
        block_caret: 'var(red)',
        line_highlight: 'var(surface)',
        selection: 'var(surfaceRaised)',
        selection_foreground: 'var(foreground)',
        gutter: 'var(background)',
        gutter_foreground: 'var(subtle)',
        gutter_foreground_highlight: 'var(foreground)',
        guide: 'var(border)',
        active_guide: 'var(subtle)',
        accent: 'var(red)',
        line_diff_added: 'var(green)',
        line_diff_modified: 'var(violet)',
        line_diff_deleted: 'var(red)',
      },
      rules: [
        rule('Comments', 'comment', 'muted', 'italic'),
        rule('Keywords', 'keyword, storage', 'violet'),
        rule('Functions', 'entity.name.function, support.function', 'violet'),
        rule('Types', 'entity.name.type, support.type, storage.type', 'yellow'),
        rule('Strings', 'string', 'red'),
        rule('Numbers', 'constant.numeric', 'orange'),
        rule('Constants', 'constant, support.constant', 'cyan'),
        rule('Properties', 'variable.other.member, meta.object-literal.key', 'cyan'),
        rule('Operators', 'keyword.operator', 'cyan'),
        rule('Punctuation', 'punctuation', 'subtle'),
        rule('Invalid', 'invalid', 'red', 'bold'),
      ],
    },
    null,
    2,
  )}\n`
}

function iTerm2(mode: Mode) {
  const component = (hex: string) => {
    const values = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255)
    return `<dict>
      <key>Blue Component</key><real>${values[2]?.toFixed(6)}</real>
      <key>Color Space</key><string>sRGB</string>
      <key>Green Component</key><real>${values[1]?.toFixed(6)}</real>
      <key>Red Component</key><real>${values[0]?.toFixed(6)}</real>
    </dict>`
  }
  const entries: Array<[string, string]> = [
    ['Background Color', color('background', mode)],
    ['Foreground Color', color('foreground', mode)],
    ['Bold Color', color('foreground', mode)],
    ['Cursor Color', color('red', mode)],
    ['Cursor Text Color', color('background', mode)],
    ['Selection Color', color('surfaceRaised', mode)],
    ['Selected Text Color', color('foreground', mode)],
    ...ansi(mode).map((value, i) => [`Ansi ${i} Color`, value] as [string, string]),
    ...brightAnsi(mode).map((value, i) => [`Ansi ${i + 8} Color`, value] as [string, string]),
  ]
  return `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
${entries.map(([key, value]) => `  <key>${key}</key>\n  ${component(value)}`).join('\n')}
</dict>
</plist>
`
}

function base16(mode: Mode) {
  const values = {
    base00: color('background', mode),
    base01: color('surface', mode),
    base02: color('surfaceRaised', mode),
    base03: color('subtle', mode),
    base04: color('muted', mode),
    base05: color('foreground', mode),
    base06: color('foreground', mode),
    base07: color('foreground', mode),
    base08: color('red', mode),
    base09: color('orange', mode),
    base0A: color('yellow', mode),
    base0B: color('green', mode),
    base0C: color('cyan', mode),
    base0D: color('blue', mode),
    base0E: color('violet', mode),
    base0F: color('red', mode),
  }
  return [
    `system: "base16"`,
    `name: "Angrboða ${mode[0]?.toUpperCase()}${mode.slice(1)}"`,
    `author: "Loke Carlsson"`,
    `variant: "${mode}"`,
    `palette:`,
    ...Object.entries(values).map(([key, value]) => `  ${key}: "${value}"`),
    '',
  ].join('\n')
}

export async function generatePorts() {
  const prettierConfig = (await resolveConfig('package.json')) ?? {}
  const files: Record<string, string> = {
    'ports/alacritty/angrboda-dark.toml': alacritty('dark'),
    'ports/alacritty/angrboda-light.toml': alacritty('light'),
    'ports/base16/angrboda-dark.yaml': base16('dark'),
    'ports/base16/angrboda-light.yaml': base16('light'),
    'ports/chrome/manifest.json': chromeTheme(),
    'ports/ghostty/Angrboda Dark': ghostty('dark'),
    'ports/ghostty/Angrboda Light': ghostty('light'),
    'ports/helix/angrboda-dark.toml': helix('dark'),
    'ports/helix/angrboda-light.toml': helix('light'),
    'ports/iterm2/Angrboda Dark.itermcolors': iTerm2('dark'),
    'ports/iterm2/Angrboda Light.itermcolors': iTerm2('light'),
    'ports/kitty/angrboda-dark.conf': kitty('dark'),
    'ports/kitty/angrboda-light.conf': kitty('light'),
    'ports/gemini-cli/angrboda-dark.json': geminiCli('dark'),
    'ports/gemini-cli/angrboda-light.json': geminiCli('light'),
    'ports/codex/angrboda-dark.tmTheme': codexCliTheme('dark'),
    'ports/codex/angrboda-light.tmTheme': codexCliTheme('light'),
    'ports/codex/angrboda-app-dark.txt': codexAppTheme('dark'),
    'ports/codex/angrboda-app-light.txt': codexAppTheme('light'),
    'ports/opencode/angrboda.json': openCode(),
    'ports/sublime-text/Angrboda Dark.sublime-color-scheme': sublime('dark'),
    'ports/sublime-text/Angrboda Light.sublime-color-scheme': sublime('light'),
    'ports/warp/angrboda-dark.yaml': warp('dark'),
    'ports/warp/angrboda-light.yaml': warp('light'),
    'ports/wezterm/angrboda.lua': wezterm(),
    'ports/windows-terminal/angrboda.json': windowsTerminal(),
    'ports/zed/angrboda.json': zed(),
  }

  await Promise.all(
    Object.entries(files).map(async ([path, contents]) => {
      await fs.mkdir(path.slice(0, path.lastIndexOf('/')), { recursive: true })
      const parser = path.endsWith('.sublime-color-scheme')
        ? 'jsonc'
        : path.endsWith('.json')
          ? 'json'
          : path.endsWith('.yaml') || path.endsWith('.yml')
            ? 'yaml'
            : undefined
      const output = parser
        ? await format(contents, {
            ...prettierConfig,
            parser,
          })
        : contents
      await fs.writeFile(path, output)
    }),
  )
}
