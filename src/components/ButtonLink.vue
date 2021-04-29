<template>
  <component
    :is="tag"
    class="background-transparent font-bold uppercase px-3 py-1 text-xs outline-none focus:outline-none mr-1 mb-1"
    :[to]="route"
    @[click]="method"
  >
    <slot />
  </component>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    route: {
      type: Object,
      default: null
    },
    method: {
      type: Function,
      default: null
    }
  },
  setup(props) {
    const tag = computed(() => props.route ? 'router-link' : 'button');
    const to = computed(() => props.route ? 'to' : null);
    const click = computed(() => props.method ? 'click' : null);

    return {
      tag,
      to,
      click
    };
  }
};
</script>
