<template>
  <v-card>
    <v-card-title class="border-b my-3 text-center font-weight-light text-h4"
      >Оставить заявку</v-card-title
    >
    <v-card-text>
      <v-sheet class="my-3 w-100">
        <v-form @submit.prevent="addNewRequest">
          <v-select
            v-model="state.type"
            :items="requestTypes.rows.map((t) => t.name)"
            :error-messages="v$.type.$errors.map((e) => e.$message)"
            label="Тема заявки"
            variant="solo"></v-select>
          <v-text-field
            v-model="state.name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            label="Ваше имя"></v-text-field>
          <v-text-field
            v-model="state.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            label="Ваша почта"></v-text-field>
          <v-text-field
            v-model="state.phone"
            maxlength="11"
            :error-messages="v$.phone.$errors.map((e) => e.$message)"
            label="Ваш телефон"></v-text-field>
          <v-textarea
            v-model="state.description"
            label="Комментарий"></v-textarea>
          <v-btn type="submit" color="blue" block class="border"
            >Отправить</v-btn
          >
        </v-form>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { computed, reactive } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, email, numeric } from "@vuelidate/validators";
export default {
  setup(_, { emit }) {
    const store = useStore();

    const requestTypes = computed(() => store.state.request.requestTypes);

    const initialState = {
      name: null,
      email: null,
      phone: null,
      description: null,
      type: null,
    };

    const state = reactive({
      ...initialState,
    });

    const rules = {
      name: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      email: {
        required: helpers.withMessage("Обязательное поле!", required),
        email: helpers.withMessage("Не соответсвует почте!", email),
      },
      phone: {
        required: helpers.withMessage("Обязательное поле!", required),
        numeric: helpers.withMessage("Только цифры!", numeric),
      },
      type: {
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

    const addNewRequest = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("request/ADD_REQUEST", {
            name: state.name,
            email: state.email,
            phone: state.phone,
            description: state.description,
            requestType: requestTypes.value.rows.filter(
              (t) => t.name === state.type
            )[0].id,
          })
          .then((error) => {
            if (!error) {
              emit("closeDialog");
            }
          });
      }
    };

    return {
      v$,
      state,
      clear,
      addNewRequest,
      requestTypes,
    };
  },
};
</script>

<style></style>
