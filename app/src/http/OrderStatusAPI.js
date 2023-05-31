import { DefaultAPIInstance } from "./index";

export const OrderStatusAPI = {
    getAllOrderStatuses() {
        const url = process.env.VUE_APP_ORDERSTATUS_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneOrderStatus(id) {
        const url = process.env.VUE_APP_ORDERSTATUS_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    },

    create(name) {
        const url = process.env.VUE_APP_ORDERSTATUS_API_URL
        const data = { name }
        return DefaultAPIInstance.post(url, { ...data })
    },

    deleteOrderStatus(id) {
        const url = `${process.env.VUE_APP_ORDERSTATUS_API_URL}${id}`
        return DefaultAPIInstance.delete(url)
    },

    updateOrderStatus(id, name) {
        const url = process.env.VUE_APP_ORDERSTATUS_API_URL
        const data = { id, name }
        return DefaultAPIInstance.put(url, { ...data })
    }
}