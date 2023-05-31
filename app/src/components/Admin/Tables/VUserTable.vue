<template>
  <v-layout class="d-flex flex-column">
    <v-row align="center">
      <v-col cols="10">
        <v-sheet>
          <v-text-field
            @input="searchUsers"
            v-model="searchValue"
            label="Поиск..."
            hide-details
            variant="solo"
          >
          </v-text-field>
        </v-sheet>
      </v-col>
      <v-col class="text-center">
        <v-card color="primary" height="60` ">
          <v-card-item>
            <h4>КОЛИЧЕСТВО</h4>
            <div class="text-body-1">
              {{ countUsers }}
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
                  @click="sortUsers(header.key)"
                  icon="mdi-swap-vertical"
                  class="border rounded mx-3"
                ></v-icon>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in filteredUsers"
              :key="user.id"
              @click="selectUser(user)"
              :class="{ 'bg-blue': isSelected && selectedUser == user }"
            >
              <td class="text-body-1">{{ user.id }}</td>
              <td class="text-body-1">{{ user.email }}</td>
              <td class="text-body-1">{{ user.fio }}</td>
              <td class="text-body-1">{{ user.phone }}</td>
              <td class="text-body-1">{{ user.role }}</td>
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
    users: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  setup(props, { emit }) {
    const { users } = toRefs(props);
    const store = useStore();

    const selectedUser = ref()

    const filteredUsers = ref([]);

    const countUsers = computed(() => store.state.user.users.count);
    const searchValue = ref();
    const tableHeaders = [
      { id: 1, title: "#", key: "id" },
      { id: 2, title: "Email", key: "email" },
      { id: 3, title: "Ф. И. О.", key: "fio" },
      { id: 4, title: "Телефон", key: "phone" },
      { id: 5, title: "Роль", key: "role" },
    ];

    onUpdated(() => {
      filteredUsers.value = users.value.rows;
    });

    const selectUser = async (user) => {
      await store
        .dispatch("user/GET_USER_ORDERS_FROM_API", {
          id: user.id,
        })
        .then(() => {
          emit("selectUser", user);
        });
    };

    const searchUsers = () => {
      filteredUsers.value = users.value.rows.filter(
        (i) =>
          i.email.toLowerCase().includes(searchValue.value) ||
          i.fio.toLowerCase().includes(searchValue.value) ||
          i.phone.toLowerCase().includes(searchValue.value)
      );
      countUsers.value = users.value.count;
    };

    const sortUsers = (key) => {
      return filteredUsers.value.sort(function (a, b) {
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
      searchUsers,
      countUsers,
      selectUser,
      selectedUser,
      filteredUsers,
      sortUsers,
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
