import { getPool } from "./postgre";
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
  const client = await getPool().connect();
  const first =
    `select dm.classification as category,dm.subject,dm.description as metaDescription ,dm.sortno as metaSortNo,d.lang,d.e_label as label,d.e_value as value,d.description ,d.sortno as sortNo
    from dict_meta as dm left outer join dict_enum as d on d.classification=dm.classification`;
  const second = prefix ? ` where dm.classification like '%${prefix}%'` : " ";
  const end = ` order by dm.sortno asc ,d.sortno asc ;`;

  return client.query<DictMeta>(
    [first, second, end].join(" "),
  ).then((result) => {
    return result.rows;
  }).finally(() => {
    client.release();
  });
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
  //更新字典节点数据的sql
  const insertMtaSql = `
    insert into dict_meta(classification,subject,description,sortno) values($1,$2,$3,$4) on conflict(classification) do update set subject=$2,description=$3,sortno=$4;
  `;
  // 更新字典枚举值的sql
  const insertEnumSql = `
  insert into dict_enum(classification,lang,e_label,e_value,description,sortno) values($1,$2,$3,$4,$5,$6) on conflict(classification,lang) do update set e_label=$3,e_value=$4,description=$5,sortno=$6;
`;
  const client = await getPool().connect();

  // 创建事务对象
  /* const t = client.createTransaction("wtf", {
    isolation_level: "repeatable_read",
  }); */
  // 开启事务
  // await t.begin();
  try {
    await client.query(insertMtaSql, [
      params.category,
      params.subject,
      params.metaDescription,
      params.metaSortNo,
    ]);
    // const savepoint = await t.savepoint("update_dict_enum");
    const tempstr = params.dicts.map((i) => {
      const value = [
        params.category,
        i.lang,
        i.label,
        i.value,
        i.description,
        i.sortNo,
      ];
      return `(${value.join(",")})`;
    }).join(",");
    /* await client.queryArray`
  insert into
  dict_enum(type,lang,label,value,description,sortno)
  values
  ${tempstr}
`; */
    for (const element of params.dicts) {
      await client.query(insertEnumSql, [
        params.category,
        element.lang,
        element.label,
        element.value,
        element.description,
        element.sortNo,
      ]);
    }
    console.log(tempstr);
  } catch (e) {
    console.error(e);
  }

  // await t.commit();
  client.release();
}
