import { PaymentAPI } from '../../http/PaymentAPI';
import { Alert } from '../alerts/alert';
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
                commit('setPayments', res.data);
            })
            .catch((error) => {
                return Alert.errorAlert("Ошибка", error.response.data.message);
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
