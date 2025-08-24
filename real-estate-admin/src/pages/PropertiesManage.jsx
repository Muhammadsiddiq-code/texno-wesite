const data = [
  { id: '1', title: 'Yuqori darajadagi uy', price: 250000, status: 'Faol' },
  { id: '2', title: 'Shahar markazida ofis', price: 120000, status: 'Ko‘rishda' },
  { id: '3', title: 'Dacha', price: 80000, status: 'Arxiv' },
]

export default function PropertiesManage() {
  return (
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Mulklarni boshqarish</h1>
      <div className="card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 dark:bg-slate-800/60">
            <tr>
              <th className="text-left p-3">Nom</th>
              <th className="text-left p-3">Narx</th>
              <th className="text-left p-3">Holat</th>
              <th className="text-right p-3">Amallar</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.id} className="border-t border-slate-200 dark:border-slate-700">
                <td className="p-3">{row.title}</td>
                <td className="p-3">${row.price.toLocaleString()}</td>
                <td className="p-3">{row.status}</td>
                <td className="p-3 text-right">
                  <button className="btn-ghost">Tahrirlash</button>
                  <button className="btn-ghost">O‘chirish</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}