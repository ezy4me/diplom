<template>
  <v-layout class="d-flex flex-column">
    <v-row align="center">
      <v-col cols="10">
        <v-sheet>
          <v-text-field
            @input="searchColors"
            v-model="searchValue"
            label="Поиск..."
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
              {{ countColors }}
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
                  @click="sortColors(header.key)"
                  icon="mdi-swap-vertical"
                  class="border rounded mx-3"
                ></v-icon>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="color in filteredColors"
              :key="color.id"
              @click="selectColor(color)"
              :class="{ 'bg-blue': isSelected && selectedColor == color }"
            >
              <td class="text-body-1">{{ color.id }}</td>
              <td class="text-body-1">{{ color.name }}</td>
              <td class="text-body-1">{{ color.hex }}</td>
              <td class="text-body-1 py-1">
                <div
                  class="pallete border"
                  :style="{ 'background-color': color.hex }"
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
    colors: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const { colors } = toRefs(props);
    const store = useStore();

    const selectedColor = ref();

    const filteredColors = ref([]);

    const countColors = computed(() => store.state.color.colors.count);
    const searchValue = ref();
    const tableHeaders = [
      { id: 1, title: "#", key: "id" },
      { id: 2, title: "Название", key: "name" },
      { id: 3, title: "HEX", key: "hex" },
    ];

    onUpdated(() => {
      filteredColors.value = colors.value.rows;
    });

    const selectColor = async (color) => {
      emit("selectColor", color);
    };

    const searchColors = () => {
      filteredColors.value = colors.value.rows.filter(
        (i) =>
          i.name.toLowerCase().includes(searchValue.value) ||
          i.hex.toLowerCase().includes(searchValue.value)
      );
      countColors.value = colors.value.count;
    };

    const sortColors = (key) => {
      return filteredColors.value.sort(function (a, b) {
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
      searchColors,
      countColors,
      selectColor,
      selectedColor,
      filteredColors,
      sortColors,
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
