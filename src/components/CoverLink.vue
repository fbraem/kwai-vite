<template>
  <span>
    <component
      :is="tag"
      class="absolute inset-0"
      :[href]="link"
      :[to]="route"
      @[click]="method"
    />
  </span>
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
    }
  },
  setup(props) {
    const tag = computed(() => props.route ? 'router-link' : 'a');
    const to = computed(() => props.route ? 'to' : null);
    const href = computed(() => props.link ? 'href' : null);
    const click = computed(() => props.method ? 'click' : null);

    return {
      tag,
      href,
      to,
      click
    };
  }
};
</script>
