"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Heart, ShoppingCart, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { addToCart, addToWishlist, formatPrice, type Phone } from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"

interface ProductCardProps {
  phone: Phone
}

export default function ProductCard({ phone }: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 300))

    addToCart(phone)
    toast({
      title: "Savatchaga qo'shildi",
      description: `${phone.name} savatchaga qo'shildi`,
    })
    window.dispatchEvent(new Event("storage"))
    setIsLoading(false)
  }

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!isLiked) {
      addToWishlist(phone)
      setIsLiked(true)
      toast({
        title: "Tanlanganlar ro'yxatiga qo'shildi",
        description: `${phone.name} tanlanganlar ro'yxatiga qo'shildi`,
      })
      window.dispatchEvent(new Event("storage"))
    }
  }

  return (
    <motion.div whileHover={{ y: -8, scale: 1.02 }} transition={{ duration: 0.3, ease: "easeOut" }} className="group">
      <Card className="glass-card overflow-hidden hover-lift smooth-transition">
        <div className="relative">
          <div className="aspect-square bg-gradient-to-br from-white/5 to-white/10 p-6 flex items-center justify-center relative overflow-hidden">
            <motion.img
              src={phone.image || "/placeholder.svg"}
              alt={phone.name}
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 smooth-transition"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

            {/* Wishlist Button */}
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleAddToWishlist}
                className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-sm transition-all duration-300 smooth-transition ${
                  isLiked
                    ? "bg-red-500/20 text-red-400 hover:bg-red-500/30"
                    : "bg-white/10 text-white/60 hover:bg-white/20 hover:text-red-400"
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              </Button>
            </motion.div>

            {/* Quick View Button */}
            <Link to={`/product/${phone.id}`}>
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  size="sm"
                  variant="ghost"
                  className="absolute top-3 left-3 p-2 rounded-full bg-white/10 text-white/60 hover:bg-white/20 hover:text-white backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-all duration-300 smooth-transition"
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </motion.div>
            </Link>
          </div>

          <CardContent className="p-6 card-responsive">
            <motion.div
              className="inline-block px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs font-medium text-blue-300 mb-3"
              whileHover={{ scale: 1.05 }}
            >
              {phone.brand}
            </motion.div>

            {/* Product Name */}
            <Link to={`/product/${phone.id}`}>
              <motion.h3
                className="text-white font-semibold text-lg mb-2 hover:text-blue-300 transition-colors line-clamp-2 smooth-transition"
                whileHover={{ x: 2 }}
              >
                {phone.name}
              </motion.h3>
            </Link>

            <div className="space-y-1 mb-4 text-sm text-white/60">
              <div className="flex justify-between">
                <span>RAM:</span>
                <span className="text-white/80">{phone.ram}</span>
              </div>
              <div className="flex justify-between">
                <span>Xotira:</span>
                <span className="text-white/80">{phone.storage}</span>
              </div>
              <div className="flex justify-between mobile-hide">
                <span>Batareya:</span>
                <span className="text-white/80">{phone.battery}</span>
              </div>
            </div>

            <motion.div
              className="text-2xl font-bold text-white mb-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              {formatPrice(phone.price)}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleAddToCart}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-2.5 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all duration-300 btn-responsive hover-glow smooth-transition"
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"
                  />
                ) : (
                  <ShoppingCart className="h-4 w-4 mr-2" />
                )}
                {isLoading ? "Qo'shilmoqda..." : "Savatchaga qo'shish"}
              </Button>
            </motion.div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
