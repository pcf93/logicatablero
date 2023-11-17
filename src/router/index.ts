import TableroRandomVue from '@/components/TableroRandom.vue'
import AlertsAndMessages from '@/components/alerts_and_messages/AlertsAndMessages.vue'
import HomeOptions from '@/components/home/HomeOptions.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import RegisterForm from '@/components/login/RegisterForm.vue'
import RemindersCalendar from '@/components/reminders_calendar/RemindersCalendar.vue'
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
      path: '/reminders-calendar',
      name: 'reminders',
      component: RemindersCalendar,
    },
    {
      path: '/tauler-previ',
      name: 'tauler previ',
      component: TableroRandomVue,
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
