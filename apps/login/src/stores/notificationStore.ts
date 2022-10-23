import { defineStore } from 'pinia';

interface NotificationState {
  items: string[]
}

export const useNotificationStore = defineStore('notificationStore', {
  state: (): NotificationState => ({
    items: []
  }),
  getters: {
    count: (state) => state.items.length
  },
  actions: {
    add(text: string) {
      this.items.push(text);
      setTimeout(() => {
        this.items = [];
      }, 3000);
    }
  }
});
