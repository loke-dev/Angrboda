import { colors } from './colors'

export function getColors(style) {
  if (style === 'dark') {
    /* The array of light to dark colors are reversed to auto-generate dark theme */
    const darkColors: any = {}
    Object.entries(colors).forEach(([name, val]) => {
      if (name === 'black') darkColors.white = val
      else if (name === 'white') darkColors.black = val
      else darkColors[name] = Array.isArray(val) ? val.reverse() : val
    })
    return darkColors
  }
  else {
    return colors
  }
}
