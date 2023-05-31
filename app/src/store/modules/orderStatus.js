import { OrderStatusAPI } from '../../http/OrderStatusAPI';

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
                console.log(res.data);
                commit('setOrderStatuses', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
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
