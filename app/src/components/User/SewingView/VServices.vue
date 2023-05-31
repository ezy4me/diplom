<template>
  <div class="services">
    <div class="title services__title">{{ category }} изделий</div>
    <div class="services__list">
      <div v-for="service in services" v-show="service.name.startsWith(category)" :key="service.id" class="services__item">
        <div class="services__item-body">
          <div class="services__item-img">
            <img :src="'http://localhost:5000/' + service.image" />
          </div>
          <div>
            <div class="services__item-title">
              {{ service.name }}
            </div>
            <div class="services__item-desc">
              {{ service.description }}
            </div>
          </div>
        </div>
        <div class="services__item-price">от {{ service.price }}₽</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  props: {
    category: String,
  },
  setup() {
    const store = useStore();
    let services = computed(() => store.state.service.services.rows);

    return {
        services,
    };
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";
.services {
  margin-top: 4rem;

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto;
    gap: 2rem;
  }

  &__item {
    @include flex-space-between;
    @include border-all(1px, solid, $border-color);
    padding: 1rem;
    gap: 1rem;
  }

  &__item-body {
    @include flex-center;
    gap: 1rem;
  }

  &__item-img img {
    width: 100px;
    @include border-3d;
    border-radius: 100%;
  }

  &__item-title {
    @include font-size(20, normal, 1.2);
  }

  &__item-desc {
    @include font-size(16, normal, 1.2);
  }

  &__item-price {
    min-width: 80px;
    @include font-size(18, normal, 1.2);
  }
}
</style>
