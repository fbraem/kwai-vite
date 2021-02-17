<template>
  <component
      :is="tag"
      class="lg:text-white lg:hover:text-gray-300 text-gray-800 px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold cursor-pointer"
      :[href]="menu.url"
      :[to]="menu.route"
      @[click]="menu.method"
  >
    <i
        :class="menu.icon"
        class="lg:text-gray-300 text-gray-500 text-lg leading-lg"
    ></i>
    <span
        :class="{ 'lg:hidden' : menu.hideTitle ?? true }"
        class="lg:hidden inline-block ml-2">{{ menu.title }}
    </span>
  </component>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const tag = computed(() => props.menu.route ? 'router-link' : 'a');
    const href = computed( () => props.menu.url ? 'href' : null);
    const to = computed( () => props.menu.route ? 'to' : null);
    const click = computed(() => props.menu.method ? 'click' : null);

    return {
      tag,
      href,
      to,
      click
    };
  }
}
</script>
