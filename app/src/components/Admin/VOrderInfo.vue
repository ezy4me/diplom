<template>
  <v-sheet max-width="1000">
    <div class="d-flex flex-column">
      <v-card v-for="order in orderProducts" :key="order.id" class="ma-3 pa-3">
        <v-row>
          <v-col>
            <v-img
              class="align-end border"
              :src="'http://localhost:5000/' + order.product.image"
              width="400"
              cover>
            </v-img>
          </v-col>
          <v-col>
            <v-card-title>{{ order.product.name }}</v-card-title>
            <div class="text-body-1 my-3">
              <span class="font-weight-bold">Размер:</span>
              {{ order.product.size }}
            </div>
            <div>
              <span class="font-weight-bold">Стоимость:</span>
              {{ order.product.price }} руб.
            </div>
            <div class="text-body-1 my-3">
              <span class="font-weight-bold">Крой:</span>
              {{ order.product.cut }}
            </div>
            <div class="text-body-1 my-3">
              <span class="font-weight-bold">Категория:</span>
              {{ order.product.category }}
            </div>
            <div
              v-for="material in order.product.material"
              :key="material.id"
              class="text-body-1 my-3">
              <span class="font-weight-bold">Материал:</span>
              {{ material.name }}
              <div
                class="border"
                :style="{
                  'background-color': material.color.hex,
                  width: '50px',
                  height: '50px',
                }"></div>
            </div>
            <div
              v-for="furniture in order.product.furniture"
              :key="furniture.id"
              class="text-body-1 my-3">
              <span class="font-weight-bold">Фурнитура:</span>
              {{ furniture.name }}
            </div>
            <div class="text-body-1 my-3">
              <span class="font-weight-bold">Описание:</span>
              {{ order.product.description }}
            </div>
          </v-col>
        </v-row>
      </v-card>
    </div>
    <v-card-actions>
      <v-btn color="primary" block @click="closeDialogOrder">Закрыть</v-btn>
    </v-card-actions>
  </v-sheet>
</template>

<script>
export default {
  props: {
    orderProducts: {
      type: Array,
      default: () => []
    },
  },
  setup(props, { emit }) {
    const closeDialogOrder = () => {
      emit("closeDialogOrder");
    };

    return {
      closeDialogOrder,
    };
  },
};
</script>