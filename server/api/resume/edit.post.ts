import { addCredential, type CredentialMeta } from "~/database/resume";
import { getResumeAuthingSDK } from "~/utils/sdk/authing";

export default defineEventHandler(async (event) => {
  const form = await readBody(event);
  const config = useRuntimeConfig()
  const sdk = getResumeAuthingSDK();
  const result = sdk.buildAuthorizeUrl({
    redirectUri: config.public.location + "/resume",
    // todo:调整为表单选项
    scope: "profile openid email phone",
    // 应该新增:权限配置列表,以访问额外的自定义资源

    responseMode: "form_post",
    responseType: "code token",
  });
  const params: CredentialMeta = {
    id: result.state!,
    duration: 0,
    durationUnit: "seconds",
    drives: [],
    createAt: new Date().toISOString(),
    ...form
  };
  const { ok } = await addCredential(params);
  if (!ok) {
    throw createError({
      statusCode: 500,
      message: '服务器方添加失败'
    });
  }


})