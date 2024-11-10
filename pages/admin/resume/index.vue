<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';
import { useClipboard } from '@vueuse/core';

const openDetail = ref(false)
const choosedSet = reactive(new Set<number | string>());
const { copy, isSupported } = useClipboard()
function handleCopy(params: string | number) {
  if (!isSupported.value) {
    alert('不支持复制')
    return
  }
  const newUrl = new URL(location.href);
  newUrl.pathname = "/resume";
  newUrl.searchParams.set("st", params.toString());
  copy(newUrl.toString())

}


/**
 * 删除处理逻辑
 */
const commiting = ref(false);
const disabled = computed(() => {
  return !choosedSet.size || commiting.value;
});

/**
 * 查看访问设备
 */

const choosedDrive = ref<CredentialMeta>({});

function showDetail(row: CredentialMeta) {
  openDetail.value = true
  choosedDrive.value = row;
}
const columns: TableColumn<DriveMeta>[] = [
  {
    header: "创建时间",
    accessorKey: "createAt",
    cell: ({ row }) => {
      return new Date(row.createAt).toLocaleString()
    }
  },
  {
    header: "设备id",
    accessorKey: "driveId",
  },
  {
    header: "留言条数",
    accessorKey: "messages",
    cell: ({ row }) => {
      return h('a', {
        to: `/admin/message?di=${row.driveId}`,
        class: 'font-medium text-blue-600 dark:text-blue-500 hover:underline'
      }, `查看(${row.messages?.length ?? 0})`)
    }
  },
]
function handleSelect(e: any[]) {
  const rows = e
  choosedSet.clear()
  rows.forEach(r => {
    choosedSet.add(r.id)
  })
}
const listColums: TableColumn<CredentialMeta>[] = [

  {
    header: "创建时间",
    accessorKey: "createAt",
  },
  {
    header: "分享目标",
    accessorKey: "corporateName",
  },
  {
    header: "有效期",
    accessorKey: "duration",
  },
  {
    header: "state",
    accessorKey: "id",
  },
  {
    header: "有效期单位",
    accessorKey: "durationUnit",
  },
  {
    header: "已查看设备",
    cell: ({ row }) => {
      return h('a', {
        class: 'hover:cursor-pointer text-blue-600',
        onClick: () => showDetail(row)
      }, `查看(${row.drives?.length ?? 0})`)
    }
  },

  {
    header: "分享",
    enableHiding: false,
    cell: ({ row }) => {
      return h('a', {
        class: 'hover:cursor-pointer text-blue-600',
        onClick: () => handleCopy(row.id)
      }, '复制')
    }
  },
]

const { data, refresh } = useFetch("/api/admin/resume", { params: { pageNo: 1, pageSize: 10 }, lazy: true })
async function handleDelete() {

  await $fetch("/api/admin/resume", { query: { ids: Array.from(choosedSet.values()) }, method: 'delete' })

  refresh()
}
const tableActions = [
  {
    label: "激活",
    class: "w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",

  },
  {
    label: "禁用",
    class: "w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",

  },
  {
    label: '删除分享',
    disabled: disabled.value,
    class: 'w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
    onSelect: handleDelete
  }
  ,
  {
    label: '新增分享',
    class: 'w-full inline-block px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
    onSelect: () => {
      navigateTo('/admin/resume/edit')
    }
  }


]


</script>
<template>
  <NuxtLayout name="admin">
    <UModal v-model:open="openDetail" title="设备信息" description="访问过的设备列表">
      <template #body>
        <UTable :tableList="choosedDrive?.drives ?? []" :columns="columns" />
      </template>
      <template #footer>
        <UButton color="neutral" label="关闭" @click="openDetail = false" />
      </template>
    </UModal>
    <ClientOnly>

      <UDropdownMenu :items="tableActions" class="w-48">
        <UButton icon="i-lucide-menu" color="neutral" variant="outline" />
      </UDropdownMenu>
    </ClientOnly>
    <UTable class="h-full" @select="handleSelect" :data="data ?? []" :columns="listColums" />
  </NuxtLayout>
</template>
