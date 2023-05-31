<template>
  <!-- <div class="admin"> -->
  <v-container fluid class="h-100">
    <v-row class="h-25">
      <v-col>
        <v-card color="blue" class="card-gradient text-center h-100 d-flex justify-center align-center">
          <v-card-item>
            <v-card-title class="text-h4 pa-3"> НОВЫЕ ЗАЯВКИ </v-card-title>
            <v-card-text class="text-h3 my-10 font-weight-bold">
              {{ newRequests }}
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="blue" class="card-gradient text-center h-100 d-flex justify-center align-center">
          <v-card-item>
            <v-card-title class="text-h4 pa-3"> ПОЛЬЗОВАТЕЛИ </v-card-title>
            <v-card-text class="text-h3 my-10 font-weight-bold">
              {{ usersCount }}
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
      <v-col>
        <v-card color="blue" class=" card-gradient text-center h-100 d-flex justify-center align-center">
          <v-card-item>
            <v-card-title class="text-h4 pa-3"> АКТИВНЫЕ ЗАКАЗЫ </v-card-title>
            <v-card-text class="text-h3 my-10 font-weight-bold">
              {{ activeOrders }}
            </v-card-text>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>

    <v-row class="h-75">
      <v-col>
        <v-card class="text-center pa-3 h-100 d-flex flex-column justify-space-between align-center">
          <v-card-item class="bg-blue w-100 rounded">
            <v-card-title class="text-h4 pa-3"> ОСТАТКИ ФУРНИТУР </v-card-title>
          </v-card-item>
            <v-furniture-pie></v-furniture-pie>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="text-center pa-3 h-100 d-flex flex-column justify-space-between align-center">
          <v-card-item class="bg-blue w-100 rounded">
            <v-card-title class="text-h4 pa-3"> ОСТАТКИ МАТЕРИАЛОВ </v-card-title>
          </v-card-item>
            <v-material-pie></v-material-pie>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- </div> -->
</template>

<script>
import store from "@/store";
import { computed, onMounted } from "vue";
import VMaterialPie from "@/components/Admin/Analiytics/VMaterialPie.vue"
import VFurniturePie from '../../components/Admin/Analiytics/VFurniturePie.vue';
export default {
  components: {VMaterialPie, VFurniturePie},
  setup() {
    const newRequests = computed(() => store.state.request.newRequests);
    const usersCount = computed(() => store.state.user.users.count);
    const activeOrders = computed(() => store.state.order.activeOrders);

    onMounted(() => {
      store.dispatch("request/GET_REQUESTS_FROM_API");
      store.dispatch("user/GET_USERS_FROM_API");
      store.dispatch("order/GET_ORDERS_FROM_API");
    });
    return {
      newRequests,
      usersCount,
      activeOrders,
    };
  },
};
</script>

<style lang="scss" scoped>
.card-gradient {
  background: rgb(111, 0, 255);
  background: linear-gradient(
    90deg,
    rgba(111, 0, 255, 0.5018382352941176) 0%,
    rgba(107, 244, 255, 0.5) 100%
  );
}
</style>
