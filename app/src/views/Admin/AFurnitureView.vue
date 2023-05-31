<template>
  <v-container fluid class="h-100">
    <v-row>
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Фурнитуры </h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn @click="dialog = true" color="green" class="my-3 w-100"
                >Добавить</v-btn
              >
            </v-sheet>
          </v-col>
          <v-dialog v-model="dialog" width="600">
            <v-furniture-add-form
              :selectedFurniture="selectedFurniture"
              :furnitureColors="furnitureColors"
              @loadFurnitures="loadFurnitures"
            >
            </v-furniture-add-form>
          </v-dialog>
        </v-row>
        <v-furniture-table :furnitures="furnitures" @selectFurniture="selectFurniture">
        </v-furniture-table>
      </v-col>
      <transition>
        <v-col v-if="isSelected" cols="4" class="border rounded">
          <div class="d-flex flex-column">
            <div class="d-flex align-center justify-end my-3 pa-2 bg-primary rounded">
              <v-icon @click="closeInfo" icon="mdi-close" class="text-h6"></v-icon>
            </div>
            <v-furniture-edit-form
              :selectedFurniture="selectedFurniture"
              :furnitureColors="furnitureColors"
              @loadFurnitures="loadFurnitures"
            >
            </v-furniture-edit-form>
            <v-btn @click="deleteFurniture" color="red" class="my-3">Удалить</v-btn>
            <input type="furniture" class="w-100" />
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VFurnitureEditForm from "../../components/Admin/Forms/FurnitureForms/VFurnitureEditForm.vue";
import VFurnitureTable from "../../components/Admin/Tables/VFurnitureTable.vue";
import VFurnitureAddForm from "../../components/Admin/Forms/FurnitureForms/VFurnitureAddForm.vue";

export default {
  components: { VFurnitureEditForm, VFurnitureTable, VFurnitureAddForm },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);

    const furnitures = computed(() => store.state.furniture.furnitures);
    const colors = computed(() => store.state.color.colors);

    const selectedFurniture = ref();
    const furnitureColors = ref();
    const selectedFurnitureColor = ref();

    onMounted(() => {
      loadColors();
      loadFurnitures();
    });

    const selectFurniture = (furniture) => {
      selectedFurniture.value = furniture;

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
      selectedFurnitureColor.value = furnitureColors.value
        .filter((c) => c.id == selectedFurniture.value.colorId)
        .map((c) => c.name)
        .toString();
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const loadFurnitures = () => {
      store.dispatch("furniture/GET_FURNITURES_FROM_API");
    };

    const loadColors = () => {
      store.dispatch("color/GET_COLORS_FROM_API").then(() => {
        furnitureColors.value = colors.value.rows;
      });
    };

    const deleteFurniture = () => {
      store
        .dispatch("furniture/DELETE_FURNITURE", {
          id: selectedFurniture.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadFurnitures();
        });
    };

    return {
      furnitures,
      selectFurniture,
      selectedFurniture,
      closeInfo,
      isSelected,
      dialog,
      deleteFurniture,
      colors,
      loadColors,
      loadFurnitures,
      furnitureColors,
      selectedFurnitureColor,
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
