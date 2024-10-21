import type { ManipulateType } from "dayjs";
import { pgClient as client } from "./postgre";


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
): Promise<CredentialMeta | undefined> {
  await client.connect()

  const result = await client.query<CredentialMeta>(
    `select 
    cre.id , cre.create_at,cre.com_name,cre."interval",cre.access_token, cre.duration_unit,cre.duration,cre.au_scope
    from 
    public.credentials as cre left join public.acc_drive as ad on cre.id=ad.cre_id
    where cre.id=$1
    group by cre.id`,
    [credit])

  const data = result.rows.at(0)
  if (!data) {
    return
  }
  const drives = await client.query<DriveMeta>(`
    select
      ad.id,ad.acc_time,ad.last_acc,
      count(msg.id) as msg_count
    from
	    public.acc_drive as ad left join public.messages as msg on ad.id=msg.id
    where ad.cre_id=$1
    group by ad.id
    `,
    [credit])
  data.drives = drives.rows
  return data;
}
/**
 * 给出所有的凭据
 * @returns
 */
export async function GetCreditList(page: number = 1, size: number = 10, options: CredentialMeta = {}): Promise<CredentialMeta[]> {
  const result = await client.query<CredentialMeta>(`
    select 
      cre.id , cre.create_at,cre.com_name,cre."interval",cre.access_token, cre.duration_unit,cre.duration,cre.au_scope,
      count(ad.id) as acc_drive_count
    from 
      public.credentials as cre 
      left join public.acc_drive as ad on cre.id=ad.cre_id
    ${options.corporateName ? "where cre.com_name like '%' || $1 || '%'" : ''}
    group by cre.id
    limit $2 offset $3
    ;`,
    [options.corporateName, size, (page - 1) * size])
  return result.rows
}

export type UpdateCredentialParam = Omit<CredentialMeta, "createAt">;
/**
 * 创建分享信息
 * @param params
 * @returns
 */
export async function addCredential(params: CredentialMeta) {
  await client.query(`insert into public.credentials (id,com_name,interval,au_scope) values ($1,$2,$3,$4)`,
    [params.id, params.corporateName, params.interval, params.auScope]);
  // 这行代码是用来释放数据库连接的。
  // 在完成数据库操作后，释放连接是一个良好的实践，
  // 它可以将连接返回到连接池中，供其他操作使用，
  // 从而提高数据库连接的利用效率。
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
  await client.query(`update public.credentials set access_token=$1,com_name=$2,interval=$3,au_scope=$4,update_at=NOW() where id=$5`,
    [params.accessToken, params.corporateName, params.interval, params.auScope, params.id]);
}
/**
 * 根据分享id添加设备
 * @param credit
 * @param driveid
 * @returns
 */
export async function AddDriversByCredit(
  credit: number,
  drives: DriveMeta,
) {
  await client.query(`insert into public.acc_drive (cre_id,last_acc) values ($1,$2)`,
    [credit, drives.lastAccessAt]);
}
export async function updateDriveAccTime(
  credit: number,
  drives: DriveMeta,
) {
  await client.query(`update public.acc_drive set last_acc=now()   where cre_id=$1 and id=$2`,
    [credit, drives.driveId]);

}

/**
 * 删除数据
 * @param param
 */
export async function DeleteCredit(param: Array<number | string>) {
  if (!param.length) { return }
  await client.query(`delete from public.credentials where id in ($1)`, [param])
}
