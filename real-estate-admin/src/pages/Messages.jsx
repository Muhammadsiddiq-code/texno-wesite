const messages = [
  { id: 'm1', name: 'Aziza', content: '2-xonali kvartira haqida ma’lumot?', time: 'Bugun' },
  { id: 'm2', name: 'Otabek', content: 'Narxni kelishsa bo‘ladimi?', time: 'Kecha' },
]

export default function Messages() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Xabarlar</h1>
      <div className="card divide-y divide-slate-200 dark:divide-slate-800">
        {messages.map((m) => (
          <div key={m.id} className="p-4">
            <div className="flex items-center justify-between">
              <div className="font-medium">{m.name}</div>
              <div className="text-xs text-slate-500">{m.time}</div>
            </div>
            <div className="text-slate-600 dark:text-slate-300 text-sm mt-1">{m.content}</div>
          </div>
        ))}
      </div>
    </div>
  )
}