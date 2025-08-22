export interface Phone {
  id: string
  name: string
  brand: string
  price: number
  image: string
  ram: string
  storage: string
  battery: string
  camera: string
  availability: boolean
  description?: string
}

export interface CartItem extends Phone {
  quantity: number
}

export interface Order {
  id: string
  userId: string
  userInfo: {
    name: string
    phone: string
    address: string
    email?: string
  }
  items: CartItem[]
  totalPrice: number
  status: "pending" | "processing" | "shipped" | "delivered"
  orderDate: string
  deliveryCode?: string
  deliveredAt?: string
}

export interface User {
  id: string
  name: string
  phone: string
  email?: string
  address?: string
  password: string
}

export interface AdminUser {
  username: string
  password: string
}

// Default phones data
const defaultPhones: Phone[] = [
  {
    id: "1",
    name: "iPhone 15 Pro Max",
    brand: "Apple",
    price: 18500000,
    image: "/iphone-15-pro-max.png",
    ram: "8GB",
    storage: "256GB",
    battery: "4441mAh",
    camera: "48MP + 12MP + 12MP",
    availability: true,
    description: "Eng yangi iPhone 15 Pro Max titanium korpus bilan",
  },
  {
    id: "2",
    name: "Samsung Galaxy S24 Ultra",
    brand: "Samsung",
    price: 16800000,
    image: "/samsung-galaxy-s24-ultra.png",
    ram: "12GB",
    storage: "512GB",
    battery: "5000mAh",
    camera: "200MP + 50MP + 12MP + 10MP",
    availability: true,
    description: "Samsung Galaxy S24 Ultra S Pen bilan",
  },
  {
    id: "3",
    name: "Xiaomi 14 Ultra",
    brand: "Xiaomi",
    price: 12500000,
    image: "/xiaomi-14-ultra.png",
    ram: "16GB",
    storage: "512GB",
    battery: "5300mAh",
    camera: "50MP + 50MP + 50MP + 50MP",
    availability: true,
    description: "Xiaomi 14 Ultra professional kamera bilan",
  },
]

// Default admin user
const defaultAdmin: AdminUser = {
  username: "admin",
  password: "admin123",
}

// Initialize localStorage with default data
export const initializeLocalStorage = () => {
  if (!localStorage.getItem("texnopark_phones")) {
    localStorage.setItem("texnopark_phones", JSON.stringify(defaultPhones))
  }
  if (!localStorage.getItem("texnopark_admin")) {
    localStorage.setItem("texnopark_admin", JSON.stringify(defaultAdmin))
  }
  if (!localStorage.getItem("texnopark_cart")) {
    localStorage.setItem("texnopark_cart", JSON.stringify([]))
  }
  if (!localStorage.getItem("texnopark_wishlist")) {
    localStorage.setItem("texnopark_wishlist", JSON.stringify([]))
  }
  if (!localStorage.getItem("texnopark_orders")) {
    localStorage.setItem("texnopark_orders", JSON.stringify([]))
  }
  if (!localStorage.getItem("texnopark_users")) {
    localStorage.setItem("texnopark_users", JSON.stringify([]))
  }
  if (!localStorage.getItem("texnopark_current_user")) {
    localStorage.setItem("texnopark_current_user", "")
  }
}

// Phone operations
export const getPhones = (): Phone[] => {
  const phones = localStorage.getItem("texnopark_phones")
  return phones ? JSON.parse(phones) : []
}

export const addPhone = (phone: Phone): void => {
  const phones = getPhones()
  phones.push(phone)
  localStorage.setItem("texnopark_phones", JSON.stringify(phones))
}

export const updatePhone = (id: string, updatedPhone: Phone): void => {
  const phones = getPhones()
  const index = phones.findIndex((phone) => phone.id === id)
  if (index !== -1) {
    phones[index] = updatedPhone
    localStorage.setItem("texnopark_phones", JSON.stringify(phones))
  }
}

export const deletePhone = (id: string): void => {
  const phones = getPhones()
  const filteredPhones = phones.filter((phone) => phone.id !== id)
  localStorage.setItem("texnopark_phones", JSON.stringify(filteredPhones))
}

// Cart operations
export const getCart = (): CartItem[] => {
  const cart = localStorage.getItem("texnopark_cart")
  return cart ? JSON.parse(cart) : []
}

export const addToCart = (phone: Phone): void => {
  const cart = getCart()
  const existingItem = cart.find((item) => item.id === phone.id)

  if (existingItem) {
    existingItem.quantity += 1
  } else {
    cart.push({ ...phone, quantity: 1 })
  }

  localStorage.setItem("texnopark_cart", JSON.stringify(cart))
}

export const removeFromCart = (id: string): void => {
  const cart = getCart()
  const filteredCart = cart.filter((item) => item.id !== id)
  localStorage.setItem("texnopark_cart", JSON.stringify(filteredCart))
}

export const updateCartQuantity = (id: string, quantity: number): void => {
  const cart = getCart()
  const item = cart.find((item) => item.id === id)
  if (item) {
    item.quantity = quantity
    localStorage.setItem("texnopark_cart", JSON.stringify(cart))
  }
}

// Wishlist operations
export const getWishlist = (): Phone[] => {
  const wishlist = localStorage.getItem("texnopark_wishlist")
  return wishlist ? JSON.parse(wishlist) : []
}

export const addToWishlist = (phone: Phone): void => {
  const wishlist = getWishlist()
  const exists = wishlist.find((item) => item.id === phone.id)
  if (!exists) {
    wishlist.push(phone)
    localStorage.setItem("texnopark_wishlist", JSON.stringify(wishlist))
  }
}

export const removeFromWishlist = (id: string): void => {
  const wishlist = getWishlist()
  const filteredWishlist = wishlist.filter((item) => item.id !== id)
  localStorage.setItem("texnopark_wishlist", JSON.stringify(filteredWishlist))
}

// Admin operations
export const getAdmin = (): AdminUser => {
  const admin = localStorage.getItem("texnopark_admin")
  return admin ? JSON.parse(admin) : defaultAdmin
}

export const validateAdmin = (username: string, password: string): boolean => {
  const admin = getAdmin()
  return admin.username === username && admin.password === password
}

// Order management functions
export const getOrders = (): Order[] => {
  const orders = localStorage.getItem("texnopark_orders")
  return orders ? JSON.parse(orders) : []
}

export const createOrder = (orderData: Omit<Order, "id" | "orderDate" | "status">): string => {
  const orders = getOrders()
  const orderId = Date.now().toString()
  const newOrder: Order = {
    ...orderData,
    id: orderId,
    orderDate: new Date().toISOString(),
    status: "pending",
  }
  orders.push(newOrder)
  localStorage.setItem("texnopark_orders", JSON.stringify(orders))
  return orderId
}

export const updateOrderStatus = (orderId: string, status: Order["status"], deliveryCode?: string): void => {
  const orders = getOrders()
  const orderIndex = orders.findIndex((order) => order.id === orderId)
  if (orderIndex !== -1) {
    orders[orderIndex].status = status
    if (deliveryCode) {
      orders[orderIndex].deliveryCode = deliveryCode
    }
    if (status === "delivered") {
      orders[orderIndex].deliveredAt = new Date().toISOString()
    }
    localStorage.setItem("texnopark_orders", JSON.stringify(orders))
  }
}

export const getUserOrders = (userId: string): Order[] => {
  const orders = getOrders()
  return orders.filter((order) => order.userId === userId)
}

export const confirmDelivery = (orderId: string, code: string): boolean => {
  const orders = getOrders()
  const order = orders.find((order) => order.id === orderId)
  if (order && order.deliveryCode === code) {
    updateOrderStatus(orderId, "delivered")
    return true
  }
  return false
}

export const generateDeliveryCode = (): string => {
  return Math.floor(10000 + Math.random() * 90000).toString()
}

// User management functions
export const getUsers = (): User[] => {
  const users = localStorage.getItem("texnopark_users")
  return users ? JSON.parse(users) : []
}

export const registerUser = (userData: Omit<User, "id">): string => {
  const users = getUsers()
  const userId = Date.now().toString()
  const newUser: User = {
    ...userData,
    id: userId,
  }
  users.push(newUser)
  localStorage.setItem("texnopark_users", JSON.stringify(users))
  return userId
}

export const loginUser = (phone: string, password: string): User | null => {
  const users = getUsers()
  const user = users.find((u) => u.phone === phone && u.password === password)
  if (user) {
    localStorage.setItem("texnopark_current_user", user.id)
    return user
  }
  return null
}

export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem("texnopark_current_user")
  if (!userId) return null

  const users = getUsers()
  return users.find((user) => user.id === userId) || null
}

export const logoutUser = (): void => {
  localStorage.setItem("texnopark_current_user", "")
}

// Format price in UZS
export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("uz-UZ").format(price) + " so'm"
}
