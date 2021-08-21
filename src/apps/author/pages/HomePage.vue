<template>
  <div class="container mx-auto px-4">
    <div class="py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center">
          <p class="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Beheer applicaties, nieuwsberichten en artikels.
          </p>
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-xl space-y-8 pb-8">
      <Card
        title="Applicaties"
      >
        <p>
          Applicaties zijn de bouwstenen van de website. Wijzig de titel,
          samenvatting en omschrijving.
        </p>
        <template #footer>
          <ButtonLink
            class="bg-yellow-300"
            :route="{ name: 'author.applications' }"
          >
            <i class="fas fa-list" /> Overzicht
          </ButtonLink>
        </template>
      </Card>
      <Card
        title="Nieuwsberichten"
      >
        <p>
          Beheer de nieuwsberichten op de website.
        </p>
        <template #footer>
          <div class="flex justify-between w-full">
            <ButtonLink
              class="bg-yellow-300"
              :route="{ name: 'author.news' }"
            >
              <i class="fas fa-list" /> Overzicht
            </ButtonLink>
            <ButtonLink
              class="bg-yellow-300"
              :route="{ name: 'author.news.create' }"
            >
              <i class="fas fa-plus" /> Nieuw
            </ButtonLink>
          </div>
        </template>
      </Card>
      <Card
        title="Artikels"
      >
        <p>
          Beheer de pagina's van de website.
        </p>
        <template #footer>
          <div class="flex justify-between w-full">
            <ButtonLink
              class="bg-yellow-300"
              :route="{ name: 'author.articles' }"
            >
              <i class="fas fa-list" /> Overzicht
            </ButtonLink>
            <ButtonLink
              class="bg-yellow-300"
              :route="{ name: 'author.articles.create' }"
            >
              <i class="fas fa-plus" /> Nieuw
            </ButtonLink>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>

<script setup>
import Card from '/src/components/Card.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
</script>
