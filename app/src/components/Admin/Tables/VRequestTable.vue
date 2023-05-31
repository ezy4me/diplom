<template>
  <v-layout class="d-flex flex-column">
    <v-row align="center">
      <v-col cols="10">
        <v-sheet>
          <v-text-field
            @input="searchRequests"
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
              {{ countRequests }}
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
                  @click="sortRequests(header.key)"
                  icon="mdi-swap-vertical"
                  class="border rounded mx-3"
                ></v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="request in filteredRequests"
              :key="request.id"
              @click="selectRequest(request)"
              :class="{ 'bg-blue': isSelected && selectedRequest == request }"
            >
              <td class="text-body-1">{{ request.id }}</td>
              <td class="text-body-1">{{ request.name }}</td>
              <td class="text-body-1">{{ request.email }}</td>
              <td class="text-body-1">{{ request.phone }}</td>
              <td class="text-body-1">{{ request.description }}</td>
              <td class="text-body-1">{{ request.requestType.name }}</td>
              <td class="text-body-1">{{ request.requestStatus.name }}</td>
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
    requests: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const { requests } = toRefs(props);
    const store = useStore();

    const selectedRequest = ref();

    const filteredRequests = ref([]);

    const countRequests = computed(() => store.state.request.requests.count);
    const searchValue = ref();
    const tableHeaders = [
      { id: 1, title: "#", key: "id" },
      { id: 2, title: "Имя", key: "name" },
      { id: 3, title: "Почта", key: "email" },
      { id: 4, title: "Телефон", key: "phone" },
      { id: 5, title: "Комментарий", key: "description" },
      { id: 6, title: "Тема", key: "requestType.name" },
      { id: 7, title: "Статус", key: "requestStatus.name" },
    ];

    onUpdated(() => {
      filteredRequests.value = requests.value.rows;
    });

    const selectRequest = async (request) => {
      emit("selectRequest", request);
    };

    const searchRequests = () => {
      filteredRequests.value = requests.value.rows.filter(
        (i) =>
          i.name.toLowerCase().includes(searchValue.value) ||
          i.email.toLowerCase().includes(searchValue.value) ||
          i.phone.toString().toLowerCase().includes(searchValue.value)
      );
      countRequests.value = filteredRequests.value.length;
    };

    const sortRequests = (key) => {
      return filteredRequests.value.sort(function (a, b) {
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
      searchRequests,
      countRequests,
      selectRequest,
      selectedRequest,
      filteredRequests,
      sortRequests,
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
