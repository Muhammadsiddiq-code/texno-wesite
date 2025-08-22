"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { Search, ShoppingCart, Heart, User, Menu, X, GitCompare, Package, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { getCart, getWishlist } from "@/lib/localStorage"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [wishlistCount, setWishlistCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [compareCount, setCompareCount] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const updateCounts = () => {
      const cart = getCart()
      const wishlist = getWishlist()
      const compareList = JSON.parse(localStorage.getItem("compareList") || "[]")
      setCartCount(cart.reduce((sum, item) => sum + item.quantity, 0))
      setWishlistCount(wishlist.length)
      setCompareCount(compareList.length)
    }

    const checkUser = () => {
      const user = localStorage.getItem("currentUser")
      if (user) {
        setCurrentUser(JSON.parse(user))
      } else {
        setCurrentUser(null)
      }
    }

    updateCounts()
    checkUser()
    window.addEventListener("storage", updateCounts)
    window.addEventListener("storage", checkUser)

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("storage", updateCounts)
      window.removeEventListener("storage", checkUser)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/?search=${encodeURIComponent(searchQuery)}`)
      setIsMenuOpen(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    setCurrentUser(null)
    setIsMenuOpen(false)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-black/40 backdrop-blur-xl border-b border-white/20 shadow-lg"
          : "bg-black/20 backdrop-blur-xl border-b border-white/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
            >
              Texnopark
            </motion.div>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Input
                type="text"
                placeholder="Telefonlarni qidiring..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10 focus-ring smooth-transition"
              />
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  type="submit"
                  size="sm"
                  className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10 p-2"
                >
                  <Search className="h-4 w-4 text-white" />
                </Button>
              </motion.div>
            </form>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link to="/compare">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10 smooth-transition">
                  <GitCompare className="h-5 w-5" />
                  <AnimatePresence>
                    {compareCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-glow"
                      >
                        {compareCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            <Link to="/wishlist">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10 smooth-transition">
                  <Heart className="h-5 w-5" />
                  <AnimatePresence>
                    {wishlistCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-glow"
                      >
                        {wishlistCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            <Link to="/cart">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" className="relative text-white hover:bg-white/10 smooth-transition">
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center animate-pulse-glow"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </Link>

            {currentUser ? (
              <>
                <Link to="/orders">
                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 smooth-transition">
                      <Package className="h-5 w-5" />
                    </Button>
                  </motion.div>
                </Link>
                <div className="flex items-center space-x-2">
                  <span className="text-white/80 text-sm">{currentUser.name}</span>
                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 smooth-transition"
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <Link to="/login">
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 smooth-transition">
                    <User className="h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            )}

            <Link to="/admin">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 smooth-transition text-xs">
                  Admin
                </Button>
              </motion.div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white smooth-transition"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </motion.div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden py-4 border-t border-white/10"
            >
              <form onSubmit={handleSearch} className="mb-4">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Telefonlarni qidiring..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 border-white/20 text-white placeholder:text-white/60 pr-10 mobile-full"
                  />
                  <Button
                    type="submit"
                    size="sm"
                    className="absolute right-1 top-1/2 -translate-y-1/2 bg-transparent hover:bg-white/10 p-2"
                  >
                    <Search className="h-4 w-4 text-white" />
                  </Button>
                </div>
              </form>

              <div className="flex flex-col space-y-2">
                {[
                  { to: "/compare", icon: GitCompare, label: "Taqqoslash", count: compareCount },
                  { to: "/wishlist", icon: Heart, label: "Tanlanganlar", count: wishlistCount },
                  { to: "/cart", icon: ShoppingCart, label: "Savatcha", count: cartCount },
                  ...(currentUser
                    ? [{ to: "/orders", icon: Package, label: "Buyurtmalar", count: 0 }]
                    : [{ to: "/login", icon: User, label: "Kirish", count: 0 }]),
                  { to: "/admin", icon: User, label: "Admin Panel", count: 0 },
                ].map((item, index) => (
                  <motion.div
                    key={item.to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link to={item.to} onClick={() => setIsMenuOpen(false)}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-white hover:bg-white/10 mobile-full smooth-transition"
                      >
                        <item.icon className="h-5 w-5 mr-2" />
                        {item.label} {item.count > 0 && `(${item.count})`}
                      </Button>
                    </Link>
                  </motion.div>
                ))}

                {currentUser && (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <Button
                      onClick={handleLogout}
                      variant="ghost"
                      className="w-full justify-start text-white hover:bg-white/10 mobile-full smooth-transition"
                    >
                      <LogOut className="h-5 w-5 mr-2" />
                      Chiqish
                    </Button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}
