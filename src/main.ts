import './assets/styles/main.scss'

import { createApp } from 'vue'
import App from './App.vue'

// pinia 스토어
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 라우터
import router from './router'
// 팝업
import { vfmPlugin } from 'vue-final-modal'
// dayjs
import VueDayjs from 'vue3-dayjs-plugin'

const app = createApp(App)

// pinia 설정
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
// 라우터 설정
app.use(router)
// 팝업 설정
app.use(
  vfmPlugin({
    key: '$vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer'
  })
)
// 달력 설정
app.use(VueDayjs)

// 마운트
app.mount('#app')
