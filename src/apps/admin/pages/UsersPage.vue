<template>
  <div>
    <PageSectionTitle>
      {{ $route.meta.title }}
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
      <div class="grid gap-10 xl:grid-cols-2">
        <div
          v-for="user in users"
          :key="user.id"
        >
          <div class="shadow overflow-hidden rounded-lg">
            <div class="bg-gray-200 px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                <i
                  v-show="!user.revoked"
                  class="fas fa-user mr-2"
                />
                <i
                  v-show="user.revoked"
                  class="fas fa-user-slash text-red-500 mr-2"
                />
                {{ user.username }}
                <span
                  v-if="user.revoked"
                  class="text-xs mt-1 text-gray-600"
                >
                  &bull; Revoked
                </span>
              </h3>
              <p
                v-show="user.remark"
                class="mt-1 max-w-2xl text-sm text-gray-500"
              >
                {{ user.remark }}
              </p>
            </div>
            <div class="bg-white border-gray-200">
              <dl>
                <div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    <ColorIcon
                      class="bg-blue-500 text-white mr-2"
                      icon="fa fa-envelope"
                    />
                    <a
                      :href="'mailto:' + user.email"
                      class="text-blue-500"
                    >
                      {{ user.email }}
                    </a>
                  </dd>
                </div>
              </dl>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">
                  Login
                </dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  <template v-if="user.last_login">
                    <ColorIcon
                      class="bg-green-500 text-white mr-2"
                      icon="fa fa-check"
                    />
                    <span class="font-medium">{{ user.last_login }}</span><br>
                  </template>
                  <template v-if="user.last_unsuccessful_login">
                    <ColorIcon
                      class="bg-red-500 text-white mr-2"
                      icon="fa fa-times"
                    />
                    <span class="font-medium">{{ user.last_unsuccessful_login }}</span>
                  </template>
                </dd>
              </div>
            </div>
            <div class="border-t px-4 py-5 sm:px-6 flex justify-between w-full">
              <ButtonLink
                class="bg-gray-900 text-white"
                :route="{ name: 'admin.users' }"
              >
                <i class="fas fa-list mr-2" /> Detail
              </ButtonLink>
              <ButtonLink
                v-if="canUpdate(user)"
                class="bg-gray-900 text-white"
                :route="{
                  name: 'admin.users.edit',
                  params: {
                    id: user.id
                  }
                }"
              >
                <i class="fas fa-edit mr-2" /> Wijzig
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <RoutePagination
        class="border-t border-gray-200 mt-10"
        :count="count"
      />
    </PageSection>
  </div>
</template>

<script setup>
import PageSection from '/@theme/components/PageSection.vue';
import PageSectionTitle from '/@theme/components/PageSectionTitle.vue';
import { defineAbility } from '@casl/ability';
import { computed } from 'vue';
import { useUserStore } from '/src/apps/admin/stores/userStore.js';
import StatCard from '/src/components/StatCard.vue';
import { useAbility } from '/src/common/useAbility.js';
import ColorIcon from '/src/components/ColorIcon.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import RoutePagination from '/src/components/RoutePagination.vue';
import useRoutePagination from '/src/composables/useRoutePagination.js';

const paginator = useRoutePagination();

const userStore = useUserStore();
userStore.load({
  offset: paginator.offset,
  limit: paginator.limit
});

const users = computed(() => userStore.users);
const count = computed(() => userStore.count);

const customAbility = defineAbility(can => {
  can('update', 'user_accounts', { owner: true });
});
const ability = useAbility();
ability.update(ability.rules.concat(customAbility.rules));

const canUpdate = user => ability.can('update', user);
</script>
