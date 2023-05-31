<template>
  <div class="about-us">
    <div class="container about-us__container">
      <div class="title about-us__title">О НАС</div>
      <div class="desc about-us__desc">
        Швейный цех основан в 2000 году, вот уже более 18 лет мы занимаемся
        пошивом мужской и женской одежды для заказчиков из Москвы и регионов. В
        нашем распоряжении собственное производство размером более 350М2, 30
        швейных машин, 5 печатных станков и многое другое! Занимаемся крупным и
        мелким оптом(от 5 штук). На нашей фабрике работают лучшие
        проектировщики, обеспечивающие точность в разработке лекала любой
        сложности.
      </div>

      <div class="about-us__body">
        <div>
          <h3>5</h3>
          <div class="desc">печатных станков</div>
        </div>
        <div>
          <h3>30</h3>
          <div class="desc">швейный машин</div>
        </div>
        <div>
          <h3>350 м<sup>2</sup></h3>
          <div class="desc">помещение</div>
        </div>
      </div>

      <div class="about-us__gallery">
        <img
          :src="require('../../../assets/images/about/about-1.jpg')"
          alt="" />
        <img
          :src="require('../../../assets/images/about/about-2.jpg')"
          alt="" />
        <img
          :src="require('../../../assets/images/about/about-3.jpg')"
          alt="" />
        <img
          :src="require('../../../assets/images/about/about-4.jpg')"
          alt="" />
        <img
          :src="require('../../../assets/images/about/about-5.jpg')"
          alt="" />
        <img
          :src="require('../../../assets/images/about/about-6.jpg')"
          alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AboutUs",
};
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";
.about-us {
  margin-top: 4rem;

  &__container {
    @include flex-center-column;
  }

  &__gallery {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    gap: 1rem;
    margin-top: 4rem;
  }

  &__gallery img {
    width: 400px;
    border-top: 4px solid #ececec;
    border-left: 4px solid #ececec;
    border-bottom: 4px solid #a8a8a8;
    border-right: 4px solid #a8a8a8;
  }

  &__desc {
    text-align: center;
    word-spacing: 0.5rem;
  }

  &__body {
    margin-top: 2rem;

    @include flex-center;
    div {
      @include flex-center-column;
      margin-right: 2rem;
      margin-left: 2rem;
      width: 12rem;
    }

    div.desc {
      margin-top: 0.5rem;
    }

    div h3 {
      @include font-size(40, normal, normal);
      color: $secondary;
    }
  }
}
</style>
