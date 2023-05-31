<template>
  <v-sheet class="my-3 w-100">
    <v-form @submit.prevent="updateColor">
      <v-text-field
        v-model="state.name"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="Название"></v-text-field>
      <v-text-field
        v-model="state.hex"
        :error-messages="v$.hex.$errors.map((e) => e.$message)"
        label="hex"></v-text-field>
      <v-color-picker width="auto" class="my-3" v-model="state.hex" />
      <v-btn type="submit" color="blue" block class="border">Изменить</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { reactive, toRefs, onUpdated } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";
export default {
  props: {
    selectedColor: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const { selectedColor } = toRefs(props);

    onUpdated(() => {
      state.name = selectedColor.value.name;
      state.hex = selectedColor.value.hex;
    });

    const initialState = {
      name: selectedColor.value.name,
      hex: selectedColor.value.hex,
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

    const updateColor = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("color/UPDATE_COLOR", {
            id: selectedColor.value.id,
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
      updateColor,
    };
  },
};
</script>
