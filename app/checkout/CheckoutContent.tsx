'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'

const PRECIO = 38000

export default function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const talle = searchParams.get('talle') || ''

  const [form, setForm] = useState({
    nombre: '',
    email: '',
    telefono: '',
    ciudad: '',
    codigoPostal: '',
    metodoPago: 'transferencia',
    retiroPersonal: false,
  })

  const [costoEnvio, setCostoEnvio] = useState<number | null>(null)
  const [loadingEnvio, setLoadingEnvio] = useState(false)
  const [enviando, setEnviando] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const cotizarEnvio = async () => {
    if (!form.codigoPostal || form.codigoPostal.length < 4) return
    setLoadingEnvio(true)
    try {
      const res = await fetch(`/api/envio?cp=${form.codigoPostal}`)
      const data = await res.json()
      setCostoEnvio(data.costo)
    } catch {
      setCostoEnvio(null)
    } finally {
      setLoadingEnvio(false)
    }
  }

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.ciudad || !form.codigoPostal) {
      setError('Completá todos los campos antes de confirmar.')
      return
    }
    setError('')
    setEnviando(true)
    try {
      const res = await fetch('/api/pedido', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, talle, precio: PRECIO, costoEnvio }),
      })
      if (res.ok) {
        router.push('/checkout/confirmacion')
      } else {
        setError('Hubo un error al procesar el pedido. Intentá de nuevo.')
      }
    } catch {
      setError('Hubo un error al procesar el pedido. Intentá de nuevo.')
    } finally {
      setEnviando(false)
    }
  }

  const inputStyle = {
    width: '100%',
    height: '40px',
    background: 'var(--color-surface)',
    border: '0.5px solid var(--color-border)',
    padding: '0 12px',
    color: 'var(--color-text-primary)',
    fontSize: '12px',
    letterSpacing: '0.06em',
    outline: 'none',
  }

  const labelStyle = {
    display: 'block',
    fontSize: '10px',
    letterSpacing: '0.15em',
    color: 'var(--color-text-muted)',
    marginBottom: '8px',
    textTransform: 'uppercase' as const,
  }

  const total = PRECIO + (costoEnvio || 0)

  return (
    <main>
      <Navbar />
      <div style={{
        maxWidth: '480px',
        margin: '0 auto',
        padding: '96px 24px 60px',
      }}>
        <p style={{
          fontSize: '10px',
          letterSpacing: '0.3em',
          color: 'var(--color-text-muted)',
          textAlign: 'center',
          marginBottom: '40px',
          textTransform: 'uppercase',
        }}>
          — tu pedido —
        </p>

        {/* Resumen producto */}
        <div style={{
          border: '0.5px solid var(--color-border)',
          padding: '16px',
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <p style={{
              fontSize: '13px',
              color: 'var(--color-text-primary)',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '0.08em',
            }}>
              T-Shirt King of Kings
            </p>
            <p style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.1em',
              marginTop: '4px',
            }}>
              talle {talle}
            </p>
          </div>
          <p style={{ fontSize: '13px', color: 'var(--color-text-secondary)' }}>
            $ {PRECIO.toLocaleString()}
          </p>
        </div>

        {/* Datos personales */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
          <div>
            <label style={labelStyle}>nombre completo</label>
            <input name="nombre" value={form.nombre} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>correo electrónico</label>
            <input name="email" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>teléfono</label>
            <input name="telefono" value={form.telefono} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>ciudad</label>
            <input name="ciudad" value={form.ciudad} onChange={handleChange} style={inputStyle} />
          </div>
          <div>
            <label style={labelStyle}>código postal</label>
            <input
              name="codigoPostal"
              value={form.codigoPostal}
              onChange={handleChange}
              onBlur={cotizarEnvio}
              style={inputStyle}
              placeholder="ej: 5300"
            />
          </div>
        </div>

        {/* Método de pago */}
        <p style={{ ...labelStyle, marginBottom: '12px' }}>método de pago</p>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['transferencia', 'efectivo'].map((metodo) => (
            <button
              key={metodo}
              onClick={() => setForm(prev => ({ ...prev, metodoPago: metodo }))}
              style={{
                flex: 1,
                padding: '12px',
                border: form.metodoPago === metodo
                  ? '0.5px solid #666'
                  : '0.5px solid var(--color-border)',
                background: 'transparent',
                color: form.metodoPago === metodo
                  ? 'var(--color-text-primary)'
                  : 'var(--color-text-muted)',
                fontSize: '11px',
                letterSpacing: '0.12em',
                cursor: 'pointer',
                textTransform: 'lowercase',
              }}
            >
              {metodo}
            </button>
          ))}
        </div>

        {/* Datos bancarios */}
        {form.metodoPago === 'transferencia' && (
          <div style={{
            border: '0.5px solid var(--color-border)',
            padding: '16px',
            marginBottom: '24px',
          }}>
            <p style={{ ...labelStyle, marginBottom: '10px' }}>datos para transferir</p>
            <p style={{
              fontSize: '12px',
              color: 'var(--color-text-muted)',
              lineHeight: 2,
              letterSpacing: '0.06em',
            }}>
              CBU: 4530000800013925074504<br />
              Alias: MOONLIGHT.LR<br />
              Titular: Santiago Ceballos Palacios
            </p>
          </div>
        )}

        {/* Retiro personal */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '24px',
        }}>
          <input
            type="checkbox"
            name="retiroPersonal"
            id="retiro"
            checked={form.retiroPersonal}
            onChange={handleChange}
            style={{ accentColor: '#666', width: '14px', height: '14px' }}
          />
          <label htmlFor="retiro" style={{
            fontSize: '11px',
            color: 'var(--color-text-muted)',
            letterSpacing: '0.1em',
            cursor: 'pointer',
          }}>
            retiro en persona — La Rioja capital
          </label>
        </div>

        {/* Costo de envío */}
        {!form.retiroPersonal && (
          <div style={{
            border: '0.5px solid var(--color-border)',
            padding: '14px 16px',
            marginBottom: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <p style={{
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.1em',
            }}>
              costo de envío
            </p>
            <p style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
              {loadingEnvio
                ? 'calculando...'
                : costoEnvio !== null
                  ? `$ ${costoEnvio.toLocaleString()}`
                  : 'ingresá tu CP'}
            </p>
          </div>
        )}

        {/* Total */}
        <div style={{
          borderTop: '0.5px solid var(--color-border)',
          paddingTop: '16px',
          marginBottom: '28px',
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          <p style={{
            fontSize: '12px',
            color: 'var(--color-text-secondary)',
            letterSpacing: '0.1em',
          }}>
            total
          </p>
          <p style={{
            fontSize: '14px',
            color: 'var(--color-text-primary)',
            fontFamily: 'var(--font-serif)',
          }}>
            $ {form.retiroPersonal ? PRECIO.toLocaleString() : total.toLocaleString()}
          </p>
        </div>

        {error && (
          <p style={{
            fontSize: '11px',
            color: '#a05050',
            letterSpacing: '0.08em',
            marginBottom: '16px',
            textAlign: 'center',
          }}>
            {error}
          </p>
        )}

        <button
          onClick={handleSubmit}
          disabled={enviando}
          style={{
            width: '100%',
            padding: '14px',
            border: '0.5px solid #444',
            background: 'transparent',
            color: enviando ? 'var(--color-text-muted)' : 'var(--color-text-secondary)',
            fontSize: '11px',
            letterSpacing: '0.2em',
            cursor: enviando ? 'not-allowed' : 'pointer',
            textTransform: 'lowercase',
          }}
        >
          {enviando ? 'procesando...' : 'confirmar pedido'}
        </button>
      </div>
    </main>
  )
}