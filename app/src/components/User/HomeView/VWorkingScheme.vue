<template>
  <div class="scheme">
    <div class="container">
      <div class="title sheme__title">Схема работы с нами</div>
      <div class="scheme__body">
        <div>
          <v-icon icon="mdi-phone"></v-icon>
          <div class="text">
            Оставляете заявку или звоните <span> +7 (926) 041-00-06</span>
          </div>
        </div>
        <div>
          <v-icon icon="mdi-receipt"></v-icon>
          <div class="text">
            Разрабатываем лекала и <span>шьем образец</span>
          </div>
        </div>
        <div>
          <v-icon icon="mdi-pencil"></v-icon>
          <div class="text">
            Шьем партию, маркируем и <span>наносим принт</span>
          </div>
        </div>
        <div>
          <v-icon icon="mdi-truck-delivery"></v-icon>
          <div class="text">
            Упаковываем одежду и <span>отгружаем партию</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WorkingScheme",
  setup() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";

.scheme {
  padding: 2rem 0;
  border-top: 1px #e7e7e7 solid;
  border-bottom: 1px #e7e7e7 solid;
  &__body {
    @include flex-space-between;
    gap: 4rem;
    padding: 2rem 0;

    i {
      color: $dark;
      padding: 1rem;
      @include border-all(2px, dashed, $dark);
      border-radius: 1rem;
      background: white;
      @include font-size(180, normal, 1.2);
    }

    div {
      @include flex-center-column;
    }

    div.text {
      margin-top: 0.5rem;
      text-align: center;

      span {
        display: contents;
        color: $secondary;
        font-weight: 500;
      }
    }
  }
}
</style>
