import { RequestAPI } from "../../http/RequestAPI";

const state = {
  requests: [],
  request: [],
  requestTypes: [],
  requestStatuses: [],
  newRequests: [],
};

const getters = {
  getRequests: (state) => state.requests,
  getRequest: (state) => state.request,
  getRequestTypes: (state) => state.requestTypes,
  getRequestStatuses: (state) => state.requestStatuses,
  getNewRequests: (state) => state.newRequests,
};

const actions = {
  async GET_REQUESTS_FROM_API({ commit }) {
    return await RequestAPI.getAllRequests()
      .then((res) => {
        commit("setRequests", res.data);
        commit("setNewRequests", res.data);
      })
      .catch((error) => {
        return error;
      });
  },

  async GET_REQUEST_TYPES_FROM_API({ commit }) {
    return await RequestAPI.getAllRequestTypes()
      .then((res) => {
        commit("setRequestTypes", res.data);
      })
      .catch((error) => {
        return error;
      });
  },

  async GET_REQUEST_STATUSES_FROM_API({ commit }) {
    return await RequestAPI.getAllRequestStatuses()
      .then((res) => {
        commit("setRequestStatuses", res.data);
      })
      .catch((error) => {
        return error;
      });
  },

  async GET_REQUEST_FROM_API({ commit }, { id }) {
    return await RequestAPI.getOneRequest(id)
      .then((res) => {
        console.log(res.data);
        commit("setRequest", res.data);
      })
      .catch((error) => {
        return error;
      });
  },

  async ADD_REQUEST(_, { name, email, phone, description, requestType }) {
    return await RequestAPI.create(name, email, phone, description, requestType)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  async DELETE_REQUEST(_, { id }) {
    return await RequestAPI.deleteRequest(id).catch((error) => {
      console.log(error);
      return error;
    });
  },

  async UPDATE_REQUEST(_, { id, name, email, phone, description, requestStatus }) {
    return await RequestAPI.updateRequest(id, name, email, phone, description, requestStatus)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};

const mutations = {
  setRequests(state, requests) {
    state.requests = requests;
    localStorage.setItem("requests", JSON.stringify(requests));
  },

  setRequestTypes(state, requestTypes) {
    state.requestTypes = requestTypes;
    localStorage.setItem("requestTypes", JSON.stringify(requestTypes));
  },

  setRequestStatuses(state, requestStatuses) {
    state.requestStatuses = requestStatuses;
    localStorage.setItem("requestStatuses", JSON.stringify(requestStatuses));
  },

  setRequest(state, request) {
    state.request = request;
    localStorage.setItem("request", JSON.stringify(request));
  },

  setNewRequests(state, requests) {
    state.newRequests = requests.rows.filter((r) => r.requestStatus.name == "Новый").length;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
