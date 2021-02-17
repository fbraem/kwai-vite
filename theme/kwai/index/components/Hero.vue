<template>
  <div>
    <h1 class="text-white font-semibold text-4xl">
        {{ title }}
    </h1>
    <img
        src="/@theme/index/assets/logo2.png"
        class="w-24 mx-auto mt-3"
        alt="logo"
    />
    <p class="mt-4 text-lg text-gray-100">
        {{ text }}
    </p>
  </div>
</template>

<script>
import config from '/src/config/config.yaml';

export default {
    setup() {
        return {
            title: config.website.title,
            text: config.website.hero
        }
    }
}
</script>
