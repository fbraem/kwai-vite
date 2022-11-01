<template>
  <slot :applications="applications" />
</template>

<script setup lang="ts">
import { useApplicationStore } from '../stores/applicationStore';
import { computed } from 'vue';

const store = useApplicationStore();
store.load();
const applications = computed(() => store.applications);
</script>
