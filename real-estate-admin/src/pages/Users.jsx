import { useAppStore } from '../store/useAppStore.js'

export default function Users() {
  const users = useAppStore((s) => s.users)

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Foydalanuvchilar</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr>
              <th className="text-left p-3">Foydalanuvchi nomi</th>
              <th className="text-left p-3">Kirish vaqti</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-t border-slate-200 dark:border-slate-700">
                <td className="p-3">{u.username}</td>
                <td className="p-3">{new Date(u.time).toLocaleString()}</td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td className="p-3 text-slate-500" colSpan={2}>Hozircha foydalanuvchilar yo‘q</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}