<template>
  <nav class="top-0 absolute z-50 w-full flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg">
    <div class="container px-4 mx-auto flex flex-wrap items-center justify-between">
      <div class="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
        <a
            class="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-no-wrap uppercase text-white"
            :href="url"
        >
          {{ title }}
        </a>
        <button
            v-if="hasMenus"
            class="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
            type="button"
            v-on:click="toggleNavBar()"
        >
          <i class="text-white fas fa-bars"></i>
        </button>
      </div>
      <div
          class="lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none"
          v-bind:class="{'hidden': !showMenu, 'block': showMenu}"
      >
        <ul class="flex flex-col lg:flex-row list-none mr-auto">
          <li
              v-for="menu in leftMenu"
              class="flex items-center"
          >
            <slot :name="'left-menu-' + menu.name ?? ''" :menu="menu">
              <NavigationMenu :menu="menu" />
            </slot>
          </li>
        </ul>
        <ul class="flex flex-col lg:flex-row list-none lg:ml-auto">
          <li
              v-for="menu in rightMenu"
              class="flex items-center"
          >
            <slot :name="'right-menu-' + menu.name" :menu="menu">
              <NavigationMenu :menu="menu"/>
            </slot>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
<script>
import { computed, ref } from 'vue';
import NavigationMenu from './NavigationMenu.vue';

export default {
  components: { NavigationMenu },
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    },
    leftMenu: {
      type: Array,
      default: []
    },
    rightMenu: {
      type: Array,
      default: []
    }
  },
  setup (props) {
    const showMenu = ref(false);

    const toggleNavBar = () => { showMenu.value = !showMenu.value; };
    const hasMenus = computed(() => props.leftMenu.length > 0 || props.rightMenu.length > 0);

    return {
      showMenu,
      toggleNavBar,
      hasMenus
    };
  }
};
</script>
