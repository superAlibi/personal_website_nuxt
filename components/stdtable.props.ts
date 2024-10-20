
import type { ThHTMLAttributes, ButtonHTMLAttributes, TdHTMLAttributes } from "vue";

interface BaseColumnType {
  header: string | ThHTMLAttributes;
}


/**
 * 表格列配置
 */
export interface TableColumn<T> extends BaseColumnType, TdHTMLAttributes {
  dataIndex: keyof T | string;
};
export interface TableActionButtonsProps extends ButtonHTMLAttributes {
  label: string;
}


