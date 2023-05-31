import { ColorAPI } from '../../http/ColorAPI';
import { Alert } from '../alerts/alert';

const state = {
    colors: [],
}

const getters = {
    getColors: (state) => state.colors,
}

const actions = {
    async GET_COLORS_FROM_API({ commit }) {
        return await ColorAPI.getAllColors()
            .then((res) => {
                commit('setColors', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },

    async ADD_COLOR(_, { name, hex }) {
        return await ColorAPI.create(name, hex)
            .then(() => {
                return Alert.successAlert("Добавление цвета")
            })
            .catch((error) => {
                return Alert.errorAlert("Добавление цвета", error.response.data.message);
            })
    },

    async DELETE_COLOR(_, { id }) {
        return await ColorAPI.deleteColor(id)
            .then(() => {
                return Alert.successAlert("Удаление цвета")
            })
            .catch((error) => {
                return Alert.errorAlert("Удаление цвета", error.response.data.message);
            })
    },

    async UPDATE_COLOR(_, { id, name, hex }) {
        return await ColorAPI.updateColor(id, name, hex)
            .then(() => {
                return Alert.successAlert("Изменение цвета")
            })
            .catch((error) => {
                return Alert.errorAlert("Изменение цвета", error.response.data.message);
            })
    },
}

const mutations = {
    setColors(state, colors) {
        state.colors = colors;
        localStorage.setItem('colors', JSON.stringify(colors));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
