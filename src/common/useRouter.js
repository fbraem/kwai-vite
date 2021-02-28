import { createRouter, createWebHashHistory } from 'vue-router';
import { website } from '/src/config/config.toml';

export const router = createRouter({
  history: createWebHashHistory(),
  routes: []
});

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = website.title + ' | ' + to.meta.title
  } else {
    document.title = website.title
  }
  next();
});
