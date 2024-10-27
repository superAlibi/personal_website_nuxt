<script setup lang="ts">
import { omit } from 'radash';
import type { TextareaHTMLAttributes } from 'vue'
export interface InputProp extends  /* @vue-ignore */  TextareaHTMLAttributes {
  label?: string;
  errormsg?: string;
}

const props = defineProps<InputProp>()
</script>
<template>
  <label class="block">
    <span class=" text-slate-700 dark:text-slate-300 block text-sm font-medium ">
      {{ label }}
    </span>
    <textarea v-bind="omit(props, ['class', 'label', 'errormsg'])" :class="props.class"
      class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-1">
    </textarea>
    <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      {{ errormsg }}
    </p>
  </label>
</template>