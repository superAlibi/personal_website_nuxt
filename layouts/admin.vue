<script setup lang="ts">
import type { UserDto } from 'authing-node-sdk/dist/models';
import type { MenuItem } from '~/components/NavBar';
import Sidebar from '~/components/Sidebar.vue';
const menus: MenuItem[] = [
  { name: "首页", href: "/admin", },
  { name: "简历分享", href: "/admin/resume", },
  { name: "留言", href: "/admin/message", },
  { name: "字典管理", href: "/admin/enum", },
];

const user = useState<UserDto>('apiAdminContextInfo')
</script>
<template>

  <div class="admin_layout md:flex">
    <Sidebar :menus="menus">
      <template #actions>
        <Loginout :avatar="user?.photo" />
      </template>
    </Sidebar>
    <main class="p-4 sm:ml-64 grow px-4 pt-4 md:min-h-screen md:overflow-x-hidden">
      <slot />
    </main>
  </div>
</template>