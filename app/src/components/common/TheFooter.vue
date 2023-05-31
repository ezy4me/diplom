<template>
  <footer>
    <div class="footer">
      <div class="footer__inner">
        <div class="footer__title">Наши контакты</div>
        <div class="footer__contacts">
          <p>+7 (919) 423 43 43</p>
          <p>+7 (919) 423 43 43</p>
          <p>fabric@mail.ru</p>
        </div>
        <div class="footer__socials">
          <v-icon icon="mdi-telegram"></v-icon>
          <v-icon icon="mdi-instagram"></v-icon>
          <v-icon icon="mdi-vk"></v-icon>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  setup() {
    const tabs = [
      { id: 1, name: "Главная", path: "/" },
      { id: 2, name: "Пошив", path: "/sewing" },
      { id: 3, name: "Готовые решения", path: "/products" },
      { id: 4, name: "Наши услуги", path: "/services" },
      { id: 5, name: "О компании", path: "/about" },
    ];
    return {
      tabs,
    };
  },
};
</script>
