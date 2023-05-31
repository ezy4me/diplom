<template>
  <v-layout class="d-flex flex-column">
    <v-row align="center">
      <v-col cols="10">
        <v-sheet>
          <v-text-field
            @input="searchFurnitures"
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
              {{ countFurnitures }}
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
                  @click="sortFurnitures(header.key, header.type)"
                  icon="mdi-swap-vertical"
                  class="border rounded mx-3"
                ></v-icon>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="furniture in filteredFurnitures"
              :key="furniture.id"
              @click="selectFurniture(furniture)"
              :class="{ 'bg-blue': isSelected && selectedFurniture == furniture }"
            >
              <td class="text-body-1">{{ furniture.id }}</td>
              <td class="text-body-1">{{ furniture.name }}</td>
              <td class="text-body-1">{{ furniture.price }} ₽</td>
              <td class="text-body-1">{{ furniture.count }}</td>
              <td class="text-body-1">
                {{ furniture.color.name }}
              </td>
              <td class="text-body-1 py-1">
                <div
                  class="pallete border"
                  :style="{
                    'background-color': furniture.color.hex,
                  }"
                ></div>
              </td>
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
    furnitures: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const { furnitures } = toRefs(props);
    const store = useStore();

    const selectedFurniture = ref();

    const filteredFurnitures = ref([]);

    const countFurnitures = computed(() => store.state.furniture.furnitures.count);
    const searchValue = ref();
    const tableHeaders = [
      { id: 1, title: "#", key: "id", type: "number" },
      { id: 2, title: "Название", key: "name", type: "string" },
      { id: 3, title: "Стоимость", key: "price", type: "number" },
      { id: 4, title: "Кол-во", key: "count", type: "number" },
      { id: 5, title: "Цвет", key: "colorId", type: "string" },
    ];

    onUpdated(() => {
      filteredFurnitures.value = furnitures.value.rows;
    });

    const selectFurniture = async (furniture) => {
      emit("selectFurniture", furniture);
    };

    const searchFurnitures = () => {
      filteredFurnitures.value = furnitures.value.rows.filter(
        (i) =>
          i.name.toLowerCase().includes(searchValue.value) ||
          i.price.toLowerCase().includes(searchValue.value) ||
          i.count.toString().toLowerCase().includes(searchValue.value) ||
          i.color.name.toString().toLowerCase().includes(searchValue.value)
      );
      countFurnitures.value = filteredFurnitures.value.length;
    };

    const sortFurnitures = (key, type) => {
      if (type == "string") {
        return filteredFurnitures.value.sort(function (a, b) {
          let k = key;
          if (a[k] > b[k]) {
            return 1;
          }
          if (a[k] < b[k]) {
            return -1;
          }
          return 0;
        });
      }

      if (type == "number") {
        return filteredFurnitures.value.sort(
          (a, b) => parseFloat(a[key]) - parseFloat(b[key])
        );
      }
    };

    return {
      tableHeaders,
      searchValue,
      searchFurnitures,
      countFurnitures,
      selectFurniture,
      selectedFurniture,
      filteredFurnitures,
      sortFurnitures,
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
