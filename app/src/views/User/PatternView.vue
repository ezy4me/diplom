<template>
  <div class="pattern-page">
    <div class="header__img">
      <div class="title header__title">Разработка лекала</div>
      <div class="header__subtitle">
        НА ИЗДЕЛИЯ ЛЮБОЙ СЛОЖНОСТИ, ГРАДАЦИЯ НА ВСЕ РАЗМЕРЫ
      </div>
    </div>
    <div class="pattern-page__container container">
      <div class="title pattern-page__title">Что такое лекала?</div>
      <div class="desc pattern-page__desc">
        <span>Лекала (или выкройка)</span> — это детали будущего изделия,
        выполненные из бумаги или других материалов. На основе лекала
        моделируется швейное изделие. В начале дизайнер создает эскиз модели, по
        которому моделируется изделие. На этом этапе конструктор строит базовую
        выкройку, используя типовые или индивидуальные мерки, в зависимости от
        задачи.
      </div>
      <div class="desc pattern-page__desc">
        На нашей фабрике работают квалифицированные конструкторы, способные
        создать лекала любой сложности и помогут вам определиться с интересующей
        вас моделью. Мы способны разработать лекала по фотографии, рисунку или
        образцу готового изделия.
      </div>
      <div class="desc pattern-page__desc">
        <span>Градация лекала</span> — это разработка лекал для всех размеров и
        ростов соответствующей полнотной или возрастной группы по базовым
        размерам лекала.
      </div>
      <v-services :category="'Лекала'" />
    </div>
  </div>
</template>

<script>
import { onMounted } from "vue";
import { useStore } from "vuex";
import VServices from "../../components/User/SewingView/VServices.vue";

export default {
  name: "PatternView",
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

.pattern-page {
  margin-top: 4rem;

  &__desc {
    margin: 2rem 0;

    span {
      font-weight: bold;
    }
  }

  &__title {
    margin-top: 4rem;
  }

  .header {
    &__img {
      height: 40vh;
      @include cover-background('"../../assets/images/pattern-bg.jpg"');
    }
  }
}
</style>
