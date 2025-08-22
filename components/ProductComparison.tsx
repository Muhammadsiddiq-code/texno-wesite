"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, Plus } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface Phone {
  id: string
  name: string
  brand: string
  price: number
  image: string
  specs: {
    display: string
    processor: string
    ram: string
    storage: string
    camera: string
    battery: string
    os: string
  }
}

export default function ProductComparison() {
  const [compareList, setCompareList] = useState<Phone[]>([])
  const [availablePhones, setAvailablePhones] = useState<Phone[]>([])

  useEffect(() => {
    const phones = JSON.parse(localStorage.getItem("phones") || "[]")
    setAvailablePhones(phones)

    const savedCompare = JSON.parse(localStorage.getItem("compareList") || "[]")
    setCompareList(savedCompare)
  }, [])

  const addToCompare = (phone: Phone) => {
    if (compareList.length >= 3) {
      toast({
        title: "Maksimal limit",
        description: "Faqat 3 ta mahsulotni taqqoslash mumkin",
        variant: "destructive",
      })
      return
    }

    if (compareList.find((p) => p.id === phone.id)) {
      toast({
        title: "Allaqachon qo'shilgan",
        description: "Bu mahsulot allaqachon taqqoslash ro'yxatida",
        variant: "destructive",
      })
      return
    }

    const newCompareList = [...compareList, phone]
    setCompareList(newCompareList)
    localStorage.setItem("compareList", JSON.stringify(newCompareList))

    toast({
      title: "Taqqoslashga qo'shildi",
      description: phone.name + " taqqoslash ro'yxatiga qo'shildi",
    })
  }

  const removeFromCompare = (phoneId: string) => {
    const newCompareList = compareList.filter((p) => p.id !== phoneId)
    setCompareList(newCompareList)
    localStorage.setItem("compareList", JSON.stringify(newCompareList))

    toast({
      title: "O'chirildi",
      description: "Mahsulot taqqoslash ro'yxatidan o'chirildi",
    })
  }

  const clearAll = () => {
    setCompareList([])
    localStorage.setItem("compareList", JSON.stringify([]))
    toast({
      title: "Tozalandi",
      description: "Barcha mahsulotlar taqqoslash ro'yxatidan o'chirildi",
    })
  }

  const specLabels = {
    display: "Displey",
    processor: "Protsessor",
    ram: "RAM",
    storage: "Xotira",
    camera: "Kamera",
    battery: "Batareya",
    os: "Operatsion tizim",
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Mahsulotlarni taqqoslash</h1>
        <p className="text-white/70">Turli smartfonlarni taqqoslab, eng yaxshisini tanlang</p>
      </motion.div>

      {/* Add Products Section */}
      <Card className="bg-white/10 backdrop-blur-md border-white/20 mb-8">
        <CardHeader>
          <CardTitle className="text-white flex items-center justify-between">
            <span>Taqqoslash uchun mahsulot qo'shing ({compareList.length}/3)</span>
            {compareList.length > 0 && (
              <Button
                onClick={clearAll}
                variant="outline"
                size="sm"
                className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
              >
                Hammasini o'chirish
              </Button>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {availablePhones.slice(0, 6).map((phone) => (
              <div key={phone.id} className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
                <img
                  src={phone.image || "/placeholder.svg"}
                  alt={phone.name}
                  className="w-12 h-12 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h4 className="text-white font-medium text-sm">{phone.name}</h4>
                  <p className="text-white/70 text-xs">${phone.price.toLocaleString()}</p>
                </div>
                <Button
                  onClick={() => addToCompare(phone)}
                  size="sm"
                  disabled={compareList.find((p) => p.id === phone.id) !== undefined}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Comparison Table */}
      <AnimatePresence>
        {compareList.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-white/20">
                        <th className="text-left p-4 text-white font-semibold w-48">Xususiyatlar</th>
                        {compareList.map((phone) => (
                          <th key={phone.id} className="text-center p-4 min-w-64">
                            <div className="relative">
                              <Button
                                onClick={() => removeFromCompare(phone.id)}
                                size="sm"
                                variant="ghost"
                                className="absolute -top-2 -right-2 w-6 h-6 p-0 text-red-500 hover:bg-red-500 hover:text-white"
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <img
                                src={phone.image || "/placeholder.svg"}
                                alt={phone.name}
                                className="w-20 h-20 object-cover rounded-lg mx-auto mb-2"
                              />
                              <h3 className="text-white font-semibold text-sm mb-1">{phone.name}</h3>
                              <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">{phone.brand}</Badge>
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {/* Price Row */}
                      <tr className="border-b border-white/10">
                        <td className="p-4 text-white font-medium">Narx</td>
                        {compareList.map((phone) => (
                          <td key={phone.id} className="p-4 text-center">
                            <span className="text-2xl font-bold text-green-400">${phone.price.toLocaleString()}</span>
                          </td>
                        ))}
                      </tr>

                      {/* Specs Rows */}
                      {Object.entries(specLabels).map(([key, label]) => (
                        <tr key={key} className="border-b border-white/10">
                          <td className="p-4 text-white font-medium">{label}</td>
                          {compareList.map((phone) => (
                            <td key={phone.id} className="p-4 text-center text-white/80">
                              {phone.specs[key as keyof typeof phone.specs]}
                            </td>
                          ))}
                        </tr>
                      ))}

                      {/* Action Row */}
                      <tr>
                        <td className="p-4 text-white font-medium">Amallar</td>
                        {compareList.map((phone) => (
                          <td key={phone.id} className="p-4 text-center">
                            <div className="space-y-2">
                              <Button
                                size="sm"
                                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                              >
                                Savatga qo'shish
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                              >
                                Batafsil
                              </Button>
                            </div>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {compareList.length === 0 && (
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">📱</div>
            <h3 className="text-white text-lg font-semibold mb-2">Taqqoslash uchun mahsulot tanlang</h3>
            <p className="text-white/70">Yuqoridagi ro'yxatdan mahsulotlarni tanlab, ularni taqqoslang</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
