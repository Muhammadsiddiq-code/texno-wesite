"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Package, Truck, CheckCircle, Clock, Eye } from "lucide-react"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  userId: string
  items: OrderItem[]
  total: number
  status: "pending" | "processing" | "shipped" | "delivered"
  createdAt: string
  deliveryAddress: string
}

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [currentUser, setCurrentUser] = useState<any>(null)

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      const userData = JSON.parse(user)
      setCurrentUser(userData)

      const allOrders = JSON.parse(localStorage.getItem("orders") || "[]")
      const userOrders = allOrders.filter((order: Order) => order.userId === userData.id)
      setOrders(
        userOrders.sort((a: Order, b: Order) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      )
    }
  }, [])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Kutilmoqda"
      case "processing":
        return "Tayyorlanmoqda"
      case "shipped":
        return "Yetkazilmoqda"
      case "delivered":
        return "Yetkazildi"
      default:
        return "Noma'lum"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!currentUser) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardContent className="pt-6 text-center">
            <p className="text-white/70">Buyurtmalar tarixini ko'rish uchun hisobingizga kiring</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Buyurtmalar tarixi</h1>
        <p className="text-white/70">Barcha buyurtmalaringizni kuzatib boring</p>
      </motion.div>

      <div className="space-y-6">
        {orders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="bg-white/10 backdrop-blur-md border-white/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white flex items-center space-x-2">
                    <span>Buyurtma #{order.id.slice(-6)}</span>
                    <Badge className={`${getStatusColor(order.status)} text-white`}>
                      <div className="flex items-center space-x-1">
                        {getStatusIcon(order.status)}
                        <span>{getStatusText(order.status)}</span>
                      </div>
                    </Badge>
                  </CardTitle>
                  <div className="text-right">
                    <p className="text-white font-semibold">${order.total.toLocaleString()}</p>
                    <p className="text-white/70 text-sm">{new Date(order.createdAt).toLocaleDateString("uz-UZ")}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Order Items */}
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4 p-3 bg-white/5 rounded-lg">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="text-white font-medium">{item.name}</h4>
                          <p className="text-white/70 text-sm">
                            Miqdor: {item.quantity} × ${item.price.toLocaleString()}
                          </p>
                        </div>
                        <div className="text-white font-semibold">${(item.price * item.quantity).toLocaleString()}</div>
                      </div>
                    ))}
                  </div>

                  {/* Delivery Address */}
                  <div className="p-3 bg-white/5 rounded-lg">
                    <h4 className="text-white font-medium mb-1">Yetkazib berish manzili:</h4>
                    <p className="text-white/70">{order.deliveryAddress}</p>
                  </div>

                  {/* Order Actions */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Batafsil
                    </Button>
                    {order.status === "delivered" && (
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        Qayta buyurtma berish
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}

        {orders.length === 0 && (
          <Card className="bg-white/10 backdrop-blur-md border-white/20">
            <CardContent className="pt-6 text-center">
              <Package className="w-16 h-16 text-white/50 mx-auto mb-4" />
              <h3 className="text-white text-lg font-semibold mb-2">Hozircha buyurtmalar yo'q</h3>
              <p className="text-white/70 mb-4">Birinchi buyurtmangizni bering va bu yerda kuzatib boring</p>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Xarid qilishni boshlash
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
