import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'
import PropertiesAdd from './pages/PropertiesAdd.jsx'
import PropertiesManage from './pages/PropertiesManage.jsx'
import Agents from './pages/Agents.jsx'
import Users from './pages/Users.jsx'
import Messages from './pages/Messages.jsx'
import Settings from './pages/Settings.jsx'
import Layout from './components/Layout.jsx'
import { useAppStore } from './store/useAppStore.js'

function ProtectedRoute({ children }) {
  const user = useAppStore((s) => s.currentUser)
  if (!user) return <Navigate to="/kirish" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/kirish" element={<Login />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="/mulklar/qo%CA%BBshish" element={<PropertiesAdd />} />
        <Route path="/mulklar/boshqarish" element={<PropertiesManage />} />
        <Route path="/agentlar" element={<Agents />} />
        <Route path="/foydalanuvchilar" element={<Users />} />
        <Route path="/xabarlar" element={<Messages />} />
        <Route path="/sozlamalar" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
