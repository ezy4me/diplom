import { DefaultAPIInstance } from "./index";

export const ColorAPI = {
    getAllColors() {
        const url = process.env.VUE_APP_COLOR_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneColor(id) {
        const url = process.env.VUE_APP_COLOR_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    },

    create(name, hex) {
        const url = process.env.VUE_APP_COLOR_API_URL
        const data = { name, hex }
        return DefaultAPIInstance.post(url, { ...data })
    },

    deleteColor(id) {
        const url = `${process.env.VUE_APP_COLOR_API_URL}${id}`
        return DefaultAPIInstance.delete(url)
    },

    updateColor(id, name, hex) {
        const url = process.env.VUE_APP_COLOR_API_URL
        const data = { id, name, hex }
        return DefaultAPIInstance.put(url, { ...data })
    }
}