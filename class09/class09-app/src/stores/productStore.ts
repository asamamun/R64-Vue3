import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

// Define types
export interface Product {
  id: number
  name: string
  price: number
  category: string
  description: string
  image?: string
}

export interface CartItem {
  product: Product
  quantity: number
}

// Sample data - 20 products in 3 categories
const sampleProducts: Product[] = [
  // Electronics
  {
    id: 1,
    name: 'Smartphone',
    price: 699.99,
    category: 'electronics',
    description: 'Latest smartphone with advanced features',
  },
  {
    id: 2,
    name: 'Laptop',
    price: 1299.99,
    category: 'electronics',
    description: 'High-performance laptop for work and gaming',
  },
  {
    id: 3,
    name: 'Tablet',
    price: 399.99,
    category: 'electronics',
    description: 'Portable tablet for entertainment and productivity',
  },
  {
    id: 4,
    name: 'Headphones',
    price: 199.99,
    category: 'electronics',
    description: 'Noise-cancelling wireless headphones',
  },
  {
    id: 5,
    name: 'Smart Watch',
    price: 299.99,
    category: 'electronics',
    description: 'Fitness tracker and smartwatch combo',
  },
  {
    id: 6,
    name: 'Camera',
    price: 899.99,
    category: 'electronics',
    description: 'Digital camera with 4K video recording',
  },
  {
    id: 7,
    name: 'Speaker',
    price: 149.99,
    category: 'electronics',
    description: 'Bluetooth speaker with surround sound',
  },

  // Clothing
  {
    id: 8,
    name: 'T-Shirt',
    price: 19.99,
    category: 'clothing',
    description: 'Comfortable cotton t-shirt',
  },
  {
    id: 9,
    name: 'Jeans',
    price: 49.99,
    category: 'clothing',
    description: 'Classic blue denim jeans',
  },
  {
    id: 10,
    name: 'Jacket',
    price: 89.99,
    category: 'clothing',
    description: 'Waterproof outdoor jacket',
  },
  {
    id: 11,
    name: 'Sneakers',
    price: 79.99,
    category: 'clothing',
    description: 'Running shoes with extra cushioning',
  },
  {
    id: 12,
    name: 'Dress',
    price: 59.99,
    category: 'clothing',
    description: 'Elegant evening dress',
  },
  { id: 13, name: 'Sweater', price: 39.99, category: 'clothing', description: 'Warm wool sweater' },

  // Books
  {
    id: 14,
    name: 'Vue.js Guide',
    price: 29.99,
    category: 'books',
    description: 'Complete guide to Vue.js development',
  },
  {
    id: 15,
    name: 'TypeScript Handbook',
    price: 34.99,
    category: 'books',
    description: 'Master TypeScript programming',
  },
  {
    id: 16,
    name: 'Web Design',
    price: 44.99,
    category: 'books',
    description: 'Modern web design principles',
  },
  {
    id: 17,
    name: 'JavaScript Patterns',
    price: 39.99,
    category: 'books',
    description: 'Reusable patterns in JavaScript',
  },
  {
    id: 18,
    name: 'CSS Secrets',
    price: 49.99,
    category: 'books',
    description: 'Advanced CSS techniques',
  },
  {
    id: 19,
    name: 'Node.js Mastery',
    price: 54.99,
    category: 'books',
    description: 'Building scalable Node.js applications',
  },
  {
    id: 20,
    name: 'Database Design',
    price: 32.99,
    category: 'books',
    description: 'Effective database design strategies',
  },
]

export const useProductStore = defineStore('productStore', () => {
  // State
  const products = ref<Product[]>(sampleProducts)
  const cart = ref<CartItem[]>([])
  const wishlist = ref<Product[]>([])
  const selectedCategory = ref<string | null>(null)

  // Getters
  const cartItemCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + item.product.price * item.quantity, 0)
  })

  const filteredProducts = computed(() => {
    if (!selectedCategory.value) {
      return products.value
    }
    return products.value.filter((product) => product.category === selectedCategory.value)
  })

  const categories = computed(() => {
    const uniqueCategories = [...new Set(products.value.map((p) => p.category))]
    return uniqueCategories
  })

  // Actions
  function addToCart(product: Product) {
    const existingItem = cart.value.find((item) => item.product.id === product.id)
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ product, quantity: 1 })
    }
  }

  function removeFromCart(productId: number) {
    const index = cart.value.findIndex((item) => item.product.id === productId)
    if (index !== -1) {
      cart.value.splice(index, 1)
    }
  }

  function updateQuantity(productId: number, quantity: number) {
    const item = cart.value.find((item) => item.product.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
      }
    }
  }

  function addToWishlist(product: Product) {
    const exists = wishlist.value.find((item) => item.id === product.id)
    if (!exists) {
      wishlist.value.push(product)
    }
  }

  function removeFromWishlist(productId: number) {
    const index = wishlist.value.findIndex((item) => item.id === productId)
    if (index !== -1) {
      wishlist.value.splice(index, 1)
    }
  }

  function setSelectedCategory(category: string | null) {
    selectedCategory.value = category
  }

  function clearCart() {
    cart.value = []
  }

  return {
    // State
    products,
    cart,
    wishlist,
    selectedCategory,

    // Getters
    cartItemCount,
    cartTotal,
    filteredProducts,
    categories,

    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    addToWishlist,
    removeFromWishlist,
    setSelectedCategory,
    clearCart,
  }
})
