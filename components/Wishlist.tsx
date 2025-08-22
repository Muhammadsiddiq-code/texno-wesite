"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { getWishlist, removeFromWishlist, addToCart, formatPrice, type Phone } from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState<Phone[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    loadWishlist()
  }, [])

  const loadWishlist = () => {
    const items = getWishlist()
    setWishlistItems(items)
    setIsLoading(false)
  }

  const handleRemoveFromWishlist = (id: string, name: string) => {
    removeFromWishlist(id)
    loadWishlist()
    window.dispatchEvent(new Event("storage"))
    toast({
      title: "Tanlanganlardan o'chirildi",
      description: `${name} tanlanganlar ro'yxatidan o'chirildi`,
    })
  }

  const handleAddToCart = (phone: Phone) => {
    addToCart(phone)
    window.dispatchEvent(new Event("storage"))
    toast({
      title: "Savatchaga qo'shildi",
      description: `${phone.name} savatchaga qo'shildi`,
    })
  }

  const handleMoveToCart = (phone: Phone) => {
    addToCart(phone)
    removeFromWishlist(phone.id)
    loadWishlist()
    window.dispatchEvent(new Event("storage"))
    toast({
      title: "Savatchaga ko'chirildi",
      description: `${phone.name} savatchaga ko'chirildi`,
    })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Yuklanmoqda...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/")} className="text-white hover:bg-white/10 p-2 mb-4">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Orqaga qaytish
            </Button>

            <div className="flex items-center space-x-3">
              <Heart className="h-8 w-8 text-red-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">Tanlanganlar</h1>
              {wishlistItems.length > 0 && (
                <span className="bg-red-500/20 text-red-300 px-3 py-1 rounded-full text-sm font-medium">
                  {wishlistItems.length} ta mahsulot
                </span>
              )}
            </div>
          </motion.div>

          {wishlistItems.length === 0 ? (
            /* Empty Wishlist */
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <Heart className="h-24 w-24 text-white/30 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-white mb-4">Tanlanganlar ro'yxati bo'sh</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Hozircha tanlanganlar ro'yxatida hech qanday mahsulot yo'q. Telefonlar katalogiga o'ting va yoqqan
                mahsulotlaringizni tanlang.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl"
              >
                Telefonlarni ko'rish
              </Button>
            </motion.div>
          ) : (
            /* Wishlist Items */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlistItems.map((phone, index) => (
                <motion.div
                  key={phone.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-300 overflow-hidden group">
                    <div className="relative">
                      {/* Product Image */}
                      <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 p-6 flex items-center justify-center">
                        <img
                          src={phone.image || "/placeholder.svg"}
                          alt={phone.name}
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                        />

                        {/* Remove Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleRemoveFromWishlist(phone.id, phone.name)}
                          className="absolute top-3 right-3 p-2 rounded-full bg-red-500/20 text-red-400 hover:bg-red-500/30 backdrop-blur-sm"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <CardContent className="p-6">
                        {/* Brand Badge */}
                        <div className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs font-medium text-blue-300 mb-3">
                          {phone.brand}
                        </div>

                        {/* Product Name */}
                        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2">{phone.name}</h3>

                        {/* Specs */}
                        <div className="space-y-1 mb-4 text-sm text-white/60">
                          <div className="flex justify-between">
                            <span>RAM:</span>
                            <span className="text-white/80">{phone.ram}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Xotira:</span>
                            <span className="text-white/80">{phone.storage}</span>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-xl font-bold text-white mb-4">{formatPrice(phone.price)}</div>

                        {/* Action Buttons */}
                        <div className="space-y-2">
                          <Button
                            onClick={() => handleMoveToCart(phone)}
                            disabled={!phone.availability}
                            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                          >
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Savatchaga ko'chirish
                          </Button>

                          <Button
                            onClick={() => navigate(`/product/${phone.id}`)}
                            variant="outline"
                            className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 py-2.5 rounded-xl"
                          >
                            Batafsil ko'rish
                          </Button>
                        </div>

                        {!phone.availability && (
                          <div className="mt-2 text-center text-red-400 text-sm">Mavjud emas</div>
                        )}
                      </CardContent>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Bulk Actions */}
          {wishlistItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-12 text-center"
            >
              <div className="bg-white/10 backdrop-blur-xl border-white/20 rounded-2xl p-6 inline-block">
                <p className="text-white/70 mb-4">Barcha mahsulotlarni savatchaga qo'shishni xohlaysizmi?</p>
                <Button
                  onClick={() => {
                    wishlistItems.forEach((phone) => {
                      if (phone.availability) {
                        addToCart(phone)
                      }
                    })
                    window.dispatchEvent(new Event("storage"))
                    toast({
                      title: "Barcha mahsulotlar qo'shildi",
                      description: "Mavjud mahsulotlar savatchaga qo'shildi",
                    })
                  }}
                  className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-6 py-2 rounded-xl"
                >
                  Barchasini savatchaga qo'shish
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
