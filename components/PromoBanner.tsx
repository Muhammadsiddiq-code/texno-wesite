"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Gift, Zap, Star } from "lucide-react"

interface Promo {
  id: string
  title: string
  description: string
  discount: string
  code: string
  validUntil: string
  type: "sale" | "new" | "featured"
}

export default function PromoBanner() {
  const [promos, setPromos] = useState<Promo[]>([])
  const [currentPromo, setCurrentPromo] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Initialize promo data
    const defaultPromos: Promo[] = [
      {
        id: "1",
        title: "Yangi yil chegirmasi!",
        description: "Barcha smartfonlarga 20% gacha chegirma",
        discount: "20%",
        code: "NEWYEAR2024",
        validUntil: "2024-01-31",
        type: "sale",
      },
      {
        id: "2",
        title: "iPhone 15 Pro Max",
        description: "Eng yangi iPhone modeli hozir mavjud!",
        discount: "Yangi",
        code: "IPHONE15",
        validUntil: "2024-12-31",
        type: "new",
      },
      {
        id: "3",
        title: "Samsung Galaxy S24 Ultra",
        description: "Premium kameralar va AI xususiyatlari",
        discount: "TOP",
        code: "GALAXY24",
        validUntil: "2024-12-31",
        type: "featured",
      },
    ]

    const savedPromos = localStorage.getItem("promos")
    if (!savedPromos) {
      localStorage.setItem("promos", JSON.stringify(defaultPromos))
      setPromos(defaultPromos)
    } else {
      setPromos(JSON.parse(savedPromos))
    }

    // Auto-rotate promos
    const interval = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % defaultPromos.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const getPromoIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <Gift className="w-6 h-6" />
      case "new":
        return <Zap className="w-6 h-6" />
      case "featured":
        return <Star className="w-6 h-6" />
      default:
        return <Gift className="w-6 h-6" />
    }
  }

  const getPromoColor = (type: string) => {
    switch (type) {
      case "sale":
        return "from-red-500 to-pink-600"
      case "new":
        return "from-blue-500 to-purple-600"
      case "featured":
        return "from-yellow-500 to-orange-600"
      default:
        return "from-blue-500 to-purple-600"
    }
  }

  if (!isVisible || promos.length === 0) return null

  const promo = promos[currentPromo]

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        className="relative mb-6"
      >
        <Card className={`bg-gradient-to-r ${getPromoColor(promo.type)} border-0 overflow-hidden`}>
          <CardContent className="p-4 relative">
            <Button
              onClick={() => setIsVisible(false)}
              size="sm"
              variant="ghost"
              className="absolute top-2 right-2 text-white hover:bg-white/20 w-8 h-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>

            <div className="flex items-center space-x-4">
              <div className="text-white">{getPromoIcon(promo.type)}</div>

              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="text-white font-bold text-lg">{promo.title}</h3>
                  <span className="bg-white/20 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    {promo.discount}
                  </span>
                </div>
                <p className="text-white/90 text-sm mb-2">{promo.description}</p>
                <div className="flex items-center space-x-4 text-white/80 text-xs">
                  <span>
                    Kod: <strong>{promo.code}</strong>
                  </span>
                  <span>Amal qiladi: {new Date(promo.validUntil).toLocaleDateString("uz-UZ")}</span>
                </div>
              </div>

              <Button size="sm" className="bg-white text-gray-900 hover:bg-white/90 font-semibold">
                Foydalanish
              </Button>
            </div>

            {/* Progress indicators */}
            <div className="flex space-x-1 mt-3">
              {promos.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 flex-1 rounded-full transition-all duration-300 ${
                    index === currentPromo ? "bg-white" : "bg-white/30"
                  }`}
                />
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/10 rounded-full blur-xl" />
            <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full blur-lg" />
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
