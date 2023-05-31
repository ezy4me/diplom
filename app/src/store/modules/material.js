import { MaterialAPI } from "@/http/MaterialAPI";
import { Alert } from "../alerts/alert";

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
        commit("setMaterials", res.data);
        commit("setMaterialsPie", res.data);
      })
      .catch((error) => {
        return Alert.errorAlert("Ошибка", error.response.data.message);
      });
  },

  async ADD_MATERIAL(_, { name, price, count, colorId, image }) {
    return await MaterialAPI.create(name, price, count, colorId, image)
      .then(() => {
        return Alert.successAlert("Добавление материала");
      })
      .catch((error) => {
        return Alert.errorAlert("Добавление материала", error.response.data.message);
      });
  },

  async UPDATE_MATERIAL(_, { id, name, price, count, colorId, image }) {
    return await MaterialAPI.updateMaterial(id, name, price, count, colorId, image)
      .then(() => {
        return Alert.successAlert("Изменение материала");
      })
      .catch((error) => {
        return Alert.errorAlert("Изменение материала", error.response.data.message);
      });
  },

  async DELETE_MATERIAL(_, { id }) {
    return await MaterialAPI.deleteMaterial(id)
      .then(() => {
        return Alert.successAlert("Удаление материала");
      })
      .catch((error) => {
        return Alert.errorAlert("Удаление материала", error.response.data.message);
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
