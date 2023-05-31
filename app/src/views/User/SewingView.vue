<template>
  <div class="sewing-page">
    <div class="header__img">
      <div class="title header__title">Цены на пошив</div>
      <div class="header__subtitle">НА СОБСТВЕННЫХ И ДАВАЛЬЧЕСКИХ МАТЕРИАЛАХ</div>
    </div>
    <div class="sewing-page__container container">
      <div class="title sewing-page__title">Сколько стоит пошив одежды?</div>
      <div class="desc sewing-page__desc">
        Расчет стоимости пошива зависит от множества факторов: размер партии, материал
        изделия, сроки изготовления и т.д. В нашем каталоге цены представлены без учета
        стоимости материала. Эти цены основаны на опыте прошлых заказов, реальная
        стоимость ваших работ может отличаться как в большую, так и в меньшую сторону.
        Данные цены актуальны для партий от 500 штук, в других случаях стоимость может
        отличаться.
      </div>
      <div class="desc sewing-page__desc">
        Мы предоставляем ткани на партии от 100 штук. При заказе меньшей партии материал
        предоставляет заказчик! Минимальная партия заказа от 5 штук на размер (минимальный
        модельный ряд от 3 штук)
      </div>
      <v-services :category="'Пошив'" />
      <v-colors />
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from "vue";
import { useStore } from "vuex";
import VColors from "../../components/User/SewingView/VColors.vue";
import VServices from "../../components/User/SewingView/VServices.vue";

export default {
  name: "SewingView",

  components: { VColors, VServices },

  setup() {
    const store = useStore();
    const colors = computed(() => store.state.color.colors);

    onMounted(() => {
      store.dispatch("color/GET_COLORS_FROM_API");
      store.dispatch("service/GET_SERVICES_FROM_API");
    });

    return {
      colors,
    };
  },
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.sewing-page {
  margin-top: 4rem;

  &__desc {
    margin: 2rem 0;
    text-align: center;
  }

  &__title {
    margin-top: 4rem;
  }

  .header {
    &__img {
      height: 40vh;
      @include cover-background('"../../assets/images/sewing-bg.jpg"');
    }
  }
}
</style>
