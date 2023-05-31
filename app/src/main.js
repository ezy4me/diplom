import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import YmapPlugin from 'vue-yandex-maps';
import VueSweetalert2 from 'vue-sweetalert2';

import '../src/assets/styles/main.scss'
import 'sweetalert2/dist/sweetalert2.min.css';

loadFonts()

createApp(App)
  .use(router)
  .use(store)
  .use(vuetify)
  .use(YmapPlugin)
  .use(VueSweetalert2)
  .mount('#app')

