'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useCart } from '@/lib/CartContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(true)
  const { totalItems } = useCart()
  const router = useRouter()

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      background: '#0a0a0aee',
      backdropFilter: 'blur(8px)',
      borderBottom: '0.5px solid var(--color-border)',
      padding: '0 28px',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}>

      {/* Logo */}
      <Link href='/' style={{
        fontFamily: 'var(--font-serif)',
        fontSize: '20px',
        letterSpacing: '0.2em',
        color: 'var(--color-text-primary)',
        textDecoration: 'none',
      }}>
        MOONLIGHT®
      </Link>

      {/* Links — solo desktop + carrito */}
      {!isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          {['inicio', 'tienda', 'nosotros'].map((item) => (
            <Link
              key={item}
              href={item === 'inicio' ? '/' : `#${item}`}
              style={{
                fontSize: '14px',
                letterSpacing: '0.15em',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
                textTransform: 'lowercase',
              }}
            >
              {item}
            </Link>
          ))}
          <button
            onClick={() => router.push('/checkout')}
            style={{
              background: 'none',
              border: '0.5px solid var(--color-border)',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.15em',
              padding: '6px 14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            carrito
            {totalItems > 0 && (
              <span style={{
                background: 'var(--color-text-secondary)',
                color: '#0a0a0a',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {totalItems}
              </span>
            )}
          </button>
        </div>
      )}

      {/* Hamburger — carrito y hamburger */}
      {isMobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button
            onClick={() => router.push('/checkout')}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--color-text-secondary)',
              cursor: 'pointer',
              fontSize: '11px',
              letterSpacing: '0.15em',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: 0,
            }}
          >
            carrito
            {totalItems > 0 && (
              <span style={{
                background: 'var(--color-text-secondary)',
                color: '#0a0a0a',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </button>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              padding: '4px',
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                display: 'block',
                width: '22px',
                height: '0.5px',
                background: 'var(--color-text-secondary)',
              }} />
            ))}
          </button>
        </div>
      )}

      {/* Menu mobile desplegable */}
      {isMobile && menuOpen && (
        <div style={{
          position: 'fixed',
          top: '56px',
          left: 0,
          right: 0,
          background: '#0a0a0a',
          borderBottom: '0.5px solid var(--color-border)',
          padding: '20px 24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}>
          {['inicio', 'tienda', 'nosotros'].map((item) => (
            <Link
              key={item}
              href={item === 'inicio' ? '/' : `#${item}`}
              onClick={() => setMenuOpen(false)}
              style={{
                fontSize: '12px',
                letterSpacing: '0.15em',
                color: 'var(--color-text-secondary)',
                textDecoration: 'none',
              }}
            >
              {item}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}