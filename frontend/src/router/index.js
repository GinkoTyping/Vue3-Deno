import { createWebHashHistory, createRouter } from "vue-router";

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "",
      component: () => import('@/page/Login.vue')
    },
  ],
});
