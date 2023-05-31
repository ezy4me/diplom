<template>
  <v-card>
    <v-card-title class="border-b my-3 text-center font-weight-light text-h4"
      >Добавить нового пользователя</v-card-title
    >
    <v-card-text>
      <v-sheet class="my-3 w-100">
        <v-form @submit.prevent="addNewUser">
          <v-text-field
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            v-model="state.email"
            label="Email"
          ></v-text-field>
          <v-text-field
            :error-messages="v$.fio.$errors.map((e) => e.$message)"
            v-model="state.fio"
            label="ФИО"
          ></v-text-field>
          <v-text-field
            :error-messages="v$.phone.$errors.map((e) => e.$message)"
            v-model="state.phone"
            maxlength="11"
            label="Телефон"
          ></v-text-field>
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
import { email, required, helpers, numeric } from "@vuelidate/validators";

export default {
  setup(props, { emit }) {
    const store = useStore();
    const initialState = {
      email: "",
      fio: "",
      phone: "",
    };

    const state = reactive({
      ...initialState,
    });

    const rules = {
      email: {
        required: helpers.withMessage("Обязательное поле!", required),
        email: helpers.withMessage("Не соответсвует почте!", email),
      },
      fio: { required: helpers.withMessage("Обязательное поле!", required) },
      phone: {
        required: helpers.withMessage("Обязательное поле!", required),
        numeric: helpers.withMessage("Только цифры!", numeric),
      },
    };

    const v$ = useVuelidate(rules, state);

    function clear() {
      v$.value.$reset();

      for (const [key, value] of Object.entries(initialState)) {
        state[key] = value;
      }
    }

    const addNewUser = async () => {
      const result = await v$.value.$validate();
      const pass = state.email
      if (result) {
        store
          .dispatch("user/ADD_USER", {
            email: state.email,
            password: pass,
            fio: state.fio,
            phone: state.phone,
          })
          .then(() => {
            emit("loadUsers");
            console.log(pass);
          });
      }
    };

    return {
      v$,
      state,
      clear,
      addNewUser,
    };
  },
};
</script>
