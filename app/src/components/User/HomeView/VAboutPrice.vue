<template>
  <div class="about-price">
    <div class="container">
      <div class="title about-price__title">ИЗ ЧЕГО СКЛАДЫВАЕТСЯ ЦЕНА:</div>
      <div class="desc about-price__desc">
        Цена (стоимость) пошива одежды (женской, мужской, молодежной, детской,
        для полных size+, спортивной, корпоративной на заказ под вашим брендом)
        на швейном производстве всегда индивидуальна.
      </div>
      <div class="about-price-grid">
        <div class="about-price-grid__item">
          <div class="number">1</div>
          <div class="about-price-grid__body">
            <div class="about-price-grid__title">Цена ткани</div>
            <div class="desc about-price-grid__desc">
              До 80% стоимости изделия, зависит от цены доллара и качества,
              плотности, цветности и состава + ее количество на единицу изделия.
            </div>
          </div>
        </div>
        <div class="about-price-grid__item">
          <div class="number">2</div>
          <div class="about-price-grid__body">
            <div class="about-price-grid__title">Сложность пошива</div>
            <div class="desc about-price-grid__desc">
              Фасон + декоративные элементы = затраты рабочего времени.
            </div>
          </div>
        </div>
        <div class="about-price-grid__item">
          <div class="number">3</div>
          <div class="about-price-grid__body">
            <div class="about-price-grid__title">Качество пошива</div>
            <div class="desc about-price-grid__desc">
              Чем скоростнее шьют (например, Китай/ Киргизия/ Кыргызстан/
              Казахстан), тем менее ровные строчки, нет дополнительной обработки
              и меньше времени про верку на брак.
            </div>
          </div>
        </div>
        <div class="about-price-grid__item">
          <div class="number">4</div>
          <div class="about-price-grid__body">
            <div class="about-price-grid__title">Наличие фурнитуры</div>
            <div class="desc about-price-grid__desc">
              Нитки, кружево, замки.
            </div>
          </div>
        </div>
        <div class="about-price-grid__item">
          <div class="number">5</div>
          <div class="about-price-grid__body">
            <div class="about-price-grid__title">Наличие упаковки</div>
            <div class="desc about-price-grid__desc">
              Для дальнейшей реализации на маркетплейсе / магазине одежды
              (фулфилмент под ключ или полуфабрикаты без бренда.
            </div>
          </div>
        </div>
        <div class="about-price-grid__item">
          <div class="number">6</div>
          <div class="about-price-grid__body">
            <div class="about-price-grid__title">Объем заказа</div>
            <div class="desc about-price-grid__desc">
              Чем больше партия, тем больше скидка и наоборот.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutPrice",

  setup() {
    return {};
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";

.about-price {
  @include flex-center-column;
  padding: 2rem 0;
  &__title {
    @include font-size(40, normal, 1.2);
    margin: 1rem 0;
  }

  &__desc {
    margin: 1rem 0;
  }
}
.about-price-grid {
  padding: 2rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 2rem;
  &__item {
    @include flex-column;
    gap: 1rem;
  }

  &__title {
    @include font-size(24, normal, 1.2);
  }

  &__desc {
    margin-top: 1rem;
  }
}
.number {
  @include flex-center;
  width: 60px;
  height: 60px;
  background: $primary;
  @include border-all(1px, dashed, white);
  border-radius: 100%;
  @include font-size(20, normal, normal);
  font-weight: bold;
  color: $dark;
}
</style>
