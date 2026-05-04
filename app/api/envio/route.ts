import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const cp = searchParams.get('cp')

  if (!cp) {
    return NextResponse.json({ error: 'CP requerido.' }, { status: 400 })
  }

  try {
    const res = await fetch(
      `https://api.andreani.com/v1/tarifas?cpOrigen=5300&cpDestino=${cp}&peso=500&volumen=1000`,
      {
        headers: {
          'x-andeantoken': process.env.ANDREANI_TOKEN || '',
        },
      }
    )

    if (!res.ok) throw new Error('Error Andreani')

    const data = await res.json()
    const costo = data?.tarifas?.[0]?.total || null

    return NextResponse.json({ costo })
  } catch {
    // Fallback con tarifa estimada por zona si falla la API
    const cpNum = parseInt(cp)
    let costo = 4500

    if (cpNum >= 5000 && cpNum <= 5399) costo = 1500
    else if (cpNum >= 1000 && cpNum <= 1999) costo = 6000
    else if (cpNum >= 2000 && cpNum <= 4999) costo = 5000
    else if (cpNum >= 6000 && cpNum <= 9999) costo = 6500

    return NextResponse.json({ costo })
  }
}