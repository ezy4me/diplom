<template>
  <v-container fluid>
    <v-row>
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Пользователи</h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn @click="dialog = true" color="green" class="my-3 w-100"
                >Добавить</v-btn
              >
            </v-sheet>
          </v-col>
          <v-dialog v-model="dialog" width="600">
            <v-user-add-form @loadUsers="loadUsers"></v-user-add-form>
          </v-dialog>
        </v-row>
        <v-user-table :users="users" @selectUser="selectUser"></v-user-table>
      </v-col>
      <transition>
        <v-col v-if="isSelected" cols="4" class="border rounded">
          <div class="d-flex flex-column">
            <div
              class="d-flex align-center justify-end my-3 pa-2 bg-primary rounded">
              <v-icon
                @click="closeInfo"
                icon="mdi-close"
                class="text-h6"></v-icon>
            </div>
            <div v-if="selectedUser" class="text-h6">
              <div class="d-flex flex-column">
                <div class="user__name text-h5 font-weight-light">
                  Пользователь: {{ selectedUser.fio }}
                </div>
                <div class="user__email text-h5 font-weight-light">
                  Почта: {{ selectedUser.email }}
                </div>
              </div>
              <v-user-orders :selectedUser="selectedUser"></v-user-orders>
            </div>
            <v-user-edit-form
              @loadUsers="loadUsers"
              :selectedUser="selectedUser"></v-user-edit-form>
            <v-btn color="red" @click="deleteUser" class="my-3">Удалить</v-btn>
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VUserAddForm from "../../components/Admin/Forms/UserForms/VUserAddForm.vue";
import VUserEditForm from "../../components/Admin/Forms/UserForms/VUserEditForm.vue";
import VUserTable from "../../components/Admin/Tables/VUserTable.vue";
import VUserOrders from "../../components/Admin/VUserOrders.vue";

export default {
  components: { VUserAddForm, VUserEditForm, VUserTable, VUserOrders },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);

    const users = computed(() => store.state.user.users);
    const selectedUser = ref();

    onMounted(() => {
      loadUsers();
    });

    const selectUser = async (user) => {
      selectedUser.value = user;

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
    };

    const loadUsers = () => {
      store.dispatch("user/GET_USERS_FROM_API");
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const deleteUser = () => {
      store
        .dispatch("user/DELETE_USER", {
          id: selectedUser.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadUsers();
        });
    };

    return {
      users,
      selectedUser,
      selectUser,
      isSelected,
      closeInfo,
      dialog,
      deleteUser,
      loadUsers,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
