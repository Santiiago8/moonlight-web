import { google } from 'googleapis'

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: (process.env.GOOGLE_PRIVATE_KEY || '').split('\\n').join('\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
})

export async function agregarPedido(datos: {
  nombre: string
  email: string
  telefono: string
  ciudad: string
  codigoPostal: string
  items: { talle: string; cantidad: number }[]
  precioUnitario: number
  costoEnvio: number | null
  total: number
  metodoPago: string
  retiroPersonal: boolean
}) {
  const sheets = google.sheets({ version: 'v4', auth })

  const fecha = new Date().toLocaleString('es-AR', {
    timeZone: 'America/Argentina/Buenos_Aires',
  })

  const resumenItems = datos.items
    .map(i => `${i.talle} x${i.cantidad}`)
    .join(', ')

  const totalUnidades = datos.items.reduce((acc, i) => acc + i.cantidad, 0)
  const subtotal = totalUnidades * datos.precioUnitario
  const envio = datos.retiroPersonal ? 'retiro' : `$${(datos.costoEnvio || 0).toLocaleString()}`

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Pedidos!A:L',
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[
        fecha,
        datos.nombre,
        datos.email,
        datos.telefono,
        datos.ciudad,
        datos.codigoPostal,
        resumenItems,
        totalUnidades,
        `$${subtotal.toLocaleString()}`,
        envio,
        `$${datos.total.toLocaleString()}`,
        datos.metodoPago,
      ]],
    },
  })
}

export async function obtenerStock(): Promise<Record<string, number>> {
  const sheets = google.sheets({ version: 'v4', auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Stock!A:B',
  })

  const rows = res.data.values || []
  const stock: Record<string, number> = {}
  rows.forEach(([talle, cantidad]) => {
    stock[talle] = parseInt(cantidad)
  })
  return stock
}

export async function descontarStock(talle: string) {
  const sheets = google.sheets({ version: 'v4', auth })

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: 'Stock!A:B',
  })

  const rows = res.data.values || []
  const rowIndex = rows.findIndex(([t]) => t === talle)
  if (rowIndex === -1) return

  const cantidadActual = parseInt(rows[rowIndex][1])
  if (cantidadActual <= 0) return

  await sheets.spreadsheets.values.update({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: `Stock!B${rowIndex + 1}`,
    valueInputOption: 'USER_ENTERED',
    requestBody: {
      values: [[cantidadActual - 1]],
    },
  })
}