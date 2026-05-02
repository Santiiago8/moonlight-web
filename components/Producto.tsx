'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STOCK: Record<string, number> = {
  M: 4,
  L: 7,
  XL: 6,
  XXL: 2,
}

export default function Producto() {
  const [talleSeleccionado, setTalleSeleccionado] = useState<string | null>(null)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleAgregar = () => {
    if (!talleSeleccionado) {
      setError('Seleccioná un talle para continuar.')
      return
    }
    if (STOCK[talleSeleccionado] === 0) {
      setError('No hay stock disponible en ese talle.')
      return
    }
    setError('')
    router.push(`/checkout?talle=${talleSeleccionado}`)
  }

  return (
    <section id="tienda" style={{
      padding: '80px 24px',
      maxWidth: '480px',
      margin: '0 auto',
      borderBottom: '0.5px solid var(--color-border)',
    }}>
      <p style={{
        fontSize: '10px',
        letterSpacing: '0.3em',
        color: 'var(--color-text-muted)',
        textAlign: 'center',
        marginBottom: '40px',
        textTransform: 'uppercase',
      }}>
        — colección —
      </p>

      {/* Imagen placeholder — reemplazar con <Image> cuando tengas las fotos */}
      <div style={{
        width: '100%',
        aspectRatio: '3/4',
        background: 'var(--color-surface)',
        border: '0.5px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '28px',
      }}>
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.1em' }}>
          foto producto
        </p>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '24px',
        fontWeight: 400,
        letterSpacing: '0.1em',
        marginBottom: '8px',
        color: 'var(--color-text-primary)',
      }}>
        T-Shirt Oversized
      </h2>

      <p style={{
        fontSize: '13px',
        color: 'var(--color-text-secondary)',
        letterSpacing: '0.08em',
        marginBottom: '28px',
      }}>
        $ ·····
      </p>

      {/* Selector de talles */}
      <p style={{
        fontSize: '10px',
        letterSpacing: '0.15em',
        color: 'var(--color-text-muted)',
        marginBottom: '12px',
        textTransform: 'uppercase',
      }}>
        talle
      </p>

      <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
        {Object.entries(STOCK).map(([talle, stock]) => (
          <button
            key={talle}
            onClick={() => { setTalleSeleccionado(talle); setError('') }}
            disabled={stock === 0}
            style={{
              width: '44px',
              height: '44px',
              border: talleSeleccionado === talle
                ? '0.5px solid #888'
                : '0.5px solid var(--color-border)',
              background: 'transparent',
              color: stock === 0
                ? 'var(--color-text-muted)'
                : talleSeleccionado === talle
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-secondary)',
              fontSize: '11px',
              letterSpacing: '0.08em',
              cursor: stock === 0 ? 'not-allowed' : 'pointer',
              textDecoration: stock === 0 ? 'line-through' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {talle}
          </button>
        ))}
      </div>

      {error && (
        <p style={{
          fontSize: '11px',
          color: '#a05050',
          letterSpacing: '0.08em',
          marginBottom: '16px',
        }}>
          {error}
        </p>
      )}

      <button
        onClick={handleAgregar}
        style={{
          width: '100%',
          padding: '14px',
          border: '0.5px solid #444',
          background: 'transparent',
          color: 'var(--color-text-secondary)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          cursor: 'pointer',
          textTransform: 'lowercase',
          transition: 'all 0.3s',
        }}
      >
        agregar al pedido
      </button>
    </section>
  )
}