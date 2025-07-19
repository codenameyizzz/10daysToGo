import { createRouter, createWebHistory } from "vue-router";
import LoginView from "../views/LoginView.vue";
import RegisterView from "../views/RegisterView.vue";
import DashboardView from "../views/DashboardView.vue";
import ProfileView from "../views/ProfileView.vue";
import ReviewInfo from "../views/ReviewInfo.vue";
import LayoutDefault from "../layouts/LayoutDefault.vue";

const routes = [
  { path: "/login", component: LoginView },
  { path: "/register", component: RegisterView },
  {
    path: "/",
    component: LayoutDefault,
    children: [
      { path: "dashboard", component: DashboardView },
      { path: "profile", component: ProfileView },
      { path: "review-info", component: ReviewInfo },
    ],
  },
  { path: "/:pathMatch(.*)*", redirect: "/login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  let isTokenValid = false;
  if (token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      isTokenValid = payload.exp > Math.floor(Date.now() / 1000);
    } catch {
      isTokenValid = false;
    }
  }

  if (!["/login", "/register"].includes(to.path) && !isTokenValid) {
    alert("Harap login dulu");
    next("/login");
  } else {
    next();
  }
});

export default router;
