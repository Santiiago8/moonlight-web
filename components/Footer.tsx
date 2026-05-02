export default function Footer() {
    return (
        <footer style={{
            padding: '32px 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderTop: '0.5px solid var(--color-border)',
            flexWrap: 'wrap',
            gap: '16px',
        }}>
            <p style={{
                fontFamily: 'var(--font-serif)',
                fontSize: '13px',
                letterSpacing: '0.2em',
                color: 'var(--color-text-muted)',
            }}>
                MOONLIGHT® since 2000 a.c.
            </p>

            <div style={{ display: 'flex', gap: '24px' }}>
                <a
                 href="https://instagram.com/by.moonlight.lr"
                 target="_blank"
                 rel="noopener noreferrer"
                 style={{
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                    textTransform: 'lowercase',
                }}
                >
                    instagram
                </a>
                <a
                 href="#nosotros"
                 style={{
                    fontSize: '10px',
                    letterSpacing: '0.15em',
                    color: 'var(--color-text-muted)',
                    textDecoration: 'none',
                    textTransform: 'lowercase',
                }}
                >
                    contacto
                </a>
            </div>
            <p style={{
                fontSize: '10px',
                letterSpacing: '0.08em',
                color: '#2a2a2a',
                width: '100%',
                textAlign: 'center',
            }}>
                © 2025 MOONLIGHT® — todos los derechos reservados
            </p>
        </footer>
    )
}