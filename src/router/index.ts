import TableroRandomVue from '@/components/matches/TableroRandom.vue'
import AlertsAndMessages from '@/components/alerts_and_messages/AlertsAndMessages.vue'
import HomeOptions from '@/components/home/HomeOptions.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import ContactList from '@/components/contacts/ContactsList.vue'
import RequestsList from '@/components/requests/RequestsList.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/alerts-and-messaging',
      name: 'alerts',
      component: AlertsAndMessages,
    },
    {
      path: '/tauler-previ',
      name: 'tauler previ',
      component: TableroRandomVue,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactList,
    },
    {
      path: '/solicituds',
      name: 'solicituds',
      component: RequestsList,
    },
    {
      path: '/',
      name: 'default',
      component: LoginForm,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginForm,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterForm,
    },
    {
      path: '/home',
      name: 'home',
      component: HomeOptions,
    },
  ],
})

export default router
