<script setup lang="ts">
import type { MenuItem } from './NavBar';


defineSlots<{
  icon: (p: { item: MenuItem, index: number }) => any
}>()
interface NavBarProps {
  items: MenuItem[];
}
defineProps<NavBarProps>()
</script>
<template>
  <div class="group">
    <!-- {/* 窄屏触发展开菜单按钮 */} -->
    <button type="button"
      class=" md:hidden items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg   hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-default" aria-expanded="false">
      <span class="sr-only">打开主菜单</span>
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M1 1h15M1 7h15M1 13h15" />
      </svg>
    </button>

    <!-- {/* 菜单导航区域 */} -->
    <div class="hidden  w-full absolute left-0 right-0  md:w-auto z-10 group-focus-within:block md:block md:static"
      id="navbar-default">
      <ul
        class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
        <li v-for="(item, index) of items " key={index}>
          <a :href="item.href" :class="`block py-2 px-3 rounded md:bg-transparent  md:p-0 active:text-blue-700 active:bg-blue-500 md:active:text-blue-700 md:active:bg-inherit  md:hover:text-blue-600 ${item.active
            ? 'bg-blue-700 text-white md:text-blue-500'
            : 'text-gray-900 dark:text-white'
            }`">
            <slot name="icon" :item="item" :index="index">
              <Icon :name="item.icon" />
            </slot>
            <span>{{ item.name }}</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
