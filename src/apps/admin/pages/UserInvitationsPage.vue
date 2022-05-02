<template>
  <div>
    <PageSectionTitle>
      <PageSectionHeader>
        {{ $route.meta.title }}
      </PageSectionHeader>
      <div class="flex flex-row place-content-end mt-2">
        <ButtonLink
          class="bg-gray-900 text-white"
          :route="{ name: 'admin.user_invitations.create' }"
        >
          <i class="fas fa-plus mr-2" />Nieuw
        </ButtonLink>
      </div>
    </PageSectionTitle>
    <PageSection>
      <div
        class="flex items-center justify-end pb-3 divide-y"
      >
        <div class="mr-2 text-sm">
          Toon actieve uitnodigingen
        </div>
        <Switch
          v-model="showActiveInvites"
          :class="showActiveInvites ? 'bg-green-500' : 'bg-red-600'"
          class="relative inline-flex items-center h-6 rounded-full w-11"
        >
          <span class="sr-only">Toon actieve uitnodigingen</span>
          <span
            :class="showActiveInvites ? 'translate-x-6' : 'translate-x-1'"
            class="inline-block w-4 h-4 transform bg-white rounded-full"
          />
        </Switch>
      </div>
      <div class="divide-y">
        <div
          v-for="invitation in invitations"
          :key="invitation.id"
          class="grid grid-col-1 gap-4 md:gap-1 md:grid-cols-12 p-4 items-center"
        >
          <InvitationListItem
            :invitation="invitation"
            :can-update="canUpdate(invitation)"
            :can-delete="canDelete(invitation)"
            @remove-invitation="removeInvitation(invitation)"
            @renew-invitation="renewInvitation(invitation)"
          />
        </div>
        <RoutePagination
          class="border-t border-gray-200"
          :count="count"
        />
      </div>
    </PageSection>
  </div>
</template>

<script setup>
import PageSectionTitle from '/@theme/components/PageSectionTitle.vue';
import PageSectionHeader from '/@theme/components/PageSectionHeader.vue';
import PageSection from '/@theme/components/PageSection.vue';
import ButtonLink from '/src/components/ButtonLink.vue';
import InvitationListItem from '/src/apps/admin/components/InvitationListItem.vue';
import { Switch } from '@headlessui/vue';

import { useUserInvitationStore } from '/src/apps/admin/stores/userInvitationStore.js';
import RoutePagination from '/src/components/RoutePagination.vue';
import useRoutePagination from '/src/composables/useRoutePagination.js';
import { computed, ref, watch } from 'vue';
import { useAbility } from '/src/common/useAbility.js';
import dayjs from '/src/common/useDayJS.js';

const paginator = useRoutePagination();

const showActiveInvites = ref(true);
const store = useUserInvitationStore();
store.load({
  offset: paginator.offset,
  limit: paginator.limit,
  active: showActiveInvites
});

watch(showActiveInvites, () => {
  paginator.reset();
});

const invitations = computed(() => store.invitations);
const count = computed(() => store.count);

const removeInvitation = (invitation) => {
  store.remove(invitation);
};
const renewInvitation = (invitation) => {
  invitation.expired_at = dayjs().add(15, 'day');
  store.save(invitation);
};
const ability = useAbility();
const canUpdate = invitation => ability.can('update', invitation);
const canDelete = invitation => ability.can('delete', invitation);
</script>
