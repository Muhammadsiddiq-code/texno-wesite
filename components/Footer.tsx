"use client"

import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Facebook, Instagram, TextIcon as Telegram, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-black/40 backdrop-blur-xl border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Texnopark
            </div>
            <p className="text-white/70 text-sm leading-relaxed">
              Eng yangi va sifatli smartfonlar do'koni. Biz sizga eng yaxshi texnologiyalarni taklif qilamiz.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-pink-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-blue-400 transition-colors">
                <Telegram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white/60 hover:text-red-400 transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Tezkor Havolalar</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-white/70 hover:text-white transition-colors text-sm">
                  Bosh sahifa
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-white/70 hover:text-white transition-colors text-sm">
                  Savatcha
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="text-white/70 hover:text-white transition-colors text-sm">
                  Tanlanganlar
                </Link>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Biz haqimizda
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Kategoriyalar</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Apple
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Samsung
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Xiaomi
                </a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors text-sm">
                  Realme
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="text-white font-semibold text-lg">Aloqa</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-blue-400" />
                <span className="text-white/70 text-sm">+998 90 123 45 67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-blue-400" />
                <span className="text-white/70 text-sm">info@texnopark.uz</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-blue-400" />
                <span className="text-white/70 text-sm">Toshkent, Chilonzor tumani</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
        >
          <p className="text-white/60 text-sm">© 2024 Texnopark. Barcha huquqlar himoyalangan.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Maxfiylik siyosati
            </a>
            <a href="#" className="text-white/60 hover:text-white transition-colors text-sm">
              Foydalanish shartlari
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
