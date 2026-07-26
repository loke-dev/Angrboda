import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'

async function render(path = '/') {
  const workerUrl = new URL('../dist/server/index.js', import.meta.url)
  workerUrl.searchParams.set('test', `${process.pid}-${Date.now()}-${path}`)
  const { default: worker } = await import(workerUrl.href)

  return worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: 'text/html' },
    }),
    {
      ASSETS: {
        fetch: async () => new Response('Not found', { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  )
}

test('server-renders the Angrboða marketing site', async () => {
  const response = await render()
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type') ?? '', /^text\/html\b/i)

  const html = await response.text()
  assert.match(html, /Angrboða/)
  assert.match(html, /Color for the/)
  assert.match(html, /OpenCode/)
  assert.match(html, /Zed/)
  assert.match(html, /Base16/)
  assert.match(html, /Install for VS Code/)
  assert.match(html, /Download the complete bundle/)
  assert.match(html, /Skip the config scavenger hunt/)
  assert.match(html, /npx angrboda zed --dry-run/)
  assert.match(html, /angrboda-mark-v3\.svg/)
  assert.match(html, /angrboda-social-v3\.png/)
  assert.doesNotMatch(html, /ironwood-(?:mark|favicon)/)
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/)
})

test('server-renders deterministic dark and light capture surfaces', async () => {
  for (const mode of ['dark', 'light']) {
    const response = await render(`/preview?mode=${mode}`)
    assert.equal(response.status, 200)
    const html = await response.text()
    assert.match(html, new RegExp(`capture-page ${mode}`))
    assert.match(html, new RegExp(`Angrboða ${mode} theme preview`))
  }
})

test('keeps the decorative hero glow inside the mobile viewport', async () => {
  const css = await readFile(new URL('../app/globals.css', import.meta.url), 'utf8')

  assert.match(
    css,
    /@media \(max-width: 800px\)[\s\S]*?\.hero::before\s*\{[\s\S]*?width:\s*100vw;[\s\S]*?right:\s*-15px;/,
  )
})
