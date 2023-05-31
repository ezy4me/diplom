import { ProductAPI } from '@/http/ProductAPI';
import { Alert } from '../alerts/alert';

const state = {
    products: [],
}

const getters = {
    getProducts: (state) => state.products,
}

const actions = {
    async GET_PRODUCTS_FROM_API({ commit }) {
        return await ProductAPI.getAllProducts()
            .then((res) => {
                commit('setProducts', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },

    async ADD_PRODUCT(_, { name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures }) {
        return await ProductAPI.create(name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures)
            .then(() => {
                return Alert.successAlert("Добавление изделия");
            })
            .catch((error) => {
                return Alert.errorAlert("Добавление изделия", error.response.data.message);
            })
    },

    async UPDATE_PRODUCT(_, { id, name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures }) {
        return await ProductAPI.updateProduct(id, name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures)
            .then(() => {
                return Alert.successAlert("Изменение изделия");
            })
            .catch((error) => {
                return Alert.errorAlert("Изменение изделия", error.response.data.message);
            })
    },

    async DELETE_PRODUCT(_, { id }) {
        return await ProductAPI.deleteProduct(id)
            .then(() => {
                return Alert.successAlert("Удаление изделия");
            })
            .catch((error) => {
                return Alert.errorAlert("Удаление изделия", error.response.data.message);
            })
    },

}

const mutations = {
    setProducts(state, products) {
        state.products = products;
        localStorage.setItem('products', JSON.stringify(products));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
