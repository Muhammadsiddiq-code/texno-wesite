import { useState } from 'react'

export default function Agents() {
  const [agents, setAgents] = useState([
    { id: 'a1', name: 'Jasur Qodirov', phone: '+998 90 123 45 67' },
    { id: 'a2', name: 'Malika Ismoilova', phone: '+998 97 765 43 21' },
  ])
  const [form, setForm] = useState({ name: '', phone: '' })

  function addAgent(e) {
    e.preventDefault()
    if (!form.name || !form.phone) return
    setAgents([{ id: crypto.randomUUID(), ...form }, ...agents])
    setForm({ name: '', phone: '' })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Agentlar</h1>
      <form className="card p-4 grid sm:grid-cols-3 gap-3 items-end" onSubmit={addAgent}>
        <div>
          <label className="label">Ism, familiya</label>
          <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="label">Telefon</label>
          <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        </div>
        <button className="btn-primary">Qo‘shish</button>
      </form>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr>
              <th className="text-left p-3">F.I.Sh</th>
              <th className="text-left p-3">Telefon</th>
            </tr>
          </thead>
          <tbody>
            {agents.map((a) => (
              <tr key={a.id} className="border-t border-slate-200 dark:border-slate-700">
                <td className="p-3">{a.name}</td>
                <td className="p-3">{a.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}