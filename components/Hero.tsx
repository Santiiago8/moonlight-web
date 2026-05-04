export default function Hero() {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '80px 24px 60px',
      borderBottom: '0.5px solid var(--color-border)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Imagen de fondo */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'url(/images/hero.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        opacity: 0.99,
        zIndex: 0,
      }} />

      {/* Overlay degradado */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, #0a0a0a22, #0a0a0a66, #0a0a0a)',
        zIndex: 1,
      }} />

      {/* Contenido */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.3em',
          color: 'var(--color-text-muted)',
          marginBottom: '24px',
          textTransform: 'uppercase',
        }}>
          since 2000 a.c.
        </p>

        <h1 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(48px, 10vw, 88px)',
          fontWeight: 300,
          color: 'var(--color-text-primary)',
          letterSpacing: '0.06em',
          lineHeight: 1.1,
          marginBottom: '20px',
        }}>
          Vestí con<br />propósito.
        </h1>

        <p style={{
          fontSize: '14px',
          letterSpacing: '0.20em',
          color: 'var(--color-text-secondary)',
          marginBottom: '32px',
          marginTop: '32px',
        }}>
          ropa que lleva un mensaje
        </p>

        <p style={{
          fontFamily: 'var(--font-serif)',
          fontSize: '14px',
          fontStyle: 'italic',
          color: 'var(--color-text-muted)',
          marginBottom: '8px',
          maxWidth: '360px',
          lineHeight: 1.7,
          justifyContent: 'center',
          display: 'flex',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          "En el principio creó Dios los cielos y la tierra."
        </p>

        <p style={{
          fontSize: '10px',
          letterSpacing: '0.2em',
          color: 'var(--color-text-muted)',
          marginBottom: '48px',
        }}>
          — Génesis 1:1 —
        </p>

        <a href="#tienda" style={{
          display: 'inline-block',
          padding: '12px 40px',
          border: '0.5px solid #c2c2c2',
          color: 'var(--color-text-secondary)',
          fontSize: '11px',
          letterSpacing: '0.2em',
          textDecoration: 'none',
          textTransform: 'lowercase',
        }}>
          ver colección
        </a>
      </div>
    </section>
  )
}