<template>
  <div>
    <h1 class="text-white font-semibold text-4xl">
        {{ title }}
    </h1>
    <img
        src="/assets/portal/logo2.png"
        class="w-24 mx-auto mt-3"
        alt="logo"
    />
    <p class="mt-4 text-lg text-gray-100">
        {{ text }}
    </p>
  </div>
</template>

<script>
import { website } from '/src/config/config.toml';

export default {
    setup() {
        return {
            title: website.title,
            text: website.hero
        }
    }
}
</script>
