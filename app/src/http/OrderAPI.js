import { DefaultAPIInstance } from "./index";

export const OrderAPI = {
    getAllOrders() {
        const url = process.env.VUE_APP_ORDER_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneOrder(id) {
        const url = process.env.VUE_APP_ORDER_API_URL + id
        return DefaultAPIInstance.get(url)
    },

    create(userId, paymentId, saleId, orderStatusId, products) {
        const url = process.env.VUE_APP_ORDER_API_URL
        const data = { userId, paymentId, saleId, orderStatusId, products }
        return DefaultAPIInstance.post(url, { ...data })
    },

    updateOrder(id, userId, paymentId, saleId, orderStatusId, products) {
        const url = process.env.VUE_APP_ORDER_API_URL
        const data = { id, userId, paymentId, saleId, orderStatusId, products }
        return DefaultAPIInstance.put(url, { ...data })
    },

    deleteOrder(id) {
        const url = `${process.env.VUE_APP_ORDER_API_URL}${id}`
        return DefaultAPIInstance.delete(url)
    }
}