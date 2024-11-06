<script setup lang="ts">
import type { MenuItem } from "~/components/NavBar";
import Header from "~/components/Navbar.vue";
import ThemeTrigger from "~/components/theme-trigger.vue";
import type { UserInfo } from "~/types";

const menus: MenuItem[] =
  [{ name: "简历首页", href: ("/resume"), },
  {
    name: "关于我", href: ("/resume/about"),
  },
  {
    name: "联系我"
    , href: ("/resume/contacts"),
  },
  ]
</script>
<template>

  <Head>
    <title>{{ name ?? nickname }}的简历</title>
  </Head>
  <div class="min-h-screen flex flex-col">
    <nav class="bg-white relative border-gray-200 dark:bg-gray-900 flex-shrink-0">
      <div class="max-w-7xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a href="/resume" class="flex items-center space-x-3 rtl:space-x-reverse">
          <span
            class="bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-red-700 to-yellow-600 dark:from-red-200 dark:via-red-300 dark:to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium ">
            {{ name ?? nickname }}的简历
          </span>
        </a>
        <div class="flex items-center justify-between gap-8">
          <ThemeTrigger class="inlib-block md:hidden" />
          <Header :items="menus" />
          <ThemeTrigger class="hidden md:inline-block" />
        </div>
      </div>
    </nav>
    <div class="flex-grow">
      <slot />
    </div>

    <footer class="bg-white rounded-lg shadow m-4 dark:bg-gray-800 flex-shrink-0">
      <div class="w-full mx-auto max-w-7xl p-4 xl:flex xl:items-center xl:justify-between">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2024{" "}
          <a href="https://xjm.deno.dev" class="hover:underline">
            徐家铭
          </a>
        </span>
        <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 xl:mt-0">
          <li>
            <a href="/resume/about" class="hover:underline me-4 md:me-6">
              关于我
            </a>
          </li>
          <li>
            <a href="/resume/contacts" class="hover:underline">
              联系方式
            </a>
          </li>
        </ul>
      </div>
    </footer>
  </div>
</template>