import Link from 'next/link'
import Navbar from '@/components/Navbar'

export default function Confirmacion() {
  return (
    <main>
      <Navbar />
      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '96px 24px 60px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.3em',
          color: 'var(--color-text-muted)',
          marginBottom: '40px',
          textTransform: 'uppercase',
        }}>
          — pedido recibido —
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(32px, 6vw, 48px)',
          fontWeight: 300,
          color: 'var(--color-text-primary)',
          letterSpacing: '0.06em',
          lineHeight: 1.2,
          marginBottom: '24px',
        }}>
          Gracias por<br />tu pedido.
        </h1>

        <p style={{
          fontSize: '13px',
          color: 'var(--color-text-muted)',
          letterSpacing: '0.06em',
          lineHeight: 1.9,
          marginBottom: '16px',
        }}>
          Te enviamos un mail con los detalles.<br />
          Una vez confirmada la transferencia<br />
          coordinamos el envío.
        </p>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '14px',
          fontStyle: 'italic',
          color: 'var(--color-text-muted)',
          marginBottom: '8px',
          lineHeight: 1.7,
        }}>
          "Mejores son dos que uno."
        </p>

        <p style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: '#333',
          marginBottom: '48px',
        }}>
          — Eclesiastés 4:9 —
        </p>

        <Link href="/" style={{
          display: 'inline-block',
          padding: '12px 40px',
          border: '0.5px solid #444',
          color: 'var(--color-text-secondary)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textDecoration: 'none',
          textTransform: 'lowercase',
        }}>
          volver al inicio
        </Link>
      </div>
    </main>
  )
}