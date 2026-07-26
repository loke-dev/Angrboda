'use client'

import { useState } from 'react'
import type { ShowcaseToken } from './showcase-data'

export type ShowcaseMode = 'dark' | 'light'

export function ThemeShowcase({
  code,
  initialMode = 'dark',
}: {
  code: readonly ShowcaseToken[]
  initialMode?: ShowcaseMode
}) {
  const [mode, setMode] = useState<ShowcaseMode>(initialMode)
  const lines = [code.slice(0, 9), code.slice(9, 10), code.slice(10, 18), code.slice(18, 24), code.slice(24)]

  return (
    <div className={`showcase ${mode}`} aria-label={`Angrboða ${mode} theme preview`}>
      <div className="window-bar">
        <div className="traffic-lights" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <span>prophecy.ts</span>
        <div className="mode-toggle" aria-label="Preview color mode">
          <button
            className={mode === 'dark' ? 'active' : ''}
            onClick={() => setMode('dark')}
            aria-pressed={mode === 'dark'}
          >
            Dark
          </button>
          <button
            className={mode === 'light' ? 'active' : ''}
            onClick={() => setMode('light')}
            aria-pressed={mode === 'light'}
          >
            Light
          </button>
        </div>
      </div>
      <div className="editor">
        <aside aria-hidden="true">
          <span>EXPLORER</span>
          <b>ANGRBODA</b>
          <p>⌄ src</p>
          <p className="selected">◇ prophecy.ts</p>
          <p>◇ palette.ts</p>
          <p>◇ ports.ts</p>
          <p>README.md</p>
        </aside>
        <pre aria-label="TypeScript code sample">
          <code>
            {lines.map((line, lineIndex) => (
              <span className="code-line" key={lineIndex}>
                <span className="line-number">{lineIndex + 1}</span>
                {line.map(([type, value], tokenIndex) => (
                  <span className={`token-${type}`} key={tokenIndex}>
                    {value}
                  </span>
                ))}
                {'\n'}
              </span>
            ))}
          </code>
        </pre>
      </div>
      <div className="status-bar">
        <span>master*</span>
        <span>Ln 4, Col 13 · TypeScript · UTF-8</span>
      </div>
    </div>
  )
}
