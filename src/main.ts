import router from '@/router'
import { createApp } from 'vue'
import App from './App.vue'
import { appController } from './core/app'

// Initialize app
appController.initialize()

createApp(App).use(router).mount('#app')
