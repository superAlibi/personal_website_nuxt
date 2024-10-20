<script setup lang="ts">

import type { ButtonHTMLAttributes } from "vue";
import { useDark, useLocalStorage, useMediaQuery } from "@vueuse/core";
interface ThemeTriggerProps extends ButtonHTMLAttributes {
}
const props = defineProps<ThemeTriggerProps>()

const darkMode = useMediaQuery("(prefers-color-scheme: dark)")
const isDark = useDark({
  initialValue: darkMode.value ? 'dark' : 'light',
})


</script>
<template>
  <button id="theme-toggle" type="button" @click="isDark = !isDark"
    class="ext-gray-500 size-6 text-center dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg "
    :class="props.class">
    <Icon :name="isDark ? 'material-symbols:light-mode-outline' : 'material-symbols:dark-mode-outline'" />
  </button>

</template>
