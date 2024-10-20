<script setup lang="ts">

import { omit } from 'radash';
import type { ButtonHTMLAttributes } from 'vue'
interface ButtonProp extends ButtonHTMLAttributes {

}
const props = defineProps<ButtonProp>()


</script>
<template>
  <button
    class="px-2 py-1 border-gray-500 border-2 rounded transition-colors bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
    :class="props.class" v-bind="omit(props, ['class'])">
    <slot />
  </button>
</template>