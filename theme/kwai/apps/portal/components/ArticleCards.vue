<template>
  <div class="flex flex-wrap justify-center gap-10">
    <div
      v-for="article in articles"
      :key="article.id"
      class="w-full md:w-1/3"
    >
      <IconCard
        :title="article.title"
        class="bg-white h-full p-3"
      >
        <div class="flex flex-col justify-between h-full">
          <div
            class="grow text-sm"
            v-html="article.summary"
          />
          <div class="mt-2">
            <ButtonLink
              class="bg-red-700 text-white mt-6"
              :method="() => gotoArticle(article.id)"
            >
              <i class="fas fa-angle-right mr-2" />Lees verder
            </ButtonLink>
          </div>
        </div>
      </IconCard>
    </div>
  </div>
</template>
<script>
import ButtonLink from '/src/components/ButtonLink.vue';
import IconCard from '/src/components/IconCard.vue';

export default {
  components: { ButtonLink, IconCard },
  props: {
    articles: {
      type: Array,
      required: true
    },
    gotoArticle: {
      type: Function,
      required: true
    }
  }
};
</script>
