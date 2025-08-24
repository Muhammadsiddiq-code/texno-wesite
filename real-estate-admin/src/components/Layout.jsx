import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAppStore } from '../store/useAppStore.js'
import { LayoutDashboard, Home, PlusSquare, ListOrdered, Users, MessageSquare, Settings, Moon, SunMedium, LogOut, UserPlus } from 'lucide-react'
import classNames from 'classnames'

export default function Layout() {
  const navigate = useNavigate()
  const { currentUser, setTheme, preferences, logout } = useAppStore()
  const [open, setOpen] = useState(true)

  const links = [
    { to: '/', label: 'Boshqaruv paneli', icon: LayoutDashboard },
    { to: '/mulklar/qo%CA%BBshish', label: 'Yangi mulk qo‘shish', icon: PlusSquare },
    { to: '/mulklar/boshqarish', label: 'Mulklarni boshqarish', icon: ListOrdered },
    { to: '/agentlar', label: 'Agentlar', icon: UserPlus },
    { to: '/foydalanuvchilar', label: 'Foydalanuvchilar', icon: Users },
    { to: '/xabarlar', label: 'Xabarlar', icon: MessageSquare },
    { to: '/sozlamalar', label: 'Sozlamalar', icon: Settings },
  ]

  return (
    <div className="h-full grid grid-cols-1 md:grid-cols-[260px_1fr]">
      <aside className={classNames('border-r border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur',
        open ? 'w-full md:w-[260px]' : 'w-full md:w-[72px]')}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Home className="w-6 h-6 text-blue-600" />
            {open && <span className="font-semibold">Ko‘chmas Mulk Admin</span>}
          </div>
          <button className="btn-ghost md:hidden" onClick={() => setOpen((v) => !v)}>
            {open ? 'Yopish' : 'Ochish'}
          </button>
        </div>
        <nav className="px-2 pb-4">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={({ isActive }) => classNames(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors',
                isActive ? 'bg-slate-100 dark:bg-slate-800 text-blue-600' : 'text-slate-700 dark:text-slate-300'
              )}
            >
              <Icon className="w-5 h-5" />
              {open && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex flex-col min-w-0">
        <header className="flex items-center justify-between px-4 h-14 border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 backdrop-blur">
          <div className="flex items-center gap-2">
            <button className="btn-ghost hidden md:inline-flex" onClick={() => setOpen((v) => !v)}>
              {open ? 'Yashirish' : 'Ko‘rsatish'}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button
              className="btn-ghost"
              onClick={() => setTheme(preferences.theme === 'dark' ? 'light' : 'dark')}
              aria-label="Rejim"
            >
              {preferences.theme === 'dark' ? <SunMedium className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="hidden sm:inline">{preferences.theme === 'dark' ? 'Kunduzgi' : 'Tungi'}</span>
            </button>
            <div className="text-sm text-slate-600 dark:text-slate-300 mr-2">
              {currentUser?.username}
            </div>
            <button className="btn bg-red-500 hover:bg-red-600 text-white" onClick={() => { logout(); navigate('/kirish') }}>
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Chiqish</span>
            </button>
          </div>
        </header>
        <main className="p-4 overflow-auto min-w-0">
          <Outlet />
        </main>
      </div>
    </div>
  )
}