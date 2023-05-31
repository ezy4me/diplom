<template>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Заявки</h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn :disabled="true" color="green" class="my-3 w-100"
                ></v-btn
              >
            </v-sheet>
          </v-col>
          <!-- <v-dialog v-model="dialog" width="600">
            <v-request-add-form @loadRequests="loadRequests"></v-request-add-form>
          </v-dialog> -->
        </v-row>
        <v-request-table :requests="requests" @selectRequest="selectRequest">
        </v-request-table>
      </v-col>
      <transition>
        <v-col v-if="isSelected" cols="3" class="border rounded">
          <div class="d-flex flex-column">
            <div class="d-flex align-center justify-end my-3 pa-2 bg-primary rounded">
              <v-icon @click="closeInfo" icon="mdi-close" class="text-h6"></v-icon>
            </div>
            <h5 class="text-h6">
                Пользователь: {{ selectedRequest.name }}
            </h5>
            <h5 class="text-h6">
                Телефон: {{ selectedRequest.phone }}
            </h5>
            <h5 class="text-h6">
                Почта: {{ selectedRequest.email }}
            </h5>
            <h5 class="text-h6">
                Тема заявки: {{ selectedRequest.requestType.name }}
            </h5>
            <v-btn @click="addNewUser" color="green" class="my-3">Создать учетную запись</v-btn>
            <v-request-edit-form
              :selectedRequest="selectedRequest"
              :requestStatuses="requestStatuses"
              @loadRequests="loadRequests"
            >
            </v-request-edit-form>
            <v-btn @click="deleteRequest" color="red" class="my-3">Удалить</v-btn>
            <input type="request" class="w-100" />
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VRequestEditForm from "../../components/Admin/Forms/RequestForms/VRequestEditForm.vue";
import VRequestTable from "../../components/Admin/Tables/VRequestTable.vue";

export default {
  components: {  VRequestTable, VRequestEditForm },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);

    const requests = computed(() => store.state.request.requests);
    const requestStatuses = computed(() => store.state.request.requestStatuses);
    const colors = computed(() => store.state.color.colors);

    const selectedRequest = ref();

    onMounted(() => {
      loadRequests();
    });

    const selectRequest = (request) => {
      selectedRequest.value = request;

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const loadRequests = () => {
      store.dispatch("request/GET_REQUESTS_FROM_API");
      store.dispatch("request/GET_REQUEST_STATUSES_FROM_API");
    };

    const deleteRequest = () => {
      store
        .dispatch("request/DELETE_FURNITURE", {
          id: selectedRequest.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadRequests();
        });
    };

    const addNewUser = () => {
      store
          .dispatch("user/ADD_USER", {
            email: selectedRequest.value.email,
            password: selectedRequest.value.email,
            fio: selectedRequest.value.name,
            phone: selectedRequest.value.phone,
          })
          .then(() => {
            alert("Учетная запись создана!");
          });
    }

    return {
      requests,
      selectRequest,
      selectedRequest,
      requestStatuses,

      closeInfo,
      isSelected,
      dialog,
      deleteRequest,
      colors,
      addNewUser,
      loadRequests
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.pallete {
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

tbody tr:hover {
  @include hover;
}

th i:hover {
  @include hover;
  color: white;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
