import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '../lib/CartContext'

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
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}