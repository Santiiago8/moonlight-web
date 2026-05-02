import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import Producto from '@/components/Producto'
import Manifesto from '@/components/Manifesto'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Producto />
      <Manifesto />
      <Footer />
    </main>
  )
}