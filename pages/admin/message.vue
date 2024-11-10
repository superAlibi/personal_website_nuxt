<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
const columns: TableColumn<any>[] = [
  {

    header: "授权主体",
    accessorKey: "corporateName",
  },
  {
    header: "留言昵称",
    accessorKey: "nickName",
  },
  {
    header: "主题",
    accessorKey: "subject",
  },
  {
    header: "联系邮箱",
    accessorKey: "email",

  },
  {
    header: "留言",
    accessorKey: "message",
  },
]
const { data } = useFetch('/api/admin/message')
console.log(data.value);

</script>
<template>
  <NuxtLayout name="admin">
    <UTable :data="data ?? []" :columns="columns">
    </UTable>
  </NuxtLayout>
</template>