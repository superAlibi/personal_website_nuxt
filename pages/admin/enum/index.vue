<script setup lang="ts">


import type { TableColumn } from "~/components/stdtable.props";
import STDTable from "~/components/stdtable.vue";

import { type DictMeta, getDictRaw } from "~/database/dict";


const { data } = useAsyncData("enumList", () => getDictRaw());
const columns: TableColumn<DictMeta>[] = [
  {
    header: "字典分类代码",
    dataIndex: "category",
  },
  {
    header: "字典概要",
    dataIndex: "subject",
  },
  {
    header: "详细描述",
    dataIndex: "metaDescription",
  },
];

</script><template>
  <STDTable :columns="columns" :tableList="data ?? []">
    <template #actions>
      <button class="w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
        @click="navigateTo('/admin/enum/edit')">
        新增
      </button>
    </template>
  </STDTable>
</template>