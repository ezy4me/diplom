import { SaleAPI } from '../../http/SaleAPI';

const state = {
    sales: [],
}

const getters = {
    getSales: (state) => state.sales,
}

const actions = {
    async GET_SALES_FROM_API({ commit }) {
        return await SaleAPI.getAllSales()
            .then((res) => {
                console.log(res.data);
                commit('setSales', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }
}

const mutations = {
    setSales(state, sales) {
        state.sales = sales;
        localStorage.setItem('sales', JSON.stringify(sales));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
