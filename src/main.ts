import 'quasar/dist/quasar.css'
import "@/assets/styles/index.scss";

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { Quasar } from 'quasar'

import App from './App.vue'
import router from './router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import VueNativeSock from "vue-native-websocket-vue3";



const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// Quasar css
app.use(Quasar, {
    plugins: {},
})
  
app.use(pinia)
app.use(router)

app.use(VueNativeSock, 'ws://plandly-haeju-min.koyeb.app/wsTest');

app.mount('#app')
