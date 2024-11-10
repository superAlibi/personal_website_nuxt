<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui';




const { data } = useFetch('/api/admin/dict');

const columns: TableColumn<any>[] = [
  {
    header: "字典分类代码",
    accessorKey: "category",
  },
  {
    header: "字典概要",
    accessorKey: "subject",
  },
  {
    header: "详细描述",
    accessorKey: "metaDescription",
  },
];

</script><template>
  <NuxtLayout name="admin">
    <UTable :data="data ?? []" :columns="columns">
      <template #actions>
        <button class="w-full px-4 rounded py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          @click="navigateTo('/admin/enum/edit')">
          新增
        </button>
      </template>
    </UTable>
  </NuxtLayout>
</template>
