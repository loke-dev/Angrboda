import assert from 'node:assert/strict'
import test from 'node:test'
import { bumpFor } from '../scripts/next-release.mjs'

const commits = (...subjects) => subjects.map((subject) => ({ subject, body: '' }))

test('feat is a minor, fix and perf are patches', () => {
  assert.equal(bumpFor(commits('feat: add claude code port')), 'minor')
  assert.equal(bumpFor(commits('fix: stop the demo lying')), 'patch')
  assert.equal(bumpFor(commits('perf: shrink the bundle')), 'patch')
})

test('scopes are allowed', () => {
  assert.equal(bumpFor(commits('feat(ports): add claude code')), 'minor')
  assert.equal(bumpFor(commits('fix(website): palette weighting')), 'patch')
})

test('the highest bump in the range wins', () => {
  assert.equal(bumpFor(commits('fix: a', 'feat: b', 'fix: c')), 'minor')
  assert.equal(bumpFor(commits('feat: a', 'fix!: b')), 'major')
})

test('breaking changes are major, flagged either way', () => {
  assert.equal(bumpFor(commits('feat!: recolour every scope')), 'major')
  assert.equal(bumpFor([{ subject: 'fix: recolour', body: 'BREAKING CHANGE: every scope moves' }]), 'major')
})

test('non-releasing types produce none', () => {
  assert.equal(bumpFor(commits('docs: changelog', 'chore: deps', 'ci: bump action', 'test: add case')), 'none')
  assert.equal(bumpFor(commits('refactor: tidy', 'style: format')), 'none')
})

test('a release commit alone produces none, which breaks the trigger loop', () => {
  assert.equal(bumpFor(commits('chore(release): 2.0.1')), 'none')
})

test('unparseable subjects are ignored rather than assumed releasable', () => {
  assert.equal(bumpFor(commits('WIP', 'Merge branch master', 'updated stuff')), 'none')
})

test('releasing commits still count alongside noise', () => {
  assert.equal(bumpFor(commits('chore: deps', 'wip', 'fix: real bug')), 'patch')
})

test('no commits means no release', () => {
  assert.equal(bumpFor([]), 'none')
})
