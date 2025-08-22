"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { User, Lock, Settings, Package, Plus, Edit, BarChart3, Shield } from "lucide-react"
import { Link } from "react-router-dom"

export default function AdminAccessGuide() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-white mb-4">Admin Panel Yo'riqnomasi</h1>
        <p className="text-white/70 text-lg">Texnopark admin paneliga kirish va boshqarish bo'yicha to'liq ma'lumot</p>
      </motion.div>

      {/* Access Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Card className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-blue-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Lock className="w-6 h-6" />
              <span>Admin Paneliga Kirish</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-white/10 rounded-lg p-4">
              <h3 className="text-white font-semibold mb-2">Demo Hisoblar:</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Foydalanuvchi nomi:</span>
                  <Badge className="bg-green-500/20 text-green-300">admin</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/80">Parol:</span>
                  <Badge className="bg-green-500/20 text-green-300">admin123</Badge>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link to="/admin" className="flex-1">
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <User className="w-4 h-4 mr-2" />
                  Admin Paneliga Kirish
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Features Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Settings className="w-6 h-6" />
              <span>Admin Panel Imkoniyatlari</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: BarChart3,
                  title: "Dashboard",
                  description: "Umumiy statistika va hisobotlar",
                  features: ["Sotuvlar statistikasi", "Foydalanuvchilar soni", "Mashhur mahsulotlar"],
                },
                {
                  icon: Plus,
                  title: "Mahsulot Qo'shish",
                  description: "Yangi smartfonlar qo'shish",
                  features: ["To'liq ma'lumotlar", "Rasmlar yuklash", "Texnik xususiyatlar"],
                },
                {
                  icon: Edit,
                  title: "Mahsulotlarni Boshqarish",
                  description: "Mavjud mahsulotlarni tahrirlash",
                  features: ["Narxlarni yangilash", "Mavjudlikni boshqarish", "Ma'lumotlarni tahrirlash"],
                },
                {
                  icon: Package,
                  title: "Buyurtmalar",
                  description: "Buyurtmalarni kuzatish va boshqarish",
                  features: ["Buyurtma holati", "Yetkazib berish", "Mijozlar bilan aloqa"],
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="bg-white/5 rounded-lg p-4"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold">{feature.title}</h4>
                      <p className="text-white/60 text-sm">{feature.description}</p>
                    </div>
                  </div>
                  <ul className="space-y-1">
                    {feature.features.map((item, i) => (
                      <li key={i} className="text-white/70 text-sm flex items-center">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Security Notice */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <Card className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30">
          <CardHeader>
            <CardTitle className="text-white flex items-center space-x-2">
              <Shield className="w-6 h-6" />
              <span>Xavfsizlik Eslatmasi</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-white/80">
              <p>• Bu demo versiya bo'lib, haqiqiy ishlab chiqarish muhitida ishlatilmasligi kerak</p>
              <p>• Barcha ma'lumotlar localStorage da saqlanadi va brauzer tozalanganda yo'qoladi</p>
              <p>• Haqiqiy loyihada kuchli parollar va xavfsizlik choralarini qo'llang</p>
              <p>• Admin huquqlarini faqat ishonchli shaxslarga bering</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
