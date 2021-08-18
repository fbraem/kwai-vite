<template>
  <div class="container mx-auto p-3">
    <Header v-if="id">
      Wijzig Artikel
    </Header>
    <Header v-else>
      Nieuw Artikel
    </Header>
    <div class="rounded bg-gray-300">
      <Form
        title="Artikel"
        class="p-3"
      >
      </Form>
    </div>
  </div>
</template>

<style scoped>
</style>

<script>
import Header from '/@theme/components/Header.vue';
import Form from '/src/components/form/Form.vue';
import { useArticle } from '/src/apps/author/composables/useArticle.js';
import { computed } from 'vue';
import useApplications from '../composables/useApplications.js';

export default {
  components: { Header, Form },
  props: {
    id: {
      type: String,
      required: false,
      default: null
    }
  },
  setup(props) {
    const { applications } = useApplications();
    const articleApplications = computed(() => {
      if (applications.value) {
        return applications.value
          .filter(application => application.has_pages)
          .map(application => ({
            value: application.id,
            text: application.title
          }));
      }
      return [];
    });

    const { article } = props.id ? useArticle(props.id) : { page: ref({}) };

    return {
      article,
      articleApplications
    };
  }
};
</script>
