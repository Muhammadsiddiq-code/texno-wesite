"use client"

import { useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import Navbar from "@/components/Navbar"
import Hero from "@/components/Hero"
import ProductGrid from "@/components/ProductGrid"
import Footer from "@/components/Footer"
import ProductDetails from "@/components/ProductDetails"
import Cart from "@/components/Cart"
import Wishlist from "@/components/Wishlist"
import AdminLogin from "@/components/admin/AdminLogin"
import AdminDashboard from "@/components/admin/AdminDashboard"
import AddPhone from "@/components/admin/AddPhone"
import ManagePhones from "@/components/admin/ManagePhones"
import UserAuth from "@/components/UserAuth"
import OrderHistory from "@/components/OrderHistory"
import ProductComparison from "@/components/ProductComparison"
import PromoBanner from "@/components/PromoBanner"
import { initializeLocalStorage } from "@/lib/localStorage"

function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Navbar />
      <PromoBanner />
      <Hero />
      <ProductGrid />
      <Footer />
    </div>
  )
}

export default function App() {
  useEffect(() => {
    // Initialize localStorage when app loads
    initializeLocalStorage()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/login" element={<UserAuth />} />
        <Route path="/orders" element={<OrderHistory />} />
        <Route path="/compare" element={<ProductComparison />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-phone" element={<AddPhone />} />
        <Route path="/admin/manage-phones" element={<ManagePhones />} />
      </Routes>
      <Toaster />
    </Router>
  )
}
