<template>
  <span>
    <component
        :is="tag"
        class="absolute inset-0"
        :[href]="link"
        @[click]="method"
        :[to]="route"
    >
    </component>
  </span>
</template>

<script>
import { computed } from 'vue';

export default {
  props: {
    route: {
      type: Object
    },
    method: {
      type: Function
    },
    link: {
      type: String
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
    }
  }
}
</script>
