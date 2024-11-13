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

const choosedDrive = ref<CredentialMeta>();

function showDetail(row: CredentialMeta) {
  openDetail.value = true
  choosedDrive.value = row;
}
const columns: TableColumn<DriveMeta>[] = [
  {
    header: "创建时间",
    accessorKey: "createAt",
    cell: ({ row }) => {
      return new Date(row.original.createAt).toLocaleString()
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
        to: `/admin/message?di=${row.original.driveId}`,
        class: 'font-medium text-blue-600 dark:text-blue-500 hover:underline'
      }, `查看(${row.original.messages?.length ?? 0})`)
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
    id: 'select',
    header: ({ table }) =>
      h('UCheckbox', {
        modelValue: table.getIsAllPageRowsSelected(),
        indeterminate: table.getIsSomePageRowsSelected(),
        'onUpdate:modelValue': (value: boolean) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: 'Select all'
      }),
    cell: ({ row }) =>
      h('UCheckbox', {
        modelValue: row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean) => row.toggleSelected(!!value),
        ariaLabel: 'Select row'
      })
  },
  {
    header: "创建时间",
    accessorKey: "create_at",
  },
  {
    header: "分享目标",
    accessorKey: "com_name",
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
    accessorKey: "duration_unit",
  },
  {
    header: "已查看设备",
    cell: ({ row }) => {
      return h('a', {
        class: 'hover:cursor-pointer text-blue-600',
        onClick: () => showDetail(row.original)
      }, `查看(${row.original.drives?.length ?? 0})`)
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

const tableRef = useTemplateRef('tableRef')
</script>
<template>
  <NuxtLayout name="admin">
    <USlideover direction="right" v-model:open="openDetail" title="访客设备" description="访问过的设备列表">
      <template #body>
        <UTable :tableList="choosedDrive?.drives ?? []" :columns="columns" />
      </template>
      <template #footer>
        <UButton color="neutral" label="关闭" @click="openDetail = false" />
      </template>
    </USlideover>
    <UButtonGroup>
      <UButton icon="i-lucide-plus" label="新增分享" to="/admin/resume/edit" />
      <UButton icon="i-lucide-trash" label="删除分享" @click="handleDelete" :disabled="disabled" />
      <UButton icon="i-lucide-lock" label="禁用" :disabled="disabled" />
      <UButton icon="i-lucide-unlock" label="激活" :disabled="disabled" />
    </UButtonGroup>
    <UTable class="h-full" ref="tableRef" @select="handleSelect" :data="data ?? []" :columns="listColums" />
  </NuxtLayout>
</template>
