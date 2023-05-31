<template>
  <div class="faq">
    <div class="container faq__container">
      <div class="title faq__title">Часто задаваемые вопросы</div>
      <div class="faq__list">
        <div
          @click="isOpen(question)"
          v-for="question in questions"
          :key="question.id"
          class="faq__item">
          <div class="faq__item-title">
            {{ question.title }}
          </div>
          <transition name="question">
            <div v-if="question.isVisible" class="text faq__item-text">
              {{ question.text }}
            </div>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from "vue";
export default {
  setup() {
    const questions = reactive([
      {
        id: 1,
        title: "Можно ли посетить производство?",
        text: "Конечно, мы всегда рады вас видеть! Но перед посещением необходимо договориться по телефону или почте (найти их можно на любой странице сайта).",
        isVisible: false,
      },
      {
        id: 2,
        title: "Какая минимальная партия на пошив?",
        text: "Минимальная партия на пошив трикотажных изделий — 50 штук, на пошив текстильных изделий — 30 штук",
        isVisible: false,
      },
      {
        id: 3,
        title: "Как рассчитать стоимость на пошив?",
        text: "Специально для наших клиентов мы разработали калькулятор (он расположен на каждой странице услуг), который помогает рассчитать примерную стоимость партии.",
        isVisible: false,
      },
      {
        id: 4,
        title: "Цены на сайте фиксированные?",
        text: "Все цены, указанные на сайте, являются усредненными, т.к. мы не можем дать точную стоимость на пошив изделия из-за индивидуальности и сложности каждого проекта.",
        isVisible: false,
      },
      {
        id: 5,
        title: "Что нужно для заказа?",
        text: "Для заказа необходимо оставить заявку на сайте, позвонить или написать на почту (все данные указаны в верхней и нижней части сайта на каждой странице!), желательно приложить фотографию, лекала или рисунок, чтобы точнее рассчитать стоимость пошива.",
        isVisible: false,
      },
      {
        id: 6,
        title: "Можно ли заказать вышивку?",
        text: "Да, подробнее об услугах машинной вышивке можно прочитать на странице услуг",
        isVisible: false,
      },
    ]);

    const isOpen = (question) => {
      question.isVisible = !question.isVisible;
    };

    return {
      isOpen,
      questions,
    };
  },
};
</script>

<style lang="scss">
@import "../../../assets/styles/variables.scss";

.question-enter-active,
.question-leave-active {
  transition: opacity 0.3s ease;
}

.question-enter-from,
.question-leave-to {
  opacity: 0;
}

.faq {
  @include flex-center-column;

  &__container {
    width: 100%;
  }

  &__title {
    margin-top: 4rem;
  }

  &__list {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__item {
    border-top: 1px solid #ececec;
    border-bottom: 1px solid #ececec;
    padding: 2rem 0;
    cursor: pointer;
    min-width: 900px;
  }

  &__item-title {
    position: relative;
    font-size: 24px;
  }

  &__item-title::after {
    content: "›";
    position: absolute;
    right: 0px;
    top: 50%;
    transform: rotate(90deg);
    font-size: 22px;
    font-weight: 300;
    opacity: 0.4;
    text-align: center;
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  &__item-text {
    padding: 1rem 4rem 1rem 0;
    transition: all 0.5s ease;
  }
}
</style>
