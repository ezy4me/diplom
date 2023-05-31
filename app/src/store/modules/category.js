    import { CategoryAPI } from '@/http/CategoryAPI';

const state = {
    categories: [],
}

const getters = {
    getCategories: (state) => state.categories,
}

const actions = {
    async GET_CATEGORIES_FROM_API({ commit}) {
        return await CategoryAPI.getAllCategories()
            .then((res) => {
                commit('setCategories', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    },
}

const mutations = {
    setCategories(state, categories) {
        state.categories = categories;
        localStorage.setItem('categories', JSON.stringify(categories));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
