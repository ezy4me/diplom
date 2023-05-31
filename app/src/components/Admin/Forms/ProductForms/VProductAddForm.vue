<template>
  <v-card>
    <v-card-title class="border-b my-3 text-center font-weight-light text-h4"
      >Добавить новый товар</v-card-title
    >
    <v-card-text>
      <v-sheet class="my-3 w-100">
        <v-form @submit.prevent="addNewProduct">
          <v-text-field
            v-model="state.name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Название"></v-text-field>
          <v-text-field
            v-model="state.price"
            :error-messages="v$.price.$errors.map((e) => e.$message)"
            label="Стоимость"></v-text-field>
          <v-text-field
            v-model="state.count"
            :error-messages="v$.count.$errors.map((e) => e.$message)"
            label="Кол-во"></v-text-field>
          <v-textarea
            v-model="state.description"
            :error-messages="v$.description.$errors.map((e) => e.$message)"
            label="Описание"></v-textarea>
          <v-select
            v-model="state.materials"
            :items="materials.rows.map((m) => m.name)"
            :error-messages="v$.materials.$errors.map((e) => e.$message)"
            label="Материал"
            variant="solo"
            multiple></v-select>
          <v-select
            v-model="state.furnitures"
            :items="furnitures.rows.map((f) => f.name)"
            :error-messages="v$.furnitures.$errors.map((e) => e.$message)"
            label="Фурнитура"
            variant="solo"
            multiple></v-select>
          <v-select
            v-model="state.category"
            :items="categories.rows.map((c) => c.name)"
            :error-messages="v$.category.$errors.map((e) => e.$message)"
            label="Категория"
            variant="solo"></v-select>
          <div class="d-flex">
            <v-select
              class="mr-3"
              v-model="state.size"
              :items="sizes.rows.map((s) => s.name)"
              :error-messages="v$.size.$errors.map((e) => e.$message)"
              label="Размер"
              variant="solo"></v-select>
            <v-select
              class="ml-3"
              v-model="state.cut"
              :items="cuts.rows.map((c) => c.name)"
              :error-messages="v$.cut.$errors.map((e) => e.$message)"
              label="Крой"
              variant="solo"></v-select>
          </div>
          <v-file-input
            label="Изображение"
            type="file"
            required
            v-model="state.image"
            :error-messages="v$.image.$errors.map((e) => e.$message)"
            variant="solo"></v-file-input>
          <v-btn type="submit" color="green" block class="border"
            >Добавить</v-btn
          >
        </v-form>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";

export default {
  props: {
    materials: {
      type: Array,
      default: () => [],
    },
    furnitures: {
      type: Array,
      default: () => [],
    },
    categories: {
      type: Array,
      default: () => [],
    },
    sizes: {
      type: Array,
      default: () => [],
    },
    cuts: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { materials, furnitures, categories, cuts, sizes } = toRefs(props);

    const initialState = {
      name: "",
      price: "",
      image: {},
      description: "",
      count: "",
      materials: [],
      furnitures: [],
      size: "",
      cut: "",
      category: "",
    };

    const state = reactive({
      ...initialState,
    });

    const rules = {
      name: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      price: {
        required: helpers.withMessage("Обязательное поле!", required),
        numeric: helpers.withMessage("Только цифры!", numeric),
      },
      description: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      image: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      count: {
        required: helpers.withMessage("Обязательное поле!", required),
        numeric: helpers.withMessage("Только цифры!", numeric),
      },
      materials: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      furnitures: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      size: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      cut: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      category: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    const addNewProduct = async () => {
      const materialsID = [];
      for (let i = 0; i < materials.value.rows.length; i++) {
        for (let j = 0; j < state.materials.length; j++) {
          if (materials.value.rows[i].name === state.materials[j]) {
            materialsID.push(materials.value.rows[i].id);
            break;
          }
        }
      }

      const furnituresID = [];
      for (let i = 0; i < furnitures.value.rows.length; i++) {
        for (let j = 0; j < state.furnitures.length; j++) {
          if (furnitures.value.rows[i].name === state.furnitures[j]) {
            furnituresID.push(furnitures.value.rows[i].id);
            break;
          }
        }
      }

      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("product/ADD_PRODUCT", {
            name: state.name,
            price: state.price,
            count: state.count,
            description: state.description,
            image: state.image[0],
            categoryId: categories.value.rows.filter(
              (i) => i.name === state.category
            )[0].id,
            cutId: cuts.value.rows.filter((i) => i.name === state.cut)[0].id,
            sizeId: sizes.value.rows.filter((i) => i.name === state.size)[0].id,
            materials: materialsID,
            furnitures: furnituresID,
          })
          .then(() => {
            emit("loadProducts");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      addNewProduct,
    };
  },
};
</script>
