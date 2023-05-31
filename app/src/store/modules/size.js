import { SizeAPI } from '../../http/SizeAPI';

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
                console.log(res.data);
                commit('setSizes', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
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
