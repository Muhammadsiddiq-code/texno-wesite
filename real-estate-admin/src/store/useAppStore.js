import { create } from 'zustand'

const STORAGE_KEYS = {
  session: 'rea_session',
  users: 'rea_users',
  prefs: 'rea_prefs',
}

function loadLocalStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

export const useAppStore = create((set, get) => ({
  currentUser: loadLocalStorage(STORAGE_KEYS.session, null),
  users: loadLocalStorage(STORAGE_KEYS.users, []),
  preferences: loadLocalStorage(STORAGE_KEYS.prefs, { theme: 'light', lang: 'UZ' }),

  login: (username) => {
    const newUser = { username, time: new Date().toISOString() }
    localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(newUser))
    // ensure user appears in users list once
    const users = get().users
    const exists = users.some((u) => u.username === username)
    const nextUsers = exists ? users : [{ id: crypto.randomUUID(), ...newUser }, ...users]
    localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(nextUsers))
    set({ currentUser: newUser, users: nextUsers })
  },
  logout: () => {
    localStorage.removeItem(STORAGE_KEYS.session)
    set({ currentUser: null })
  },
  setTheme: (theme) => {
    const prefs = { ...get().preferences, theme }
    localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(prefs))
    set({ preferences: prefs })
    if (theme === 'dark') document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  },
  setLang: (lang) => {
    const prefs = { ...get().preferences, lang }
    localStorage.setItem(STORAGE_KEYS.prefs, JSON.stringify(prefs))
    set({ preferences: prefs })
  },
}))

// Initialize theme on load
if (typeof document !== 'undefined') {
  const saved = loadLocalStorage(STORAGE_KEYS.prefs, { theme: 'light' })
  if (saved?.theme === 'dark') {
    document.documentElement.classList.add('dark')
  }
}