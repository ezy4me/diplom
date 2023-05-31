import { UserAPI } from '@/http/UserAPI';
import { Alert } from '../alerts/alert';
const state = {
    users: [],
    userOrders: []
}

const getters = {
    getUsers: (state) => state.users,
    getUserOrders: (state) => state.userOrders,
}

const actions = {
    async GET_USERS_FROM_API({ commit }) {
        return await UserAPI.getAllUsers()
            .then((res) => {
                commit('setUsers', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },

    async GET_USER_ORDERS_FROM_API({ commit }, { id }) {
        return await UserAPI.getOneUser(id)
            .then((res) => {
                commit('setUserOrders', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },

    async ADD_USER(_, { email, password, fio, phone }) {
        return await UserAPI.createUser(email, password, fio, phone)
            .then(() => {
                return Alert.successAlert("Добавление пользователя");
            })
            .catch((error) => {
                return Alert.errorAlert("Добавление пользователя", error.response.data.message);
            })
    },

    async UPDATE_USER(_, { id, email, fio, phone }) {
        return await UserAPI.updateUser(id, email, fio, phone)
            .then(() => {
                return Alert.successAlert("Изменение пользователя");
            })
            .catch((error) => {
                return Alert.errorAlert("Изменение пользователя", error.response.data.message);
            })
    },

    async DELETE_USER(_, { id }) {
        return await UserAPI.deleteUser(id)
            .then(() => {
                return Alert.successAlert("Удаление пользователя");
            })
            .catch((error) => {
                return Alert.errorAlert("Удаление пользователя", error.response.data.message);
            })
    },
}

const mutations = {
    setUsers(state, users) {
        state.users = users;
        localStorage.setItem('users', JSON.stringify(users));
    },

    setUserOrders(state, userOrders) {
        state.userOrders = userOrders;
        localStorage.setItem('userOrders', JSON.stringify(userOrders));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
