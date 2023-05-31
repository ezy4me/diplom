import { ServiceAPI } from '@/http/ServiceAPI';

const state = {
    services: [],
}

const getters = {
    getServices: (state) => state.services,
}

const actions = {
    async GET_SERVICES_FROM_API({ commit}) {
        return await ServiceAPI.getAllServices()
            .then((res ) => {
                console.log(res.data);
                commit('setServices', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async ADD_SERVICE(_,{ name, price, description, image }) {
        return await ServiceAPI.create(name, price, description, image)
            .then((res ) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_SERVICE(_,{id, name, price, description, image }) {
        return await ServiceAPI.updateService(id, name, price, description, image)
            .then((res ) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_SERVICE(_,{ id }) {
        return await ServiceAPI.deleteService(id)
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
