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
    }}>
      <p style={{
        fontSize: '10px',
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
        fontSize: '12px',
        letterSpacing: '0.15em',
        color: 'var(--color-text-secondary)',
        marginBottom: '32px',
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
      }}>
        "En el principio creó Dios los cielos y la tierra."
      </p>

      <p style={{
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: '#333',
        marginBottom: '48px',
      }}>
        — Génesis 1:1 —
      </p>

      <a href="#tienda" style={{
        display: 'inline-block',
        padding: '12px 40px',
        border: '0.5px solid #444',
        color: 'var(--color-text-secondary)',
        fontSize: '11px',
        letterSpacing: '0.2em',
        textDecoration: 'none',
        textTransform: 'lowercase',
        transition: 'all 0.3s',
      }}>
        ver colección
      </a>
    </section>
  )
}