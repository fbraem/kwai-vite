import { createRouter, createWebHashHistory } from 'vue-router';
import { website } from '/@config';

export const router = createRouter({
  history: createWebHashHistory(),
  scrollBehavior(to, from, savePosition) {
    if (savePosition) {
      return savePosition;
    }
    return {
      top: 0
    };
  },
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
