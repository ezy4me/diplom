<template>
  <v-container fluid class="h-100">
    <v-row>
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Цвета</h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn @click="dialog = true" color="green" class="my-3 w-100"
                >Добавить</v-btn
              >
            </v-sheet>
          </v-col>
          <v-dialog v-model="dialog" width="600">
            <v-color-add-form @loadColors="loadColors"> </v-color-add-form>
          </v-dialog>
        </v-row>
        <v-colors-table :colors="colors" @selectColor="selectColor">
        </v-colors-table>
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
            <v-color-edit-form
              :selectedColor="selectedColor"
              @loadColors="loadColors">
            </v-color-edit-form>
            <v-btn @click="deleteColor" color="red" class="my-3">Удалить</v-btn>
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VColorsTable from "../../components/Admin/Tables/VColorsTable.vue";
import VColorEditForm from "../../components/Admin/Forms/ColorForms/VColorEditForm.vue";
import VColorAddForm from "../../components/Admin/Forms/ColorForms/VColorAddForm.vue";

export default {
  components: { VColorsTable, VColorEditForm, VColorAddForm },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);

    const colors = computed(() => store.state.color.colors);

    const selectedColor = ref();

    const loadColors = () => {
      store.dispatch("color/GET_COLORS_FROM_API");
    };

    onMounted(() => {
      loadColors();
    });

    const selectColor = async (color) => {
      selectedColor.value = color;

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
    };

    const closeDialog = () => {
      dialog.value = !dialog.value;
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const deleteColor = () => {
      store
        .dispatch("color/DELETE_COLOR", {
          id: selectedColor.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadColors();
        });
    };

    return {
      colors,
      selectColor,
      selectedColor,
      closeInfo,
      closeDialog,
      isSelected,
      dialog,
      deleteColor,
      loadColors,
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
