import { DefaultAPIInstance, ImageAPIInstance } from "./index";

export const ServiceAPI = {
    getAllServices() {
        const url = process.env.VUE_APP_SERVICE_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneService(id) {
        const url = process.env.VUE_APP_SERVICE_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    },

    create(name, price, description, image) {
        const url = process.env.VUE_APP_SERVICE_API_URL

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('image', image)

        return ImageAPIInstance.post(url, formData)
    },

    updateService(id, name, price, description, image) {
        const url = process.env.VUE_APP_SERVICE_API_URL

        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('description', description)
        formData.append('image', image)

        return ImageAPIInstance.put(url, formData)
    },

    deleteService(id) {
        const url = `${process.env.VUE_APP_SERVICE_API_URL}${id}`
        return DefaultAPIInstance.delete(url)
    },
}