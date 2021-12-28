<template>
  <div>
    <PageSectionTitle>
      Gebruikers
    </PageSectionTitle>
    <PageSection>
      <div class="w-full sm:w-1/2 xl:w-1/3">
        <StatCard
          icon-bg-color="bg-indigo-500"
          icon="fas fa-hashtag"
        >
          <h4 class="text-2xl font-semibold text-gray-700">
            {{ count }}
          </h4>
          <div class="text-gray-500">
            Gebruikers
          </div>
        </StatCard>
      </div>
    </PageSection>
    <PageSection>
      <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg bg-white">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="px-6 py-3 w-10 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
                <i
                  v-if="loading"
                  class="fas fa-spin fa-spinner"
                />
              </th>
              <th class="pr-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
                Naam
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
                <i class="fas fa-envelope mr-1" /> Email
              </th>
              <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 bg-gray-50 uppercase tracking-wider">
                <i class="fas fa-envelope mr-1" /> Login
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="user in users"
              :key="user.id"
            >
              <td class="px-6 py-3 border-b w-10">
                <i
                  v-show="!user.revoked"
                  class="fas fa-user"
                />
                <i
                  v-show="user.revoked"
                  class="fas fa-user-slash text-red-500"
                />
              </td>
              <td class="pr-6 py-3 border-b">
                <span class="font-medium">
                  {{ user.username }}
                </span>
              </td>
              <td class="px-6 py-3 border-b">
                <a
                  :href="'mailto:' + user.email"
                  class="text-blue-600"
                >
                  {{ user.email }}
                </a>
              </td>
              <td class="px-6 py-3 border-b">
                <div class="text-xs">
                  Succesvol: <span class="font-medium">{{ user.last_login }}</span>
                </div>
                <div class="text-xs">
                  Onsuccesvol: <span class="font-medium">{{ user.last_unsuccessful_login }}</span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </PageSection>
  </div>
</template>

<script>
import PageSection from '/@theme/components/PageSection.vue';
import PageSectionTitle from '/@theme/components/PageSectionTitle.vue';
import { computed } from 'vue';
import { useUserStore } from '/src/apps/admin/stores/userStore.js';
import StatCard from '/src/components/StatCard.vue';

export default {
  components: { StatCard, PageSectionTitle, PageSection },
  setup() {
    const userStore = useUserStore();
    const { loading } = userStore.load();

    const users = computed(() => userStore.users);
    const count = computed(() => userStore.count);

    return {
      users,
      count,
      loading
    };
  }
};
</script>
