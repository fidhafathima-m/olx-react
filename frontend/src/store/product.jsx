import { create } from "zustand"

export const useProductStore = create((set) => ({
    products: [],
    shouldRefresh: false,
    setProducts: (products) => set({ products }),
    createProduct: async (newProduct) => {
        if (!newProduct.name || !newProduct.image || !newProduct.price || !newProduct.category) {
            return { success: false, message: "please fill in all fields" }
        }
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        const data = await res.json();
        set((state) => ({ products: [...state.products, data.data] }))
        set({ shouldRefresh: true });
        return { success: true, message: "prodcut created successfully" }
    },
    fetchProducts: async () => {
        const respnse = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await respnse.json()
        set({ products: data.data, })
    }
}))