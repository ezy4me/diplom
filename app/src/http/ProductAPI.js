import { DefaultAPIInstance, ImageAPIInstance } from "./index";

export const ProductAPI = {
    getAllProducts() {
        const url = process.env.VUE_APP_PRODUCT_API_URL
        return DefaultAPIInstance.get(url)
    },

    getOneProduct(id) {
        const url = process.env.VUE_APP_PRODUCT_API_URL
        const data = { id }
        return DefaultAPIInstance.get(url, { ...data })
    },

    create(name, price, count, description, image,
        categoryId, cutId, sizeId,
        materials, furnitures) {

        const formData = new FormData()
        formData.append('name', name)
        formData.append('price', price)
        formData.append('count', count)
        formData.append('description', description)
        formData.append('categoryId', categoryId)
        formData.append('cutId', cutId)
        formData.append('sizeId', sizeId)
        formData.append('materials', materials)
        formData.append('furnitures', furnitures)
        formData.append('image', image)

        const url = process.env.VUE_APP_PRODUCT_API_URL
        return ImageAPIInstance.post(url, formData)
    },

    updateProduct(id, name, price, count, description, image,
        categoryId, cutId, sizeId,
        materials, furnitures) {

        const formData = new FormData()
        formData.append('id', id)
        formData.append('name', name)
        formData.append('price', price)
        formData.append('count', count)
        formData.append('description', description)
        formData.append('categoryId', categoryId)
        formData.append('cutId', cutId)
        formData.append('sizeId', sizeId)
        formData.append('materials', materials)
        formData.append('furnitures', furnitures)
        formData.append('image', image)

        const url = process.env.VUE_APP_PRODUCT_API_URL
        return ImageAPIInstance.put(url, formData)
    },

    deleteProduct(id) {
        const url = process.env.VUE_APP_PRODUCT_API_URL + id
        return DefaultAPIInstance.delete(url)
    },
}