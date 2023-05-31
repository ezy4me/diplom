import { DefaultAPIInstance } from "./index";

export const CategoryAPI = {
    getAllCategories() {
        const url = process.env.VUE_APP_CATEGORY_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneCategory(id) {
        const url = process.env.VUE_APP_CATEGORY_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    }
}