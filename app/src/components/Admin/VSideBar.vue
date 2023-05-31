<template>
  <v-navigation-drawer expand-on-hover rail>
    <v-list>
      <v-list-item
        class="text-h3"
        prepend-avatar="https://lyninets.by/images/avatar/399/ava_399.png"
      >
        <v-list-item-title class="text-h6"> {{admin.fio}} </v-list-item-title>
        <v-list-item-subtitle class="text-subtitle-1">
          {{ admin.email }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <v-list-item prepend-icon="mdi-poll" value="analytics" to="/admin">
        <v-list-item-title class="text-body-1"> Аналитика </v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account-multiple" value="users" to="/admin/users">
        <v-list-item-title class="text-body-1">
          Пользователи
        </v-list-item-title></v-list-item
      >
      <v-list-item
        prepend-icon="mdi-message-processing-outline"
        value="requests"
        to="/admin/requests"
      >
        <v-list-item-title class="text-body-1">
          Обработка заявок
        </v-list-item-title></v-list-item
      >
      <v-list-item prepend-icon="mdi-palette" value="colors" to="/admin/colors">
        <v-list-item-title class="text-body-1"> Цвета </v-list-item-title></v-list-item
      >
      <v-list-item
        prepend-icon="mdi-palette-swatch"
        value="materials"
        to="/admin/materials"
      >
        <v-list-item-title class="text-body-1">
          Материалы
        </v-list-item-title></v-list-item
      >
      <v-list-item prepend-icon="mdi-pin" value="furnitures" to="/admin/furnitures">
        <v-list-item-title class="text-body-1">
          Фурнитуры
        </v-list-item-title></v-list-item
      >
      <v-list-item prepend-icon="mdi-hanger" value="products" to="/admin/products">
        <v-list-item-title class="text-body-1"> Изделия </v-list-item-title></v-list-item
      >
      <v-list-item prepend-icon="mdi-pen" value="services" to="/admin/services">
        <v-list-item-title class="text-body-1"> Услуги </v-list-item-title></v-list-item
      >
      <v-list-item
        prepend-icon="mdi-order-bool-ascending-variant"
        value="orders"
        to="/admin/orders"
      >
        <v-list-item-title class="text-body-1"> Заказы </v-list-item-title></v-list-item
      >
    </v-list>
    <template v-slot:append>
      <v-list density="compact" nav>
        <v-list-item @click="logout" prepend-icon="mdi-exit-run" color="primary">
          <v-list-item-title class="text-body-1"> Выйти </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="theme.global.current.value.dark"
          @click="toggleTheme"
          prepend-icon="mdi-toggle-switch"
          color="primary"
        >
          <v-list-item-title class="text-body-1"> Светлый режим </v-list-item-title>
        </v-list-item>

        <v-list-item
          v-else
          @click="toggleTheme"
          prepend-icon="mdi-toggle-switch-off"
          color="primary"
        >
          <v-list-item-title class="text-body-1"> Темный режим </v-list-item-title>
        </v-list-item>
      </v-list>
    </template>
  </v-navigation-drawer>
</template>
<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useTheme } from "vuetify";
import { computed } from 'vue';
export default {
  name: "SideBar",
  setup() {
    const store = useStore();
    const router = useRouter();
    const theme = useTheme();

    const admin = computed(() => store.state.auth.user)

    const logout = () => {
      store.dispatch("auth/ON_LOGOUT").then(() => {
        router.push({ name: "home" });
      });
    };

    return {
      logout,
      theme,
      admin,
      toggleTheme: () =>
        (theme.global.name.value = theme.global.current.value.dark ? "light" : "dark"),
    };
  },
};
</script>

<style></style>
