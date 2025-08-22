"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams } from "react-router-dom"
import ProductCard from "./ProductCard"
import { getPhones, initializeLocalStorage, type Phone } from "@/lib/localStorage"
import { Button } from "@/components/ui/button"

const brands = ["Barchasi", "Apple", "Samsung", "Xiaomi", "Realme", "Honor", "OnePlus", "Oppo"]

export default function ProductGrid() {
  const [phones, setPhones] = useState<Phone[]>([])
  const [filteredPhones, setFilteredPhones] = useState<Phone[]>([])
  const [selectedBrand, setSelectedBrand] = useState("Barchasi")
  const [searchParams] = useSearchParams()

  useEffect(() => {
    // Initialize localStorage and load phones
    initializeLocalStorage()
    const loadedPhones = getPhones()
    setPhones(loadedPhones)
    setFilteredPhones(loadedPhones)
  }, [])

  useEffect(() => {
    let filtered = phones

    // Filter by brand
    if (selectedBrand !== "Barchasi") {
      filtered = filtered.filter((phone) => phone.brand === selectedBrand)
    }

    // Filter by search query
    const searchQuery = searchParams.get("search")
    if (searchQuery) {
      filtered = filtered.filter(
        (phone) =>
          phone.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          phone.brand.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    }

    // Only show available phones
    filtered = filtered.filter((phone) => phone.availability)

    setFilteredPhones(filtered)
  }, [phones, selectedBrand, searchParams])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Premium{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Telefonlar
            </span>
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Eng yangi va sifatli smartfonlarni tanlang. Barcha mashhur brendlar bir joyda.
          </p>
        </motion.div>

        {/* Brand Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex flex-wrap justify-center gap-3">
            {brands.map((brand) => (
              <Button
                key={brand}
                variant={selectedBrand === brand ? "default" : "outline"}
                onClick={() => setSelectedBrand(brand)}
                className={`
                  px-6 py-2 rounded-full transition-all duration-300
                  ${
                    selectedBrand === brand
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                      : "bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm"
                  }
                `}
              >
                {brand}
              </Button>
            ))}
          </div>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredPhones.length > 0 ? (
            filteredPhones.map((phone, index) => (
              <motion.div
                key={phone.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <ProductCard phone={phone} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="text-white/60 text-lg">
                {searchParams.get("search") ? "Qidiruv bo'yicha hech narsa topilmadi" : "Telefonlar topilmadi"}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
