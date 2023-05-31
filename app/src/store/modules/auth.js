    import { DefaultAPIInstance } from "@/http";
    import { AuthAPI } from "@/http/AuthAPI";
    import { Alert } from "../alerts/alert";

    const state = {
        user: JSON.parse(localStorage.getItem('user')) || null,
        credentials: {
            token: localStorage.getItem('token') || null,
            userRole: localStorage.getItem('userRole') || null,
        },
    }

    const getters = {
        getUserRole: (state) => state.credentials.userRole,
        getUser: (state) => state.user,
    }

    const actions = {
        async ON_LOGIN({commit}, {email, password}) {
            return AuthAPI.login(email, password).then((res) => {
                commit('setToken', res.data.token);
                commit('setUserRole', res.data.user.role);
                commit('setUser', res.data.user);
                DefaultAPIInstance.defaults.headers['authorization'] = 'Bearer ' + res.data.token;
                Alert.seccesAlert()
            })
            .catch((error) => {
                console.log(error);
                return error;
            })   
            
        },

        async ON_LOGOUT({commit}){
            commit('deleteToken');
            commit('deleteUserRole');
            commit('deleteUser');
            delete DefaultAPIInstance.defaults.headers['authorization'];
        },

    }

    const mutations = {

        setToken(state, token) {
            state.credentials.token = token;
            localStorage.setItem('token', token);
        },

        setUserRole(state, userRole) {
            state.credentials.userRole = userRole;
            localStorage.setItem('userRole', userRole);
        },

        setUser(state, user) {
            state.user = user;
            localStorage.setItem('user', JSON.stringify(user));
        },

        deleteToken(state) {
            state.credentials.token = null;
            localStorage.removeItem('token');
        },

        deleteUserRole(state) {
            state.credentials.userRole = null;
            localStorage.removeItem('userRole');
        },

        deleteUser(state) {
            state.user = null;
            localStorage.removeItem('user');
        },    
    }

    export default {
        namespaced: true,
        state,
        getters,
        actions,
        mutations
    }
