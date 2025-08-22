"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import {
  LayoutDashboard,
  Package,
  Plus,
  Settings,
  LogOut,
  Users,
  ShoppingCart,
  TrendingUp,
  Eye,
  Edit,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getPhones, getCart, formatPrice, type Phone } from "@/lib/localStorage"
import { useToast } from "@/hooks/use-toast"

export default function AdminDashboard() {
  const [phones, setPhones] = useState<Phone[]>([])
  const [cartItems, setCartItems] = useState(0)
  const [adminUsername, setAdminUsername] = useState("")
  const navigate = useNavigate()
  const { toast } = useToast()

  useEffect(() => {
    // Check if admin is logged in
    const isLoggedIn = localStorage.getItem("texnopark_admin_logged_in")
    const username = localStorage.getItem("texnopark_admin_username")

    if (!isLoggedIn || !username) {
      navigate("/admin")
      return
    }

    setAdminUsername(username)
    loadData()
  }, [navigate])

  const loadData = () => {
    const phonesData = getPhones()
    const cart = getCart()
    setPhones(phonesData)
    setCartItems(cart.reduce((sum, item) => sum + item.quantity, 0))
  }

  const handleLogout = () => {
    localStorage.removeItem("texnopark_admin_logged_in")
    localStorage.removeItem("texnopark_admin_username")
    toast({
      title: "Chiqish",
      description: "Admin paneldan muvaffaqiyatli chiqdingiz",
    })
    navigate("/admin")
  }

  const stats = [
    {
      title: "Jami Telefonlar",
      value: phones.length,
      icon: Package,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/20",
    },
    {
      title: "Mavjud Telefonlar",
      value: phones.filter((p) => p.availability).length,
      icon: TrendingUp,
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-500/20",
    },
    {
      title: "Savatcha",
      value: cartItems,
      icon: ShoppingCart,
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/20",
    },
    {
      title: "Foydalanuvchilar",
      value: "1.2K",
      icon: Users,
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/20",
    },
  ]

  const recentPhones = phones.slice(-5).reverse()

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <LayoutDashboard className="h-8 w-8 text-blue-400" />
              <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-white/70">Salom, {adminUsername}</span>
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-white/70 hover:text-white hover:bg-white/10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Chiqish
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Boshqaruv Paneli</h2>
          <p className="text-white/70">Texnopark do'koni statistikasi va boshqaruvi</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 hover:border-white/30 transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-white/70 text-sm font-medium">{stat.title}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Tezkor Amallar
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate("/admin/add-phone")}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white justify-start"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Yangi Telefon Qo'shish
                </Button>

                <Button
                  onClick={() => navigate("/admin/manage-phones")}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 justify-start"
                >
                  <Package className="h-4 w-4 mr-2" />
                  Telefonlarni Boshqarish
                </Button>

                <Button
                  onClick={() => navigate("/")}
                  variant="outline"
                  className="w-full bg-white/10 border-white/20 text-white hover:bg-white/20 justify-start"
                >
                  <Eye className="h-4 w-4 mr-2" />
                  Do'konni Ko'rish
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Phones */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  <span className="flex items-center">
                    <Package className="h-5 w-5 mr-2" />
                    So'nggi Qo'shilgan Telefonlar
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/admin/manage-phones")}
                    className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                  >
                    Barchasini ko'rish
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentPhones.length > 0 ? (
                  <div className="space-y-3">
                    {recentPhones.map((phone) => (
                      <div
                        key={phone.id}
                        className="flex items-center justify-between p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center space-x-3">
                          <img
                            src={phone.image || "/placeholder.svg"}
                            alt={phone.name}
                            className="w-12 h-12 object-contain bg-white/10 rounded-lg"
                          />
                          <div>
                            <h4 className="text-white font-medium">{phone.name}</h4>
                            <p className="text-white/60 text-sm">{phone.brand}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Badge variant={phone.availability ? "default" : "destructive"}>
                            {phone.availability ? "Mavjud" : "Mavjud emas"}
                          </Badge>
                          <span className="text-white font-semibold">{formatPrice(phone.price)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => navigate(`/admin/manage-phones`)}
                            className="text-white/60 hover:text-white hover:bg-white/10 p-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-white/60">
                    <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                    <p>Hozircha telefonlar yo'q</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
