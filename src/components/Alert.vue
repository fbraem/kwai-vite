<template>
  <div
      class="flex border-l-4 p-2"
      :class="cssClass"
      role="alert"
  >
    <div class="flex flex-col">
      <h3
          class="font-bold"
          v-if="title"
      >
        {{ title }}
      </h3>
      <div class="flex items-center">
        <i
            v-if="icon"
            class="mr-4"
            :class="iconClass"
        ></i>
        <div>
          <slot></slot>
        </div>
      </div>
    </div>
    <div
        class="ml-auto"
        v-if="closeable"
    >
      <a @click.prevent="$emit('close')">
        <i class="fas fa-times fa-fw"></i>
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
    'bg-red-100': true,
    'border-red-500': true,
    'text-red-700': true
  },
  warning: {
    'bg-orange-100': true,
    'border-orange-500': true,
    'text-orange-700': true
  },
  info: {
    'bg-blue-100': true,
    'border-blue-500': true,
    'text-blue-700': true
  },
  success: {
    'bg-green-100': true,
    'border-green-500': true,
    'text-green-700': true
  }
};

export default {
  props: {
    type: {
      type: String
    },
    icon: {
      type: String
    },
    title: {
      type: String
    },
    closeable: {
      type: Boolean
    }
  },
  emits: [ 'close' ],
  setup(props) {
    const cssClass = computed(() => {
      if (props.type) {
        return css[props.type];
      }
    });

    const iconClass = computed(() => {
      if (props.icon) {
        return props.icon;
      }
      if (props.type) {
        return icons[props.type];
      }
    });

    return {
      cssClass,
      iconClass
    };
  }
}
</script>
