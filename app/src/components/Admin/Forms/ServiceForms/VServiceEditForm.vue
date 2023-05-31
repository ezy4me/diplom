<template>
  <v-sheet class="my-3 w-100">
    <v-img
      height="300"
      :src="'http://localhost:5000/' + selectedService.image"
    ></v-img>
    <v-form @submit.prevent="updateService">
      <v-text-field
        v-model="state.name"
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        label="Название"
      ></v-text-field>
      <v-text-field
        v-model="state.price"
        :error-messages="v$.price.$errors.map((e) => e.$message)"
        label="Стоимость"
      ></v-text-field>
      <v-textarea
        v-model="state.description"
        :error-messages="v$.description.$errors.map((e) => e.$message)"
        label="Описание"
      ></v-textarea>
      <v-file-input
        label="Изображение"
        type="file"
        required
        v-model="state.image"
        variant="solo"
      ></v-file-input>
      <v-btn type="submit" color="blue" block class="border">Изменить</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { reactive, toRefs, onUpdated } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric } from "@vuelidate/validators";
export default {
  props: {
    selectedService: {
      type: Object,
      default: () => {
        return {};
      },
    }
  },
  setup(props, { emit }) {
    const store = useStore();

    const { selectedService } = toRefs(props);

    onUpdated(() => {
      state.name = selectedService.value.name;
      state.price = selectedService.value.price;
      state.description = selectedService.value.description;
      state.image = [{}];
    });

    const initialState = {
      name: selectedService.value.name,
      price: selectedService.value.price,
      description: selectedService.value.description,
      image: [{}],
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
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    const updateService = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("service/UPDATE_SERVICE", {
            id: selectedService.value.id,
            name: state.name,
            price: state.price,
            description: state.description,
            image: state.image[0]
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
      updateService,
    };
  },
};
</script>

<style></style>
