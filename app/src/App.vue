<template>
  <v-app>
    <v-main v-if="role === 'ADMIN'">
      <v-side-bar />
      <router-view />
    </v-main>
    <v-main v-else>
      <the-header-vue />
      <router-view />
      <v-faq />
      <the-footer-vue />
    </v-main>
  </v-app>
</template>

<script>
import { computed, defineComponent } from "vue";
import TheHeaderVue from "./components/common/TheHeader.vue";
import TheFooterVue from "./components/common/TheFooter.vue";
import VFaq from "./components/User/AboutView/VFaq.vue";
import VSideBar from "./components/Admin/VSideBar.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "App",
  components: {
    TheHeaderVue,
    TheFooterVue,
    VFaq,
    VSideBar,
  },
  setup() {
    const store = useStore();
    const role = computed(() => store.state.auth.credentials.userRole);
    return {
      role,
    };
  },
});
</script>
