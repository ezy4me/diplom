import { OrderStatusAPI } from '../../http/OrderStatusAPI';
import { Alert } from '../alerts/alert';
const state = {
    orderStatuses: [],
}

const getters = {
    getOrderStatuses: (state) => state.orderStatuses,
}

const actions = {
    async GET_ORDERSTATUSES_FROM_API({ commit }) {
        return await OrderStatusAPI.getAllOrderStatuses()
            .then((res) => {
                commit('setOrderStatuses', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
            })
    }
}

const mutations = {
    setOrderStatuses(state, orderStatuses) {
        state.orderStatuses = orderStatuses;
        localStorage.setItem('orderStatuses', JSON.stringify(orderStatuses));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
