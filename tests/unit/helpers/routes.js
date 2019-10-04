import Home from '@/pages/Home.vue'
import Details from '@/pages/Details.vue'

export default {
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    }
  ]
}
