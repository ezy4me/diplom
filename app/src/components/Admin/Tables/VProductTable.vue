<template>
  <v-layout class="d-flex flex-column">
    <v-row align="center">
      <v-col cols="10">
        <v-sheet>
          <v-text-field
            @input="searchProducts"
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
              {{ countProducts }}
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
                  @click="sortProducts(header.key, header.type)"
                  icon="mdi-swap-vertical"
                  class="border rounded mx-3"
                ></v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="product in filteredProducts"
              :key="product.id"
              @click="selectProduct(product)"
              :class="{ 'bg-blue': isSelected && selectedProduct == product }"
            >
              <td class="text-body-1">{{ product.id }}</td>
              <td class="text-body-1">{{ product.name }}</td>
              <td class="text-body-1">{{ product.price }} ₽</td>
              <td class="text-body-1">{{ product.count }}</td>
              <td class="text-body-1">{{ product.cut.name }}</td>
              <td class="text-body-1">{{ product.category.name }}</td>
              <td class="text-body-1">{{ product.size.name }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import { onUpdated, ref, toRefs } from "vue";

export default {
  props: {
    products: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const { products } = toRefs(props);

    const selectedProduct = ref();

    const filteredProducts = ref([]);
    const countProducts = ref();

    const searchValue = ref();
    const tableHeaders = [
      { id: 1, title: "#", key: "id", type: "number" },
      { id: 2, title: "Название", key: "name", type: "string" },
      { id: 3, title: "Стоимость", key: "price", type: "number" },
      { id: 4, title: "Кол-во", key: "count", type: "number" },
      { id: 5, title: "Крой", key: "cut.name", type: "string" },
      { id: 6, title: "Категория", key: "category.name", type: "string" },
      { id: 7, title: "Размер", key: "size.name", type: "string" },
    ];

    onUpdated(() => {
      filteredProducts.value = products.value.rows;
      countProducts.value = products.value.rows.length;
    });

    const selectProduct = (product) => {
      emit("selectProduct", product);
    };

    const searchProducts = () => {
      filteredProducts.value = products.value.rows.filter(
        (i) =>
          i.name.toLowerCase().includes(searchValue.value) ||
          i.price.toLowerCase().includes(searchValue.value) ||
          i.size.name.toLowerCase().includes(searchValue.value) ||
          i.cut.name.toLowerCase().includes(searchValue.value) ||
          i.category.name.toLowerCase().includes(searchValue.value) ||
          i.count.toString().toLowerCase().includes(searchValue.value) ||
          i.description.toLowerCase().includes(searchValue.value)
      );
      countProducts.value = filteredProducts.value.length;
    };

    const sortProducts = (key, type) => {
      if (type == "string")
        return filteredProducts.value.sort(function (a, b) {
          if (a[key] > b[key]) {
            return 1;
          }
          if (a[key] < b[key]) {
            return -1;
          }
          return 0;
        });
      if (type == "number") {
        return filteredProducts.value.sort(
          (a, b) => parseFloat(a[key]) - parseFloat(b[key])
        );
      }
    };

    return {
      tableHeaders,
      searchValue,
      searchProducts,
      countProducts,
      selectProduct,
      selectedProduct,
      filteredProducts,
      sortProducts,
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
