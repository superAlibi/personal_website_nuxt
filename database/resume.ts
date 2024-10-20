import type { ManipulateType } from "dayjs";
const BaseName = "resume";

// TODO 等待替换denokv
const kvServer = await Deno.openKv();
globalThis.addEventListener("beforeunload", () => {
  kvServer.close();
});

export interface CredentialMeta {
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
  messages?: MessageItem[];
}

/**
 * 如果给存储凭据,那就是访问所有的设备
 * 如果没有给储存凭据,那就是生成凭据,并返回凭据id
 * @param credit
 * @returns
 */
export async function GetCredit(
  credit: number | string,
): Promise<CredentialMeta> {
  const result = await kvServer.get<CredentialMeta>([BaseName, credit]);
  return result.value;
}
/**
 * 给出所有的凭据
 * @returns
 */
export async function GetCreditList(): Promise<CredentialMeta[]> {
  const result = kvServer.list<CredentialMeta>({ prefix: [BaseName] });
  return (await Array.fromAsync(result)).map((i) => i.value);
}

export type UpdateCredentialParam = Omit<CredentialMeta, "createAt">;
/**
 * 创建分享信息
 * @param params
 * @returns
 */
export function addCredential(params: CredentialMeta) {
  return kvServer.set([BaseName, params.id], params);
}
/**
 * 更新分享信息
 * @param params
 * @param credit
 * @returns
 */
export function UpdateCredential(
  params: UpdateCredentialParam,
) {
  return kvServer.set([BaseName, params.id], params);
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
  const value = await GetCredit(credit);
  if (!value) {
    return null;
  }
  const set = new Set(value?.drives?.map((i) => i.driveId));
  // 已经有了就不需要在储存
  if (!set.has(drives.driveId)) {
    value.drives.push(drives);
  }
  return UpdateCredential(value);
}
/**
 * 删除数据
 * @param param
 */
export async function DeleteCredit(param: Array<number | string>) {
  for (const iterator of param) {
    await kvServer.delete([BaseName, iterator]);
  }
}
