<template>
  <div class="colors">
    <div class="title colors__title">Обширный ассортимент цветов</div>
    <div class="colors__preview">
      <div v-for="color in colors" :key="color.id" class="color">
        <div
          class="color__hex"
          :style="{ 'background-color': color.hex }"></div>
        <div class="color__name">{{ color.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();
    const colors = computed(() => store.state.color.colors.rows);

    return {
      colors,
    };
  },
};
</script>

<style lang="scss">
.colors {
  margin-top: 4rem;
  &__preview {
    padding: 1rem 0;
    display: grid;
    grid-template-columns: repeat(8, 1fr);
    grid-template-rows: auto;
    gap: 2rem;
  }
}

.color {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  &__hex {
    width: 80px;
    height: 80px;
    border: 1px solid #ececec;
    border-radius: 100%;
  }

  &__name {
    font-size: 16px;
    margin: 1rem 0;
  }
}
</style>
