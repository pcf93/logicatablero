import router from '@/router'
import { createApp } from 'vue'
import App from './App.vue'
import { appController } from './core/app'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

// Initialize app
appController.initialize()

createApp(App).use(router).mount('#app')
