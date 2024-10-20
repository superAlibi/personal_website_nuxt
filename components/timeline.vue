<script setup lang="ts">
import type { OlHTMLAttributes } from "vue";
import { randomBadgeStyle, randomActionColor, type TimeLineItemProp } from "./timeline.props";
import { omit } from "radash";
interface TimeLineProp extends OlHTMLAttributes {
  items: Array<TimeLineItemProp>;
}

const props = defineProps<TimeLineProp>();
const concatCalss = computed(() => {
  return `relative border-s border-gray-200 dark:border-gray-700   ${props.class ?? ""}`
})
const ops = useOmit(props, ['class'])
</script>
<template>
  <ol :class="concatCalss" v-bind="ops">


    <li v-for="(item, index) in items" :key="index" class="mb-10 ms-6">

      <span v-if="item.icon"
        class="absolute flex items-center justify-center w-6 h-6 bg-blue-100 rounded-full -start-3 ring-8 ring-white dark:ring-[#2f2f2f] dark:bg-blue-900">
        <Icon :name="item.icon" />
      </span>

      <h3 class="flex items-center mb-1 text-lg gap-4 font-semibold flex-wrap text-gray-900 dark:text-white">
        {{ item.title }}

        <span :class="randomBadgeStyle.at(
          Math.floor(Math.random() * randomBadgeStyle.length),
        )">
          {{ item.tag }}
        </span>

      </h3>
      <time class="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
        {{ item.time }}
      </time>

      <p class="mb-4 text-base font-normal text-gray-500 dark:text-gray-400" v-html="item.content">
      </p>

      <a v-bind="omit(item.actionProps, ['class', 'children'])" class="cursor-pointer"
        :class="randomActionColor.at(Math.floor(Math.random() * randomActionColor.length))"
        v-if="item.actionProps?.children">
        {{ item.actionProps?.children }}
      </a>

    </li>
  </ol>
</template>
