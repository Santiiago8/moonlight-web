'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useCart } from '@/lib/CartContext'

const IMAGENES = [
  '/images/tshirt1.jpg',
  '/images/tshirt2.jpg',
  '/images/tshirt3.jpg',
  '/images/tshirt4.jpg',
  '/images/tshirtmodel1.jpg'
]

const TALLES = ['M', 'L', 'XL', 'XXL']

export default function Producto() {
  const [stock, setStock] = useState<Record<string, number>>({})
  const [loadingStock, setLoadingStock] = useState(true)
  const [talleSeleccionado, setTalleSeleccionado] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [agregado, setAgregado] = useState(false)
  const [imagenActual, setImagenActual] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const { agregarItem, quitarItem, items } = useCart()
  const router = useRouter()

  useEffect(() => {
    const fetchStock = async () => {
      try {
        const res = await fetch('/api/stock')
        const data = await res.json()
        setStock(data.stock)
      } catch {
        setStock({ M: 0, L: 0, XL: 0, XXL: 0 })
      } finally {
        setLoadingStock(false)
      }
    }
    fetchStock()
  }, [])

  const handleAgregar = () => {
    if (!talleSeleccionado) {
      setError('Seleccioná un talle para continuar.')
      return
    }
    const stockDisponible = stock[talleSeleccionado] || 0
    const enCarrito = items.find(i => i.talle === talleSeleccionado)?.cantidad || 0
    if (enCarrito >= stockDisponible) {
      setError(`No hay más stock disponible en talle ${talleSeleccionado}.`)
      return
    }
    agregarItem(talleSeleccionado, stockDisponible)
    setError('')
    setAgregado(true)
    setTimeout(() => setAgregado(false), 2000)
  }

  const anterior = () => setImagenActual((prev) => (prev - 1 + IMAGENES.length) % IMAGENES.length)
  const siguiente = () => setImagenActual((prev) => (prev + 1) % IMAGENES.length)

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.touches[0].clientX)
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const diff = touchStart - e.changedTouches[0].clientX
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
            alt="T-Shirt King of Kings MOONLIGHT"
            fill
            style={{ objectFit: 'cover', animation: 'fadeIn 0.5s ease-in-out' }}
            priority
          />
        </div>

        <button onClick={anterior} style={{
          position: 'absolute', left: '12px', top: '50%',
          transform: 'translateY(-50%)', background: '#0a0a0a99',
          border: '0.5px solid var(--color-border)', color: 'var(--color-text-secondary)',
          width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
        }}>‹</button>

        <button onClick={siguiente} style={{
          position: 'absolute', right: '12px', top: '50%',
          transform: 'translateY(-50%)', background: '#0a0a0a99',
          border: '0.5px solid var(--color-border)', color: 'var(--color-text-secondary)',
          width: '32px', height: '32px', cursor: 'pointer', fontSize: '18px',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10,
        }}>›</button>

        <div style={{
          position: 'absolute', bottom: '12px', left: '50%',
          transform: 'translateX(-50%)', display: 'flex', gap: '6px', zIndex: 10,
        }}>
          {IMAGENES.map((_, i) => (
            <button key={i} onClick={() => setImagenActual(i)} style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: i === imagenActual ? '#888' : '#333',
              border: 'none', cursor: 'pointer', padding: 0,
            }} />
          ))}
        </div>
      </div>

      <h2 style={{
        fontFamily: 'var(--font-serif)', fontSize: '24px', fontWeight: 400,
        letterSpacing: '0.1em', marginBottom: '8px', color: 'var(--color-text-primary)',
      }}>
        T-Shirt King of Kings
      </h2>

      <p style={{
        fontSize: '13px', color: 'var(--color-text-secondary)',
        letterSpacing: '0.08em', marginBottom: '28px',
      }}>
        $ 38.000
      </p>

      <p style={{
        fontSize: '10px', letterSpacing: '0.15em', color: 'var(--color-text-muted)',
        marginBottom: '12px', textTransform: 'uppercase',
      }}>
        talle
      </p>

      {loadingStock ? (
        <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.1em', marginBottom: '24px' }}>
          cargando talles...
        </p>
      ) : (
        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
          {TALLES.map((talle) => {
            const stockDisponible = stock[talle] || 0
            const enCarrito = items.find(i => i.talle === talle)?.cantidad || 0
            const agotado = stockDisponible === 0 || enCarrito >= stockDisponible
            return (
              <button
                key={talle}
                onClick={() => { setTalleSeleccionado(talle); setError('') }}
                disabled={agotado}
                style={{
                  width: '44px', height: '44px',
                  border: talleSeleccionado === talle ? '0.5px solid #888' : '0.5px solid var(--color-border)',
                  background: 'transparent',
                  color: agotado ? 'var(--color-text-muted)' : talleSeleccionado === talle ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                  fontSize: '11px', letterSpacing: '0.08em',
                  cursor: agotado ? 'not-allowed' : 'pointer',
                  textDecoration: agotado ? 'line-through' : 'none',
                  transition: 'all 0.2s',
                }}
              >
                {talle}
              </button>
            )
          })}
        </div>
      )}

      {/* Items en carrito */}
      {items.length > 0 && (
        <div style={{ marginBottom: '16px' }}>
          {items.map(item => (
            <div key={item.talle} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '6px',
            }}>
              <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.08em' }}>
                {item.talle} — {item.cantidad} {item.cantidad === 1 ? 'unidad' : 'unidades'}
              </p>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <button
                  onClick={() => agregarItem(item.talle, stock[item.talle] || 0)}
                  style={{
                    background: 'none', border: '0.5px solid var(--color-border)',
                    color: 'var(--color-text-muted)', cursor: 'pointer',
                    width: '22px', height: '22px', fontSize: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >+</button>
                <button
                  onClick={() => quitarItem(item.talle)}
                  style={{
                    background: 'none', border: '0.5px solid var(--color-border)',
                    color: 'var(--color-text-muted)', cursor: 'pointer',
                    width: '22px', height: '22px', fontSize: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}
                >−</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {error && (
        <p style={{ fontSize: '11px', color: '#a05050', letterSpacing: '0.08em', marginBottom: '16px' }}>
          {error}
        </p>
      )}

      <button
        onClick={handleAgregar}
        style={{
          width: '100%', padding: '14px',
          border: '0.5px solid #444', background: 'transparent',
          color: agregado ? '#6a8a6a' : 'var(--color-text-secondary)',
          fontSize: '11px', letterSpacing: '0.2em',
          cursor: 'pointer', textTransform: 'lowercase', transition: 'all 0.3s',
        }}
      >
        {agregado ? 'agregado al carrito ✓' : 'agregar al carrito'}
      </button>

      {items.length > 0 && (
        <button
          onClick={() => router.push('/checkout')}
          style={{
            width: '100%', padding: '14px', marginTop: '8px',
            border: '0.5px solid #666', background: 'transparent',
            color: 'var(--color-text-primary)', fontSize: '11px',
            letterSpacing: '0.2em', cursor: 'pointer',
            textTransform: 'lowercase', transition: 'all 0.3s',
          }}
        >
          ir al checkout →
        </button>
      )}
    </section>
  )
}