<!-- A renderless component for loading news stories -->
<template>
  <slot :stories="stories" />
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useNewsStore, usePromotedNewsStore } from '@root/stores/newsStore';

interface Props {
  promoted?: boolean
}
const props = withDefaults(
  defineProps<Props>(), {
    promoted: false,
  }
);

const store = props.promoted ? usePromotedNewsStore() : useNewsStore();
store.load();

const stories = computed(() => store.items);
</script>
