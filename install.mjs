#!/usr/bin/env node

import { constants as fsConstants, promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const bundleRoot = path.dirname(fileURLToPath(import.meta.url))
const homeDirectory = process.env.HOME || os.homedir()
const xdgConfig = process.env.XDG_CONFIG_HOME || path.join(homeDirectory, '.config')
const appData = process.env.APPDATA || path.join(homeDirectory, 'AppData', 'Roaming')
const windows = process.platform === 'win32'

const tools = {
  alacritty: {
    description: 'Alacritty TOML themes',
    directory: () => path.join(windows ? appData : xdgConfig, 'alacritty', 'themes'),
    files: [
      ['ports/alacritty/angrboda-dark.toml', 'angrboda-dark.toml'],
      ['ports/alacritty/angrboda-light.toml', 'angrboda-light.toml'],
    ],
    next: ({ directory }) =>
      `Import ${path.join(directory, 'angrboda-dark.toml')} or ${path.join(directory, 'angrboda-light.toml')} from alacritty.toml.`,
  },
  ghostty: {
    description: 'Ghostty automatic dark/light themes',
    directory: () => path.join(xdgConfig, 'ghostty', 'themes'),
    files: [
      ['ports/ghostty/Angrboda Dark', 'Angrboda Dark'],
      ['ports/ghostty/Angrboda Light', 'Angrboda Light'],
    ],
    next: () => 'Set theme = dark:Angrboda Dark,light:Angrboda Light in your Ghostty config.',
  },
  gemini: {
    description: 'Gemini CLI custom themes',
    directory: () => path.join(homeDirectory, '.gemini', 'themes'),
    files: [
      ['ports/gemini-cli/angrboda-dark.json', 'angrboda-dark.json'],
      ['ports/gemini-cli/angrboda-light.json', 'angrboda-light.json'],
    ],
    next: ({ directory }) =>
      `Set ui.theme in ~/.gemini/settings.json to "${path.join(directory, 'angrboda-dark.json')}" or "${path.join(directory, 'angrboda-light.json')}".`,
  },
  claude: {
    description: 'Claude Code custom themes',
    directory: () => path.join(homeDirectory, '.claude', 'themes'),
    files: [
      ['ports/claude-code/angrboda-dark.json', 'angrboda-dark.json'],
      ['ports/claude-code/angrboda-light.json', 'angrboda-light.json'],
    ],
    next: () =>
      'Run /theme in Claude Code and choose Angrboða Dark or Angrboða Light, or set theme to "custom:angrboda-dark" in ~/.claude/settings.json.',
  },
  codex: {
    description: 'Codex CLI TextMate themes',
    directory: () => path.join(homeDirectory, '.codex', 'themes'),
    files: [
      ['ports/codex/angrboda-dark.tmTheme', 'angrboda-dark.tmTheme'],
      ['ports/codex/angrboda-light.tmTheme', 'angrboda-light.tmTheme'],
    ],
    next: ({ directory }) =>
      `Run /theme in Codex CLI and choose ${path.join(directory, 'angrboda-dark.tmTheme')} or ${path.join(directory, 'angrboda-light.tmTheme')}.`,
  },
  helix: {
    description: 'Helix editor themes',
    directory: () => path.join(windows ? appData : xdgConfig, 'helix', 'themes'),
    files: [
      ['ports/helix/angrboda-dark.toml', 'angrboda-dark.toml'],
      ['ports/helix/angrboda-light.toml', 'angrboda-light.toml'],
    ],
    next: () => 'Set theme = "angrboda-dark" or theme = "angrboda-light" in config.toml.',
  },
  kitty: {
    description: 'Kitty theme-picker themes',
    directory: () => path.join(process.env.KITTY_CONFIG_DIRECTORY || path.join(xdgConfig, 'kitty'), 'themes'),
    files: [
      ['ports/kitty/angrboda-dark.conf', 'Angrboda Dark.conf'],
      ['ports/kitty/angrboda-light.conf', 'Angrboda Light.conf'],
    ],
    next: () => 'Run kitten themes and choose Angrboda Dark or Angrboda Light.',
  },
  opencode: {
    description: 'OpenCode adaptive theme',
    directory: () => path.join(xdgConfig, 'opencode', 'themes'),
    files: [['ports/opencode/angrboda.json', 'angrboda.json']],
    next: () => 'Run /theme in OpenCode and choose angrboda.',
  },
  wezterm: {
    description: 'WezTerm Lua color schemes',
    directory: () => path.join(xdgConfig, 'wezterm'),
    files: [['ports/wezterm/angrboda.lua', 'angrboda.lua']],
    next: () => 'Require "angrboda" from wezterm.lua and select Angrboda Dark or Angrboda Light.',
  },
  zed: {
    description: 'Zed dark/light theme family',
    directory: () => path.join(windows ? appData : xdgConfig, 'zed', 'themes'),
    files: [['ports/zed/angrboda.json', 'angrboda.json']],
    next: () => 'Restart Zed, open the theme selector, and choose an Angrboða theme.',
  },
}

function usage() {
  return `Angrboða port installer

Usage:
  node install.mjs list
  node install.mjs <tool> [--dry-run] [--force] [--target <directory>]
  node install.mjs install <tool> [--dry-run] [--force] [--target <directory>]

Safety:
  Existing identical files are left untouched.
  Existing different files require --force and are backed up before replacement.
  --dry-run reports every action without writing anything.

Run "node install.mjs list" to see supported tools.`
}

function expandHome(value) {
  if (value === '~') return homeDirectory
  if (value.startsWith(`~${path.sep}`) || value.startsWith('~/') || value.startsWith('~\\')) {
    return path.join(homeDirectory, value.slice(2))
  }
  return value
}

function parseArguments(argv) {
  const args = [...argv]
  let command = args.shift()
  if (command === 'install') command = args.shift()

  const options = { dryRun: false, force: false, target: undefined }
  while (args.length > 0) {
    const flag = args.shift()
    if (flag === '--dry-run') options.dryRun = true
    else if (flag === '--force') options.force = true
    else if (flag === '--target') {
      const target = args.shift()
      if (!target) throw new Error('--target requires a directory')
      options.target = path.resolve(expandHome(target))
    } else {
      throw new Error(`Unknown option: ${flag}`)
    }
  }

  return { command, options }
}

async function readIfPresent(filePath) {
  try {
    return await fs.readFile(filePath)
  } catch (error) {
    if (error && typeof error === 'object' && error.code === 'ENOENT') return undefined
    throw error
  }
}

async function nextBackupPath(destination) {
  const stamp = new Date().toISOString().replaceAll(':', '-')
  for (let suffix = 0; ; suffix += 1) {
    const candidate = `${destination}.bak-${stamp}${suffix === 0 ? '' : `-${suffix}`}`
    try {
      await fs.access(candidate)
    } catch (error) {
      if (error && typeof error === 'object' && error.code === 'ENOENT') return candidate
      throw error
    }
  }
}

async function install(toolName, options) {
  const tool = tools[toolName]
  if (!tool) {
    throw new Error(`Unknown tool "${toolName ?? ''}". Run "node install.mjs list" for supported tools.`)
  }

  const directory = options.target || tool.directory()
  const plan = await Promise.all(
    tool.files.map(async ([sourceName, destinationName]) => {
      const source = path.join(bundleRoot, sourceName)
      const destination = path.join(directory, destinationName)
      const sourceData = await fs.readFile(source)
      const destinationData = await readIfPresent(destination)
      const state =
        destinationData === undefined ? 'create' : sourceData.equals(destinationData) ? 'unchanged' : 'replace'
      return { sourceData, destination, state }
    }),
  )

  const conflicts = plan.filter(({ state }) => state === 'replace')
  if (conflicts.length > 0 && !options.force && !options.dryRun) {
    const destinations = conflicts.map(({ destination }) => `  ${destination}`).join('\n')
    const error = new Error(
      `Refusing to replace existing files:\n${destinations}\nRun again with --force to create backups and replace them.`,
    )
    error.exitCode = 2
    throw error
  }

  for (const action of plan) {
    if (action.state === 'unchanged') {
      console.log(`unchanged  ${action.destination}`)
      continue
    }

    if (options.dryRun) {
      const description =
        action.state === 'create' ? 'would add' : options.force ? 'would back up and replace' : 'would require --force'
      console.log(`${description}  ${action.destination}`)
      continue
    }

    await fs.mkdir(path.dirname(action.destination), { recursive: true })
    if (action.state === 'replace') {
      const backup = await nextBackupPath(action.destination)
      await fs.copyFile(action.destination, backup, fsConstants.COPYFILE_EXCL)
      console.log(`backup     ${backup}`)
    }

    const temporary = `${action.destination}.tmp-${process.pid}`
    try {
      await fs.writeFile(temporary, action.sourceData, { flag: 'wx' })
      if (windows && action.state === 'replace') await fs.unlink(action.destination)
      await fs.rename(temporary, action.destination)
    } catch (error) {
      await fs.rm(temporary, { force: true })
      throw error
    }
    console.log(`${action.state === 'create' ? 'installed' : 'replaced'}   ${action.destination}`)
  }

  if (options.dryRun) {
    console.log('\nDry run complete. No files were changed.')
  } else {
    console.log(`\n${tool.next({ directory })}`)
  }
}

async function main() {
  const { command, options } = parseArguments(process.argv.slice(2))
  if (!command || command === '--help' || command === '-h' || command === 'help') {
    console.log(usage())
    return
  }
  if (command === 'list') {
    for (const [name, tool] of Object.entries(tools)) console.log(`${name.padEnd(10)} ${tool.description}`)
    return
  }
  await install(command.toLowerCase(), options)
}

main().catch((error) => {
  console.error(`Error: ${error instanceof Error ? error.message : String(error)}`)
  process.exitCode = error && typeof error === 'object' && Number.isInteger(error.exitCode) ? error.exitCode : 1
})
