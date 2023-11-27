import router from '@/router'
import { createApp } from 'vue'
import App from './App.vue'
import { appController } from './core/app'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

// Initialize app
appController.initialize()

createApp(App).use(router).mount('#app')
