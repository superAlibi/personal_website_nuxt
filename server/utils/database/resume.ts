import type { ManipulateType } from "dayjs";
// 凭据简写
export interface CredentialMeta {
  interval: [string, string]
  auScope: string[]
  /**
   * 创建时的随机字符串
   */
  id: number | string;
  /**
   * 记录创建时间
   */
  createAt: string;
  /**
   * 公司名称
   */
  corporateName: string;
  /**
   * 分享有效时间长度
   */
  duration: number;
  /**
   * 有效期单位
   */
  durationUnit: ManipulateType;
  // authing cloud的access_token
  accessToken?: string;
  //已经访问过的设备列表
  drives: DriveMeta[];
}
export interface MessageItem {

  messageid: string;
  /**
   * 创建时间
   */
  createAt: string;
  /**
   * 邮件内容
   */
  message: string;
  nickName: string;
  /**
   * 回复邮箱
   */
  email: string;
  /**
   * 邮件主题
   */
  subject: string;
}
/**
 * 设备元信息
 * 之所以单独定义接口是因为考虑拓展需求
 */
export interface DriveMeta {
  driveId: string;
  createAt: string;
  lastAccessAt?: string;
  messages?: MessageItem[];
}

/**
 * 如果给存储凭据,那就是访问所有的设备
 * 如果没有给储存凭据,那就是生成凭据,并返回凭据id
 * @param credit
 * @returns
 */
export async function GetCredit(
  credit: string,
): Promise<CredentialMeta[]> {
  const client = usePostgres()
  const result = await client<CredentialMeta[]>
    `select 
    cre.id , cre.create_at,cre.com_name,cre."interval",cre.access_token, cre.duration_unit,cre.duration,cre.au_scope
    from 
    public.credentials as cre left join public.acc_drive as ad on cre.id=ad.cre_id
    where cre.id=${credit}
    group by cre.id`


  const data = result.at(0)
  if (!data) {
    await client.end();
    return []
  }
  const drives = await client<DriveMeta[]>`
    select
      ad.id,ad.acc_time,ad.last_acc,
      count(msg.id) as msg_count
    from
	    public.acc_drive as ad left join public.messages as msg on ad.id=msg.id
    where ad.cre_id=${credit}
    group by ad.id
    `
  data.drives = drives
  await client.end()
  return [data];
}

export async function getCreditCount(): Promise<{ count: number }[]> {
  const client = usePostgres()
  const result = await client<{ count: number }[]>`select  count(id)  from public.credentials`
  await client.end()
  return result
}
/**
 * 给出所有的凭据
 * @returns
 */
export async function GetCreditList(options?: Partial<CredentialMeta> & { pageNo?: number, pageSize?: number }): Promise<CredentialMeta[]> {
  const { pageNo = 1, pageSize = 10, corporateName, ...ops } = options ?? {}
  const client = usePostgres()
  const dynamicSql = (corporateName: string) => client`where cre.com_name like %${corporateName}%`
  const result = await client<CredentialMeta[]>`
    select 
      cre.id , cre.create_at,cre.com_name,cre."interval",cre.access_token, cre.duration_unit,cre.duration,cre.au_scope,
      count(ad.id) as acc_drive_count
    from 
      public.credentials as cre 
      left join public.acc_drive as ad on cre.id=ad.cre_id
    ${corporateName ? dynamicSql(corporateName) : client``}
    group by cre.id
    limit ${pageSize} offset ${(pageNo - 1) * pageSize}
    ;`
  client.end()
  return result
}

export type UpdateCredentialParam = Omit<CredentialMeta, "createAt">;
/**
 * 创建分享信息
 * @param params
 * @returns
 */
export async function addCredential(params: CredentialMeta) {
  const client = usePostgres()
  await client`insert into public.credentials (id,com_name,interval,au_scope) 
  values
   (${params.id},${params.corporateName},$${params.interval},${params.auScope})`
  // 这行代码是用来释放数据库连接的。
  // 在完成数据库操作后，释放连接是一个良好的实践，
  // 它可以将连接返回到连接池中，供其他操作使用，
  // 从而提高数据库连接的利用效率。
  await client.end()
}
/**
 * 更新分享信息
 * @param params
 * @param credit
 * @returns
 */
export async function UpdateCredential(
  params: UpdateCredentialParam,
) {
  const client = usePostgres()
  await client`update public.credentials set 
  access_token=${params.accessToken!},
  com_name=${params.corporateName},
  interval=${params.interval},
  au_scope=${params.auScope},
  update_at=NOW()
   where id=${params.id}`
  await client.end()
}
/**
 * 根据分享id添加设备
 * @param credit
 * @param driveid
 * @returns
 */
export async function AddDriversByCredit(
  credit: number
) {
  const client = usePostgres()
  await client`insert into public.acc_drive (cre_id)
   values ($${credit})`;
  await client.end()
}
export async function updateDriveAccTime(
  credit: number,
  drives: DriveMeta,
) {
  const client = usePostgres()
  await client`update public.acc_drive set last_acc=now()   where cre_id=${credit} and id=${drives.driveId}`;
  await client.end()
}

/**
 * 删除数据
 * @param param
 */
export async function DeleteCredit(param: Array<number | string>) {
  if (!param.length) { return }
  const client = usePostgres()
  await client`delete from public.credentials where id in (${param})`
  await client.end()
}
