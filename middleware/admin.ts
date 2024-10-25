import {
  type CredentialMeta,
} from "~/database/resume";
import { getResumeAuthingSDK } from "~/utils/sdk/authing";


import type { UserInfo } from "~/types";
import { useLogger } from "nuxt/kit";

export const DriverIDKey = "di";

export interface ResumeCTX extends CredentialMeta {
  st: string;
  userInfo: UserInfo;
}
const witeList = ["/admin/login"];

const dl = useLogger()
export default defineNuxtRouteMiddleware(async (to, from) => {
  // 在nux的中间件中获得cookie

  const jwt = useCookie("jwt", { path: "/admin" })
  const config = useRuntimeConfig()
  dl.info(`${to.fullPath}`);

  if (witeList.includes(to.fullPath)) {
    dl.info(to.fullPath + ":白名单访问");
    return
  }

  // 没有jwt,不予访问
  if (!jwt.value) {
    const sdk = getResumeAuthingSDK();
    const result = sdk.buildAuthorizeUrl({
      redirectUri: config.public.location + "/admin/login",
      responseType: "code",
      scope: "profile openid",
    });
    dl.info(
      "/admin:检测到没有access token,重定向登陆",
      result.url,
    );
    return navigateTo(result.url)
  }

  const sdk = getResumeAuthingSDK();

  const { active } = await sdk.introspectToken(jwt.value);
  if (!active) {

    jwt.value = null
    throw createError({
      statusCode: 400,
      statusMessage: "通过access token已失效,请重新登陆",
    })
  }
  sdk.setAccessToken(jwt.value);
  const contextInfo = useState('apiAdminContextInfo', () => ({}))
  return sdk.getProfile({ withCustomData: true })
    .then((user) => {
      dl.info("通过access token获得用户信息成功");

      contextInfo.value = user?.data


    }, async (e) => {
      await sdk.revokeToken(jwt.value!);
      jwt.value = null
      dl.info(`revokeToken ${jwt.value} 成功`);
      dl.error(e);
      throw createError({
        statusCode: 400,
        statusMessage: "通过access token已失效,请重新登陆",
      })
    });
});
