<template>
  <v-card>
    <v-card-title class="border-b my-3 text-center font-weight-light text-h4"
      >Добавить новый заказ</v-card-title
    >
    <v-card-text>
      <v-sheet class="my-3 w-100">
        <v-form @submit.prevent="addNewOrder">
          <v-select
            v-model="state.user"
            :items="users.rows.map((u) => u.fio)"
            :error-messages="v$.user.$errors.map((e) => e.$message)"
            label="Пользователь"
          ></v-select>
          <v-select
            v-model="state.products"
            :items="products.rows.map((p) => p.name)"
            :error-messages="v$.products.$errors.map((e) => e.$message)"
            label="Изделие"
            multiple
          ></v-select>
          <v-select
            v-model="state.payment"
            :items="payments.rows.map((p) => p.type)"
            :error-messages="v$.payment.$errors.map((e) => e.$message)"
            label="Статус оплаты"
          ></v-select>
          <v-select
            v-model="state.sale"
            :items="sales.rows.map((s) => s.name)"
            :error-messages="v$.sale.$errors.map((e) => e.$message)"
            label="Скидка"
          ></v-select>
          <v-select
            v-model="state.order_status"
            :items="orderStatuses.rows.map((os) => os.name)"
            :error-messages="v$.order_status.$errors.map((e) => e.$message)"
            label="Статус заказа"
          ></v-select>
          <v-btn type="submit" color="green" block class="border">Добавить</v-btn>
        </v-form>
      </v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { useVuelidate } from "@vuelidate/core";
import { required, helpers } from "@vuelidate/validators";

export default {
  props: {
    selectedUser: {
      type: Array,
      default: () => {
        return [];
      },
    },
    products: {
      type: Array,
      default: () => {
        return [];
      },
    },
    users: {
      type: Array,
      default: () => {
        return [];
      },
    },
    payments: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sales: {
      type: Array,
      default: () => {
        return [];
      },
    },
    orderStatuses: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const store = useStore();
    const { products, users, payments, sales, orderStatuses, selectedUser } = toRefs(
      props
    );

    const initialState = {
      user: selectedUser.value.fio,
      payment: "",
      order_status: "",
      sale: "",
      products: [],
    };

    const state = reactive({
      ...initialState,
    });

    const rules = {
      user: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      payment: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      order_status: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      sale: {
        required: helpers.withMessage("Обязательное поле!", required),
      },
      products: {
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

    const addNewOrder = async () => {
      const productsID = [];
      for (let i = 0; i < products.value.rows.length; i++) {
        for (let j = 0; j < state.products.length; j++) {
          if (products.value.rows[i].name === state.products[j]) {
            productsID.push(products.value.rows[i].id);
            break;
          }
        }
      }
      const result = await v$.value.$validate();
      if (result) {
        store
          .dispatch("order/ADD_ORDER", {
            userId: users.value.rows.filter((u) => u.fio === state.user)[0].id,
            paymentId: payments.value.rows.filter((p) => p.type === state.payment)[0].id,
            saleId: sales.value.rows.filter((s) => s.name === state.sale)[0].id,
            orderStatusId: orderStatuses.value.rows.filter(
              (os) => os.name === state.order_status
            )[0].id,
            products: productsID,
          })
          .then(() => {
            emit("loadOrders");
            if (selectedUser) {
              emit("refreshUserOrders");
            }
          });
      }
    };

    return {
      v$,
      state,
      clear,
      addNewOrder,
    };
  },
};
</script>
