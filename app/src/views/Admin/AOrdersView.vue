<template>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Заказы</h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn @click="dialog = true" color="green" class="my-3 w-100"
                >Добавить</v-btn
              >
            </v-sheet>
          </v-col>
          <v-dialog v-model="dialog" width="600">
            <v-order-add-form
              :products="products"
              :users="users"
              :payments="payments"
              :sales="sales"
              :orderStatuses="orderStatuses"
              @loadOrders="loadOrders">
            </v-order-add-form>
          </v-dialog>
        </v-row>
        <v-order-table :orders="orders" @selectOrder="selectOrder">
        </v-order-table>
      </v-col>
      <transition>
        <v-col v-if="isSelected" cols="3" class="border rounded">
          <div class="d-flex flex-column">
            <div
              class="d-flex align-center justify-end my-3 pa-2 bg-primary rounded">
              <v-icon
                @click="closeInfo"
                icon="mdi-close"
                class="text-h6"></v-icon>
            </div>
            <v-row
              class="my-3 d-flex flex-column align-center justify-content-center">
              <div class="text-h4 font-weight-light">Изделия</div>
              <v-card
                width="400"
                class="mt-1"
                v-for="product in orderProducts"
                :key="product.id">
                <v-row>
                  <v-col cols="4">
                    <v-img
                      height="100"
                      width="100"
                      cover
                      :src="'http://localhost:5000/' + product.image"></v-img>
                  </v-col>
                  <v-col class="d-flex align-center">
                    <div class="text-body-1 mx-3">{{ product.name }}</div>
                  </v-col>
                </v-row>
              </v-card>
            </v-row>
            <v-order-edit-form
              :selectedOrder="selectedOrder"
              :products="products"
              :orderProducts="orderProducts"
              :users="users"
              :payments="payments"
              :sales="sales"
              :orderStatuses="orderStatuses"
              @loadOrders="loadOrders">
            </v-order-edit-form>
            <v-btn @click="deleteOrder" color="red" class="my-3">Удалить</v-btn>
            <input type="order" class="w-100" />
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VOrderAddForm from "../../components/Admin/Forms/OrderForms/VOrderAddForm.vue";
import VOrderTable from "../../components/Admin/Tables/VOrderTable.vue";
import VOrderEditForm from "../../components/Admin/Forms/OrderForms/VOrderEditForm.vue";

export default {
  components: { VOrderAddForm, VOrderTable, VOrderEditForm },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);
    const isNewOrder = ref(false);

    const orders = computed(() => store.state.order.orders);
    const sales = computed(() => store.state.sale.sales);
    const payments = computed(() => store.state.payment.payments);
    const orderStatuses = computed(() => store.state.orderStatus.orderStatuses);
    const users = computed(() => store.state.user.users);
    const products = computed(() => store.state.product.products);
    const orderProducts = computed(() =>
      store.state.order.order.map((op) => op.product)
    );

    const selectedOrder = ref();

    onMounted(() => {
      loadOrders();
      loadUsers();
      loadSales();
      loadPayments();
      loadOrderStatuses();
      loadProducts();
    });

    const selectOrder = async (order) => {
      await store
        .dispatch("order/GET_ORDER_FROM_API", { id: order.id })
        .then(() => {
          selectedOrder.value = order;
        });

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const loadOrders = () => {
      store.dispatch("order/GET_ORDERS_FROM_API");
    };

    const loadSales = () => {
      store.dispatch("sale/GET_SALES_FROM_API");
    };

    const loadPayments = () => {
      store.dispatch("payment/GET_PAYMENTS_FROM_API");
    };

    const loadOrderStatuses = () => {
      store.dispatch("orderStatus/GET_ORDERSTATUSES_FROM_API");
    };

    const loadUsers = () => {
      store.dispatch("user/GET_USERS_FROM_API");
    };

    const loadProducts = () => {
      store.dispatch("product/GET_PRODUCTS_FROM_API");
    };

    const deleteOrder = () => {
      store
        .dispatch("order/DELETE_ORDER", {
          id: selectedOrder.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadOrders();
        });
    };

    return {
      orders,
      users,
      sales,
      payments,
      orderStatuses,
      products,

      isSelected,
      dialog,
      isNewOrder,

      selectOrder,
      selectedOrder,
      closeInfo,

      deleteOrder,
      orderProducts,
      loadOrders,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.pallete {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

tbody tr:hover {
  @include hover;
}

th i:hover {
  @include hover;
  color: white;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
