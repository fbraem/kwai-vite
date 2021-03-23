<template>
  <div>
    <Header>
      {{ article.title }}
    </Header>
    <div
      class="mb-3 italic"
      v-html="article.summary"
    />
    <div
      class="markdown"
      v-html="article.content"
    >
    </div>
  </div>
</template>

<style>
.markdown h1 {
  @apply text-2xl font-bold my-2;
}
.markdown h2 {
  @apply text-xl font-bold my-2;
}
.markdown h3 {
  @apply text-lg font-bold my-2;
}
.markdown h4 {
  @apply font-bold mb-2;
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
  @apply p-3 mb-4 border-l-4 border-gray-300 bg-gray-200;
}

.markdown blockquote p {
  @apply mb-0;
}

.markdown table {
  @apply divide-y divide-gray-200 shadow overflow-x-auto border-b border-gray-200 sm:rounded-lg mb-5;
}

.markdown table thead {
  @apply bg-gray-50;
}

.markdown table th {
  @apply px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider;
}

.markdown table td {
  @apply px-6 py-4 whitespace-nowrap;
}

.markdown table tbody {
  @apply bg-white divide-y divide-gray-200;
}

</style>

<script>
import Header from '/@theme/components/Header.vue';

export default {
  components: { Header },
  props: {
    article: {
      type: Object,
      required: true
    }
  }
};
</script>
