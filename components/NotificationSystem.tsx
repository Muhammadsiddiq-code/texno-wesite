"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bell, X, Package, Heart, ShoppingCart, Star, Gift } from "lucide-react"

interface Notification {
  id: string
  type: "order" | "wishlist" | "cart" | "review" | "promo"
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Initialize notifications
    const defaultNotifications: Notification[] = [
      {
        id: "1",
        type: "order",
        title: "Buyurtma tasdiqlandi",
        message: "iPhone 15 Pro Max buyurtmangiz qabul qilindi va tayyorlanmoqda",
        timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
        read: false,
      },
      {
        id: "2",
        type: "promo",
        title: "Yangi chegirma!",
        message: "Samsung Galaxy S24 Ultra uchun 15% chegirma",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        read: false,
      },
      {
        id: "3",
        type: "wishlist",
        title: "Tanlanganlar narxi tushdi",
        message: "Xiaomi 14 Ultra narxi 50$ ga tushdi",
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
        read: true,
      },
    ]

    const savedNotifications = localStorage.getItem("notifications")
    if (!savedNotifications) {
      localStorage.setItem("notifications", JSON.stringify(defaultNotifications))
      setNotifications(defaultNotifications)
    } else {
      setNotifications(JSON.parse(savedNotifications))
    }
  }, [])

  useEffect(() => {
    const unread = notifications.filter((n) => !n.read).length
    setUnreadCount(unread)
  }, [notifications])

  const markAsRead = (id: string) => {
    const updatedNotifications = notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    setNotifications(updatedNotifications)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
  }

  const removeNotification = (id: string) => {
    const updatedNotifications = notifications.filter((n) => n.id !== id)
    setNotifications(updatedNotifications)
    localStorage.setItem("notifications", JSON.stringify(updatedNotifications))
  }

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "order":
        return <Package className="w-5 h-5 text-blue-400" />
      case "wishlist":
        return <Heart className="w-5 h-5 text-red-400" />
      case "cart":
        return <ShoppingCart className="w-5 h-5 text-green-400" />
      case "review":
        return <Star className="w-5 h-5 text-yellow-400" />
      case "promo":
        return <Gift className="w-5 h-5 text-purple-400" />
      default:
        return <Bell className="w-5 h-5 text-gray-400" />
    }
  }

  const formatTime = (timestamp: string) => {
    const now = new Date()
    const time = new Date(timestamp)
    const diffInMinutes = Math.floor((now.getTime() - time.getTime()) / (1000 * 60))

    if (diffInMinutes < 60) {
      return `${diffInMinutes} daqiqa oldin`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} soat oldin`
    } else {
      return `${Math.floor(diffInMinutes / 1440)} kun oldin`
    }
  }

  return (
    <div className="relative">
      {/* Notification Bell */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="ghost"
        size="sm"
        className="relative text-white hover:bg-white/10"
      >
        <Bell className="w-5 h-5" />
        <AnimatePresence>
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse"
            >
              {unreadCount}
            </motion.span>
          )}
        </AnimatePresence>
      </Button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute right-0 top-full mt-2 w-80 z-50"
          >
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-0">
                <div className="p-4 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">Bildirishnomalar</h3>
                    <Button
                      onClick={() => setIsOpen(false)}
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/10 w-8 h-8 p-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-6 text-center">
                      <Bell className="w-12 h-12 text-white/30 mx-auto mb-2" />
                      <p className="text-white/70">Bildirishnomalar yo'q</p>
                    </div>
                  ) : (
                    <div className="space-y-1">
                      {notifications.map((notification, index) => (
                        <motion.div
                          key={notification.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors ${
                            !notification.read ? "bg-blue-500/10" : ""
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="flex-shrink-0 mt-1">{getNotificationIcon(notification.type)}</div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="text-white font-medium text-sm truncate">{notification.title}</h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0 ml-2" />
                                )}
                              </div>
                              <p className="text-white/70 text-xs mb-2 line-clamp-2">{notification.message}</p>
                              <div className="flex items-center justify-between">
                                <span className="text-white/50 text-xs">{formatTime(notification.timestamp)}</span>
                                <div className="flex space-x-1">
                                  {!notification.read && (
                                    <Button
                                      onClick={() => markAsRead(notification.id)}
                                      size="sm"
                                      variant="ghost"
                                      className="text-blue-400 hover:bg-blue-500/20 h-6 px-2 text-xs"
                                    >
                                      O'qildi
                                    </Button>
                                  )}
                                  <Button
                                    onClick={() => removeNotification(notification.id)}
                                    size="sm"
                                    variant="ghost"
                                    className="text-red-400 hover:bg-red-500/20 h-6 px-2 text-xs"
                                  >
                                    O'chirish
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
