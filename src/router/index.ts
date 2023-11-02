// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
      {
        path: '/summary/:account_id',
        name: 'SummaryPage',
        component: () => import('@/views/SummaryPage.vue')
      },
      {
        path: '/valuation/:account_id',
        name: 'ValuationPage',
        component: () => import('@/views/ValuationPage.vue')
      },
      {
        path: '/interactive_map/:account_id',
        name: 'PropertyMapPage',
        component: () => import('@/views/PropertyMapPage.vue')
      },
      {
        path: '/surveys/:account_id',
        name: 'SurveyMapPage',
        component: () => import('@/views/SurveyMapPage.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
