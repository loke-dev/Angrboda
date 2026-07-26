import assert from 'node:assert/strict'
import { spawnSync } from 'node:child_process'

type PackResult = {
  files: Array<{ path: string }>
  name: string
  version: string
}

const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'
const result = spawnSync(npm, ['pack', '--dry-run', '--json'], {
  encoding: 'utf8',
  env: { ...process.env, npm_config_loglevel: 'silent' },
})

assert.equal(result.status, 0, result.stderr)
const packs = JSON.parse(result.stdout) as PackResult[]
assert.equal(packs.length, 1)
const pack = packs[0]
assert.ok(pack)
assert.equal(pack.name, 'angrboda')

const files = new Set(pack.files.map(({ path }) => path))
for (const required of [
  'install.mjs',
  'ports/README.md',
  'ports/gemini-cli/angrboda-dark.json',
  'ports/ghostty/Angrboda Dark',
  'ports/opencode/angrboda.json',
  'ports/zed/angrboda.json',
  'themes/angrboda-dark-color-theme.json',
]) {
  assert.ok(files.has(required), `npm package must include ${required}`)
}

console.log(`Validated angrboda@${pack.version} npm package with ${files.size} files.`)
