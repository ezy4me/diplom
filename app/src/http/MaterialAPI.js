import { DefaultAPIInstance, ImageAPIInstance } from "./index";

export const MaterialAPI = {
    getAllMaterials() {
        const url = process.env.VUE_APP_MATERIAL_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneMaterial(id) {
        const url = process.env.VUE_APP_MATERIAL_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    },

    create(name, price, count, colorId, image) {
        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('count', count)
        formData.append('colorId', colorId)
        formData.append('image', image)

        const url = process.env.VUE_APP_MATERIAL_API_URL
        return ImageAPIInstance.post(url, formData)
    },

    updateMaterial(id, name, price, count, colorId, image) {
        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('count', count)
        formData.append('colorId', colorId)
        formData.append('image', image)

        const url = process.env.VUE_APP_MATERIAL_API_URL
        return ImageAPIInstance.put(url, formData)
    },

    deleteMaterial(id) {
        const url = process.env.VUE_APP_MATERIAL_API_URL + id
        return DefaultAPIInstance.delete(url)
    }
}