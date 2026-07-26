import type { Metadata } from 'next'
import { showcaseCode } from '../showcase-data'
import { ThemeShowcase, type ShowcaseMode } from '../theme-showcase'

export const metadata: Metadata = {
  title: 'Angrboða theme preview',
  robots: { index: false, follow: false },
}

export default async function Preview({ searchParams }: { searchParams: Promise<{ mode?: string }> }) {
  const mode: ShowcaseMode = (await searchParams).mode === 'light' ? 'light' : 'dark'

  return (
    <main className={`capture-page ${mode}`}>
      <div className="capture-frame">
        <ThemeShowcase code={showcaseCode} initialMode={mode} />
      </div>
    </main>
  )
}
