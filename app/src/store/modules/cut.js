import { CutAPI } from './../../http/CutAPI';

const state = {
    cuts: [],
}

const getters = {
    getCuts: (state) => state.cuts,
}

const actions = {
    async GET_CUTS_FROM_API({ commit} ) {
        return await CutAPI.getAllCuts()
            .then((res) => {
                console.log(res.data);
                commit('setCuts', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },
}

const mutations = {
    setCuts(state, cuts ) {
        state.cuts = cuts;
        localStorage.setItem('cuts', JSON.stringify(cuts));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
