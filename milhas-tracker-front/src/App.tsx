import { Button } from "@/components/ui/button"

export default function App() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      
      {/* Container Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl">
        
        {/* Card 1: Sidebar Simulada */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-200 shadow-xl col-span-1">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <ul className="space-y-2">
            <li className="bg-zinc-800 text-white p-2 rounded cursor-pointer font-medium">Dashboard</li>
            <li className="hover:bg-zinc-800/50 p-2 rounded cursor-pointer text-zinc-400 hover:text-white transition-colors">Carteira</li>
            <li className="hover:bg-zinc-800/50 p-2 rounded cursor-pointer text-zinc-400 hover:text-white transition-colors">Configurações</li>
          </ul>
        </div>

        {/* Card 2: Área Principal */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 text-zinc-200 shadow-xl col-span-1 md:col-span-2 flex flex-col justify-center items-center gap-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">Ambiente Pronto 🚀</h1>
            <p className="text-zinc-400">Vite + React + TS + Tailwind + Shadcn (Zinc)</p>
          </div>

          <div className="flex gap-4">
            {/* Testando o componente que acabamos de baixar */}
            <Button>Botão Shadcn</Button>
            <Button variant="secondary">Secundário</Button>
            <Button variant="destructive">Perigo</Button>
          </div>
        </div>

      </div>
    </div>
  )
}