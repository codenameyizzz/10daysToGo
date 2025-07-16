import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';
import ProfileView from '../views/ProfileView.vue'; 
import LayoutDefault from '../layouts/LayoutDefault.vue';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  {
    path: '/',
    component: LayoutDefault,
    children: [
      { path: 'dashboard', component: DashboardView },
      { path: 'profile', component: ProfileView },
    ],
  },
  { path: '/:pathMatch(.*)*', redirect: '/login' }, // Catch-all
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  let isTokenValid = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      isTokenValid = payload.exp > Math.floor(Date.now() / 1000);
    } catch (e) {
      isTokenValid = false;
    }
  }

  if (to.path !== '/login' && to.path !== '/register' && !isTokenValid) {
    alert('Harap login dulu');
    next('/login');
  } else {
    next();
  }
});

export default router;
