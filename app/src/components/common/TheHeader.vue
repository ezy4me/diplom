<template>
  <header>
    <v-modal :open="isOpen" @close="isOpen = !isOpen">
      <auth-form @isOpen="() => isOpen = !isOpen"></auth-form>
    </v-modal>
    <div class="header">
      <div class="header__navbar">
        <div class="logo">
          <img class="logo__img" :src="require('../../assets/images/fabric.png')" alt="logo" />
          <h3 class="logo__title">Fabric</h3>
        </div>
        <nav class="navbar">
          <ul class="navbar__list">
            <li v-for="tab in tabs" :key="tab.id" class="navbar__item">
              <router-link :to="tab.path">
                {{ tab.name }}
              </router-link>
            </li>
          </ul>
        </nav>
        <div class="header__actions">
          <button class="request-btn" @click="dialog = true">Заказать звонок</button>
          <v-dialog v-model="dialog" width="600">
            <request-form @closeDialog="closeDialog">
            </request-form>
          </v-dialog>
          <a v-show="!role" @click="isOpen = true" class="link" href="#">Войти</a>
          <router-link v-if="role == 'USER'" to="/account" >Личный кабинет</router-link>
          <!-- <router-link  v-else-if="role == 'ADMIN'" to="/admin">ROOT</router-link> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed, ref, onMounted } from "vue";
import { useStore } from "vuex";
import VModal from "../common/VModal.vue";
import AuthForm from "./AuthForm.vue";
import RequestForm from './RequestForm.vue';
export default{
  setup() {
    let isActive = ref(false);
    const isOpen = ref(false);

    const store = useStore()
    const dialog = ref(false);

    const role = computed(() => store.state.auth.credentials.userRole)

    const tabs = [
      { id: 1, name: "Главная", path: "/" },
      { id: 2, name: "Пошив", path: "/sewing" },
      { id: 3, name: "Лекала", path: "/pattern" },
      { id: 4, name: "Принты", path: "/print" },
      { id: 5, name: "О компании", path: "/about" },
      { id: 6, name: "Контакты", path: "/contacts" },
    ];

    onMounted(() => {
      store.dispatch('request/GET_REQUEST_TYPES_FROM_API').then(() => {
        console.log(store.state.request.requestTypes);
      })
    })

    const onNavbarTab = () => {
      isActive.value = !isActive.value;
    };

    const closeDialog = () => {
      dialog.value = !dialog.value;
    }

    return {
      tabs,
      isActive,
      onNavbarTab,
      isOpen,
      role,
      dialog,
      closeDialog
    };
  },
  components: {
    VModal,
    AuthForm,
    RequestForm,
  },
};
</script>

<style lang="scss">
.request-btn {
  position: absolute;
  left: 3.5rem;
  top: 6rem;
}
</style>
