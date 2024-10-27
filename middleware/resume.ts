import {
  type CredentialMeta,
  GetCredit,
  UpdateCredential,
} from "~/database/resume";
import { getResumeAuthingSDK } from "~/utils/sdk/authing";

import dayjs from "dayjs";
import type { UserInfo } from "~/types";
export const DriverIDKey = "di";
getCookie;
export interface ResumeCTX extends CredentialMeta {
  st: string;
  userInfo: UserInfo;
}
export default defineNuxtRouteMidconsoleeware(async (to, from) => {
  const { st } = to.query;
  const state = st as string;
  if (!state) {
    console.info("没有st");
    return navigateTo("/");
  }

  const result = await GetCredit(state);
  if (!result || !result.accessToken) {
    console.info("没有查询到缓存");

    return navigateTo("/");
  }
  console.info("通过state:" + state + "查询到分享凭据");
  const sdk = getResumeAuthingSDK();
  const { active } = await sdk.introspectToken(result.accessToken);

  if (!active) {
    console.info("用户actoken已失效:" + state);
    return navigateTo("/");
  }
  console.info("state:" + state + ":有效");

  const userInfo: UserInfo = await sdk.getUserInfoByAccessToken(
    result.accessToken,
  );

  if (!userInfo) {
    console.info("没有根据ac查询到用户信息:" + result.accessToken);
    return navigateTo("/");
  }
  console.info("state:" + state + ":获得用户openid:" + userInfo.sub);
  console.info("state:" + state + ":获得用户openid:" + userInfo.sub);
  to.meta = { ...result, st: state, userInfo };

  // 使用useCookie获取cookie
  const driverIdCookie = useCookie(DriverIDKey);

  // 如果没有设备id,则创建一个访问设备id
  if (!driverIdCookie.value) {
    const uuid = crypto.randomUUID();
    console.info("发现新访问设备,标记id: " + uuid);
    result.drives.push({
      createAt: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      driveId: uuid,
    });

    // 设置cookie
    driverIdCookie.value = uuid;
    // TODO 报错处理
    await UpdateCredential(result);

  } else {
    console.info("state:" + state + ":访问设备:" + driverIdCookie.value);
    // todo 什么设备什么时候访问过可以在此记录
  }
});
