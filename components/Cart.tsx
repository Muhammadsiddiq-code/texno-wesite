"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Plus, Minus, Trash2, ShoppingBag, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import {
  getCart,
  removeFromCart,
  updateCartQuantity,
  formatPrice,
  createOrder,
  getCurrentUser,
  type CartItem,
} from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"
import Navbar from "./Navbar"
import Footer from "./Footer"

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showCheckoutForm, setShowCheckoutForm] = useState(false)
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  })
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    loadCart()
  }, [])

  const loadCart = () => {
    const items = getCart()
    setCartItems(items)
    setIsLoading(false)
  }

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    updateCartQuantity(id, newQuantity)
    loadCart()
    window.dispatchEvent(new Event("storage"))
  }

  const handleRemoveItem = (id: string, name: string) => {
    removeFromCart(id)
    loadCart()
    window.dispatchEvent(new Event("storage"))
    toast({
      title: "Mahsulot o'chirildi",
      description: `${name} savatchadan o'chirildi`,
    })
  }

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const handleCheckout = () => {
    const currentUser = getCurrentUser()
    if (currentUser) {
      setOrderForm({
        name: currentUser.name,
        phone: currentUser.phone,
        address: currentUser.address || "",
        email: currentUser.email || "",
      })
    }
    setShowCheckoutForm(true)
  }

  const handlePlaceOrder = () => {
    if (!orderForm.name || !orderForm.phone || !orderForm.address) {
      toast({
        title: "Xatolik",
        description: "Barcha majburiy maydonlarni to'ldiring",
        variant: "destructive",
      })
      return
    }

    const currentUser = getCurrentUser()
    const userId = currentUser?.id || "guest_" + Date.now()

    const orderId = createOrder({
      userId,
      userInfo: orderForm,
      items: cartItems,
      totalPrice: getTotalPrice(),
    })

    // Clear cart after order
    cartItems.forEach((item) => removeFromCart(item.id))
    loadCart()
    window.dispatchEvent(new Event("storage"))

    toast({
      title: "Buyurtma qabul qilindi!",
      description: `Buyurtma raqami: ${orderId}. Tez orada siz bilan bog'lanamiz`,
    })

    setShowCheckoutForm(false)
    navigate("/orders")
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
              <ShoppingBag className="h-8 w-8 text-blue-400" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">Savatcha</h1>
              {cartItems.length > 0 && (
                <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  {getTotalItems()} ta mahsulot
                </span>
              )}
            </div>
          </motion.div>

          {cartItems.length === 0 ? (
            /* Empty Cart */
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <ShoppingBag className="h-24 w-24 text-white/30 mx-auto mb-6" />
              <h2 className="text-2xl font-semibold text-white mb-4">Savatcha bo'sh</h2>
              <p className="text-white/70 mb-8 max-w-md mx-auto">
                Hozircha savatchada hech qanday mahsulot yo'q. Telefonlar katalogiga o'ting va o'zingizga yoqqan
                mahsulotlarni tanlang.
              </p>
              <Button
                onClick={() => navigate("/")}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-xl"
              >
                Xarid qilishni boshlash
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-300">
                      <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row gap-6">
                          {/* Product Image */}
                          <div className="w-full sm:w-32 h-32 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                            <img
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          {/* Product Info */}
                          <div className="flex-1 space-y-3">
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="text-white font-semibold text-lg">{item.name}</h3>
                                <p className="text-white/60 text-sm">{item.brand}</p>
                                <div className="flex items-center space-x-4 text-sm text-white/60 mt-1">
                                  <span>RAM: {item.ram}</span>
                                  <span>Xotira: {item.storage}</span>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleRemoveItem(item.id, item.name)}
                                className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>

                            <div className="flex items-center justify-between">
                              {/* Quantity Controls */}
                              <div className="flex items-center space-x-3">
                                <span className="text-white/70 text-sm">Miqdor:</span>
                                <div className="flex items-center space-x-2">
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2"
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="text-white font-semibold px-3">{item.quantity}</span>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                    className="bg-white/10 border-white/20 text-white hover:bg-white/20 p-2"
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>

                              {/* Price */}
                              <div className="text-right">
                                <div className="text-white font-semibold text-lg">
                                  {formatPrice(item.price * item.quantity)}
                                </div>
                                {item.quantity > 1 && (
                                  <div className="text-white/60 text-sm">
                                    {formatPrice(item.price)} x {item.quantity}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="lg:col-span-1"
              >
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 sticky top-24">
                  <CardContent className="p-6 space-y-6">
                    <h3 className="text-xl font-semibold text-white">Buyurtma xulosasi</h3>

                    <div className="space-y-3">
                      <div className="flex justify-between text-white/70">
                        <span>Mahsulotlar ({getTotalItems()} ta):</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                      </div>
                      <div className="flex justify-between text-white/70">
                        <span>Yetkazib berish:</span>
                        <span className="text-green-400">Bepul</span>
                      </div>
                      <Separator className="bg-white/20" />
                      <div className="flex justify-between text-white font-semibold text-lg">
                        <span>Jami:</span>
                        <span>{formatPrice(getTotalPrice())}</span>
                      </div>
                    </div>

                    {!showCheckoutForm ? (
                      <Button
                        onClick={handleCheckout}
                        className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                      >
                        <CreditCard className="h-5 w-5 mr-2" />
                        Buyurtma berish
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Yetkazib berish ma'lumotlari</h4>
                        <div className="space-y-3">
                          <input
                            type="text"
                            placeholder="To'liq ism"
                            value={orderForm.name}
                            onChange={(e) => setOrderForm({ ...orderForm, name: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                          />
                          <input
                            type="tel"
                            placeholder="Telefon raqam"
                            value={orderForm.phone}
                            onChange={(e) => setOrderForm({ ...orderForm, phone: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                          />
                          <textarea
                            placeholder="Yetkazib berish manzili"
                            value={orderForm.address}
                            onChange={(e) => setOrderForm({ ...orderForm, address: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none h-20 resize-none"
                          />
                          <input
                            type="email"
                            placeholder="Email (ixtiyoriy)"
                            value={orderForm.email}
                            onChange={(e) => setOrderForm({ ...orderForm, email: e.target.value })}
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white placeholder-white/50 focus:border-blue-400 focus:outline-none"
                          />
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            onClick={() => setShowCheckoutForm(false)}
                            variant="outline"
                            className="flex-1 bg-white/10 border-white/20 text-white hover:bg-white/20"
                          >
                            Bekor qilish
                          </Button>
                          <Button
                            onClick={handlePlaceOrder}
                            className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                          >
                            Tasdiqlash
                          </Button>
                        </div>
                      </div>
                    )}

                    <div className="text-center text-white/60 text-sm">Xavfsiz to'lov va tez yetkazib berish</div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  )
}
