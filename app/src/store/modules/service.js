import { ServiceAPI } from '@/http/ServiceAPI';
import { Alert } from '../alerts/alert';
const state = {
    services: [],
}

const getters = {
    getServices: (state) => state.services,
}

const actions = {
    async GET_SERVICES_FROM_API({ commit }) {
        return await ServiceAPI.getAllServices()
            .then((res) => {
                commit('setServices', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },

    async ADD_SERVICE(_, { name, price, description, image }) {
        return await ServiceAPI.create(name, price, description, image)
            .then(() => {
                return Alert.successAlert("Добавление услуги");
            })
            .catch((error) => {
                return Alert.errorAlert("Добавление услуги", error.response.data.message);
            })
    },

    async UPDATE_SERVICE(_, { id, name, price, description, image }) {
        return await ServiceAPI.updateService(id, name, price, description, image)
            .then(() => {
                return Alert.successAlert("Изменение услуги");

            })
            .catch((error) => {
                return Alert.errorAlert("Изменение услуги", error.response.data.message);
            })
    },

    async DELETE_SERVICE(_, { id }) {
        return await ServiceAPI.deleteService(id)
            .then(() => {
                return Alert.successAlert("Удаление услуги");
            })
            .catch((error) => {
                return Alert.errorAlert("Удаление услуги", error.response.data.message);
            })
    },
}

const mutations = {
    setServices(state, services) {
        state.services = services;
        localStorage.setItem('services', JSON.stringify(services));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
