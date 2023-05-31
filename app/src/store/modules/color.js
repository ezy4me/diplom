import { ColorAPI } from '../../http/ColorAPI';

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
                console.log(error);
                return error;
            })
    },

    async ADD_COLOR(_,{name, hex}) {    
        console.log({name, hex});
            
        return await ColorAPI.create(name, hex)
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async DELETE_COLOR(_,{id}) {                
        return await ColorAPI.deleteColor(id)
            .catch((error) => {
                console.log(error);
                return error;
            })
    },

    async UPDATE_COLOR(_,{id, name, hex}) {                
        return await ColorAPI.updateColor(id, name, hex)
            .then((res) => {
                console.log(res.data);
                // commit('setColors', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
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
