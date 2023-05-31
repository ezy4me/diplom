<template>
  <div class="contacts-page">
    <div class="header__img">
      <div class="title header__title">Швейный цех</div>
      <div class="header__subtitle">
        ПОШИВ ОДЕЖДЫ НА ЗАКАЗ В КАЗАНИ И РЕСПУБЛИКЕ ТАТАРСТАН
      </div>
    </div>
    <div class="container">
      <div class="title contacts-page__title">Наши контакты</div>
      <div class="contacts">
        <v-map></v-map>
        <div class="contacts__body">
          <div>
            <div class="contacts__title">Телефон:</div>
            <div class="text contacts__text">+7(926) 041-00-06</div>
          </div>
          <div>
            <div class="contacts__title">Адрес:</div>
            <div class="text contacts__text">
              г. Москва, м. Кунцевская, Истринская улица, дом 5
            </div>
          </div>
          <div>
            <div class="contacts__title">E-mail:</div>
            <div class="text contacts__text">fabric@mail.ru</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VMap from "../../components/common/VMap.vue";

export default {
  components: { VMap },
  name: "ContactsView",
};
</script>

<style lang="scss">
@import "../../assets/styles/variables.scss";

.contacts-page {
  margin-top: 4rem;

  &__title {
    margin-top: 4rem;
  }

  .header {
    &__img {
      height: 40vh;
      @include cover-background('"../../assets/images/contacts-bg.jpg"');
    }
  }
}

.contacts {
  @include flex-space-between;
  padding: 2rem 0;

  &__title {
    @include font-size(30, normal, 1.2);
  }

  &__body {
    @include flex-column;
    gap: 2rem;
  }
}
</style>
