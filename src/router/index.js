import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditView from '@/views/EditView.vue'
import AdminView from '@/views/admin/AdminView.vue'
import AddView from '@/views/AddView.vue'
import SearchView from '@/views/admin/SearchView.vue'
import LoginView from '@/views/LoginView.vue'
import StudentView from '@/views/admin/student/StudentView.vue'
import MainLayout from '@/layouts/MainLayout.vue'
import AdminLayout from '@/layouts/AdminLayout.vue'
import StatisticsView from '@/views/admin/StatisticsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BaseUrl),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      meta:{ layout: MainLayout},
      component: HomeView,
    },
  
    {
      path: '/edit/:id',
      name: 'edit',
      meta:{ layout: MainLayout},
      component: EditView,
    },
    {
      path: '/add',
      name: 'add',
      meta:{ layout: MainLayout},
      component: AddView,
    },
    {
      path: '/admin/dashboard',
      name: 'admin',
      meta:{ layout: AdminLayout},
      component: AdminView,
      // children:[
      //   {
      //     path: 'search',
      //     name: 'admin-search',
      //     component: SearchView,
      //   },
      // ]
    },
    {
      path: '/admin/search',
      name: 'admin-search',
      meta:{ layout: AdminLayout},
      component: SearchView,
    },
    {
      path: '/admin/statistics',
      name: 'admin-statistics',
      meta:{ layout: AdminLayout},
      component: StatisticsView,
    },
    {
      path: '/admin/student/:id',
      name: 'admin-student-id',
      meta:{ layout: AdminLayout},
      component: StudentView,
    },
    // {
    //   path: '/add',
    //   name: 'add',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AddView.vue'),
    // },
  ],
})

export default router
