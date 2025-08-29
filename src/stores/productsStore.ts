import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  status: 'active' | 'inactive'
  createdAt: string
}

interface ProductsState {
  products: Product[]
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  getProductById: (id: string) => Product | undefined
  searchProducts: (query: string, category?: string) => Product[]
}

export const useProductsStore = create<ProductsState>()(
  persist(
    (set, get) => ({
      products: [
        {
          id: '1',
          name: 'Laptop Pro',
          category: 'Electronics',
          price: 1299.99,
          stock: 50,
          status: 'active',
          createdAt: '2024-01-15',
        },
        {
          id: '2',
          name: 'Wireless Mouse',
          category: 'Accessories',
          price: 29.99,
          stock: 100,
          status: 'active',
          createdAt: '2024-01-10',
        },
        {
          id: '3',
          name: 'Gaming Keyboard',
          category: 'Accessories',
          price: 89.99,
          stock: 25,
          status: 'inactive',
          createdAt: '2024-01-05',
        },
      ],

      addProduct: (productData) => {
        const newProduct: Product = {
          ...productData,
          id: Date.now().toString(),
          createdAt: new Date().toISOString().split('T')[0],
        }
        set((state) => ({
          products: [...state.products, newProduct]
        }))
      },

      updateProduct: (id, productData) => {
        set((state) => ({
          products: state.products.map(p => 
            p.id === id 
              ? { ...p, ...productData, id: p.id, createdAt: p.createdAt }
              : p
          )
        }))
      },

      deleteProduct: (id) => {
        set((state) => ({
          products: state.products.filter(p => p.id !== id)
        }))
      },

      getProductById: (id) => {
        return get().products.find(p => p.id === id)
      },

      searchProducts: (query, category) => {
        const { products } = get()
        return products.filter((product) => {
          const matchesSearch = product.name.toLowerCase().includes(query.toLowerCase())
          const matchesCategory = !category || category === 'all' || product.category === category
          return matchesSearch && matchesCategory
        })
      },
    }),
    {
      name: 'products-storage',
      partialize: (state) => ({ products: state.products })
    }
  )
)
