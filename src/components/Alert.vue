<template>
  <div
    class="border-l-4 px-3 py-2"
    :class="cssClass"
    role="alert"
  >
    <div class="flex flex-col">
      <h3
        v-if="title"
        class="font-bold"
      >
        {{ title }}
      </h3>
      <div class="flex items-center">
        <i
          v-if="iconClass"
          class="mr-2"
          :class="iconClass"
        />
        <div class="w-full">
          <slot />
        </div>
      </div>
    </div>
    <div
      v-if="closeable"
      class="ml-auto"
    >
      <a @click.prevent="$emit('close')">
        <i class="fas fa-times fa-fw" />
      </a>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';

const icons = {
  danger: 'fas fa-exclamation-circle',
  info: 'fas fa-info-circle',
  warning: 'fas fa-bell',
  success: 'fas fa-thumbs-up'
};

const css = {
  danger: {
    'bg-red-200': true,
    'border-red-500': true,
    'text-red-700': true
  },
  warning: {
    'bg-yellow-200': true,
    'border-yellow-500': true,
    'text-yellow-700': true
  },
  info: {
    'bg-blue-200': true,
    'border-blue-500': true,
    'text-blue-700': true
  },
  success: {
    'bg-green-200': true,
    'border-green-500': true,
    'text-green-700': true
  }
};

export default {
  props: {
    type: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    title: {
      type: String,
      default: null
    },
    closeable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
  setup(props) {
    const cssClass = computed(() => {
      if (props.type) {
        return css[props.type];
      }
      return false;
    });

    const iconClass = computed(() => {
      if (props.icon) {
        return props.icon;
      }
      if (props.type) {
        return icons[props.type];
      }
      return false;
    });

    return {
      cssClass,
      iconClass
    };
  }
};
</script>
