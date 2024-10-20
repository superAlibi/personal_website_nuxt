
import type { AnchorHTMLAttributes, ImgHTMLAttributes, LiHTMLAttributes } from 'vue';
const ExtAnchorHTMLAttributes = AnchorHTMLAttributes & { children: string }
export interface MetaProps extends LiHTMLAttributes {
  link: string | ExtAnchorHTMLAttributes
  icon?: string
}

export interface ReviewContentProps {
  userAvatar?: string | ImgHTMLAttributes;
  userName: string;
  metas: MetaProps[];
  subject: string;
  updateTime?: string;
  averageScore?: string;
  description: string[] | string;
}