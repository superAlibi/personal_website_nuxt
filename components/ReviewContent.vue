<script setup lang="ts">
import { omit } from 'radash'
import type { ReviewContentProps } from './ReviewContent';


const props = defineProps<ReviewContentProps>()
defineSlots<{
  metas: any
}>
</script>


<template>
  <article class=" gap-0 md:gap-8 grid md:grid-cols-3 grid-cols-1 md:max-w-5xl mx-auto">
    <div>
      <div class="flex items-center mb-6">
        <!-- 头像 -->
        <template v-if="typeof userAvatar === 'string'">
          <img class="w-10 h-10 rounded-full" :src="userAvatar || '/profile-picture-5.jpg'" alt="avatar image" />
        </template>
        <template v-else-if="typeof userAvatar === 'object'">
          <img v-bind="userAvatar" />
        </template>

      </div>
      <slot name="metas">

        <ul class="space-y-4 text-sm text-gray-500 dark:text-gray-400">

          <li v-for="{ link, ...ops } in metas" v-bind="ops" :class="`flex items-center `">
            <Icon :name="ops.icon" />
            <template v-if="typeof link === 'string'">
              {{ link }}
            </template>
            <template v-else>
              <a v-bind="omit(link, 'children')">{{ link.children }}</a>
            </template>
          </li>
        </ul>
      </slot>

    </div>
    <div class="col-span-2 xs:mt-6 sm:mt-6 mt-0">
      <div class="flex items-start mb-5">
        <div class="pe-4">

          <footer v-if="subject">
            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
              最近更新:{" "}
              <time datetime="2022-01-20 19:00">
                {{ updateTime }}
              </time>
            </p>
          </footer>

          <h4 class="text-xl font-bold text-gray-900 dark:text-white ">
            <span>{{ subject }}</span>

            <span v-if="averageScore"
              class="ms-2 bg-blue-700 text-white text-sm font-semibold inline-flex items-center p-1.5 rounded">
              {{ averageScore }}
            </span>

          </h4>
        </div>
      </div>
      <template v-if="Array.isArray(description)">
        <p v-for="(item, index) in description" :key="index"
          :class="`${!index ? 'mb-2' : 'mb-5'} text-gray-500 dark:text-gray-400`">{{ item }}</p>
      </template>
      <template v-else>
        <p class="mb-2 text-gray-500 dark:text-gray-400">{{ description }}</p>
      </template>


      <aside class="flex items-center mt-3">
        <a href="#"
          class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
          <svg class="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 18 18">
            <path
              d="M3 7H1a1 1 0 0 0-1 1v8a2 2 0 0 0 4 0V8a1 1 0 0 0-1-1Zm12.954 0H12l1.558-4.5a1.778 1.778 0 0 0-3.331-1.06A24.859 24.859 0 0 1 6 6.8v9.586h.114C8.223 16.969 11.015 18 13.6 18c1.4 0 1.592-.526 1.88-1.317l2.354-7A2 2 0 0 0 15.954 7Z" />
          </svg>
          nice
        </a>
        <a href="#"
          class="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-500 group ms-5">
          <svg class="w-3.5 h-3.5 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
            viewBox="0 0 18 18">
            <path
              d="M11.955 2.117h-.114C9.732 1.535 6.941.5 4.356.5c-1.4 0-1.592.526-1.879 1.316l-2.355 7A2 2 0 0 0 2 11.5h3.956L4.4 16a1.779 1.779 0 0 0 3.332 1.061 24.8 24.8 0 0 1 4.226-5.36l-.003-9.584ZM15 11h2a1 1 0 0 0 1-1V2a2 2 0 1 0-4 0v8a1 1 0 0 0 1 1Z" />
          </svg>
          bad
        </a>
      </aside>
    </div>
  </article>
</template>