<script setup lang="ts">

definePageMeta({
  layout: 'admin'
})
import type { TableColumn } from "~/components/stdtable.props";
import STDTable from "~/components/stdtable.vue";



const { data } = useFetch('/api/admin/dict');
const columns: TableColumn<any>[] = [
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