import { pgClient as client } from "./postgre";
export interface DictMetaGroup {
  category: string;
  subject: string;
  metaDescription: string;
  metaSortNo: number;
}
export interface DictEnum {
  lang: string;
  label: string;
  value: string;
  description: string;
  sortNo: number;
}
export type DictMeta = DictMetaGroup & DictEnum;

export type DictDetail = DictMetaGroup & {
  dicts: DictEnum[];
};

export async function getDictRaw(prefix?: string): Promise<DictMeta[]> {
  const dynamicSql = (prefix: string) => client` where dm.classification like '%${prefix.trim()}%'`
  return client<DictMeta[]>
    `select dm.classification as category,dm.subject,dm.description as metaDescription ,dm.sortno as metaSortNo,d.lang,d.e_label as label,d.e_value as value,d.description ,d.sortno as sortNo
    from dict_meta as dm left outer join dict_enum as d on d.classification=dm.classification
    ${prefix ? dynamicSql(prefix) : client``}
    order by dm.sortno asc ,d.sortno asc ;
    `;
}

export function getDict(prefix?: string): Promise<DictDetail> {
  return getDictRaw(prefix).then((rows) => {
    return rows.reduce((pre, cur) => {
      const {
        category,
        subject,
        metaDescription,
        sortNo: metaSortNo,
        lang,
        label,
        value,
        description,
        sortNo: enumSortNo,
      } = cur;
      if (!pre.category) {
        Object.assign(pre, {
          category,
          subject,
          metaDescription,
          sortNo: metaSortNo,
          dicts: [],
        });
      }
      pre.dicts.push({ lang, label, value, description, sortNo: enumSortNo });
      return pre;
    }, {} as DictDetail);
  });
}

export async function saveDict(params: DictDetail): Promise<void> {



  client.begin(async sql => {


    //更新字典节点数据的sql
    await sql`insert into dict_meta(classification,subject,description,sortno) values(${params.category
      },${params.subject},${params.metaDescription},${params.metaSortNo})
       on conflict(classification) do update set subject=${params.subject},description=${params.metaDescription},sortno=${params.metaSortNo}`;


    // 更新字典枚举值的sql
    const formatedObj = params.dicts.map(({ label: e_label, value: e_value, ...ops }) => ({ ...ops, classification: params.category, e_label, e_value }))
    // sql`insert into public.dict_enum(classification,lang,e_label,e_value,description,sortno) values($1,$2,$3,$4,$5,$6) on conflict(classification,lang) do update set e_label=$3,e_value=$4,description=$5,sortno=$6`
    await sql`insert into public.dict_enum ${sql(formatedObj)}`



  })
}
