// Base color palette [dark mode, light mode]
const colorPalette = {
  // Primary colors
  red: ['#ff6478', '#a01818'],
  purple: ['#c78fff', '#5a3b94'],

  // Neutrals
  white: ['#f0e8f5', '#ffffff'],
  lightGray: ['#f0eaf8', '#1a1a1a'],
  mediumGray: ['#b3a8bd', '#4a4146'],
  darkGray: ['#2a2a2a', '#e5e5e5'],
  black: ['#1e1e1e', '#1a1a1a'],

  // Semantic colors
  success: ['#a1d6a1', '#3c9a3c'],
  warning: ['#f9cf75', '#b38600'],
  info: ['#8fbbf7', '#0366d6'],

  // Transparency variants
  opacity90: '90',
  opacity80: '80',
  opacity60: '60',
  opacity50: '50',
  opacity40: '40',
  opacity35: '35',
  opacity30: '30',
  opacity25: '25',
  opacity20: '20',
  opacity18: '18',
}

// Theme colors [dark, light]
export const themeColors = {
  // Base colors
  primary: colorPalette.red,
  secondary: colorPalette.purple,
  tertiary: colorPalette.white,

  // UI colors
  foreground: [
    `${colorPalette.lightGray[0]}${colorPalette.opacity90}`,
    `${colorPalette.black[1]}${colorPalette.opacity90}`,
  ],
  activeForeground: [
    `${colorPalette.lightGray[0]}${colorPalette.opacity90}`,
    `${colorPalette.black[1]}${colorPalette.opacity90}`,
  ],
  secondaryForeground: [
    `${colorPalette.white[0]}${colorPalette.opacity90}`,
    `${colorPalette.black[1]}${colorPalette.opacity90}`,
  ],
  ignored: [
    `${colorPalette.lightGray[0]}${colorPalette.opacity60}`,
    `${colorPalette.black[1]}${colorPalette.opacity60}`,
  ],
  border: colorPalette.darkGray,
  background: [colorPalette.black[0], colorPalette.white[1]],
  activeBackground: [
    `${colorPalette.purple[0]}${colorPalette.opacity30}`,
    `${colorPalette.purple[1]}${colorPalette.opacity20}`,
  ],
  strongBackground: [
    `${colorPalette.purple[0]}${colorPalette.opacity60}`,
    `${colorPalette.purple[1]}${colorPalette.opacity60}`,
  ],
  tabBackground: [
    `${colorPalette.purple[0]}${colorPalette.opacity20}`,
    `${colorPalette.purple[1]}${colorPalette.opacity25}`,
  ],

  // Syntax colors
  comment: [
    `${colorPalette.mediumGray[0]}${colorPalette.opacity60}`,
    `${colorPalette.black[1]}${colorPalette.opacity80}`,
  ],
  bracket: [
    `${colorPalette.mediumGray[0]}${colorPalette.opacity60}`,
    `${colorPalette.black[1]}${colorPalette.opacity80}`,
  ],
  punctuation: [
    `${colorPalette.mediumGray[0]}${colorPalette.opacity60}`,
    `${colorPalette.black[1]}${colorPalette.opacity80}`,
  ],
  variable: colorPalette.lightGray,
  constant: colorPalette.lightGray,
  number: colorPalette.lightGray,
  namespace: colorPalette.lightGray,

  // Red-based elements (strings, literals, etc.)
  string: colorPalette.red,
  literal: colorPalette.red,
  boolean: colorPalette.red,
  builtin: colorPalette.red,
  regex: colorPalette.red,
  red: colorPalette.red,

  // Purple-based elements (functions, keywords, etc.)
  keyword: colorPalette.purple,
  function: colorPalette.purple,
  property: colorPalette.purple,
  purple: colorPalette.purple,

  // Special/tertiary elements (using off-white with purple tint)
  special: colorPalette.white,
  offWhite: colorPalette.white,

  // Special cases
  class: [colorPalette.purple[0], colorPalette.purple[1]],
  interface: [colorPalette.lightGray[0], colorPalette.black[1]],
  decorator: colorPalette.red,

  // Terminal colors - using the theme colors more consistently
  green: colorPalette.purple,
  cyan: colorPalette.white,
  blue: colorPalette.purple,
  orange: colorPalette.red,
  yellow: colorPalette.red,
  magenta: colorPalette.purple,

  // Git & semantic indicators - still need to be recognizable
  gitAdded: colorPalette.success,
  gitModified: colorPalette.purple,
  gitDeleted: colorPalette.red,
  gitUntracked: colorPalette.purple,
  gitIgnored: [
    `${colorPalette.lightGray[0]}${colorPalette.opacity60}`,
    `${colorPalette.black[1]}${colorPalette.opacity60}`,
  ],
  gitConflicting: colorPalette.warning,

  // Indent guides - maintain dimmed appearance
  indentGuide: [
    `${colorPalette.darkGray[0]}${colorPalette.opacity40}`,
    `${colorPalette.darkGray[1]}${colorPalette.opacity40}`,
  ],
  activeIndentGuide: [
    `${colorPalette.darkGray[0]}${colorPalette.opacity60}`,
    `${colorPalette.darkGray[1]}${colorPalette.opacity60}`,
  ],
}
