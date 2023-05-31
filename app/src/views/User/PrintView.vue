<template>
  <div class="print-page">
    <div class="header__img">
      <div class="title header__title">Нанесение принтов</div>
      <div class="header__subtitle">
        ШЕЛКОГРАФИЯ, ЦИФРОВАЯ ПЕЧАТЬ, ТЕРМОТРАНСФЕР, СУБЛИМАЦИЯ
      </div>
    </div>
    <div class="print-page__container container">
      <v-services :category="'Принт'" />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import VServices from "../../components/User/SewingView/VServices.vue";

export default {
  name: "PrintView",

  components: { VServices },

  setup() {
    const store = useStore();

    onMounted(() => {
      store.dispatch("service/GET_SERVICES_FROM_API");
    });

    return {};
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.print-page {
  margin-top: 4rem;

  .header {
    &__img {
      height: 40vh;
      @include cover-background('"../../assets/images/print-bg.jpg"');
    }
  }

  .services {
    &__item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      border: 0;
    }

    &__item-body {
      @include flex-center-column;
    }

    &__item-desc {
      @include font-size(20, normal, 1.2);
      margin-top: 1rem;
    }

    &__item-title {
      @include font-size(24, normal, 1.2);
    }

    &__item-img img {
      width: 100%;
      height: 400px;
      border: 0;
      border-radius: 0;
    }

    &__item-price {
      @include font-size(24, normal, 1.2);
      text-align: center;
      @include border-direction("bottom", 5px, solid, $secondary);
      border-radius: 4px;
    }
  }
}
</style>
