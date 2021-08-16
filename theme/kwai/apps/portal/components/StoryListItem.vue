<template>
  <div>
    <h2 class="mb-2 text-xl font-extrabold leading-snug tracking-tight text-gray-800 md:text-2xl">
      <router-link
        v-if="story.has_more"
        :to="{ name: 'portal.news.story', params: { id: story.id }}"
        class="text-gray-900"
      >
        {{ story.title }}
      </router-link>
      <span
        v-else
        class="text-gray-900"
      >
        {{ story.title }}
      </span>
    </h2>
    <p class="mb-3 text-sm font-normal text-gray-500">
      {{ story.publish_date }} &nbsp;&bull;&nbsp;
      <router-link
        class="text-sm text-blue-600"
        :to="{ name: 'portal.news.application', params: { application_id: story.application.id }}"
      >
        {{ story.application.title }}
        <i class="ml-1 fas fa-tag" />
      </router-link>
    </p>
    <p
      class="mb-4 text-base font-normal text-gray-600"
      v-html="story.html_summary"
    />
    <ButtonLink
      class="bg-red-700 text-white"
      :route="{ name: 'portal.news.story', params: { id: story.id }}"
    >
      <i class="fas fa-angle-right mr-2" />Lees verder
    </ButtonLink>
  </div>
</template>

<script>
import ButtonLink from '/src/components/ButtonLink.vue';

export default {
  components: {
    ButtonLink
  },
  props: {
    story: {
      required: true
    }
  }
};
</script>
