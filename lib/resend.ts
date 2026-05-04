import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function enviarConfirmacionCliente(datos: {
  email: string
  nombre: string
  talle: string
  precio: number
  costoEnvio: number | null
  total: number
  metodoPago: string
  retiroPersonal: boolean
  ciudad: string
}) {
  await resend.emails.send({
    from: 'MOONLIGHT® <onboarding@resend.dev>',
    to: datos.email,
    subject: 'Tu pedido fue recibido — MOONLIGHT®',
    html: `
      <div style="background:#0a0a0a; color:#e0e0e0; font-family:Georgia,serif; padding:40px; max-width:480px; margin:0 auto;">
        <p style="font-size:11px; letter-spacing:0.3em; color:#555; margin-bottom:24px;">MOONLIGHT®</p>
        <h1 style="font-size:28px; font-weight:400; letter-spacing:0.06em; margin-bottom:16px;">Gracias por tu pedido.</h1>
        <p style="font-size:13px; color:#888; line-height:1.9; margin-bottom:32px;">
          Hola ${datos.nombre}, recibimos tu pedido correctamente.
        </p>
        <div style="border:0.5px solid #1e1e1e; padding:20px; margin-bottom:24px;">
          <p style="font-size:10px; letter-spacing:0.2em; color:#555; margin-bottom:16px;">DETALLE DEL PEDIDO</p>
          <table style="width:100%; font-size:12px; color:#888; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#555;">Producto</td><td style="text-align:right;">T-Shirt King of Kings</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Talle</td><td style="text-align:right;">${datos.talle}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Precio</td><td style="text-align:right;">$${datos.precio.toLocaleString()}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Envío</td><td style="text-align:right;">${datos.retiroPersonal ? 'Retiro en persona' : datos.costoEnvio ? `$${datos.costoEnvio.toLocaleString()}` : '-'}</td></tr>
            <tr style="border-top:0.5px solid #1e1e1e;">
              <td style="padding:10px 0 6px; color:#e0e0e0;">Total</td>
              <td style="text-align:right; color:#e0e0e0;">$${datos.total.toLocaleString()}</td>
            </tr>
          </table>
        </div>
        <div style="border:0.5px solid #1e1e1e; padding:20px; margin-bottom:32px;">
          <p style="font-size:10px; letter-spacing:0.2em; color:#555; margin-bottom:12px;">MÉTODO DE PAGO</p>
          ${datos.metodoPago === 'transferencia' ? `
            <p style="font-size:12px; color:#888; line-height:2;">
              CBU: 4530000800013925074504<br/>
              Alias: MOONLIGHT.LR<br/>
              Titular: Santiago Ceballos Palacios
            </p>
            <p style="font-size:11px; color:#555; margin-top:12px;">Una vez acreditada la transferencia te confirmamos el envío.</p>
          ` : `
            <p style="font-size:12px; color:#888;">Efectivo al momento de la entrega.</p>
          `}
        </div>
        <p style="font-size:12px; font-style:italic; color:#444; text-align:center; line-height:1.7;">
          "Mejores son dos que uno."<br/>
          <span style="font-size:10px; letter-spacing:0.15em;">— Eclesiastés 4:9 —</span>
        </p>
      </div>
    `,
  })
}

export async function enviarNotificacionAdmin(datos: {
  nombre: string
  email: string
  telefono: string
  talle: string
  ciudad: string
  codigoPostal: string
  precio: number
  costoEnvio: number | null
  total: number
  metodoPago: string
  retiroPersonal: boolean
}) {
  await resend.emails.send({
    from: 'MOONLIGHT® <onboarding@resend.dev>',
    to: 'santiagopalcios498@gmail.com',
    subject: `Nuevo pedido — ${datos.nombre} — Talle ${datos.talle}`,
    html: `
      <div style="background:#0a0a0a; color:#e0e0e0; font-family:Georgia,serif; padding:40px; max-width:480px; margin:0 auto;">
        <p style="font-size:11px; letter-spacing:0.3em; color:#555; margin-bottom:24px;">MOONLIGHT® — NUEVO PEDIDO</p>
        <div style="border:0.5px solid #1e1e1e; padding:20px;">
          <table style="width:100%; font-size:12px; color:#888; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#555;">Nombre</td><td style="text-align:right;">${datos.nombre}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Email</td><td style="text-align:right;">${datos.email}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Teléfono</td><td style="text-align:right;">${datos.telefono}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Ciudad</td><td style="text-align:right;">${datos.ciudad}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">CP</td><td style="text-align:right;">${datos.codigoPostal}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Talle</td><td style="text-align:right;">${datos.talle}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Pago</td><td style="text-align:right;">${datos.metodoPago}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Retiro</td><td style="text-align:right;">${datos.retiroPersonal ? 'Sí' : 'No'}</td></tr>
            <tr style="border-top:0.5px solid #1e1e1e;">
              <td style="padding:10px 0 6px; color:#e0e0e0;">Total</td>
              <td style="text-align:right; color:#e0e0e0;">$${datos.total.toLocaleString()}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  })
}