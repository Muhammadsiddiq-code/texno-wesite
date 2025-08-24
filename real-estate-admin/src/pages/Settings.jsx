import { useAppStore } from '../store/useAppStore.js'

export default function Settings() {
  const { preferences, setTheme, setLang } = useAppStore()
  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Sozlamalar</h1>

      <section className="card p-4">
        <h2 className="font-semibold mb-2">Profil sozlamalari</h2>
        <div className="text-sm text-slate-500">Profil ma’lumotlari uchun joy (keyinroq)</div>
      </section>

      <section className="card p-4">
        <h2 className="font-semibold mb-3">Tungi / Kunduzgi rejim</h2>
        <div className="flex gap-2">
          <button className={`btn ${preferences.theme === 'light' ? 'bg-blue-600 text-white' : 'btn-ghost'}`} onClick={() => setTheme('light')}>Kunduzgi</button>
          <button className={`btn ${preferences.theme === 'dark' ? 'bg-blue-600 text-white' : 'btn-ghost'}`} onClick={() => setTheme('dark')}>Tungi</button>
        </div>
      </section>

      <section className="card p-4">
        <h2 className="font-semibold mb-3">Til tanlash</h2>
        <select className="input max-w-xs" value={preferences.lang} onChange={(e) => setLang(e.target.value)}>
          <option value="UZ">O‘zbek (UZ)</option>
          <option value="RU">Rus (RU)</option>
          <option value="EN">Ingliz (EN)</option>
        </select>
        <div className="text-xs text-slate-500 mt-2">UI matnlari hozircha faqat O‘zbek tilida</div>
      </section>

      <section className="card p-4">
        <h2 className="font-semibold mb-2">Sayt sozlamalari</h2>
        <div className="text-sm text-slate-500">Brend, domen va boshqa sozlamalar (keyinroq)</div>
      </section>
    </div>
  )
}