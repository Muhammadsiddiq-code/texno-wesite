"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import { ArrowLeft, Heart, ShoppingCart, Star, Shield, Truck, RefreshCw, GitCompare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getPhones, addToCart, addToWishlist, formatPrice, type Phone } from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"
import ProductReviews from "./ProductReviews"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function ProductDetails() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [phone, setPhone] = useState<Phone | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  useEffect(() => {
    if (id) {
      const phones = getPhones()
      const foundPhone = phones.find((p) => p.id === id)
      if (foundPhone) {
        setPhone(foundPhone)
      } else {
        navigate("/")
      }
    }
  }, [id, navigate])

  const handleAddToCart = () => {
    if (phone) {
      for (let i = 0; i < quantity; i++) {
        addToCart(phone)
      }
      toast({
        title: "Savatchaga qo'shildi",
        description: `${phone.name} (${quantity} dona) savatchaga qo'shildi`,
      })
      window.dispatchEvent(new Event("storage"))
    }
  }

  const handleAddToWishlist = () => {
    if (phone && !isLiked) {
      addToWishlist(phone)
      setIsLiked(true)
      toast({
        title: "Tanlanganlar ro'yxatiga qo'shildi",
        description: `${phone.name} tanlanganlar ro'yxatiga qo'shildi`,
      })
      window.dispatchEvent(new Event("storage"))
    }
  }

  const handleAddToCompare = () => {
    if (phone) {
      const compareList = JSON.parse(localStorage.getItem("compareList") || "[]")

      if (compareList.length >= 3) {
        toast({
          title: "Maksimal limit",
          description: "Faqat 3 ta mahsulotni taqqoslash mumkin",
          variant: "destructive",
        })
        return
      }

      if (compareList.find((p: Phone) => p.id === phone.id)) {
        toast({
          title: "Allaqachon qo'shilgan",
          description: "Bu mahsulot allaqachon taqqoslash ro'yxatida",
          variant: "destructive",
        })
        return
      }

      compareList.push(phone)
      localStorage.setItem("compareList", JSON.stringify(compareList))

      toast({
        title: "Taqqoslashga qo'shildi",
        description: `${phone.name} taqqoslash ro'yxatiga qo'shildi`,
      })
      window.dispatchEvent(new Event("storage"))
    }
  }

  if (!phone) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-white text-xl">Yuklanmoqda...</div>
      </div>
    )
  }

  // Mock additional images for demo
  const images = [phone.image, phone.image, phone.image]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />

      <div className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Back Button */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="mb-8">
            <Button variant="ghost" onClick={() => navigate("/")} className="text-white hover:bg-white/10 p-2">
              <ArrowLeft className="h-5 w-5 mr-2" />
              Orqaga qaytish
            </Button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 overflow-hidden">
                <CardContent className="p-8">
                  {/* Main Image */}
                  <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 rounded-2xl p-8 mb-6 flex items-center justify-center">
                    <img
                      src={images[selectedImage] || "/placeholder.svg"}
                      alt={phone.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  {/* Image Thumbnails */}
                  <div className="flex space-x-4 justify-center">
                    {images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                          selectedImage === index
                            ? "border-blue-400 shadow-lg shadow-blue-400/25"
                            : "border-white/20 hover:border-white/40"
                        }`}
                      >
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`${phone.name} ${index + 1}`}
                          className="w-full h-full object-contain bg-white/5"
                        />
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Product Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Brand and Availability */}
              <div className="flex items-center justify-between">
                <Badge className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-300 border-blue-400/30">
                  {phone.brand}
                </Badge>
                <Badge variant={phone.availability ? "default" : "destructive"}>
                  {phone.availability ? "Mavjud" : "Mavjud emas"}
                </Badge>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-white">{phone.name}</h1>

              {/* Rating */}
              <div className="flex items-center space-x-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <span className="text-white/70">(4.8) • 127 ta sharh</span>
              </div>

              {/* Price */}
              <div className="text-4xl font-bold text-white">{formatPrice(phone.price)}</div>

              {/* Description */}
              <p className="text-white/70 text-lg leading-relaxed">
                {phone.description || "Premium sifatli smartfon eng yangi texnologiyalar bilan."}
              </p>

              <Separator className="bg-white/20" />

              {/* Specifications */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Texnik xususiyatlari</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white/60 text-sm">RAM</div>
                    <div className="text-white font-semibold">{phone.ram}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white/60 text-sm">Xotira</div>
                    <div className="text-white font-semibold">{phone.storage}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white/60 text-sm">Batareya</div>
                    <div className="text-white font-semibold">{phone.battery}</div>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-white/60 text-sm">Kamera</div>
                    <div className="text-white font-semibold">{phone.camera}</div>
                  </div>
                </div>
              </div>

              <Separator className="bg-white/20" />

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <span className="text-white font-medium">Miqdor:</span>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      -
                    </Button>
                    <span className="text-white font-semibold px-4">{quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setQuantity(quantity + 1)}
                      className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!phone.availability}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Savatchaga qo'shish
                  </Button>

                  <Button
                    onClick={handleAddToWishlist}
                    variant="outline"
                    className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                      isLiked
                        ? "bg-red-500/20 border-red-400/30 text-red-400 hover:bg-red-500/30"
                        : "bg-white/10 border-white/20 text-white hover:bg-white/20"
                    }`}
                  >
                    <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
                  </Button>

                  <Button
                    onClick={handleAddToCompare}
                    variant="outline"
                    className="px-6 py-3 rounded-xl bg-white/10 border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                  >
                    <GitCompare className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
                <div className="flex items-center space-x-3 text-white/70">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm">1 yil kafolat</span>
                </div>
                <div className="flex items-center space-x-3 text-white/70">
                  <Truck className="h-5 w-5 text-blue-400" />
                  <span className="text-sm">Bepul yetkazib berish</span>
                </div>
                <div className="flex items-center space-x-3 text-white/70">
                  <RefreshCw className="h-5 w-5 text-purple-400" />
                  <span className="text-sm">14 kun qaytarish</span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="mt-16">
            <ProductReviews phoneId={phone.id} />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
