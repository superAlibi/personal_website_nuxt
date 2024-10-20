<script setup lang="ts">
import type { HobbyItem } from './hobby.props';

interface HobbyProps {
  items?: HobbyItem[];
}
defineProps<HobbyProps>()
const currentAction = ref<string | number>('0')
const activeclass = `inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active
      dark:text-blue-500 dark:border-blue-500 group`,
  normalClass = `inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600
      hover:border-gray-300 dark:hover:text-gray-300 group`;
</script>

<template>
  <div class="border-b border-gray-200 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      <li v-for="item, index of items" class="me-2">
        <a :href="item.title.href ?? `#${item.key}`" :class="currentAction === item.key ? activeclass : normalClass"
          @click="(e) => {
            currentAction = item.key || index;
            item.title.onClick?.(e);
          }">
          <Icon v-if="item.title.icon" :name="item.title.icon" />
          {{ item.title.children }}
        </a>
      </li>

    </ul>
    <div v-for="item, index of items"
      class="hidden target:block p-6 min-h-36 bg-gray-50 text-medium text-gray-500 dark:text-gray-400 dark:bg-gray-800 rounded-lg w-full">
      <template v-if="Array.isArray(item.description)">
        <p v-for="desc, index of item.description" :key="index">{{ desc }}</p>
      </template>
      <p v-else>{{ item.description }}</p>
    </div>
  </div>
</template>
