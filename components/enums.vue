<script setup lang="tsx">
import STDTable from "~/components/stdtable.vue";
import Input from "~/components/input.vue";
import Textarea from "~/components/textarea.vue";
import Button from "~/components/Button.vue";
import type { TableActionButtonsProps, TableColumn } from "~/components/stdtable.props";

const enums = defineModel<DictEnum[]>({
  default: []
})
function handlerDelete(index: number) {
  const value = enums.value;
  value.splice(index, 1);
  enums.value = [...value];
}

const columns: TableColumn<DictEnum>[] = [

  {
    header: "枚举名",
    dataIndex: "label",

  },
  {
    header: "枚举值",
    dataIndex: "value"
  },
  {
    header: "描述",
    dataIndex: "description",
  },
  {
    header: "操作",
    dataIndex: "action"
  },
];
function handlerAdd(e: MouseEvent) {
  e.stopPropagation();
  e.preventDefault();
  const value = enums.value;
  value.push({
    label: "",
    value: "",
    description: "",
    lang: "",
    sortNo: value.length,
  });
  enums.value = [...value];
}

const tableAction: TableActionButtonsProps[] = [
  {
    onClick: handlerAdd,
    class: 'w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white',
    label: '新增'
  }
]
</script>
<template>
  <STDTable :actions="tableAction" :columns="columns" :tableList="modelValue ?? []">
    <template #cell="{ row, config, index }">
      <Textarea v-if="config.dataIndex === 'description'" v-model="row.description" />
      <Input v-else-if="config.dataIndex === 'value'" v-model="row.value" />
      <Input v-else-if="config.dataIndex === 'label'" v-model="row.label" />
      <template v-else-if="config.dataIndex === 'action'">
        <Button @click="handlerDelete(index)">
          删除
        </Button>
      </template>
    </template>
  </STDTable>

</template>