<template>
  <main class="absolute w-full h-full">
    <div
        class="absolute top-0 w-full h-full bg-gray-900 bg-cover bg-center"
        :style="styles"
    >
      <div class="w-full h-full absolute opacity-60 bg-black" />
      <div class="container mx-auto px-4 h-full">
        <div class="flex flex-col content-center items-center justify-center h-full">
          <div class="w-full md:w-2/3 xl:w-1/2 px-4">
            <div class="relative">
              <router-view />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue"

const props = defineProps<{
  image?: string
}>()

const styles = ref<object[]>([])
if (props.image) {
  styles.value.push({ 'background-image': `url(${props.image}`})
}
</script>
