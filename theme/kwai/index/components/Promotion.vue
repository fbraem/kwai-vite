<template>
    <div class="px-4 mr-auto ml-auto">
        <h3 class="text-3xl mb-2 font-semibold leading-normal">
            {{ title }}
        </h3>
        <div class="text-lg font-light leading-relaxed mt-4 mb-4 text-gray-700">
            <div v-html="text">
            </div>
        </div>
    </div>
</template>

<script>
import config from '/src/config/config.yaml';

export default {
    setup() {
        return {
            title: config.website.promotion.title,
            text: config.website.promotion.text
        }
    }
}
</script>
