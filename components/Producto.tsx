'use client'

import Image from 'next/image'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const STOCK: Record<string, number> = {
  M: 4,
  L: 7,
  XL: 6,
  XXL: 2,
}

const IMAGENES = [
  '/images/tshirt1.jpg',
  '/images/tshirt2.jpg',
  '/images/tshirt3.jpg',
  '/images/tshirt4.jpg',
  '/images/tshirtmodel1.jpg'
]

export default function Producto() {
  const [talleSeleccionado, setTalleSeleccionado] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [imagenActual, setImagenActual] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
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

  const anterior = () => setImagenActual((prev) => (prev - 1 + IMAGENES.length) % IMAGENES.length)
  const siguiente = () => setImagenActual((prev) => (prev + 1) % IMAGENES.length)

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
    console.log('touch diff:', diff)
    if (diff > 50) siguiente()
    else if (diff < -50) anterior()
    setTouchStart(null)
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

       {/* Carousel */}
      <div style={{ position: 'relative', marginBottom: '28px' }}>
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchMove={(e) => e.preventDefault()}
          style={{
            width: '100%',
            aspectRatio: '3/4',
            position: 'relative',
            overflow: 'hidden',
            border: '0.5px solid var(--color-border)',
            cursor: 'grab',
          }}
        >
          <Image
            src={IMAGENES[imagenActual]}
            alt="T-Shirt Oversized MOONLIGHT"
            fill
            style={{
              objectFit: 'cover',
              animation: 'fadeIn 0.5s ease-in-out',
            }}
            priority
          />
        </div>

        {/* Botones desktop */}
        <button
          onClick={anterior}
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#0a0a0a99',
            border: '0.5px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ‹
        </button>

        <button
          onClick={siguiente}
          style={{
            position: 'absolute',
            right: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: '#0a0a0a99',
            border: '0.5px solid var(--color-border)',
            color: 'var(--color-text-secondary)',
            width: '32px',
            height: '32px',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ›
        </button>

        {/* Indicadores */}
        <div style={{
          position: 'absolute',
          bottom: '12px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '6px',
          zIndex: 10,
        }}>
          {IMAGENES.map((_, i) => (
            <button
              key={i}
              onClick={() => setImagenActual(i)}
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: i === imagenActual ? '#888' : '#333',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '24px',
        fontWeight: 400,
        letterSpacing: '0.1em',
        marginBottom: '8px',
        color: 'var(--color-text-primary)',
      }}>
        T-Shirt King of Kings
      </h2>

      <p style={{
        fontSize: '13px',
        color: 'var(--color-text-secondary)',
        letterSpacing: '0.08em',
        marginBottom: '28px',
      }}>
        $ 38.000
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