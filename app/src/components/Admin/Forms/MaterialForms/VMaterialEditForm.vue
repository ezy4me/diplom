<template>
  <v-sheet class="my-3 w-100">
    <v-img
      height="300"
      :src="'http://localhost:5000/' + selectedMaterial.image"
    ></v-img>
    <v-form @submit.prevent="updateMaterial">
      <v-text-field
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        v-model="state.name"
        label="Название"
      ></v-text-field>
      <v-text-field
        v-model="state.price"
        :error-messages="v$.price.$errors.map((e) => e.$message)"
        label="Стоимость"
      ></v-text-field>
      <v-text-field
        v-model="state.count"
        :error-messages="v$.count.$errors.map((e) => e.$message)"
        label="Кол-во"
      ></v-text-field>
      <v-select
        label="Цвет"
        :items="materialColors.map((c) => c.name)"
        v-model="state.color"
        :error-messages="v$.color.$errors.map((e) => e.$message)"
        variant="solo"
      ></v-select>
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
import { required, helpers } from "@vuelidate/validators";
export default {
  props: {
    selectedMaterial: {
      type: Object,
      default: () => {
        return {};
      },
    },
    materialColors: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const { selectedMaterial, materialColors } = toRefs(props);

    onUpdated(() => {
      state.name = selectedMaterial.value.name;
      state.price = selectedMaterial.value.price;
      state.count = selectedMaterial.value.count;
      state.color = selectedMaterial.value.color.name;
      state.image = [{}];
    });

    const initialState = {
      name: selectedMaterial.value.name,
      price: selectedMaterial.value.price,
      count: selectedMaterial.value.count,
      image: [{}],
      color: selectedMaterial.value.color.name,
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

    const updateMaterial = async () => {
      // console.log(materialColors.value.filter((m) => m.name == state.color)[0].id);
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("material/UPDATE_MATERIAL", {
            id: selectedMaterial.value.id,
            name: state.name,
            price: state.price,
            count: state.count,
            colorId: materialColors.value.filter((m) => m.name == state.color)[0].id,
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
      updateMaterial,
    };
  },
};
</script>

<style></style>
