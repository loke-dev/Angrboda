/** VS Code theme tuple: index 0 = dark mode, index 1 = light mode */
export type ThemePair = readonly [dark: string, light: string]

const pair = (dark: string, light: string): ThemePair => [dark, light]

/** Append the same 2-digit hex suffix to both colors (e.g. "40" for alpha). */
const suf = (c: ThemePair, suffix: string): ThemePair => [`${c[0]}${suffix}`, `${c[1]}${suffix}`]

/**
 * Core palette. Extend here when adding new base colors; derive UI/syntax via `pair` / `suf`
 * or small composed pairs below.
 */
const palette = {
  red: pair('#F97385', '#a01818'),
  purple: pair('#CE9EFE', '#5a3b94'),
  white: pair('#f0e8f5', '#ffffff'),
  lightGray: pair('#f0eaf8', '#1a1a1a'),
  mediumGray: pair('#b3a8bd', '#4a4146'),
  darkGray: pair('#272424', '#e5e5e5'),
  black: pair('#1B1919', '#1a1a1a'),
  success: pair('#5EB05E', '#3c9a3c'),
  warning: pair('#f9cf75', '#b38600'),
  info: pair('#8fbbf7', '#0366d6'),
} as const

const syntaxMuted = pair(`${palette.mediumGray[0]}60`, `${palette.black[1]}80`)

/** Muted text on UI (ignored files, inactive labels) */
const mutedUi = suf(palette.lightGray, '60')

export const themeColors = {
  primary: palette.red,
  secondary: palette.purple,
  tertiary: palette.white,

  foreground: pair(palette.white[0], palette.black[1]),
  activeForeground: pair(palette.white[0], palette.black[1]),
  secondaryForeground: suf(palette.white, '90'),
  ignored: mutedUi,
  border: palette.darkGray,
  background: pair(palette.black[0], palette.white[1]),
  activeBackground: pair(`${palette.purple[0]}30`, `${palette.purple[1]}20`),
  strongBackground: suf(palette.purple, '60'),
  dropdownBackground: pair(palette.darkGray[0], palette.white[1]),
  tabBackground: pair(`${palette.purple[0]}20`, `${palette.purple[1]}25`),

  comment: syntaxMuted,
  bracket: syntaxMuted,
  punctuation: syntaxMuted,
  variable: palette.lightGray,
  constant: palette.lightGray,
  number: palette.lightGray,
  namespace: palette.lightGray,

  string: palette.red,
  literal: palette.red,
  boolean: palette.red,
  builtin: palette.red,
  regex: palette.red,
  red: palette.red,
  keyword: palette.purple,
  function: palette.purple,
  property: palette.purple,

  class: pair(palette.purple[0], palette.purple[1]),
  interface: pair(palette.lightGray[0], palette.black[1]),
  decorator: palette.red,

  /** Terminal ANSI — tuned to stay on-theme */
  green: palette.purple,
  cyan: palette.white,
  blue: palette.purple,
  orange: palette.red,
  yellow: palette.red,
  magenta: palette.purple,
  purple: palette.purple,

  /** Problems panel, notification info icons, editor info — real blue for clarity */
  uiInfo: palette.info,

  gitAdded: palette.success,
  gitModified: palette.purple,
  gitDeleted: palette.red,
  gitUntracked: palette.purple,
  gitIgnored: mutedUi,
  /** Dark: dimmer track color; light: unchanged vs gitIgnored */
  gitIgnoredDim: pair(`${palette.lightGray[0]}40`, `${palette.black[1]}60`),
  gitConflicting: palette.warning,

  indentGuide: suf(palette.darkGray, '40'),
  activeIndentGuide: suf(palette.darkGray, '60'),

  /** Sidebar gutters / labels that need a softer secondaryForeground in dark mode */
  submoduleResource: pair(`${palette.white[0]}80`, `${palette.black[1]}90`),
  foldingControl: pair(`${palette.white[0]}80`, `${palette.black[1]}90`),
} as const

export type ThemeColorKey = keyof typeof themeColors
