#!/usr/bin/env node

// Works out the semver bump for the commits since the last release tag, using
// Conventional Commits. Prints `major`, `minor`, `patch`, or `none`.
//
// `none` is the important one: it keeps docs and chore pushes from cutting a
// release, and it is what stops the release workflow re-triggering on its own
// version commit.

import { spawnSync } from 'node:child_process'

const git = (...args) => {
  const result = spawnSync('git', args, { encoding: 'utf8' })
  if (result.status !== 0) return null
  return result.stdout.trim()
}

const RELEASING = new Set(['feat', 'fix', 'perf', 'revert'])
const MINOR = new Set(['feat'])

/** A commit subject looks like `type(optional scope)!: summary`. */
const HEADER = /^(?<type>[a-z]+)(?<scope>\([^)]*\))?(?<breaking>!)?:\s/

export function bumpFor(commits) {
  let bump = 'none'
  for (const { subject, body } of commits) {
    const header = HEADER.exec(subject)
    // A breaking change is major whether it is flagged with `!` or in the body.
    if (/^BREAKING[ -]CHANGE:/m.test(body) || header?.groups?.breaking) return 'major'
    const type = header?.groups?.type
    if (!type || !RELEASING.has(type)) continue
    if (MINOR.has(type)) bump = 'minor'
    else if (bump === 'none') bump = 'patch'
  }
  return bump
}

export function commitsSince(range) {
  // %x00 and %x01 delimit fields and records, so multi-line bodies survive.
  const log = git('log', '--no-merges', '--format=%s%x00%b%x01', range)
  if (!log) return []
  return log
    .split('\x01')
    .map((record) => record.replace(/^\n/, ''))
    .filter(Boolean)
    .map((record) => {
      const [subject = '', body = ''] = record.split('\x00')
      return { subject, body }
    })
}

if (import.meta.filename === process.argv[1]) {
  const lastTag = git('describe', '--tags', '--abbrev=0', '--match', 'v*')
  const range = lastTag ? `${lastTag}..HEAD` : 'HEAD'
  const commits = commitsSince(range)
  const bump = bumpFor(commits)

  if (process.argv.includes('--explain')) {
    console.error(`Since ${lastTag ?? 'the first commit'}: ${commits.length} commit(s)`)
    for (const { subject } of commits) console.error(`  ${subject}`)
    console.error(`Bump: ${bump}`)
  }

  console.log(bump)
}
