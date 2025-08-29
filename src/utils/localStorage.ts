// Alternative solution: Simple localStorage utility
// You can use this instead of Zustand if you prefer a lighter approach

export const localStorageKeys = {
  PRODUCTS: 'dashboard-products',
  USERS: 'dashboard-users',
  SETTINGS: 'dashboard-settings',
} as const

export const localStorageUtils = {
  // Generic getter
  get: <T>(key: string, defaultValue: T): T => {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue
    } catch (error) {
      console.error(`Error reading from localStorage key "${key}":`, error)
      return defaultValue
    }
  },

  // Generic setter
  set: <T>(key: string, value: T): void => {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error writing to localStorage key "${key}":`, error)
    }
  },

  // Remove item
  remove: (key: string): void => {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error)
    }
  },

  // Clear all dashboard data
  clearAll: (): void => {
    Object.values(localStorageKeys).forEach(key => {
      localStorage.removeItem(key)
    })
  }
}

// Product-specific helpers
export const productStorage = {
  getProducts: () => localStorageUtils.get(localStorageKeys.PRODUCTS, []),
  setProducts: (products: any[]) => localStorageUtils.set(localStorageKeys.PRODUCTS, products),
  addProduct: (product: any) => {
    const products = productStorage.getProducts()
    products.push(product)
    productStorage.setProducts(products)
  },
  updateProduct: (id: string, updates: any) => {
    const products = productStorage.getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index !== -1) {
      products[index] = { ...products[index], ...updates }
      productStorage.setProducts(products)
    }
  },
  deleteProduct: (id: string) => {
    const products = productStorage.getProducts()
    const filtered = products.filter(p => p.id !== id)
    productStorage.setProducts(filtered)
  }
}

