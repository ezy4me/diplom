<template>
  <div class="account">
    <div class="account__container container">
      <div class="title account__title">Личный кабинет</div>
      <div class="account-info">
        <div class="avatar">
          <div class="avatar__img">
            <img :src="require('../../assets/images/user.png')" alt="" />
          </div>
          <div class="avatar__info">
            <div class="avatar__title">{{ user.email }}</div>
            <div class="avatar__title avatar__orders">
              Количество заказов: {{ userOrders.length }}
            </div>
          </div>
        </div>
        <div class="orders">
          <div class="orders__list">
            <div
              v-for="order in userOrders"
              :key="order.id"
              class="orders__item">
              <div class="orders__item-title">
                Заказ # {{ order[0].orderId }}
              </div>
              <div class="orders__item-desc">{{ totalPrice(order) }} ₽</div>

              <div
                v-if="order[0].payment == 'Оплачен'"
                class="orders__item-status text-green text-uppercase">
                {{ order[0].payment }}
              </div>
              <div
                v-else-if="order[0].payment == 'Не оплачен'"
                class="orders__item-status text-red text-uppercase">
                {{ order[0].payment }}
              </div>

              <div
                v-if="order[0].status == 'Новый'"
                class="orders__item-status text-green text-uppercase">
                {{ order[0].status }}
              </div>
              <div
                v-else-if="order[0].status == 'Завершен'"
                class="orders__item-status text-red text-uppercase">
                {{ order[0].status }}
              </div>
              <div
                v-else
                class="orders__item-status text-yellow text-uppercase">
                {{ order[0].status }}
              </div>
              <v-btn color="blue" @click="showOrderInfo(order)"> Просмотр </v-btn>
            </div>
          </div>
        </div>
      </div>
      <div class="account__actions">
        <btn @click="logout" class="btn">Выйти</btn>
      </div>
    </div>

    <v-dialog v-model="dialog" width="auto">
      <v-order-info :orderProducts="selectedOrder"></v-order-info>
    </v-dialog>
  </div>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import VOrderInfo from "@/components/Admin/VOrderInfo.vue";
export default {
  components: {VOrderInfo},
  setup() {
    const store = useStore();
    const router = useRouter();
    const dialog = ref(false);
    const selectedOrder = ref();

    const userOrders = computed(() => store.state.user.userOrders);
    const user = computed(() => store.state.auth.user);
    const logout = () => {
      store.dispatch("auth/ON_LOGOUT").then(() => {
        router.push({ name: "home" });
      });
    };

    onMounted(() => {
      loadOrderData();
    });

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
      store.dispatch("user/GET_USER_ORDERS_FROM_API", {
        id: user.value.id,
      });
    };

    const totalPrice = (order) => {
      var totalPrice = 0;
      for (let product of order) {
        totalPrice += Number(product.product.price);
      }
      return totalPrice;
    };

    const showOrderInfo = (order) =>{
      selectedOrder.value = order
      dialog.value = true
    }

    return {
      logout,
      userOrders,
      totalPrice,
      user,
      dialog,
      selectedOrder,
      showOrderInfo
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.account {
  margin-top: 4rem;
  padding: 2rem;

  &__title {
    text-align: start;
    width: max-content;
  }

  &__actions {
    display: flex;
    justify-content: flex-end;
  }
}

.avatar {
  @include flex-start;
  gap: 1rem;
  &__img img {
    width: 100px;
  }

  &__info {
    @include flex-center-column;
  }

  &__title {
    font-size: 20px;
  }
}

.orders {
  &__list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 2rem 0;
    gap: 1rem;
  }

  &__item {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    padding: 1rem 0;
    @include flex-space-between;
  }

  &__item-title {
    font-size: 24px;
    font-weight: 500;
  }

  &__item-desc {
    font-size: 20px;
  }

  &__item-status {
    font-size: 20px;
  }
}
</style>
