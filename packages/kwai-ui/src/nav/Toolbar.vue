<template>
  <header class="flex justify-between items-center py-4 px-6">
    <div class="flex items-center">
      <button
          class="focus:outline-none lg:hidden"
          :class="fillColor"
          @click="isOpen = true"
      >
        <BarsIcon class="w-4 h-4" />
      </button>
    </div>
    <slot />
  </header>
</template>

<script setup lang="ts">
import { useSidebar } from "./useSidebar.js"
import BarsIcon from "../icons/BarsIcon.vue"

export interface Props {
  fillColor: string
}

const props = withDefaults(
    defineProps<Props>(),
    {
      fillColor: 'fill-black'
    }
)

const { isOpen } = useSidebar()
</script>
