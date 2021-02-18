import { createRouter, createWebHashHistory } from 'vue-router';
import config from '/src/config/config.yaml';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: []
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = config.website.title + ' | ' + to.meta.title
  } else {
    document.title = config.website.title
  }
  next();
});
