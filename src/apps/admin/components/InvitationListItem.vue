<template>
  <div class="grid md:col-span-5 grid-row-2 gap-2">
    <div class="font-medium">
      {{ invitation.name }}
    </div>
    <div class="text-sm">
      <ColorIcon
        class="bg-blue-500 text-white mr-2"
        icon="fa fa-envelope"
      />
      <a
        :href="'mailto:' + invitation.email"
        class="text-blue-500"
      >
        {{ invitation.email }}
      </a>
    </div>
  </div>
  <div class="md:col-span-5 text-sm">
    <div
      v-if="confirmedAt"
    >
      <ColorIcon
        class="bg-green-500 text-white mr-2"
        icon="fa fa-check"
      />
      Bevestigt op <span class="font-medium">{{ confirmedAt }}</span>
    </div>
    <div
      v-else-if="isExpired"
    >
      <ColorIcon
        class="bg-red-500 text-white mr-2"
        icon="fa fa-ban"
      />
      Vervallen op <span class="font-medium">{{ expirationDate }}</span>
    </div>
    <div v-else>
      Vervalt op <span class="font-medium">{{ expirationDate }}</span>
    </div>
  </div>
  <div class="md:col-span-2 flex flex-row flex-wrap justify-end">
    <div class="self-end md:items-stretch">
      <ButtonLink
        v-if="!isConfirmed && isExpired"
        class="bg-green-700 text-white md:w-full"
        @click="() => emit('renewInvitation', invitation)"
      >
        <i class="fas fa-power-off mr-2" />Hernieuw
      </ButtonLink>
      <ButtonLink
        v-if="!isConfirmed"
        class="bg-red-600 text-white md:w-full"
        @click="() => emit('removeInvitation', invitation)"
      >
        <i class="fas fa-trash mr-2" />Verwijder
      </ButtonLink>
    </div>
  </div>
</template>

<script setup>
import ColorIcon from '/src/components/ColorIcon.vue';

import { computed } from 'vue';
import dayjs from '/src/common/useDayJS.js';
import ButtonLink from '/src/components/ButtonLink.vue';

const props = defineProps({
  invitation: {
    type: Object,
    required: true
  }
});
const emit = defineEmits([
  'removeInvitation',
  'renewInvitation'
]);

const confirmedAt = computed(() => props.invitation.confirmed_at?.format('L LTS'));
const isConfirmed = computed(() => props.invitation.confirmed_at !== null);
const expirationDate = computed(() => props.invitation.expired_at.format('L LTS'));
const isExpired = computed(() => props.invitation.expired_at.isBefore(dayjs()));
</script>
