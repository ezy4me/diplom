<template>
  <div class="d-flex flex-column">
    <div class="text-h5 my-3">Заказы</div>
    <div v-if="!userOrders.length" class="text-h5 text-red text-center">
      Список заказов пуст
    </div>
    <div v-else>
      <div v-for="order in userOrders" :key="order.id" class="text-body-1">
        <v-card class="my-1">
          <v-card-item>
            <v-row class="align-center">
              <v-col>
                <v-card-item-title
                  >Заказ # {{ order[0].orderId }}</v-card-item-title
                >
              </v-col>
              <v-col cols="6">
                <div class="d-flex flex-column justify-start">
                  <div class="text-body-1">
                    {{ order[0].date.substring(10, 0) }}
                  </div>

                  <div class="text-body-1">
                    Стоимость: {{ totalPrice(order) }}
                  </div>

                  <div
                    v-if="order[0].payment == 'Оплачен'"
                    class="text-body-1 text-green text-uppercase">
                    Статус оплаты: {{ order[0].payment }}
                  </div>
                  <div
                    v-else-if="order[0].payment == 'Не оплачен'"
                    class="text-body-1 text-red text-uppercase">
                    Статус оплаты: {{ order[0].payment }}
                  </div>

                  <div
                    v-if="order[0].status == 'Новый'"
                    class="text-body-1 text-green text-uppercase">
                    Статус: {{ order[0].status }}
                  </div>
                  <div
                    v-else-if="order[0].status == 'Завершен'"
                    class="text-body-1 text-red text-uppercase">
                    Статус: {{ order[0].status }}
                  </div>
                  <div v-else class="text-body-1 text-yellow text-uppercase">
                    Статус: {{ order[0].status }}
                  </div>
                </div>
              </v-col>
              <v-col class="d-flex justify-center">
                <v-btn @click="selectOrder(order)" color="primary">
                  Подробнее
                </v-btn>
                <v-dialog v-model="dialogOrder" width="auto">
                  <v-order-info
                    :orderProducts="orderProducts"
                    @closeDialogOrder="closeDialogOrder"></v-order-info>
                </v-dialog>
              </v-col>
            </v-row>
          </v-card-item>
        </v-card>
      </div>
    </div>
    <v-btn @click="dialogAddOrder = true" color="green" class="my-3 w-100"
      >Добавить</v-btn
    >
    <v-dialog v-model="dialogAddOrder" width="600">
      <v-order-add-form
        :selectedUser="selectedUser"
        :products="products"
        :users="users"
        :payments="payments"
        :sales="sales"
        :orderStatuses="orderStatuses"
        @loadOrders="loadOrders"
        @refreshUserOrders="refreshUserOrders">
      </v-order-add-form>
    </v-dialog>
  </div>
</template>

<script>
import { computed, onMounted, ref, toRefs } from "vue";
import { useStore } from "vuex";
import VOrderInfo from "./VOrderInfo.vue";
import VOrderAddForm from "../../components/Admin/Forms/OrderForms/VOrderAddForm.vue";

export default {
  components: { VOrderInfo, VOrderAddForm },

  props: {
    selectedUser: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },

  setup(props) {
    const store = useStore();
    const userOrders = computed(() => store.state.user.userOrders);
    const { selectedUser } = toRefs(props);

    const dialogOrder = ref(false);
    const dialogAddOrder = ref(false);
    const selectedOrder = ref();
    const orderProducts = ref([]);

    const sales = computed(() => store.state.sale.sales);
    const payments = computed(() => store.state.payment.payments);
    const orderStatuses = computed(() => store.state.orderStatus.orderStatuses);
    const users = computed(() => store.state.user.users);
    const products = computed(() => store.state.product.products);

    onMounted(() => {
      loadOrderData();
    });

    const refreshUserOrders = () => {
      store.dispatch("user/GET_USER_ORDERS_FROM_API", {
        id: selectedUser.value.id,
      });
    };

    const totalPrice = (order) => {
      var totalPrice = 0;
      for (let product of order) {
        totalPrice += Number(product.product.price);
      }
      return totalPrice;
    };

    const closeDialogOrder = () => {
      dialogOrder.value = !dialogOrder.value;
      selectedOrder.value = [];
    };

    const loadOrderData = () => {
      store.dispatch("material/GET_MATERIALS_FROM_API");
      store.dispatch("product/GET_PRODUCTS_FROM_API");
      store.dispatch("furniture/GET_FURNITURES_FROM_API");
      store.dispatch("size/GET_SIZES_FROM_API");
      store.dispatch("cut/GET_CUTS_FROM_API");
      store.dispatch("color/GET_COLORS_FROM_API");
      store.dispatch("category/GET_CATEGORIES_FROM_API");
      store.dispatch("payment/GET_PAYMENTS_FROM_API");
      store.dispatch("sale/GET_SALES_FROM_API");
      store.dispatch("orderStatus/GET_ORDERSTATUSES_FROM_API");
    };

    const selectOrder = (order) => {
      dialogOrder.value = !dialogOrder.value;
      selectedOrder.value = order;
      orderProducts.value = order;
    };

    return {
      userOrders,
      totalPrice,
      closeDialogOrder,
      selectOrder,
      orderProducts,
      dialogOrder,
      dialogAddOrder,
      users,
      sales,
      payments,
      orderStatuses,
      products,
      refreshUserOrders,
    };
  },
};
</script>

<style></style>
