/* State for opening/closing the sidebar
/* Use this for example for a button to open the sidebar (see Toolbar.vue) */

import { reactive, toRefs } from 'vue';

const state = reactive({
  isOpen: false
});

export function useSidebar() {
  return {
    ...toRefs(state)
  };
}
