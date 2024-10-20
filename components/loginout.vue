<script setup lang="ts">

const props = defineProps<{
  avatar?: string
}>()
</script>
<template>
  <div class="p-4">
    <div class="flex gap-1 items-center">
      <div class="relative inline-block group">
        <img class="size-8 rounded-full peer" :src="props?.avatar || '/default-user-avatar.png'" alt="user_picture"
          srcset="" />
        <div class="absolute z-10 top-0 left-0 size-8 hidden group-hover:block">
          <a href="/admin/loginout" title="退出登陆"
            class=" size-full flex items-center bg-opacity-50 bg-orange-500 text-white justify-center rounded-full shadow-md ">
            <Icon name="tdesign:poweroff" />
          </a>
        </div>
      </div>
    </div>
  </div>
</template>