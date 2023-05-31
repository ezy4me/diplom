<template>
  <div class="main-page">
    <div class="header__img">
      <div class="title header__title">Швейное производство</div>
      <div class="header__subtitle">
        Пошив текстильной и трикотажной одежды на заказ
      </div>
      <div class="header__info">
        <div>
          <v-icon icon="mdi-cog"></v-icon>
          <div class="desc">Партии от <span>10</span> штук</div>
        </div>
        <div>
          <v-icon icon="mdi-clock-outline"></v-icon>
          <div class="desc">Сроки от <span>1</span> дня</div>
        </div>
        <div>
          <v-icon icon="mdi-pencil-ruler"></v-icon>
          <div class="desc">Разработка <span>лекала</span></div>
        </div>
      </div>
    </div>
    <div class="content">
      <v-about-price />
      <v-working-scheme />
    </div>
  </div>
</template>

<script>
import VAboutPrice from "../../components/User/HomeView/VAboutPrice.vue";
import VWorkingScheme from "../../components/User/HomeView/VWorkingScheme.vue";

export default {
  name: "HelloView",
  setup() {
    return {};
  },

  components: {
    VAboutPrice,
    VWorkingScheme,
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.main-page {
  margin-top: 4rem;
}
</style>
