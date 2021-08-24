<template>
  <div class="container mx-auto p-4">
    <Header>Applicaties</Header>
    <p class="my-3">
      Dit is een overzicht van de applicaties die momenteel beschikbaar zijn.
    </p>
    <div class="grid grid-cols-2 gap-4">
      <div
        v-for="application in applications"
        :key="application.id"
        class="flex flex-col rounded bg-white overflow-hidden shadow-lg"
      >
        <div class="p-3">
          <div class="text-gray-900 font-bold text-lg mb-2">
            {{ application.title }}
          </div>
          <p class="text-sm">
            {{ application.short_description }}
          </p>
        </div>
        <div class="flex-grow border-t border-gray-200 p-3">
          {{ application.description }}
        </div>
        <div class="flex justify-between items-center p-3">
          <div class="flex space-x-2">
            <Badge
              v-if="application.has_news"
              class="bg-gray-200 text-gray-700 text-sm font-bold"
            >
              #News
            </Badge>
            <Badge
              v-if="application.has_pages"
              class="bg-gray-200 text-gray-700 text-sm font-bold"
            >
              #Pages
            </Badge>
            <Badge
              v-if="application.has_events"
              class="bg-gray-200 text-gray-700 text-sm font-bold"
            >
              #Events
            </Badge>
          </div>
          <div>
            <IconRoundLink
              v-if="canEdit"
              :route="{ name: 'author.applications.edit', params: { id: application.id } }"
              icon="fas fa-edit"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useApplications from '/src/apps/author/composables/useApplications.js';
import Header from '/@theme/components/Header.vue';
import Badge from '/src/components/Badge.vue';
import IconRoundLink from '/src/components/IconRoundLink.vue';
import { ability } from '/src/common/useAuthentication.js';
import { ref } from 'vue';

export default {
  components: { IconRoundLink, Badge, Header },
  setup() {
    const canEdit = ref(ability.can('edit', 'Application'));

    return {
      ...useApplications(),
      canEdit
    };
  }
};
</script>
