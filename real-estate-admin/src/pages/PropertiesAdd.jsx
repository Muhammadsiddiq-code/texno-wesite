import { useState } from 'react'

export default function PropertiesAdd() {
  const [form, setForm] = useState({ title: '', price: '', address: '' })
  const [message, setMessage] = useState('')

  function submit(e) {
    e.preventDefault()
    setMessage('')
    if (!form.title || !form.price) {
      setMessage('Iltimos, nom va narxni kiriting')
      return
    }
    setMessage('Mulk muvaffaqiyatli saqlandi (demo)')
    setForm({ title: '', price: '', address: '' })
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Yangi mulk qo‘shish</h1>
      <form className="card p-4 space-y-4" onSubmit={submit}>
        <div>
          <label className="label">Nom</label>
          <input className="input" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="label">Narx (USD)</label>
          <input className="input" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        </div>
        <div>
          <label className="label">Manzil</label>
          <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        {message && <div className="text-sm text-green-600">{message}</div>}
        <button className="btn-primary">Saqlash</button>
      </form>
    </div>
  )
}