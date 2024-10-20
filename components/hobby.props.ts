// 声明一个
export interface Title {
  icon?: string;
  href?: string;
  onClick?: (e: MouseEvent) => void;
  children?: string;
}
export interface HobbyItem {
  title: Title;
  description: string | Array<string>;
  key: string;
}