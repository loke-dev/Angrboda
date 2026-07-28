import assert from 'node:assert/strict'
import { promises as fs } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { spawnSync } from 'node:child_process'
import test from 'node:test'

const repositoryRoot = path.resolve(import.meta.dirname, '..')
const installer = path.join(repositoryRoot, 'install.mjs')

async function fixture() {
  const root = await fs.mkdtemp(path.join(os.tmpdir(), 'angrboda-installer-'))
  const target = path.join(root, 'target')
  const env = {
    ...process.env,
    HOME: root,
    XDG_CONFIG_HOME: path.join(root, 'config'),
  }
  return { env, root, target }
}

function run(args, env) {
  return spawnSync(process.execPath, [installer, ...args], {
    cwd: repositoryRoot,
    encoding: 'utf8',
    env,
  })
}

test('lists every safely automated port', () => {
  const result = run(['list'], process.env)
  assert.equal(result.status, 0, result.stderr)
  for (const tool of ['alacritty', 'codex', 'gemini', 'ghostty', 'helix', 'kitty', 'opencode', 'wezterm', 'zed']) {
    assert.match(result.stdout, new RegExp(`^${tool}\\s`, 'm'))
  }
})

test('installs a port, preserves identical files, and refuses conflicts', async () => {
  const { env, target } = await fixture()
  const destination = path.join(target, 'angrboda.json')

  const first = run(['zed', '--target', target], env)
  assert.equal(first.status, 0, first.stderr)
  assert.match(first.stdout, /installed/)
  assert.deepEqual(
    await fs.readFile(destination),
    await fs.readFile(path.join(repositoryRoot, 'ports/zed/angrboda.json')),
  )

  const second = run(['install', 'zed', '--target', target], env)
  assert.equal(second.status, 0, second.stderr)
  assert.match(second.stdout, /unchanged/)

  await fs.writeFile(destination, 'personal theme\n')
  const conflict = run(['zed', '--target', target], env)
  assert.equal(conflict.status, 2)
  assert.match(conflict.stderr, /Refusing to replace existing files/)
  assert.equal(await fs.readFile(destination, 'utf8'), 'personal theme\n')
})

test('force creates a recoverable backup before replacement', async () => {
  const { env, target } = await fixture()
  const destination = path.join(target, 'angrboda.json')
  await fs.mkdir(target, { recursive: true })
  await fs.writeFile(destination, 'personal theme\n')

  const result = run(['zed', '--target', target, '--force'], env)
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /backup/)
  assert.deepEqual(
    await fs.readFile(destination),
    await fs.readFile(path.join(repositoryRoot, 'ports/zed/angrboda.json')),
  )

  const backups = (await fs.readdir(target)).filter((name) => name.startsWith('angrboda.json.bak-'))
  assert.equal(backups.length, 1)
  assert.equal(await fs.readFile(path.join(target, backups[0]), 'utf8'), 'personal theme\n')
})

test('dry-run reports actions without touching the filesystem', async () => {
  const { env, target } = await fixture()
  const result = run(['ghostty', '--target', target, '--dry-run'], env)
  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /would add/)
  assert.match(result.stdout, /No files were changed/)
  await assert.rejects(fs.stat(target), { code: 'ENOENT' })
})

test('dry-run reports conflicts that require force without replacing them', async () => {
  const { env, target } = await fixture()
  const destination = path.join(target, 'angrboda.json')
  await fs.mkdir(target, { recursive: true })
  await fs.writeFile(destination, 'personal theme\n')

  const result = run(['zed', '--target', target, '--dry-run'], env)

  assert.equal(result.status, 0, result.stderr)
  assert.match(result.stdout, /would require --force/)
  assert.doesNotMatch(result.stdout, /would back up and replace/)
  assert.equal(await fs.readFile(destination, 'utf8'), 'personal theme\n')
})

test('every supported port resolves its bundled source files', async () => {
  const { env, root } = await fixture()
  for (const tool of ['alacritty', 'codex', 'gemini', 'ghostty', 'helix', 'kitty', 'opencode', 'wezterm', 'zed']) {
    const result = run([tool, '--target', path.join(root, tool), '--dry-run'], env)
    assert.equal(result.status, 0, `${tool}: ${result.stderr}`)
  }
})
