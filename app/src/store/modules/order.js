import { OrderAPI } from "../../http/OrderAPI";
import { Alert } from "../alerts/alert";
const state = {
  orders: [],
  order: [],
  activeOrders: []
};

const getters = {
  getOrders: (state) => state.orders,
  getOrder: (state) => state.order,
  getActiveOrders: (state) => state.activeOrders,
};

const actions = {
  async GET_ORDERS_FROM_API({ commit }) {
    return await OrderAPI.getAllOrders()
      .then((res) => {
        commit("setOrders", res.data);
        commit("setActiveOrders", res.data);
      })
      .catch((error) => {
        return Alert.errorAlert("Ошибка", error.response.data.message);
      });
  },

  async GET_ORDER_FROM_API({ commit }, { id }) {
    return await OrderAPI.getOneOrder(id)
      .then((res) => {
        commit("setOrder", res.data);
      })
      .catch((error) => {
        return Alert.errorAlert("Ошибка", error.response.data.message);
      });
  },

  async ADD_ORDER(_, { userId, paymentId, saleId, orderStatusId, products }) {
    return await OrderAPI.create(userId, paymentId, saleId, orderStatusId, products)
      .then(() => {
        return Alert.successAlert("Добавление заказа");
      })
      .catch((error) => {
        return Alert.errorAlert("Добавление заказа", error.response.data.message);
      });
  },

  async DELETE_ORDER(_, { id }) {
    return await OrderAPI.deleteOrder(id)
      .then(() => {
        return Alert.successAlert("Удаление заказа");
      })
      .catch((error) => {
        return Alert.errorAlert("Удаление заказа", error.response.data.message);
      });
  },

  async UPDATE_ORDER(_, { id, userId, paymentId, saleId, orderStatusId, products }) {
    return await OrderAPI.updateOrder(id, userId, paymentId, saleId, orderStatusId, products)
      .then(() => {
        return Alert.successAlert("Изменение заказа");
      })
      .catch((error) => {
        return Alert.errorAlert("Изменение заказа", error.response.data.message);
      });
  },
};

const mutations = {
  setOrders(state, orders) {
    state.orders = orders;
    localStorage.setItem("orders", JSON.stringify(orders));
  },

  setOrder(state, order) {
    state.order = order;
    localStorage.setItem("order", JSON.stringify(order));
  },

  setActiveOrders(state, orders) {
    state.activeOrders = orders.rows.filter((o) => o.order_status.name != "Завершен").length
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
