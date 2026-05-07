import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

type DatosPedido = {
  email: string
  nombre: string
  telefono: string
  ciudad: string
  codigoPostal: string
  items: { talle: string; cantidad: number }[]
  precioUnitario: number
  costoEnvio: number | null
  total: number
  metodoPago: string
  retiroPersonal: boolean
}

const filaItem = (talle: string, cantidad: number, precio: number) => `
  <tr>
    <td style="padding:6px 0; color:#555;">T-Shirt King of Kings — talle ${talle}</td>
    <td style="text-align:right;">x${cantidad}</td>
    <td style="text-align:right;">$${(cantidad * precio).toLocaleString()}</td>
  </tr>
`

export async function enviarConfirmacionCliente(datos: DatosPedido) {
  await resend.emails.send({
    from: 'MOONLIGHT® <pedidos@bymoonlightlr.com.ar>',
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
            ${datos.items.map(i => filaItem(i.talle, i.cantidad, datos.precioUnitario)).join('')}
            <tr style="border-top:0.5px solid #1e1e1e;">
              <td style="padding:8px 0 4px; color:#555;">Envío</td>
              <td></td>
              <td style="text-align:right;">${datos.retiroPersonal ? 'Retiro en persona' : datos.costoEnvio ? `$${datos.costoEnvio.toLocaleString()}` : '-'}</td>
            </tr>
            <tr>
              <td style="padding:4px 0 6px; color:#e0e0e0;">Total</td>
              <td></td>
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

export async function enviarNotificacionAdmin(datos: DatosPedido) {
  await resend.emails.send({
    from: 'MOONLIGHT® <pedidos@bymoonlightlr.com.ar>',
    to: 'bymoonlightlr@gmail.com',
    subject: `Nuevo pedido — ${datos.nombre}`,
    html: `
      <div style="background:#0a0a0a; color:#e0e0e0; font-family:Georgia,serif; padding:40px; max-width:480px; margin:0 auto;">
        <p style="font-size:11px; letter-spacing:0.3em; color:#555; margin-bottom:24px;">MOONLIGHT® — NUEVO PEDIDO</p>
        <div style="border:0.5px solid #1e1e1e; padding:20px; margin-bottom:20px;">
          <p style="font-size:10px; letter-spacing:0.2em; color:#555; margin-bottom:14px;">CLIENTE</p>
          <table style="width:100%; font-size:12px; color:#888; border-collapse:collapse;">
            <tr><td style="padding:6px 0; color:#555;">Nombre</td><td style="text-align:right;">${datos.nombre}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Email</td><td style="text-align:right;">${datos.email}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Teléfono</td><td style="text-align:right;">${datos.telefono}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">Ciudad</td><td style="text-align:right;">${datos.ciudad}</td></tr>
            <tr><td style="padding:6px 0; color:#555;">CP</td><td style="text-align:right;">${datos.codigoPostal}</td></tr>
          </table>
        </div>
        <div style="border:0.5px solid #1e1e1e; padding:20px;">
          <p style="font-size:10px; letter-spacing:0.2em; color:#555; margin-bottom:14px;">PEDIDO</p>
          <table style="width:100%; font-size:12px; color:#888; border-collapse:collapse;">
            ${datos.items.map(i => filaItem(i.talle, i.cantidad, datos.precioUnitario)).join('')}
            <tr style="border-top:0.5px solid #1e1e1e;">
              <td style="padding:8px 0 4px; color:#555;">Envío</td>
              <td></td>
              <td style="text-align:right;">${datos.retiroPersonal ? 'Retiro' : datos.costoEnvio ? `$${datos.costoEnvio.toLocaleString()}` : '-'}</td>
            </tr>
            <tr><td style="padding:4px 0; color:#555;">Pago</td><td></td><td style="text-align:right;">${datos.metodoPago}</td></tr>
            <tr style="border-top:0.5px solid #1e1e1e;">
              <td style="padding:8px 0 6px; color:#e0e0e0;">Total</td>
              <td></td>
              <td style="text-align:right; color:#e0e0e0;">$${datos.total.toLocaleString()}</td>
            </tr>
          </table>
        </div>
      </div>
    `,
  })
}