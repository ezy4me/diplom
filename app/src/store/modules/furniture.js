import { FurnitureAPI } from '@/http/FurnitureAPI';
import { Alert } from '../alerts/alert';

const state = {
    furnitures: [],
    furnituresPie: [],
}

const getters = {
    getFurnitures: (state) => state.furnitures,
    getFurnituresPie: (state) => state.furnituresPie,
}

const actions = {
    async GET_FURNITURES_FROM_API({ commit }) {
        return await FurnitureAPI.getAllFurnitures()
            .then((res) => {
                commit('setFurnitures', res.data);
                commit('setFurnituresPie', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },
    async ADD_FURNITURE(_, { name, price, count, colorId, image }) {
        return await FurnitureAPI.create(name, price, count, colorId, image)
            .then(() => {
                return Alert.successAlert("Добавление фурнитуры");
            })
            .catch((error) => {
                return Alert.errorAlert("Добавление фурнитуры", error.response.data.message);
            })
    },

    async UPDATE_FURNITURE(_, { id, name, price, count, colorId, image }) {
        return await FurnitureAPI.updateFurniture(id, name, price, count, colorId, image)
            .then(() => {
                return Alert.successAlert("Изменение фурнитуры");
            })
            .catch((error) => {
                return Alert.errorAlert("Изменение фурнитуры", error.response.data.message);
            })
    },

    async DELETE_FURNITURE(_, { id }) {
        return await FurnitureAPI.deleteFurniture(id)
            .then(() => {
                return Alert.successAlert("Удаление фурнитуры");
            })
            .catch((error) => {
                return Alert.errorAlert("Удаление фурнитуры", error.response.data.message);
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
