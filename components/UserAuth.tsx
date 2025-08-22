"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, Mail, Phone, MapPin } from "lucide-react"
import { toast } from "@/hooks/use-toast"

interface UserAuthUser {
  id: string
  name: string
  email: string
  phone: string
  address: string
  createdAt: string
}

export default function UserAuth() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserAuthUser | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    confirmPassword: "",
  })

  useEffect(() => {
    const user = localStorage.getItem("currentUser")
    if (user) {
      setCurrentUser(JSON.parse(user))
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const user = users.find((u: UserAuthUser) => u.email === formData.email)

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user))
      setCurrentUser(user)
      toast({
        title: "Muvaffaqiyatli kirish!",
        description: "Xush kelibsiz, " + user.name,
      })
    } else {
      toast({
        title: "Xatolik!",
        description: "Email yoki parol noto'g'ri",
        variant: "destructive",
      })
    }
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Xatolik!",
        description: "Parollar mos kelmaydi",
        variant: "destructive",
      })
      return
    }

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const newUser: UserAuthUser = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      createdAt: new Date().toISOString(),
    }

    users.push(newUser)
    localStorage.setItem("users", JSON.stringify(users))
    localStorage.setItem("currentUser", JSON.stringify(newUser))
    setCurrentUser(newUser)

    toast({
      title: "Ro'yxatdan o'tish muvaffaqiyatli!",
      description: "Xush kelibsiz, " + newUser.name,
    })
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    toast({
      title: "Chiqish",
      description: "Tizimdan muvaffaqiyatli chiqdingiz",
    })
  }

  if (currentUser) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto p-6">
        <Card className="bg-white/10 backdrop-blur-md border-white/20">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-white">Profil</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-3 text-white/80">
              <Mail className="w-5 h-5" />
              <span>{currentUser.name}</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <Mail className="w-5 h-5" />
              <span>{currentUser.email}</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <Phone className="w-5 h-5" />
              <span>{currentUser.phone}</span>
            </div>
            <div className="flex items-center space-x-3 text-white/80">
              <MapPin className="w-5 h-5" />
              <span>{currentUser.address}</span>
            </div>
            <Button onClick={handleLogout} className="w-full bg-red-500 hover:bg-red-600">
              Chiqish
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md mx-auto p-6">
      <Card className="bg-white/10 backdrop-blur-md border-white/20">
        <CardHeader>
          <CardTitle className="text-white text-center">Texnopark</CardTitle>
          <CardDescription className="text-white/70 text-center">
            Hisobingizga kiring yoki ro'yxatdan o'ting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={isLogin ? "login" : "register"} onValueChange={(value) => setIsLogin(value === "login")}>
            <TabsList className="grid w-full grid-cols-2 bg-white/10">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-white/20">
                Kirish
              </TabsTrigger>
              <TabsTrigger value="register" className="text-white data-[state=active]:bg-white/20">
                Ro'yxat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">
                    Parol
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      className="bg-white/10 border-white/20 text-white placeholder:text-white/50 pr-10"
                      placeholder="Parolingizni kiriting"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Kirish
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register">
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-white">
                    Ism
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Ismingizni kiriting"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-white">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="email@example.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">
                    Telefon
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="+998 90 123 45 67"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="address" className="text-white">
                    Manzil
                  </Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Manzilingizni kiriting"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-white">
                    Parol
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Parol yarating"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="confirmPassword" className="text-white">
                    Parolni tasdiqlang
                  </Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Parolni qayta kiriting"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                >
                  Ro'yxatdan o'tish
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </motion.div>
  )
}
