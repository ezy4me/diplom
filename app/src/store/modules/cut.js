import { CutAPI } from './../../http/CutAPI';
import { Alert } from '../alerts/alert';
const state = {
    cuts: [],
}

const getters = {
    getCuts: (state) => state.cuts,
}

const actions = {
    async GET_CUTS_FROM_API({ commit }) {
        return await CutAPI.getAllCuts()
            .then((res) => {
                commit('setCuts', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },
}

const mutations = {
    setCuts(state, cuts) {
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
