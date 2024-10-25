<script setup lang="ts" generic="T extends Object">
import { get, omit, pick } from "radash";
import type { TableHTMLAttributes, } from "vue";
import type { TableActionButtonsProps, TableColumn } from "./stdtable.props";


type DataIndexType = keyof T


const emit = defineEmits<{
  // 歧义:如果只是单表不会跨分页选择,则实际上不需要传入,因为可以从外部判断是否宣布选中,
  // 如果是需要跨分页选中,则该参数实际上不适用,因为不知道跨分页选中了多少
  /**
* 选择事件
* @param rows 选中的行
* @param selectAll 是否全选
*/
  (event: "select", rows: T[], selectAll: boolean): void;
  (event: "search", searchValue: string): void;
}>();
/**
 * 标准表格组件
 */
interface STDTableProps extends /* @vue-ignore */ Omit<TableHTMLAttributes, 'onSelect'> {
  class?: string;
  columns: TableColumn<T>[];
  tableList: T[];
  actions?: TableActionButtonsProps | Array<TableActionButtonsProps>;
  selection?: { type: "radio" | "checkbox", dataIndex: DataIndexType }
}
const props = defineProps<STDTableProps>()

// 已经选中的主键集合
const choosedSet = reactive(new Set());
// 出现变化,将选中集合清空
watch(props.tableList, () => {
  choosedSet.clear();
})


/**
 * 全选处理器
 * todo: 优化性能,选中应该只有一个,但是在实际绑定时,绑定了多个,可能出现多个表头可选的情况
 * @param e
 * @returns
 */
const selectAllHandler = (e: Event) => {
  if (!e.currentTarget) return;
  const { checked, dataset } = e.currentTarget as HTMLInputElement;
  if (!dataset.key) {
    return;
  }
  const propsKey = dataset["key"] as keyof T;
  if (!checked) {
    choosedSet.clear()
  } else {
    props.tableList.forEach((i) => {
      choosedSet.add(i[propsKey])
    })
  }
  emit("select", checked ? props.tableList ?? [] : [], checked)

};
const rowSelectHandler = (e: Event) => {
  const target = e.currentTarget as HTMLInputElement;
  const { checked, value, dataset = {}, type } = target;
  const propsKey = dataset["key"] as keyof T;
  if (type === "radio") {
    emit("select", props.tableList.filter((i) => value === String(i[propsKey])), false)

    return;
  }
  const currentSet = new Set(choosedSet);

  if (checked) {
    currentSet.add(value);
  } else {
    currentSet.delete(value);
  }
  if (!dataset.key) {
    return;
  }
  emit("select", props.tableList.filter((i) => currentSet.has(i[propsKey])), currentSet.size === props.tableList?.length)

  currentSet.forEach((i) => {
    choosedSet.add(i)
  })
};


defineSlots<{
  actions?: () => any;
  search?: () => any;
  header?: (prop: { config: TableColumn<T>, index: number, title: string }) => any;
  cell?: (prop: { config: TableColumn<T>, index: number, row: T, rowIndex: number, text: any }) => any;
}>()

</script>
<template>
  <div class="relative overflow-x-auto shadow-md xs:rounded-lg " :class="$props.class">
    <div v-if="$slots.actions || $slots.search || props.actions"
      class="flex justify-between items-center xs:items-start xs:flex-col flex-wrap xs:space-y-4 space-y-0 py-4 ">

      <slot name="actions" v-if="$attrs.actions || Array.isArray($attrs.actions)">
        <div class="relative group">
          <button
            class="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 "
            type="button">
            <span class="sr-only">Action button</span>
            操作
            <svg class="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
              viewBox="0 0 10 6">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m1 1 4 4 4-4" />
            </svg>
          </button>

          <div id="dropdownAction"
            class="z-10 top-9 left-0  hidden group-focus-within:block absolute divide-y divide-gray-100 rounded-lg shadow w-max bg-white dark:bg-gray-700  dark:divide-gray-600">

            <ul v-if="Array.isArray(props.actions)" class="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton">
              <li v-for="item in props.actions">
                <button v-bind="omit(item, ['label'])">
                  {{ item.label }}
                </button>
              </li>
            </ul>
            <template v-else-if="props.actions">
              <button v-bind="omit(props.actions, ['label'])"> {{ props.actions.label }}</button>
            </template>

          </div>
        </div>
      </slot>

      <slot name="search" v-if="$attrs.onSearch">
        <label for="table-search" class="sr-only">Search</label>
        <div class="relative">
          <div class="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="none" viewBox="0 0 20 20">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
            </svg>
          </div>
          <input type="text" id="table-search"
            class="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search for users" />
        </div>
      </slot>
    </div>


    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th v-if="selection?.type === 'checkbox'">
            <input type="checkbox" @change="selectAllHandler" />
          </th>
          <template v-for="(col, index) in columns">

            <!-- TODO 等待新新增选择列和操作列以及表头 -->
            <th scope="col" class="px-6 py-3" :class="col.class"
              v-bind="omit({ ...col, ...(isObject(col.header) ? col.header : {}) }, ['class'])">
              <!-- TODO 也许可以做一个动态隐藏与展示 -->
              <slot name="header" :config="col" :index="index"
                :title="isString(col.header) ? col.header : col.header.title ?? ''">
                <template v-if="isString(col.header)">
                  {{ col.header }}
                </template>
              </slot>
            </th>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="(row, rowIndex) in tableList">
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">

            <!-- TODO 等待新新增选择列和操作列 -->
            <td v-if="selection?.type">
              <input :type="selection?.type" :value="row[selection?.dataIndex]" @change="rowSelectHandler" />
            </td>
            <template v-for="(column, colIndex) in columns">
              <td class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                v-bind="omit(column, ['dataIndex', 'header'])">
                <slot name="cell" :config="column" :index="colIndex" :row="row"
                  :text="get(row, column.dataIndex as string)" :rowIndex="rowIndex">
                  {{ get(row, column.dataIndex as string) }}
                </slot>
              </td>
            </template>
          </tr>
        </template>

      </tbody>
    </table>
  </div>

</template>