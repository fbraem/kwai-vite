<template>
  <component
    :is="tag"
    :[to]="route"
    :[href]="link"
    @[clickEvent]="method"
    class="border-none text-base inline-flex justify-center items-center align-middle no-underline rounded-full cursor-pointer focus:outline-none hover:no-underline disabled:opacity-50 disabled:cursor-not-allowed px-2 py-1"
  >
    <i :class="icon"></i>
  </component>
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
}
</script>
