import { DefaultAPIInstance } from "./index";

export const SaleAPI = {
    getAllSales() {
        const url = process.env.VUE_APP_SALE_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneSale(id) {
        const url = process.env.VUE_APP_SALE_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    },

    create(name) {
        const url = process.env.VUE_APP_SALE_API_URL
        const data = { name }
        return DefaultAPIInstance.post(url, { ...data })
    },

    deleteSale(id) {
        const url = `${process.env.VUE_APP_SALE_API_URL}${id}`
        return DefaultAPIInstance.delete(url)
    },

    updateSale(id, name) {
        const url = process.env.VUE_APP_SALE_API_URL
        const data = { id, name }

        return DefaultAPIInstance.put(url, { ...data })
    }
}