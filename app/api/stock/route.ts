import { NextResponse } from "next/server";
import { obtenerStock } from "@/lib/sheets";

export async function GET() {
    try {
        const stock = await obtenerStock()
        return NextResponse.json({ stock })
    } catch {
        return NextResponse.json({ error: 'Error al obtener el stock' }, { status: 500 })
    }
}