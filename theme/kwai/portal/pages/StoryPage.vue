<template>
  <ContentLayout
      image="/assets/portal/news.jpg"
  >
    <template #title>
      <h1 class="text-white font-semibold text-4xl mb-2">
        Nieuws <Spinner v-if="loading"></Spinner>
      </h1>
    </template>
    <div v-if="!loading && story">
      <div
          class="text-center my-2"
      >
        <h3 class="text-4xl font-semibold leading-normal text-gray-800">
          {{ story.title }}
        </h3>
        <p class="mb-3 text-sm font-normal text-gray-500">
          {{ story.publish_date }}
        </p>
        <p
            class="text-gray-500"
            v-html="story.summary"
        >
        </p>
      </div>
      <div
          class="mt-10 py-6 border-t border-gray-300 markdown"
          v-if="story.has_more"
          v-html="story.content"
      >
      </div>
    </div>
  </ContentLayout>
</template>

<style>
.markdown h1 {
  @apply text-3xl font-bold my-2;
}
.markdown h2 {
  @apply text-2xl font-bold my-2;
}
.markdown h3 {
  @apply text-xl font-bold my-2;
}
.markdown h4 {
  @apply text-lg font-bold mb-2;
}

.markdown ul {
  @apply list-disc list-inside pl-1 mb-4;
}

.markdown li {
  @apply mb-4;
}

.markdown li p {
  @apply inline;
}

.markdown p {
  @apply mb-4;
}

.markdown a {
  @apply text-blue-600;
}

.markdown a:hover {
  @apply underline;
}

.markdown blockquote {
  @apply p-2 bg-gray-100 mb-4 border-l-4 border-gray-400 italic;
}
.markdown blockquote p {
  @apply mb-0;
}
</style>

<script>
import ContentLayout from '/@theme/layouts/ContentLayout.vue';
import AngledSection from '/src/components/AngledSection.vue';
import Spinner from '/src/components/Spinner.vue';

import useNewsStory from '/src/apps/portal/composables/useNewsStory.js';

export default {
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    AngledSection,
    ContentLayout,
    Spinner
  },
  setup(props) {
    const { story, loading, error } = useNewsStory(props.id);

    return {
      story,
      loading,
      error
    };
  }
}
</script>
