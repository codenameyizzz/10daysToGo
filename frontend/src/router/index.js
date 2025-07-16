import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import DashboardView from '../views/DashboardView.vue';

const routes = [
  { path: '/login', component: LoginView },
  { path: '/register', component: RegisterView },
  { path: '/dashboard', component: DashboardView },
  { path: '/', redirect: '/login' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  const isLoggedIn = localStorage.getItem('is_logged_in') === 'true';

  let isTokenValid = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000); // detik
      isTokenValid = payload.exp > now;
    } catch (e) {
      isTokenValid = false;
    }
  }

  console.log('Routing to:', to.path, '| Logged in:', isLoggedIn, '| Token valid:', isTokenValid);

  if (to.path === '/dashboard' && !(isLoggedIn && isTokenValid)) {
    alert('Harap login dulu');
    next('/login');
  } else {
    next();
  }
});

export default router;
