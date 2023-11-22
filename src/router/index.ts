import TableroRandomVue from '@/components/matches/TableroRandom.vue'
import AlertsAndMessages from '@/components/alerts_and_messages/AlertsAndMessages.vue'
import HomeOptions from '@/components/home/HomeOptions.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import ContactList from '@/components/contacts/ContactsList.vue'
import RequestsList from '@/components/requests/RequestsList.vue'
import { createRouter, createWebHistory } from 'vue-router'
import MatchesList from '@/components/matches/MatchesList.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/missatges',
      name: 'missatges',
      component: AlertsAndMessages,
    },
    {
      path: '/iniciar-partida',
      name: 'iniciar partida',
      component: TableroRandomVue,
    },
    {
      path: '/contactes',
      name: 'contactes',
      component: ContactList,
    },
    {
      path: '/partides',
      name: 'partides',
      component: MatchesList,
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
      path: '/registre',
      name: 'registre',
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
