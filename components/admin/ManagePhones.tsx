"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Edit, Trash2, Plus, Search, Filter, Eye, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { getPhones, updatePhone, deletePhone, formatPrice, type Phone } from "@/lib/localStorage"
import { requireAdminAuth } from "@/lib/adminAuth"
import { useToast } from "@/hooks/use-toast"

const brands = ["Barchasi", "Apple", "Samsung", "Xiaomi", "Realme", "Honor", "OnePlus", "Oppo", "Vivo", "Huawei"]

export default function ManagePhones() {
  const navigate = useNavigate()
  const { toast } = useToast()
  const [phones, setPhones] = useState<Phone[]>([])
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedBrand, setSelectedBrand] = useState("Barchasi")
  const [editingPhone, setEditingPhone] = useState<Phone | null>(null)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!requireAdminAuth(navigate)) return
    loadPhones()
  }, [navigate])

  useEffect(() => {
    filterPhones()
  }, [phones, searchQuery, selectedBrand])

  const loadPhones = () => {
    const phonesData = getPhones()
    setPhones(phonesData)
  }

  const filterPhones = () => {
    let filtered = phones

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(
        (phone) =>
          phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          phone.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Filter by brand
    if (selectedBrand !== "Barchasi") {
      filtered = filtered.filter((phone) => phone.brand === selectedBrand)
    }

    setFilteredPhones(filtered)
  }

  const handleEdit = (phone: Phone) => {
    setEditingPhone({ ...phone })
    setIsEditDialogOpen(true)
  }

  const handleUpdatePhone = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPhone) return

    setIsLoading(true)

    try {
      // Validate required fields
      if (
        !editingPhone.name ||
        !editingPhone.brand ||
        !editingPhone.price ||
        !editingPhone.ram ||
        !editingPhone.storage
      ) {
        toast({
          title: "Xatolik",
          description: "Barcha majburiy maydonlarni to'ldiring",
          variant: "destructive",
        })
        setIsLoading(false)
        return
      }

      // Simulate loading delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      updatePhone(editingPhone.id, editingPhone)
      loadPhones()
      setIsEditDialogOpen(false)
      setEditingPhone(null)

      toast({
        title: "Muvaffaqiyat",
        description: `${editingPhone.name} muvaffaqiyatli yangilandi`,
      })
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Telefon yangilashda xatolik yuz berdi",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  const handleDelete = async (phone: Phone) => {
    if (!confirm(`${phone.name} ni o'chirishni xohlaysizmi?`)) return

    try {
      deletePhone(phone.id)
      loadPhones()
      toast({
        title: "O'chirildi",
        description: `${phone.name} muvaffaqiyatli o'chirildi`,
      })
    } catch (error) {
      toast({
        title: "Xatolik",
        description: "Telefon o'chirishda xatolik yuz berdi",
        variant: "destructive",
      })
    }
  }

  const handleEditInputChange = (field: string, value: string | boolean | number) => {
    if (!editingPhone) return
    setEditingPhone((prev) => ({
      ...prev!,
      [field]: value,
    }))
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
              <Package className="h-6 w-6 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Telefonlarni Boshqarish</h1>
            </div>

            <Button
              onClick={() => navigate("/admin/add-phone")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Yangi Telefon
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <Card className="bg-white/10 backdrop-blur-xl border-white/20">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
                  <Input
                    type="text"
                    placeholder="Telefon yoki brend bo'yicha qidiring..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>

                {/* Brand Filter */}
                <div className="w-full md:w-48">
                  <Select value={selectedBrand} onValueChange={setSelectedBrand}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
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
              </div>

              <div className="mt-4 text-white/70 text-sm">Jami: {filteredPhones.length} ta telefon</div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Phones Grid */}
        {filteredPhones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhones.map((phone, index) => (
              <motion.div
                key={phone.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-300">
                  <CardContent className="p-6">
                    {/* Phone Image */}
                    <div className="aspect-square bg-white/5 rounded-lg mb-4 flex items-center justify-center">
                      <img
                        src={phone.image || "/placeholder.svg"}
                        alt={phone.name}
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Phone Info */}
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30 mb-2">
                            {phone.brand}
                          </Badge>
                          <h3 className="text-white font-semibold text-lg line-clamp-2">{phone.name}</h3>
                        </div>
                        <Badge variant={phone.availability ? "default" : "destructive"}>
                          {phone.availability ? "Mavjud" : "Mavjud emas"}
                        </Badge>
                      </div>

                      <div className="text-xl font-bold text-white">{formatPrice(phone.price)}</div>

                      <div className="grid grid-cols-2 gap-2 text-sm text-white/60">
                        <div>RAM: {phone.ram}</div>
                        <div>Xotira: {phone.storage}</div>
                        <div>Batareya: {phone.battery}</div>
                        <div>Kamera: {phone.camera}</div>
                      </div>

                      {/* Actions */}
                      <div className="flex space-x-2 pt-4">
                        <Button
                          onClick={() => navigate(`/product/${phone.id}`)}
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Ko'rish
                        </Button>
                        <Button
                          onClick={() => handleEdit(phone)}
                          variant="outline"
                          size="sm"
                          className="flex-1 bg-blue-500/20 border-blue-400/30 text-blue-300 hover:bg-blue-500/30"
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Tahrirlash
                        </Button>
                        <Button
                          onClick={() => handleDelete(phone)}
                          variant="outline"
                          size="sm"
                          className="bg-red-500/20 border-red-400/30 text-red-300 hover:bg-red-500/30 px-3"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
            <Package className="h-24 w-24 text-white/30 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-white mb-4">Telefonlar topilmadi</h2>
            <p className="text-white/70 mb-8">
              {searchQuery || selectedBrand !== "Barchasi"
                ? "Qidiruv bo'yicha hech narsa topilmadi"
                : "Hozircha telefonlar yo'q"}
            </p>
            <Button
              onClick={() => navigate("/admin/add-phone")}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Birinchi telefonni qo'shing
            </Button>
          </motion.div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="bg-slate-800 border-white/20 text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="h-5 w-5 mr-2" />
              Telefonni Tahrirlash
            </DialogTitle>
          </DialogHeader>

          {editingPhone && (
            <form onSubmit={handleUpdatePhone} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white/80">Telefon Nomi *</Label>
                  <Input
                    value={editingPhone.name}
                    onChange={(e) => handleEditInputChange("name", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Brend *</Label>
                  <Select value={editingPhone.brand} onValueChange={(value) => handleEditInputChange("brand", value)}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {brands.slice(1).map((brand) => (
                        <SelectItem key={brand} value={brand} className="text-white hover:bg-white/10">
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Narx (so'm) *</Label>
                  <Input
                    type="number"
                    value={editingPhone.price}
                    onChange={(e) => handleEditInputChange("price", Number.parseFloat(e.target.value))}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Rasm URL</Label>
                  <Input
                    value={editingPhone.image}
                    onChange={(e) => handleEditInputChange("image", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">RAM *</Label>
                  <Input
                    value={editingPhone.ram}
                    onChange={(e) => handleEditInputChange("ram", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Xotira *</Label>
                  <Input
                    value={editingPhone.storage}
                    onChange={(e) => handleEditInputChange("storage", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Batareya</Label>
                  <Input
                    value={editingPhone.battery}
                    onChange={(e) => handleEditInputChange("battery", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-white/80">Kamera</Label>
                  <Input
                    value={editingPhone.camera}
                    onChange={(e) => handleEditInputChange("camera", e.target.value)}
                    className="bg-white/10 border-white/20 text-white"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white/80">Tavsif</Label>
                <Textarea
                  value={editingPhone.description || ""}
                  onChange={(e) => handleEditInputChange("description", e.target.value)}
                  className="bg-white/10 border-white/20 text-white"
                />
              </div>

              <div className="flex items-center space-x-3">
                <Switch
                  checked={editingPhone.availability}
                  onCheckedChange={(checked) => handleEditInputChange("availability", checked)}
                />
                <Label className="text-white/80">Mavjud</Label>
              </div>

              <div className="flex space-x-4 pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                >
                  {isLoading ? "Saqlanmoqda..." : "Saqlash"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsEditDialogOpen(false)}
                  className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                >
                  Bekor qilish
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
