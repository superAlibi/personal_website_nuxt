<script setup lang="ts">

import { } from "~/components/Navbar.vue";
import type { MenuItem } from "./NavBar";
import { omit } from "radash";
import type { HTMLAttributes } from 'vue'



interface SidebarProps {
  menus: MenuItem[];
}
const props = defineProps<SidebarProps>();
defineSlots<{
  actions?: () => any;
}>();
</script>
<template>
  <div class="group relative">
    <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg">
        <path clip-rule="evenodd" fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z">
        </path>
      </svg>
    </button>
    <aside
      class="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0  group-focus-within:translate-x-0"
      :class="$props.class" v-bind="omit($attrs, ['class', 'menus'])">
      <div class="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li v-for="item in menus" :key="item.name">
            <a :href="item.href"
              class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <Icon v-if="item.icon" :name="item.icon" />
              <span class="ms-3">{{ item.name }}</span>
            </a>
          </li>
        </ul>
        <slot name="actions" />
      </div>
    </aside>
  </div>
</template>