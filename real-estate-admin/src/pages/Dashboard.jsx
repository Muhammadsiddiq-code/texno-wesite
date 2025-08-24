import { Home, Building2, Users, MessageSquare } from 'lucide-react'

export default function Dashboard() {
  const stats = [
    { label: 'Jami mulklar', value: 128, icon: Building2 },
    { label: 'Faol agentlar', value: 24, icon: Users },
    { label: 'Yangi xabarlar', value: 5, icon: MessageSquare },
    { label: 'Bugungi tashriflar', value: 342, icon: Home },
  ]
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Boshqaruv paneli</h1>
        <p className="text-slate-500 dark:text-slate-400">Umumiy statistikalar va faoliyat</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="card p-4 flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-500">{label}</div>
              <div className="text-2xl font-semibold">{value}</div>
            </div>
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card p-4 min-h-40">
          <h2 className="font-semibold mb-2">Mulklar bo‘yicha faoliyat</h2>
          <div className="text-sm text-slate-500">Grafik uchun joy (keyinroq qo‘shish mumkin)</div>
        </div>
        <div className="card p-4 min-h-40">
          <h2 className="font-semibold mb-2">Agentlar ko‘rsatkichlari</h2>
          <div className="text-sm text-slate-500">Grafik uchun joy (keyinroq qo‘shish mumkin)</div>
        </div>
      </div>
    </div>
  )
}