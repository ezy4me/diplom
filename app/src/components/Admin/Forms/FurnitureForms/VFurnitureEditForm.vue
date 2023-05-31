<template>
  <v-sheet class="my-3 w-100">
    <v-img
      height="300"
      :src="'http://localhost:5000/' + selectedFurniture.image"></v-img>
    <v-form @submit.prevent="updateFurniture">
      <v-text-field
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        v-model="state.name"
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
        :items="furnitureColors.map((c) => c.name)"
        v-model="state.color"
        :error-messages="v$.color.$errors.map((e) => e.$message)"
        variant="solo"></v-select>
      <v-file-input
        label="Изображение"
        type="file"
        required
        v-model="state.image"
        variant="solo"></v-file-input>
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
    selectedFurniture: {
      type: Object,
      default: () => {
        return {};
      },
    },
    furnitureColors: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const { selectedFurniture, furnitureColors } = toRefs(props);

    onUpdated(() => {
      state.name = selectedFurniture.value.name;
      state.price = selectedFurniture.value.price;
      state.count = selectedFurniture.value.count;
      state.color = selectedFurniture.value.color.name;
      state.image = [{}];
    });

    const initialState = {
      name: selectedFurniture.value.name,
      price: selectedFurniture.value.price,
      count: selectedFurniture.value.count,
      image: [{}],
      color: selectedFurniture.value.color.name,
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
      },
      count: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      color: {
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

    const updateFurniture = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("furniture/UPDATE_FURNITURE", {
            id: selectedFurniture.value.id,
            name: state.name,
            price: state.price,
            count: state.count,
            colorId: furnitureColors.value.filter(
              (m) => m.name == state.color
            )[0].id,
            image: state.image[0],
          })
          .then(() => {
            emit("loadFurnitures");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      updateFurniture,
    };
  },
};
</script>
