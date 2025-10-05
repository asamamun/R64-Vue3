import { createPinia, setActivePinia } from 'pinia'
import { useProductStore } from './productStore'

// Reset the pinia instance before each test
beforeEach(() => {
  setActivePinia(createPinia())
})

describe('Product Store', () => {
  it('should initialize with empty products and cart', () => {
    const store = useProductStore()
    expect(store.products).toEqual([])
    expect(store.cart).toEqual([])
  })

  it('should add product to cart', () => {
    const store = useProductStore()
    const product = { id: 1, title: 'Test Product', price: 10 }
    
    store.addToCart(product)
    
    expect(store.cart).toHaveLength(1)
    expect(store.cart[0]).toEqual({ ...product, quantity: 1 })
  })

  it('should increase quantity when adding existing product', () => {
    const store = useProductStore()
    const product = { id: 1, title: 'Test Product', price: 10 }
    
    store.addToCart(product)
    store.addToCart(product)
    
    expect(store.cart).toHaveLength(1)
    expect(store.cart[0].quantity).toBe(2)
  })

  it('should calculate cart total correctly', () => {
    const store = useProductStore()
    const product1 = { id: 1, title: 'Product 1', price: 10 }
    const product2 = { id: 2, title: 'Product 2', price: 15 }
    
    store.addToCart(product1)
    store.addToCart(product2)
    store.updateQuantity({ productId: 2, quantity: 3 })
    
    expect(store.cartTotal).toBe(55) // 10*1 + 15*3 = 55
  })

  it('should remove item from cart', () => {
    const store = useProductStore()
    const product = { id: 1, title: 'Test Product', price: 10 }
    
    store.addToCart(product)
    store.removeFromCart(1)
    
    expect(store.cart).toHaveLength(0)
  })

  it('should update item quantity', () => {
    const store = useProductStore()
    const product = { id: 1, title: 'Test Product', price: 10 }
    
    store.addToCart(product)
    store.updateQuantity({ productId: 1, quantity: 5 })
    
    expect(store.cart[0].quantity).toBe(5)
  })

  it('should clear cart', () => {
    const store = useProductStore()
    const product = { id: 1, title: 'Test Product', price: 10 }
    
    store.addToCart(product)
    store.clearCart()
    
    expect(store.cart).toHaveLength(0)
  })
})