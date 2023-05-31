<template>
  <v-card>
    <v-card-title class="border-b my-3 text-center font-weight-light text-h4"
      >Добавить новый материал</v-card-title
    >
    <v-card-text>
      <v-sheet class="my-3 w-100">
        <v-form @submit.prevent="addNewMaterial">
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
          <v-select
            label="Цвет"
            :items="materialColors.map((c) => c.name)"
            v-model="state.color"
            :error-messages="v$.color.$errors.map((e) => e.$message)"
            variant="solo"></v-select>
          <v-file-input
            v-model="state.image"
            type="file"
            :error-messages="v$.image.$errors.map((e) => e.$message)"
            label="Изображение"
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
    materialColors: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { materialColors } = toRefs(props);

    const initialState = {
      name: "",
      price: "",
      count: "",
      image: {},
      color: "",
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
      count: {
        required: helpers.withMessage("Обязательное поле!", required),
        numeric: helpers.withMessage("Только цифры!", numeric),
      },
      color: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      image: {
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

    const addNewMaterial = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("material/ADD_MATERIAL", {
            name: state.name,
            price: state.price,
            count: state.count,
            colorId: materialColors.value.filter(
              (m) => m.name == state.color
            )[0].id,
            image: state.image[0],
          })
          .then(() => {
            emit("loadMaterials");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      addNewMaterial,
    };
  },
};
</script>
