/** Theme tuple: index 0 = dark mode, index 1 = light mode. */
export type ThemePair = readonly [dark: string, light: string]

export const pair = (dark: string, light: string): ThemePair => [dark, light]

const suf = (c: ThemePair, suffix: string): ThemePair => [`${c[0]}${suffix}`, `${c[1]}${suffix}`]

/**
 * Angrboða's canonical palette.
 *
 * Every text color is intentionally opaque. Transparency is reserved for
 * surfaces, selections, and guides so text contrast remains predictable.
 */
export const palette = {
  background: pair('#141216', '#FCF9FD'),
  surface: pair('#1D1920', '#F3EDF5'),
  surfaceRaised: pair('#29222D', '#E9DFED'),
  foreground: pair('#F5EFF8', '#211B24'),
  muted: pair('#B3A8B8', '#665B6A'),
  subtle: pair('#827686', '#807384'),
  terminalBlack: pair('#94899A', '#453B49'),
  border: pair('#332B37', '#DED2E2'),
  red: pair('#FF718A', '#B52643'),
  violet: pair('#D6A4FF', '#68459B'),
  green: pair('#78C98D', '#25723A'),
  yellow: pair('#F4C86A', '#805C00'),
  blue: pair('#78B9F2', '#25659A'),
  cyan: pair('#80CBC4', '#176E6B'),
  orange: pair('#F39A70', '#98401D'),
} as const

/**
 * ANSI colors are text colors, so every entry must remain distinguishable from
 * the terminal background. In particular, ANSI black must not reuse the
 * background color: shells and TUIs legitimately render visible text with it.
 */
export const ansiPalette = [
  palette.terminalBlack,
  palette.red,
  palette.green,
  palette.yellow,
  palette.blue,
  palette.violet,
  palette.cyan,
  palette.foreground,
] as const

export const brightAnsiPalette = [
  palette.muted,
  palette.red,
  palette.green,
  palette.yellow,
  palette.blue,
  palette.violet,
  palette.cyan,
  palette.foreground,
] as const

export const themeColors = {
  primary: palette.red,
  secondary: palette.violet,
  tertiary: palette.foreground,

  foreground: palette.foreground,
  activeForeground: palette.foreground,
  secondaryForeground: palette.muted,
  ignored: palette.subtle,
  border: palette.border,
  background: palette.background,
  activeBackground: palette.surface,
  strongBackground: palette.surfaceRaised,
  dropdownBackground: palette.surface,
  tabBackground: pair(`${palette.violet[0]}18`, `${palette.violet[1]}12`),

  comment: palette.muted,
  bracket: palette.subtle,
  punctuation: palette.subtle,
  variable: palette.foreground,
  constant: palette.cyan,
  number: palette.orange,
  namespace: palette.foreground,

  string: palette.red,
  literal: palette.red,
  boolean: palette.orange,
  builtin: palette.cyan,
  regex: palette.yellow,
  red: palette.red,
  keyword: palette.violet,
  function: palette.violet,
  property: palette.cyan,

  class: palette.yellow,
  interface: palette.cyan,
  decorator: palette.red,

  green: palette.green,
  cyan: palette.cyan,
  blue: palette.blue,
  orange: palette.orange,
  yellow: palette.yellow,
  magenta: palette.violet,
  purple: palette.violet,
  uiInfo: palette.blue,

  gitAdded: palette.green,
  gitModified: palette.violet,
  gitDeleted: palette.red,
  gitUntracked: palette.cyan,
  gitIgnored: palette.subtle,
  gitIgnoredDim: pair(`${palette.subtle[0]}90`, `${palette.subtle[1]}90`),
  gitConflicting: palette.yellow,

  indentGuide: suf(palette.border, 'B0'),
  activeIndentGuide: palette.subtle,
  submoduleResource: palette.muted,
  foldingControl: palette.muted,
} as const

export type ThemeColorKey = keyof typeof themeColors
