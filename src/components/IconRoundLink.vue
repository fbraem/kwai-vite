<template>
  <component
    :is="tag"
    :[to]="route"
    :[href]="link"
    class="inline-flex items-center justify-center block h-8 w-8 rounded-full overflow-hidden shadow focus:outline-none hover:cursor-pointer"
    @[clickEvent]="method"
  >
    <i :class="icon" />
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
    },
    link: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const tag = computed(() => props.route ? 'router-link' : 'a');
    const clickEvent = computed(() => props.method ? 'click' : null);
    const to = computed(() => props.route ? 'to' : null);
    const href = computed(() => props.link ? 'href' : null);

    return {
      tag,
      clickEvent,
      to,
      href
    };
  }
};
</script>
