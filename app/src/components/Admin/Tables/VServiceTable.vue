<template>
  <v-layout class="d-flex flex-column">
    <v-row align="center">
      <v-col cols="10">
        <v-sheet>
          <v-text-field
            @input="searchServices"
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
              {{ countServices }}
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
                  @click="sortServices(header.key, header.type)"
                  icon="mdi-swap-vertical"
                  class="border rounded mx-3"
                ></v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="service in filteredServices"
              :key="service.id"
              @click="selectService(service)"
              :class="{ 'bg-blue': isSelected && selectedService == service }"
            >
              <td class="text-body-1">{{ service.id }}</td>
              <td class="text-body-1">{{ service.name }}</td>
              <td width="200" class="text-body-1">{{ service.price }} ₽</td>
              <td width="400" class="text-body-1">{{ service.description }}</td>
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
    services: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const { services } = toRefs(props);
    const store = useStore();

    const selectedService = ref();

    const filteredServices = ref([]);

    const countServices = computed(() => store.state.service.services.count);
    const searchValue = ref();
    const tableHeaders = [
      { id: 1, title: "#", key: "id", type: "number" },
      { id: 2, title: "Название", key: "name", type: "string" },
      { id: 3, title: "Стоимость", key: "price", type: "number" },
      { id: 4, title: "Описание", key: "description", type: "string" },
    ];

    onUpdated(() => {
      filteredServices.value = services.value.rows;
    });

    const selectService = async (service) => {
      emit("selectService", service);
    };

    
    const searchServices = () => {
      filteredServices.value = services.value.rows.filter(
        (i) =>
          i.name.toLowerCase().includes(searchValue.value) ||
          i.price.includes(searchValue.value) ||
          i.description.toString().toLowerCase().includes(searchValue.value)
      );
      countServices.value = filteredServices.value.length;
    };

    const sortServices = (key, type) => {
      if(type == "string")
      {
        return filteredServices.value.sort(function (a, b) {
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
        return filteredServices.value.sort(
          (a, b) => parseFloat(a[key]) - parseFloat(b[key])
        );
      }
      
    };

    return {
      tableHeaders,
      searchValue,
      searchServices,
      countServices,
      selectService,
      selectedService,
      filteredServices,
      sortServices,
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
