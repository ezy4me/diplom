<template>
  <v-card>
    <v-card-title class="border-b my-3 text-center font-weight-light text-h4"
      >Добавить новый цвет</v-card-title
    >
    <v-card-text>
      <v-sheet class="my-3 w-100">
        <v-form @submit.prevent="addNewColor">
          <v-text-field
            v-model="state.name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Название"
          ></v-text-field>
          <v-text-field
            v-model="state.hex"
            :error-messages="v$.hex.$errors.map((e) => e.$message)"
            label="hex"
          ></v-text-field>
          <v-color-picker width="auto" class="my-3" v-model="state.hex" />
          <v-btn type="submit" color="green" block class="border">Добавить</v-btn>
        </v-form>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { reactive } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  setup(props, { emit }) {
    const store = useStore();

    const initialState = {
      name: "",
      hex: "",
    };

    const state = reactive({
      ...initialState,
    });

    const rules = {
      name: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      hex: { required: helpers.withMessage("Обязательное поле!", required) },
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    const addNewColor = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("color/ADD_COLOR", {
            name: state.name,
            hex: state.hex,
          })
          .then(() => {
            emit("loadColors");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      addNewColor,
    };
  },
};
</script>
