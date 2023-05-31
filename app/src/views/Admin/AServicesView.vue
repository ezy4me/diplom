<template>
  <v-container fluid class="h-100">
    <v-row class="h-100">
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Услуги</h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn @click="dialog = true" color="green" class="my-3 w-100"
                >Добавить</v-btn
              >
            </v-sheet>
          </v-col>
          <v-dialog v-model="dialog" width="600">
            <v-service-add-form @loadServices="loadServices"></v-service-add-form>
          </v-dialog>
        </v-row>
        <v-service-table :services="services" @selectService="selectService">
        </v-service-table>
      </v-col>
      <transition>
        <v-col v-if="isSelected" cols="4" class="border rounded">
          <div class="d-flex flex-column">
            <div class="d-flex align-center justify-end my-3 pa-2 bg-primary rounded">
              <v-icon @click="closeInfo" icon="mdi-close" class="text-h6"></v-icon>
            </div>
            <v-service-edit-form
              :selectedService="selectedService"
              @loadServices="loadServices"
            >
            </v-service-edit-form>
            <v-btn @click="deleteService" color="red" class="my-3">Удалить</v-btn>
            <input type="service" class="w-100" />
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VServiceAddForm from "../../components/Admin/Forms/ServiceForms/VServiceAddForm.vue";
import VServiceEditForm from "../../components/Admin/Forms/ServiceForms/VServiceEditForm.vue";
import VServiceTable from "../../components/Admin/Tables/VServiceTable.vue";

export default {
  components: { VServiceAddForm, VServiceEditForm, VServiceTable },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);

    const services = computed(() => store.state.service.services);
    const colors = computed(() => store.state.color.colors);

    const selectedService = ref();

    onMounted(() => {
      loadServices();
    });

    const selectService = (service) => {
      selectedService.value = service;

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const loadServices = () => {
      store.dispatch("service/GET_SERVICES_FROM_API");
    };

    const deleteService = () => {
      store
        .dispatch("service/DELETE_SERVICE", {
          id: selectedService.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadServices();
        });
    };

    return {
      services,
      selectService,
      selectedService,
      closeInfo,
      isSelected,
      dialog,
      deleteService,
      colors,
      loadServices
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
