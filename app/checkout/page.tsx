import { Suspense } from 'react'
import CheckoutContent from './CheckoutContent'

export default function Checkout() {
  return (
    <Suspense fallback={
      <main style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          color: 'var(--color-text-muted)',
        }}>
          cargando...
        </p>
      </main>
    }>
      <CheckoutContent />
    </Suspense>
  )
}