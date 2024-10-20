<script setup lang="ts">
import { omit } from 'radash';
import type { InputHTMLAttributes } from 'vue'

interface InputProp extends InputHTMLAttributes {
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
    <input v-bind="omit(props, ['class', 'label', 'errormsg'])" :class="props.class" class="peer mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border
       border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      disabled:bg-slate-5 disabled:text-slate-500
       disabled:border-slate-200 disabled:shadow-none
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500" />
    <p class="mt-2 invisible peer-invalid:visible text-pink-600 text-sm">
      {{ errormsg }}
    </p>
  </label>


</template>