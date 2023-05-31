<template>
  <v-container fluid class="h-100">
    <v-row>
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Материалы</h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn @click="dialog = true" color="green" class="my-3 w-100"
                >Добавить</v-btn
              >
            </v-sheet>
          </v-col>
          <v-dialog v-model="dialog" width="600">
            <v-material-add-form
              :selectedMaterial="selectedMaterial"
              :materialColors="materialColors"
              @loadMaterials="loadMaterials"
            > 
            </v-material-add-form>
          </v-dialog>
        </v-row>
        <v-material-table :materials="materials" @selectMaterial="selectMaterial">
        </v-material-table>
      </v-col>
      <transition>
        <v-col v-if="isSelected" cols="4" class="border rounded">
          <div class="d-flex flex-column">
            <div class="d-flex align-center justify-end my-3 pa-2 bg-primary rounded">
              <v-icon @click="closeInfo" icon="mdi-close" class="text-h6"></v-icon>
            </div>
            <v-material-edit-form
              :selectedMaterial="selectedMaterial"
              :materialColors="materialColors"
              @loadMaterials="loadMaterials"
            >
            </v-material-edit-form>
            <v-btn @click="deleteMaterial" color="red" class="my-3">Удалить</v-btn>
            <input type="material" class="w-100" />
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VMaterialEditForm from "../../components/Admin/Forms/MaterialForms/VMaterialEditForm.vue";
import VMaterialTable from "../../components/Admin/Tables/VMaterialTable.vue";
import VMaterialAddForm from "../../components/Admin/Forms/MaterialForms/VMaterialAddForm.vue";

export default {
  components: { VMaterialEditForm, VMaterialTable, VMaterialAddForm },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);

    const materials = computed(() => store.state.material.materials);
    const colors = computed(() => store.state.color.colors);

    const selectedMaterial = ref();
    const materialColors = ref();
    const selectedMaterialColor = ref();

    onMounted(() => {
      loadColors();
      loadMaterials();
    });

    const selectMaterial = (material) => {
      selectedMaterial.value = material;

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
      selectedMaterialColor.value = materialColors.value
        .filter((c) => c.id == selectedMaterial.value.colorId)
        .map((c) => c.name)
        .toString();
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const loadMaterials = () => {
      store.dispatch("material/GET_MATERIALS_FROM_API");
    };

    const loadColors = () => {
      store.dispatch("color/GET_COLORS_FROM_API").then(() => {
        materialColors.value = colors.value.rows;
      });
    };

    const deleteMaterial = () => {
      store
        .dispatch("material/DELETE_MATERIAL", {
          id: selectedMaterial.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadMaterials();
        });
    };

    return {
      materials,
      selectMaterial,
      selectedMaterial,
      closeInfo,
      isSelected,
      dialog,
      deleteMaterial,
      colors,
      loadColors,
      loadMaterials,
      materialColors,
      selectedMaterialColor,
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
