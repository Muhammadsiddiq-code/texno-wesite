"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Plus, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { addPhone, type Phone } from "@/lib/localStorage"
import { requireAdminAuth } from "@/lib/adminAuth"
import { useToast } from "@/hooks/use-toast"

const brands = ["Apple", "Samsung", "Xiaomi", "Realme", "Honor", "OnePlus", "Oppo", "Vivo", "Huawei"]

export default function AddPhone() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    image: "",
    ram: "",
    storage: "",
    battery: "",
    camera: "",
    availability: true,
    description: "",
  })

  useEffect(() => {
    if (!requireAdminAuth(navigate)) return
  }, [navigate])

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Validate required fields
    if (!formData.name || !formData.brand || !formData.price || !formData.ram || !formData.storage) {
      toast({
        title: "Xatolik",
        description: "Barcha majburiy maydonlarni to'ldiring",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    // Validate price
    const price = Number.parseFloat(formData.price)
    if (isNaN(price) || price <= 0) {
      toast({
        title: "Xatolik",
        description: "Narx to'g'ri formatda bo'lishi kerak",
        variant: "destructive",
      })
      setIsLoading(false)
      return
    }

    try {
      const newPhone: Phone = {
        id: generateId(),
        name: formData.name.trim(),
        brand: formData.brand,
        price: price,
        image:
          formData.image.trim() || `/placeholder.svg?height=400&width=400&query=${encodeURIComponent(formData.name)}`,
        ram: formData.ram.trim(),
        storage: formData.storage.trim(),
        battery: formData.battery.trim() || "4000mAh",
        camera: formData.camera.trim() || "48MP",
        availability: formData.availability,
        description: formData.description.trim(),
      }

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      addPhone(newPhone)

      toast({
        title: "Muvaffaqiyat",
        description: `${newPhone.name} muvaffaqiyatli qo'shildi`,
      })

      // Reset form
      setFormData({
        name: "",
        brand: "",
        price: "",
        image: "",
        ram: "",
        storage: "",
        battery: "",
        camera: "",
        availability: true,
        description: "",
      })

      // Redirect to manage phones
      navigate("/admin/manage-phones")
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Telefon qo'shishda xatolik yuz berdi",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => navigate("/admin/dashboard")}
                className="text-white hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard
              </Button>
              <Smartphone className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Yangi Telefon Qo'shish</h1>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Plus className="h-5 w-5 mr-2" />
                Telefon Ma'lumotlari
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Phone Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-white/80">
                      Telefon Nomi *
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      placeholder="iPhone 15 Pro Max"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  {/* Brand */}
                  <div className="space-y-2">
                    <Label htmlFor="brand" className="text-white/80">
                      Brend *
                    </Label>
                    <Select value={formData.brand} onValueChange={(value) => handleInputChange("brand", value)}>
                      <SelectTrigger className="bg-white/10 border-white/20 text-white">
                        <SelectValue placeholder="Brendni tanlang" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-800 border-white/20">
                        {brands.map((brand) => (
                          <SelectItem key={brand} value={brand} className="text-white hover:bg-white/10">
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price */}
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-white/80">
                      Narx (so'm) *
                    </Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      placeholder="15000000"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  {/* Image URL */}
                  <div className="space-y-2">
                    <Label htmlFor="image" className="text-white/80">
                      Rasm URL
                    </Label>
                    <Input
                      id="image"
                      type="url"
                      value={formData.image}
                      onChange={(e) => handleInputChange("image", e.target.value)}
                      placeholder="https://example.com/phone.jpg"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  {/* RAM */}
                  <div className="space-y-2">
                    <Label htmlFor="ram" className="text-white/80">
                      RAM *
                    </Label>
                    <Input
                      id="ram"
                      type="text"
                      value={formData.ram}
                      onChange={(e) => handleInputChange("ram", e.target.value)}
                      placeholder="8GB"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  {/* Storage */}
                  <div className="space-y-2">
                    <Label htmlFor="storage" className="text-white/80">
                      Xotira *
                    </Label>
                    <Input
                      id="storage"
                      type="text"
                      value={formData.storage}
                      onChange={(e) => handleInputChange("storage", e.target.value)}
                      placeholder="256GB"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                      required
                    />
                  </div>

                  {/* Battery */}
                  <div className="space-y-2">
                    <Label htmlFor="battery" className="text-white/80">
                      Batareya
                    </Label>
                    <Input
                      id="battery"
                      type="text"
                      value={formData.battery}
                      onChange={(e) => handleInputChange("battery", e.target.value)}
                      placeholder="4441mAh"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>

                  {/* Camera */}
                  <div className="space-y-2">
                    <Label htmlFor="camera" className="text-white/80">
                      Kamera
                    </Label>
                    <Input
                      id="camera"
                      type="text"
                      value={formData.camera}
                      onChange={(e) => handleInputChange("camera", e.target.value)}
                      placeholder="48MP + 12MP + 12MP"
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="text-white/80">
                    Tavsif
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Telefon haqida qisqacha ma'lumot..."
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
                  />
                </div>

                {/* Availability */}
                <div className="flex items-center space-x-3">
                  <Switch
                    id="availability"
                    checked={formData.availability}
                    onCheckedChange={(checked) => handleInputChange("availability", checked)}
                  />
                  <Label htmlFor="availability" className="text-white/80">
                    Mavjud
                  </Label>
                </div>

                {/* Submit Button */}
                <div className="flex space-x-4 pt-6">
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                  >
                    {isLoading ? (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full mr-2"
                      />
                    ) : (
                      <Plus className="h-5 w-5 mr-2" />
                    )}
                    {isLoading ? "Qo'shilmoqda..." : "Telefon Qo'shish"}
                  </Button>

                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/admin/dashboard")}
                    className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                  >
                    Bekor qilish
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
