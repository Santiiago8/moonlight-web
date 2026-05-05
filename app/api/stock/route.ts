import { NextResponse } from "next/server";
import { getStock } from "@/lib/sheets";

export async function GET() {
    try {
        const stock = await getStock()
        return NextResponse.json({ stock })
    } catch {
        return NextResponse.json({ error: 'Error al obtener el stock' }, { status: 500 })
    }
}