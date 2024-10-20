<script setup lang="ts">

import type { TimeLineItemProp } from "~/components/timeline.props";
import Timeline from "~/components/timeline.vue";

const timeLines: TimeLineItemProp[] = [
  {
    title: "待业",
    icon: 'uiw:coffee',
    time: "2024年7月19日 ~ 2024年8月28日",
    content:
      "搞一搞自己的网站,学习webrtc技术体系,完成个人简历网站及其后台业务逻辑",
  },
  {
    icon: "mingcute:calendar-fill",
    title: "匠心游",
    time: "2024年5月27 ~ 2024年7月19日",
    content: "toC玩家用户中心后台",
    tag: "游戏",
  },
  {
    icon: "mingcute:calendar-fill",

    title: "字屿画工程设计咨询",
    time: "2024年3月 ~ 2024年5月24日",
    content: "BIM轻量化协作平台,基于国外vimaec开源框架二次开发",
    tag: "web3d",
    /* actionProps: {
      children: (
        <span class="inline-flex justify-center items-center  text-base font-medium text-center ">
          详情
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </span>
      ),
      onClick: () => {
        console.log("你不说我还不知道");
      },
    }, */
  },
  {
    icon: "mingcute:calendar-fill",

    title: "成都掌控者科技",
    time: "2023年9月 ~ 2023年12月",
    content:
      "公司BI前端业务框架设计与业务编写,参与用户中心个性化工作台前端开发工作",
    tag: "bi",
    /*  actionProps: {
      children: (
        <span class="inline-flex justify-center items-center  text-base font-medium text-center ">
          详情
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </span>
      ),
    }, */
  },
  {
    icon: "mingcute:calendar-fill",

    title: "成都幕林科技",
    time: "2023年8月 ~ 2023年9月",
    content: "工艺流程和工厂流水线编辑业务,而工厂方则为半导体行业",
    tag: "工业互联网",
  },
  {
    icon: "mingcute:calendar-fill",

    title: "成都中联信通",
    time: "2020年12月 ~ 2023年8月",
    content: "架构设计,主导前端技术更新迭代与项目启动开发指导工作",
    tag: "支付行业",
    /*  actionProps: {
      children: (
        <span class="inline-flex justify-center items-center  text-base font-medium text-center ">
          详情
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </span>
      ),
    }, */
  },
  {
    icon: "mingcute:calendar-fill",

    title: "闲蛋猫",
    time: "2020年8月 ~ 2020年12月",
    content: "正式入坑前端,从vue开始开发微信公众号电商平台",
    tag: "电商",
    /* actionProps: {
      children: (
        <span class="inline-flex justify-center items-center  text-base font-medium text-center ">
          详情
          <svg
            class="w-3.5 h-3.5 ms-2 rtl:rotate-180"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </span>
      ),
    }, */
  },
];

</script>
<template>
  <dialog id="drawer-example"
    class="fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-white w-80 dark:bg-gray-800"
    tabindex={-1} aria-labelledby="drawer-label">
    <h5 id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
      <svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>Info
    </h5>
    <button type="button" data-drawer-hide="drawer-example" aria-controls="drawer-example"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>

    <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
      Supercharge your hiring by taking advantage of our{" "}
      <a href="#" class="text-blue-600 underline dark:text-blue-500 hover:no-underline">
        limited-time sale
      </a>
      for Flowbite Docs + Job Board. Unlimited access to over 190K
      top-ranked candidates and the #1 design job board.
    </p>
    <div class="grid grid-cols-2 gap-4">
      <a href="#"
        class="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
        Learn more
      </a>
      <a href="#"
        class="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
        Get access
        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
          viewBox="0 0 14 10">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M1 5h12m0 0L9 1m4 4L9 9" />
        </svg>
      </a>
    </div>
  </dialog>
  <Timeline className="my-9" :items="timeLines" />

</template>