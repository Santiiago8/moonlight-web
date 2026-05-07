'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export type ItemCarrito = {
    talle: string
    cantidad: number
}

type CartContextType = {
    items: ItemCarrito[]
    agregarItem: (talle: string, stockDisponible: number) => void
    quitarItem: (talle: string) => void
    limpiarCarrito: () => void
    totalItems: number
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<ItemCarrito[]>([])

    const agregarItem = (talle: string, stockDisponible: number) => {
        setItems(prev => {
            const existente = prev.find(i => i.talle === talle)
            if (existente) {
                if (existente.cantidad >= stockDisponible) return prev
                return prev.map(i =>
                    i.talle === talle ? { ...i, cantidad: i.cantidad + 1 } : i
                )
            }
            if (stockDisponible === 0) return prev
            return [...prev, { talle, cantidad: 1}]
        })
    }

    const quitarItem = (talle: string) => {
        setItems(prev => {
            const existente = prev.find(i => i.talle === talle)
            if (!existente) return prev
            if (existente.cantidad === 1) return prev.filter(i => i.talle !== talle)
            return prev.map(i => 
                i.talle === talle ? { ...i, cantidad: i.cantidad - 1 } : i
            )
        })
    }

    const limpiarCarrito = () => setItems([])

    const totalItems = items.reduce((acc, i) => acc + i.cantidad, 0)

    return (
        <CartContext.Provider value={{ items, agregarItem, quitarItem, limpiarCarrito, totalItems }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const ctx = useContext(CartContext)
    if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
    return ctx
}