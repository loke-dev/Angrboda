import { readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'

const allowedLevels = ['patch', 'minor', 'major']
const rawLevel = process.argv[2]
const requestedLevel = rawLevel?.startsWith('--') ? rawLevel.slice(2) : rawLevel
const bumpLevel = allowedLevels.includes(requestedLevel) ? requestedLevel : null

function run(command, args, options = {}) {
  const result = spawnSync(command, args, {
    stdio: 'inherit',
    shell: false,
    ...options,
  })

  if (result.status !== 0) {
    process.exit(result.status ?? 1)
  }
}

function getPackageVersion() {
  const packageJson = JSON.parse(readFileSync('./package.json', 'utf8'))
  return packageJson.version
}

if (process.argv.includes('--help') || process.argv.includes('-h')) {
  console.log('Usage: pnpm run release [-- <patch|minor|major>]')
  process.exit(0)
}

const initialVersion = getPackageVersion()
console.log(`Preparing release from v${initialVersion}...`)

console.log('• Running full checks')
run('pnpm', ['run', 'check'])

if (rawLevel) {
  if (!bumpLevel) {
    console.error(`Release bump must be one of: ${allowedLevels.join(', ')}`)
    process.exit(1)
  }

  if (bumpLevel !== 'patch') {
    console.log(`• Bumping ${bumpLevel} version`)
  } else {
    console.log('• Bumping patch version')
  }

  run('pnpm', ['version', bumpLevel])
} else {
  console.log('• Bumping patch version (default)')
  run('pnpm', ['version', 'patch'])
}

const nextVersion = getPackageVersion()
const tag = `v${nextVersion}`

console.log(`• Packaging Angrboða ${tag}`)
run('pnpm', ['run', 'package:vsix'])
run('pnpm', ['run', 'package:bundle'])

if (process.env.VSCE_PAT) {
  console.log('• Publishing to VS Code Marketplace')
  run('pnpm', ['run', 'publish:marketplace', '--', '--pat', process.env.VSCE_PAT])
} else {
  console.log('• Skipped marketplace publish (set VSCE_PAT to enable)')
}

console.log(`\nDone: ${tag}`)
console.log('\nNext steps:')
console.log('  git push origin master --follow-tags')
console.log(`  gh release create ${tag} --generate-notes --title ${tag} *.vsix dist/*.zip`)
