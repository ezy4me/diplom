import { PaymentAPI } from '../../http/PaymentAPI';

const state = {
    payments: [],
}

const getters = {
    getPayments: (state) => state.payments,
}

const actions = {
    async GET_PAYMENTS_FROM_API({ commit }) {
        return await PaymentAPI.getAllPayments()
            .then((res) => {
                console.log(res.data);
                commit('setPayments', res.data);
            })
            .catch((error) => {
                console.log(error);
                return error;
            })
    }
}

const mutations = {
    setPayments(state, payments) {
        state.payments = payments;
        localStorage.setItem('payments', JSON.stringify(payments));
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
