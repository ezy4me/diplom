<template>
  <v-sheet class="my-3 w-100">
    <v-form @submit.prevent="updateRequest">
      <v-text-field
        :error-messages="v$.name.$errors.map((e) => e.$message)"
        v-model="state.name"
        label="Имя"
      ></v-text-field>
      <v-text-field
        v-model="state.email"
        :error-messages="v$.email.$errors.map((e) => e.$message)"
        label="Почта"
      ></v-text-field>
      <v-text-field
        v-model="state.phone"
        maxlength="11"
        :error-messages="v$.phone.$errors.map((e) => e.$message)"
        label="Телефон"
      ></v-text-field>
      <v-textarea
        v-model="state.description"
        label="Комментарий"
      ></v-textarea>
      <v-select
        label="Статус"
        :items="requestStatuses.rows.map((s) => s.name)"
        v-model="state.requestStatus"
        :error-messages="v$.requestStatus.$errors.map((e) => e.$message)"
        variant="solo"
      ></v-select>
     
      <v-btn type="submit" color="blue" block class="border">Изменить</v-btn>
    </v-form>
  </v-sheet>
</template>

<script>
import { reactive, toRefs, onUpdated } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers, numeric, email } from "@vuelidate/validators";
export default {
  props: {
    selectedRequest: {
      type: Object,
      default: () => {
        return {};
      },
    },
    requestStatuses: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const store = useStore();

    const { selectedRequest, requestStatuses } = toRefs(props);

    onUpdated(() => {
      state.name = selectedRequest.value.name
      state.email = selectedRequest.value.email
      state.phone = selectedRequest.value.phone
      state.description = selectedRequest.value.description
      state.requestStatus = selectedRequest.value.requestStatus.name
    });

    const initialState = {
      name: selectedRequest.value.name,
      email: selectedRequest.value.email,
      phone: selectedRequest.value.phone,
      description: selectedRequest.value.description,
      requestStatus: selectedRequest.value.requestStatus.name,
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
      requestStatus: {
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

    const updateRequest = async () => {
      // console.log(requestColors.value.filter((m) => m.name == state.color)[0].id);
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("request/UPDATE_REQUEST", {
            id: selectedRequest.value.id,
            name: state.name,
            email: state.email,
            phone: state.phone,
            description: state.description,
            requestStatus: requestStatuses.value.rows.filter((s) => s.name == state.requestStatus)[0].id,
          })
          .then(() => {
            emit("loadRequests");
          });
      }
    };

    return {
      v$,
      state,
      clear,
      updateRequest,
    };
  },
};
</script>

<style></style>
