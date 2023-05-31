<template>
  <v-container fluid class="h-100">
    <v-row>
      <v-col class="border rounded mr-3">
        <v-row class="align-center">
          <v-col cols="10">
            <h3 class="text-h4 font-weight-light">Изделия</h3>
          </v-col>
          <v-col>
            <v-sheet class="d-flex align-center justify-center">
              <v-btn @click="dialog = true" color="green" class="my-3 w-100"
                >Добавить</v-btn
              >
            </v-sheet>
          </v-col>
          <v-dialog v-model="dialog" width="600">
            <v-product-add-form
              :materials="materials"
              :furnitures="furnitures"
              :categories="categories"
              :sizes="sizes"
              :cuts="cuts"
              @loadProducts="loadProducts"
            >
            </v-product-add-form>
          </v-dialog>
        </v-row>

        <v-product-table :products="products" @selectProduct="selectProduct">
        </v-product-table>
      </v-col>
      <transition>
        <v-col v-if="isSelected" cols="3" class="border rounded">
          <div class="d-flex flex-column">
            <div class="d-flex align-center justify-end my-3 pa-2 bg-primary rounded">
              <v-icon @click="closeInfo" icon="mdi-close" class="text-h6"></v-icon>
            </div>
            <v-product-edit-form
            :selectedProduct="selectedProduct"
              :materials="materials"
              :furnitures="furnitures"
              :categories="categories"
              :sizes="sizes"
              :cuts="cuts"
              @loadProducts="loadProducts"
            >
            </v-product-edit-form>
            <v-btn @click="deleteProduct" color="red" class="my-3">Удалить</v-btn>
            <input type="product" class="w-100" />
          </div>
        </v-col>
      </transition>
    </v-row>
  </v-container>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import VProductAddForm from "../../components/Admin/Forms/ProductForms/VProductAddForm.vue";
import VProductTable from "../../components/Admin/Tables/VProductTable.vue";
import VProductEditForm from "../../components/Admin/Forms/ProductForms/VProductEditForm.vue";

export default {
  components: { VProductAddForm, VProductTable, VProductEditForm },
  setup() {
    const store = useStore();

    const isSelected = ref(false);
    const dialog = ref(false);

    const products = computed(() => store.state.product.products);
    const materials = computed(() => store.state.material.materials);
    const furnitures = computed(() => store.state.furniture.furnitures);
    const categories = computed(() => store.state.category.categories);
    const sizes = computed(() => store.state.size.sizes);
    const cuts = computed(() => store.state.cut.cuts);
    const colors = computed(() => store.state.color.colors);

    const selectedProduct = ref();

    onMounted(() => {
      loadProducts();
      loadMaterials();
      loadFurnitures();
      loadSizes();
      loadCuts();
      loadCategories();
    });

    const selectProduct = (product) => {
      selectedProduct.value = product;

      if (!isSelected.value) {
        isSelected.value = !isSelected.value;
      }
    };

    const closeInfo = () => {
      isSelected.value = !isSelected.value;
    };

    const loadProducts = () => {
      store.dispatch("product/GET_PRODUCTS_FROM_API");
    };

    const loadMaterials = () => {
      store.dispatch("material/GET_MATERIALS_FROM_API");
    };

    const loadFurnitures = () => {
      store.dispatch("furniture/GET_FURNITURES_FROM_API");
    };

    const loadSizes = () => {
      store.dispatch("size/GET_SIZES_FROM_API");
    };

    const loadCuts = () => {
      store.dispatch("cut/GET_CUTS_FROM_API");
    };

    const loadCategories = () => {
      store.dispatch("category/GET_CATEGORIES_FROM_API");
    };

    const deleteProduct = () => {
      store
        .dispatch("product/DELETE_PRODUCT", {
          id: selectedProduct.value.id,
        })
        .then(() => {
          isSelected.value = !isSelected.value;
          loadProducts();
        });
    };

    return {
      products,
      materials,
      furnitures,
      sizes,
      colors,
      cuts,
      categories,
      selectProduct,
      selectedProduct,
      closeInfo,
      isSelected,
      dialog,
      deleteProduct,
      loadProducts
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
