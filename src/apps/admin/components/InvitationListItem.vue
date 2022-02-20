<template>
  <div class="grid sm:col-span-5 grid-row-2 gap-2">
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
  <div class="col-span-5 text-sm">
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
  <div class="col-span-2 flex justify-end">
    <div class="self-end">
      test
    </div>
  </div>
</template>

<script setup>
import ColorIcon from '/src/components/ColorIcon.vue';

import { computed } from 'vue';
import dayjs from '/src/common/useDayJS.js';

const props = defineProps({
  invitation: {
    type: Object,
    required: true
  }
});

const confirmedAt = computed(() => props.invitation.confirmed_at?.format('L LTS'));
const expirationDate = computed(() => props.invitation.expired_at.format('L LTS'));
const isExpired = computed(() => props.invitation.expired_at.isBefore(dayjs()));
</script>
