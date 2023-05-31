import { SaleAPI } from '../../http/SaleAPI';
import { Alert } from '../alerts/alert';
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
                commit('setSales', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
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
