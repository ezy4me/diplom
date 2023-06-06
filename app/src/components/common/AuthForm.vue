<template>
  <form class="auth-form" @submit.prevent="authUser">
    <fieldset class="auth-form__filedset">
      <v-text-field
        :error-messages="v$.email.$errors.map((e) => e.$message)"
        v-model="state.email"
        label="Email"
        type="email"></v-text-field>
    </fieldset>
    <fieldset class="auth-form__filedset">
      <v-text-field
        :error-messages="v$.password.$errors.map((e) => e.$message)"
        v-model="state.password"
        label="Пароль"
        type="password"></v-text-field>
    </fieldset>
    <button type="submit" class="btn form__btn">Войти</button>
  </form>
</template>

<script>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { email, required, helpers } from "@vuelidate/validators";

export default {
  setup(props, { emit }) {
    const store = useStore();
    const router = useRouter();

    const initialState = {
      email: "",
      password: "",
    };

    const state = reactive({
      ...initialState,
    });

    const rules = {
      email: {
        required: helpers.withMessage("Обязательное поле!", required),
        email: helpers.withMessage("Не соответсвует почте!", email),
      },
      password: {
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

    const authUser = async () => {
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("auth/ON_LOGIN", {
            email: state.email,
            password: state.password,
          })
          .then(() => {
            if (store.state.auth.credentials.userRole === "ADMIN") {
              router.push({ path: "/admin" });
            }
            if (store.state.auth.credentials.userRole === "USER") {
              // router.push({ path: "/account" });
              location.reload()
            }
            emit("isOpen");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      authUser,
    };
  },
};
</script>

<style scoped lang="scss">
.form {
  &__btn {
    margin: 1rem;
    width: 100%;
  }
}
.auth-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__filedset {
    width: 100%;
    display: flex;
    flex-direction: column;
    border: 0;
  }

  &__label {
    margin: 0.5rem 0;
  }

  &__input {
    border: 1px solid gainsboro;
    height: 40px;
    margin: 0.5rem 0;
    padding-left: 1rem;
  }

  &__input:focus {
    outline: 1px solid lightslategray;
  }
}
</style>
