import { ProductAPI } from '@/http/ProductAPI';

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
                console.log(res.data);
                commit('setProducts', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async ADD_PRODUCT(_,{ name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures }) {
        return await ProductAPI.create(name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_PRODUCT(_,{id, name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures}) {
        return await ProductAPI.updateProduct(id, name, price, count, description, image, categoryId, cutId, sizeId, materials, furnitures)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_PRODUCT(_,{ id }) {
        console.log(id);

        return await ProductAPI.deleteProduct(id)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
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
