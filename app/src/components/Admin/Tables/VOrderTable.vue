<template>
  <v-layout class="d-flex flex-column">
    <v-row align="center">
      <v-col cols="10">
        <v-sheet>
          <v-text-field
            @input="searchOrders"
            v-model="searchValue"
            label="Поиск..."
            single-line
            hide-details
            variant="solo"
          >
          </v-text-field>
        </v-sheet>
      </v-col>
      <v-col class="text-center">
        <v-card color="primary">
          <v-card-item>
            <h4>КОЛИЧЕСТВО</h4>
            <div class="text-body-1">
              {{ countOrders }}
            </div>
          </v-card-item>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-table height="770" class="overflow-auto border rounded">
          <thead>
            <tr>
              <th
                v-for="header in tableHeaders"
                :key="header.id"
                class="text-left text-body-1"
              >
                {{ header.title }}
                <v-icon
                  @click="sortOrders(header.key)"
                  icon="mdi-swap-vertical"
                  class="border rounded mx-3"
                ></v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in filteredOrders"
              :key="order.id"
              @click="selectOrder(order)"
              :class="{ 'bg-blue': isSelected && selectedOrder == order }"
            >
              <td class="text-body-1">{{ order.id }}</td>
              <td class="text-body-1">{{ order.user.fio }}</td>
              <td class="text-body-1">{{ order.payment.type }}</td>
              <td class="text-body-1">{{ order.sale.name }}</td>
              <td class="text-body-1">
                {{ order.order_status.name }}
              </td>
              <td class="text-body-1">{{ order.date.substring(0, 10) }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { computed, onUpdated, ref, toRefs } from "vue";
import { useStore } from "vuex";

export default {
  props: {
    orders: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const { orders } = toRefs(props);
    const store = useStore();

    const selectedOrder = ref();

    const filteredOrders = ref([]);

    const countOrders = computed(() => store.state.order.orders.count);
    const searchValue = ref();
    const tableHeaders = [
      { id: 1, title: "#", key: "id" },
      { id: 2, title: "Пользователь", key: "user.fio" },
      { id: 3, title: "Оплата", key: "payment.type" },
      { id: 4, title: "Скидка", key: "sale.name" },
      { id: 5, title: "Статус", key: "order_status.name" },
      { id: 5, title: "Дата", key: "date" },
    ];

    onUpdated(() => {
      filteredOrders.value = orders.value.rows;
    });

    const selectOrder = (order) => {
      emit("selectOrder", order);
    };

    const searchOrders = () => {
      filteredOrders.value = orders.value.rows.filter((i) =>
        i.user.fio.toLowerCase().includes(searchValue.value)
      );
      countOrders.value = filteredOrders.value.length;
    };

    const sortOrders = (key) => {
      return filteredOrders.value.sort(function (a, b) {
        let k = key;
        if (a[k] > b[k]) {
          return 1;
        }
        if (a[k] < b[k]) {
          return -1;
        }
        return 0;
      });
    };

    return {
      tableHeaders,
      searchValue,
      searchOrders,
      countOrders,
      selectOrder,
      selectedOrder,
      filteredOrders,
      sortOrders,
    };
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";

tbody tr:hover {
  @include hover;
}

th i:hover {
  @include hover;
  color: white;
}
</style>
