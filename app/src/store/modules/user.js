import { UserAPI } from '@/http/UserAPI';

const state = {
    users: [],
    userOrders: []
}

const getters = {
    getUsers: (state) => state.users,
    getUserOrders: (state) => state.userOrders,
}

const actions = {
    async GET_USERS_FROM_API({ commit}) {
        return await UserAPI.getAllUsers()
            .then((res ) => {
                console.log(res.data);
                commit('setUsers', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async GET_USER_ORDERS_FROM_API({ commit }, {id}) {
        return await UserAPI.getOneUser(id)
            .then((res) => {
                console.log(res.data);
                commit('setUserOrders', res.data);
            })
            .catch((error) => {
                return error;
            })
    },

    async ADD_USER(_,{email, password, fio, phone}) {
        return await UserAPI.createUser(email,password,fio,phone)
            .then((res ) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_USER(_,{id, email, fio, phone}) {
        return await UserAPI.updateUser(id, email,fio,phone)
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_USER(_,{id}) {
        return await UserAPI.deleteUser(id)
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
    setUsers(state, users) {
        state.users = users;
        localStorage.setItem('users', JSON.stringify(users));
    },

    setUserOrders(state, userOrders ) {
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
