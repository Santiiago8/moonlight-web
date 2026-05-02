export default function Manifesto() {
  return (
    <section id="nosotros" style={{
      padding: '80px 24px',
      maxWidth: '560px',
      margin: '0 auto',
      textAlign: 'center',
      borderBottom: '0.5px solid var(--color-border)',
    }}>
      <p style={{
        fontSize: '10px',
        letterSpacing: '0.3em',
        color: 'var(--color-text-muted)',
        marginBottom: '40px',
        textTransform: 'uppercase',
      }}>
        — nosotros —
      </p>

      <p style={{
        fontFamily: 'var(--font-serif)',
        fontSize: 'clamp(18px, 3vw, 24px)',
        fontStyle: 'italic',
        fontWeight: 300,
        color: 'var(--color-text-secondary)',
        lineHeight: 1.8,
        marginBottom: '32px',
      }}>
        "Mejores son dos que uno, porque tienen mejor paga de su trabajo. Porque si cayeren, el uno levantará a su compañero."
      </p>

      <p style={{
        fontSize: '10px',
        letterSpacing: '0.2em',
        color: 'var(--color-text-muted)',
        marginBottom: '40px',
      }}>
        — Eclesiastés 4:9-10 —
      </p>

      <p style={{
        fontSize: '13px',
        letterSpacing: '0.06em',
        color: 'var(--color-text-muted)',
        lineHeight: 1.9,
        maxWidth: '420px',
        margin: '0 auto',
      }}>
        MOONLIGHT nació con el propósito de crear ropa que no solo se viste, sino que se vive. Cada prenda lleva un mensaje. Cada detalle tiene intención.
      </p>
    </section>
  )
}