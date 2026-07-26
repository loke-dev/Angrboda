import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://angrboda.loke.dev'),
  title: 'Angrboða — Color for the bright and the buried',
  description: 'A mythic red and violet theme for VS Code, Cursor, terminals, Chrome, and AI coding tools.',
  alternates: { canonical: '/' },
  icons: { icon: '/ironwood-favicon-v2.svg', shortcut: '/ironwood-favicon-v2.svg' },
  openGraph: {
    title: 'Angrboða',
    description: 'Color for the bright and the buried.',
    type: 'website',
    url: '/',
    images: [
      {
        url: '/angrboda-social-v2.png',
        width: 1200,
        height: 630,
        alt: 'Angrboða — Color for the bright and the buried.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Angrboða',
    description: 'Color for the bright and the buried.',
    images: ['/angrboda-social-v2.png'],
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
