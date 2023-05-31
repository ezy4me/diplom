<template>
  <v-sheet class="my-3 w-100">
    <v-form @submit.prevent="updateUserInfo">
      <v-text-field
        :error-messages="v$.email.$errors.map((e) => e.$message)"
        v-model="state.email"
        label="Email"></v-text-field>
      <v-text-field
        :error-messages="v$.fio.$errors.map((e) => e.$message)"
        v-model="state.fio"
        label="ФИО"></v-text-field>
      <v-text-field
        :error-messages="v$.phone.$errors.map((e) => e.$message)"
        v-model="state.phone"
        type="phone"
        maxlength="11"
        minlength="10"
        label="Телефон"></v-text-field>
      <v-btn type="submit" color="blue" block class="border">Изменить</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { reactive, toRefs, onUpdated } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { email, required, helpers, numeric } from "@vuelidate/validators";
export default {
  props: {
    selectedUser: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const { selectedUser } = toRefs(props);

    onUpdated(() => {
      state.email = selectedUser.value.email;
      state.fio = selectedUser.value.fio;
      state.phone = selectedUser.value.phone;
    });
    const initialState = {
      email: selectedUser.value.email,
      fio: selectedUser.value.fio,
      phone: selectedUser.value.phone,
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

    const updateUserInfo = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("user/UPDATE_USER", {
            id: selectedUser.value.id,
            email: state.email,
            fio: state.fio,
            phone: state.phone,
          })
          .then(() => {
            emit("loadUsers");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      updateUserInfo,
    };
  },
};
</script>
