import { MaterialAPI } from "@/http/MaterialAPI";

const state = {
  materials: [],
  materialsPie: []
};

const getters = {
  getMaterials: (state) => state.materials,
  getMaterialsPie: (state) => state.materialsPie,
};

const actions = {
  async GET_MATERIALS_FROM_API({ commit }) {
    return await MaterialAPI.getAllMaterials()
      .then((res) => {
        console.log(res.data);
        commit("setMaterials", res.data);
        commit("setMaterialsPie", res.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  async ADD_MATERIAL(_,{ name, price, count, colorId, image }) {
    return await MaterialAPI.create(name, price, count, colorId, image)
      .then((res) => {
        console.log(res.data);
        // commit('setMaterials', res.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  async UPDATE_MATERIAL(_,{ id, name, price, count, colorId, image }) {
    return await MaterialAPI.updateMaterial(
      id,
      name,
      price,
      count,
      colorId,
      image
    )
      .then((res) => {
        console.log(res.data);
        // commit('setMaterials', res.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },

  async DELETE_MATERIAL(_,{ id }) {
    return await MaterialAPI.deleteMaterial(id)
      .then((res) => {
        console.log(res.data);
        // commit('setMaterials', res.data);
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  },
};

const mutations = {
  setMaterials(state, materials) {
    state.materials = materials;
    localStorage.setItem("materials", JSON.stringify(materials));
  },

  setMaterialsPie(state, materials) {
    state.materialsPie = materials.rows.filter((m) => m.count <= 50);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
