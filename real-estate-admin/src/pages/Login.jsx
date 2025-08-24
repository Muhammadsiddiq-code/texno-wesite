import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '../store/useAppStore.js'

export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()
  const login = useAppStore((s) => s.login)

  function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!username || !password) {
      setError('Iltimos, barcha maydonlarni to‘ldiring')
      return
    }
    // Fake success login
    login(username.trim())
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-50 to-slate-200 dark:from-slate-900 dark:to-slate-950">
      <div className="w-full max-w-md card p-6">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Boshqaruv paneliga kirish</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">Iltimos, hisob ma’lumotlaringizni kiriting</p>
        </div>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="label">Foydalanuvchi nomi</label>
            <input className="input" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="ismingiz" />
          </div>
          <div>
            <label className="label">Parol</label>
            <input className="input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*****" />
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" className="btn-primary w-full">Kirish</button>
        </form>
      </div>
    </div>
  )
}