<script setup lang="ts">
import STDTable from "~/components/stdtable.vue";

import { type CredentialMeta, GetCreditList } from "~/database/resume";
import { type DriveMeta } from "~/database/resume";
import type { TableActionButtonsProps, TableColumn } from "~/components/stdtable.props";


interface ResumeTableProps {
  // action: string;
  data: CredentialMeta[];
}
const props = defineProps<ResumeTableProps>();
const choosedSet = reactive(new Set<number | string>());

function handleCopy(params: string | number) {
  const newUrl = new URL(location.href);
  newUrl.pathname = "/resume";
  newUrl.searchParams.set("st", params.toString());
  const type = "text/plain";
  const blob = new Blob([newUrl.toString()], { type });
  const data = [new ClipboardItem({ [type]: blob })];
  navigator.clipboard?.write(data).then(() => {
    alert("已复制");
  });
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
const dialogRef = ref<HTMLDialogElement>();
const choosedDrive = ref<Partial<CredentialMeta>>({});

function showDetail(row: CredentialMeta) {
  unref(dialogRef)?.show();
  choosedDrive.value = row;
}
const columns: TableColumn<DriveMeta>[] = [
  {
    header: "创建时间",
    dataIndex: "createAt",
  },
  {
    header: "设备id",
    dataIndex: "driveId",
  },
  {
    header: "留言条数",
    dataIndex: "messages",

  },
]
function handleSelect(rows: CredentialMeta[]) {
  choosedSet.clear()
  rows.forEach(r => {
    choosedSet.add(r.id)
  })
}
const listColums: TableColumn<CredentialMeta>[] = [

  {
    header: "创建时间",
    dataIndex: "createAt",
  },
  {
    header: "分享目标",
    dataIndex: "corporateName",
  },
  {
    header: "有效期",
    dataIndex: "duration",
  },
  {
    header: "state",
    dataIndex: "id",
  },
  {
    header: "有效期单位",
    dataIndex: "durationUnit",
  },
  {
    header: "已查看设备",
    dataIndex: "drives",
  },
  {
    header: "分享",
    dataIndex: 'action'
  },
]

const { data, refresh } = useFetch<CredentialMeta[]>("/api/admin/resume")
async function handleDelete() {
  await useAsyncData("resumeDelete", () => {
    return $fetch("/api/admin/resume", { query: { ids: Array.from(choosedSet.values()) }, method: 'delete' })
  })
  refresh()
}
const tableActions: TableActionButtonsProps[] = [
  {
    label: "激活",
    class: "w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
    name: "action",
    value: "active",
  },
  {
    label: "禁用",
    class: "w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white",
    name: "disable",
    value: "disable",
  },
  {
    label: '删除分享',
    disabled: disabled.value,
    class: 'w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
    onClick: handleDelete
  }
  ,
  {
    label: '新增分享',
    class: 'w-full inline-block px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
    formaction: '/admin/resume/edit'
  }


]


</script>
<template>

  <dialog ref="dialogRef"
    class="fixed  rounded-lg z-40 max-h-screen p-4 overflow-y-auto transition-transform  bg-white w-max dark:bg-gray-800"
    aria-labelledby="drawer-label">
    <h5 id="drawer-label"
      class="inline-flex items-center mb-4 text-base font-semibold text-gray-500 dark:text-gray-400">
      <svg class="w-4 h-4 me-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor"
        viewBox="0 0 20 20">
        <path
          d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
      </svg>设备信息
    </h5>
    <button aria-controls="drawer-example" @click="dialogRef?.close()"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white">
      <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
      </svg>
      <span class="sr-only">Close menu</span>
    </button>

    <STDTable :tableList="choosedDrive?.drives ?? []" :columns="columns">
      <template #cell="{ config, row, rowIndex, text }">
        <template v-if="config.dataIndex === 'messages'">
          <a class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
            :href="`/admin/message?di=${row.driveId}`">
            查看({{ row.messages?.length }})
          </a>
        </template>
        <template v-else-if="config.dataIndex === 'createAt'">{{ new Date(text).toLocaleString() }} </template>
        <template v-else>{{ text }} </template>
      </template>
    </STDTable>
  </dialog>

  <STDTable class="h-full" @select="handleSelect" :tableList="data ?? []" :actions="tableActions" :columns="listColums">
    <template #cell="{ config, row, rowIndex, text }">
      <template v-if="config.dataIndex === 'drives'">
        <a @click="showDetail(row)" class="font-medium text-blue-600 dark:text-blue-500 hover:underline cursor-pointer">
          查看{`(${row.drives?.length ?? 0})`}
        </a>
      </template>
      <template v-else-if="config.dataIndex === 'action'">
        <a class="hover:cursor-pointer text-blue-600" @click="handleCopy(row.id)">
          复制
        </a>
      </template>
      <template v-else>{{ text }} </template>
    </template>
  </STDTable>
</template>
