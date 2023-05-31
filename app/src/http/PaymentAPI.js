import { DefaultAPIInstance } from "./index";

export const PaymentAPI = {
    getAllPayments() {
        const url = process.env.VUE_APP_PAYMENT_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOnePayment(id) {
        const url = process.env.VUE_APP_PAYMENT_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    },

    create(type) {
        const url = process.env.VUE_APP_PAYMENT_API_URL
        const data = { type }
        return DefaultAPIInstance.post(url, { ...data })
    },

    deletePayment(id) {
        const url = process.env.VUE_APP_PAYMENT_API_URL + id
        return DefaultAPIInstance.delete(url)
    },

    updatePayment(id, type) {
        const url = process.env.VUE_APP_PAYMENT_API_URL
        const data = { id, type }
        return DefaultAPIInstance.put(url, { ...data })
    }
}