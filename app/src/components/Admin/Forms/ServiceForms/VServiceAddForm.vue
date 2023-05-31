<template>
  <v-card>
    <v-card-title class="border-b my-3 text-center font-weight-light text-h4"
      >Добавить новую услугу</v-card-title
    >
    <v-card-text>
      <v-sheet class="my-3 w-100">
        <v-form @submit.prevent="addNewService">
          <v-text-field
            v-model="state.name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Название"></v-text-field>
          <v-text-field
            v-model="state.price"
            :error-messages="v$.price.$errors.map((e) => e.$message)"
            label="Стоимость"></v-text-field>
          <v-textarea
            v-model="state.description"
            :error-messages="v$.description.$errors.map((e) => e.$message)"
            label="Описание"></v-textarea>
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
import { reactive } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";

export default {
  setup(props, { emit }) {
    const store = useStore();

    const initialState = {
      name: "",
      price: "",
      image: {},
      description: "",
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
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();
      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    const addNewService = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("service/ADD_SERVICE", {
            name: state.name,
            price: state.price,
            description: state.description,
            image: state.image[0],
          })
          .then(() => {
            emit("loadServices");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      addNewService,
    };
  },
};
</script>