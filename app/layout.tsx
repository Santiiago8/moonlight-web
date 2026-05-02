import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MOONLIGHT®',
  description: 'Vestí con propósito.',
  openGraph: {
    title: 'MOONLIGHT®',
    description: 'Vestí con propósito.',
    siteName: 'MOONLIGHT®',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}