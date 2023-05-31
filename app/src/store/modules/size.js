import { SizeAPI } from '../../http/SizeAPI';
import { Alert } from '../alerts/alert';
const state = {
    sizes: [],
}

const getters = {
    getSizes: (state) => state.sizes,
}

const actions = {
    async GET_SIZES_FROM_API({ commit}) {
        return await SizeAPI.getAllSizes()
            .then((res) => {
                commit('setSizes', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    },
}

const mutations = {
    setSizes(state, sizes) {
        state.sizes = sizes;
        localStorage.setItem('sizes', JSON.stringify(sizes));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
