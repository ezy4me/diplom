import { DefaultAPIInstance } from "./index";

export const SizeAPI = {
    getAllSizes() {
        const url = process.env.VUE_APP_SIZE_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneSize(id) {
        const url = process.env.VUE_APP_SIZE_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    }
}