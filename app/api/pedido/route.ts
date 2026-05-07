import { NextRequest, NextResponse } from 'next/server'
import { agregarPedido, descontarStock } from '@/lib/sheets'
import { enviarConfirmacionCliente, enviarNotificacionAdmin } from '@/lib/resend'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    const {
      nombre,
      email,
      telefono,
      ciudad,
      codigoPostal,
      items,
      precioUnitario,
      costoEnvio,
      total,
      metodoPago,
      retiroPersonal,
    } = body

    if (!nombre || !email || !ciudad || !codigoPostal || !items || items.length === 0) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios.' },
        { status: 400 }
      )
    }

    const datos = {
      nombre,
      email,
      telefono,
      ciudad,
      codigoPostal,
      items,
      precioUnitario,
      costoEnvio,
      total,
      metodoPago,
      retiroPersonal,
    }

    await agregarPedido(datos)

    for (const item of items) {
      for (let i = 0; i < item.cantidad; i++) {
        await descontarStock(item.talle)
      }
    }

    await enviarConfirmacionCliente(datos)
    await enviarNotificacionAdmin(datos)

    return NextResponse.json({ ok: true })
  } catch (error) {
    console.error('Error en /api/pedido:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor.' },
      { status: 500 }
    )
  }
}