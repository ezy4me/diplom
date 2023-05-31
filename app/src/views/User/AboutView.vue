<template>
  <div class="about-page">
    <div class="header__img">
      <div class="title header__title">Швейная фабрика</div>
      <div class="header__subtitle">
        ИСТОРИЯ НАШЕГО ПРОИЗВОДСТВА 2000-2023 ГОД
      </div>
    </div>
    <v-about-us />
  </div>
</template>

<script>
import VAboutUs from "../../components/User/AboutView/VAboutUs.vue";

export default {
  name: "AboutView",
  components: { VAboutUs },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.about-page {
  margin-top: 4rem;

  .header {
    &__img {
      height: 40vh;
      @include cover-background('"../../assets/images/about-bg.jpg"');
    }
  }
}
</style>
