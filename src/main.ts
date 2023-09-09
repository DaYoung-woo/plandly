import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
//import { vfmPlugin, VfmOptions, VueFinalModalProperty } from 'vue-final-modal'
import { vfmPlugin } from 'vue-final-modal'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vfmPlugin({
    key: '$vfm',
    componentName: 'VueFinalModal',
    dynamicContainerName: 'ModalsContainer'
  }))

//   Vue.use<VfmOptions>(vfmPlugin({
//     key: '$vfm',
//     componentName: 'VueFinalModal',
//     dynamicContainerName: 'ModalsContainer'
//   }))
  
//   // define the setup options
//   declare module 'vue/types/vue' {
//     interface Vue {
//       $vfm: VueFinalModalProperty
//     }
//   }
app.mount('#app')
