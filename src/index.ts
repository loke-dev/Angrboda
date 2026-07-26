import { promises as fs } from 'fs'
import { format, resolveConfig } from 'prettier'
import { generatePorts } from './ports'
import getTheme from './theme'

const lightTheme = getTheme({
  style: 'light',
  name: 'Angrboda Light',
})

const darkTheme = getTheme({
  style: 'dark',
  name: 'Angrboda Dark',
})

async function build() {
  const prettierConfig = (await resolveConfig('package.json')) ?? {}
  const json = (value: unknown) =>
    format(JSON.stringify(value), {
      ...prettierConfig,
      parser: 'json',
    })

  await fs.mkdir('./themes', { recursive: true })
  await Promise.all([
    fs.writeFile('./themes/angrboda-light-color-theme.json', await json(lightTheme)),
    fs.writeFile('./themes/angrboda-dark-color-theme.json', await json(darkTheme)),
    generatePorts(),
  ])
}

build().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
