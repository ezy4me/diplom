import { FurnitureAPI } from '@/http/FurnitureAPI';

const state = {
    furnitures: [],
    furnituresPie: [],
}

const getters = {
    getFurnitures: (state) => state.furnitures,
    getFurnituresPie: (state) => state.furnituresPie,
}

const actions = {
    async GET_FURNITURES_FROM_API({ commit}) {
        return await FurnitureAPI.getAllFurnitures()
            .then((res) => {
                console.log(res.data);
                commit('setFurnitures', res.data);
                commit('setFurnituresPie', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },
    async ADD_FURNITURE(_,{name, price, count, colorId, image}) {
        return await FurnitureAPI.create(name, price, count, colorId, image)
            .then((res) => {
                console.log(res.data);
                // commit('setFurnitures', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_FURNITURE(_,{id, name, price, count, colorId, image}) {
        return await FurnitureAPI.updateFurniture(id, name, price, count, colorId, image)
            .then((res) => {
                console.log(res.data);
                // commit('setFurnitures', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_FURNITURE(_,{id}) {
        return await FurnitureAPI.deleteFurniture(id)
            .then((res) => {
                console.log(res.data);
                // commit('setFurnitures', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

}

const mutations = {
    setFurnitures(state, furnitures) {
        state.furnitures = furnitures;
        localStorage.setItem('furnitures', JSON.stringify(furnitures));
    },

    setFurnituresPie(state, furnitures) {
        state.furnituresPie = furnitures.rows.filter((f) => f.count <= 50);
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
