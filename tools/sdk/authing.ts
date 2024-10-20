import { AuthenticationClient } from "authing-node-sdk";

export const getResumeAuthingSDK = (ac?: string) => {
  const config = useRuntimeConfig()
  return new AuthenticationClient({
    appId: config.public["AUTHING_APP_ID"],
    appHost: config.public["ADMIN_AUTHING_DOMAIN"],
    appSecret: config.public["AUTHING_SECRET_KEY"],
    // 很重要，这个错误，接口会直接返回400错误
    redirectUri: config.public["location"] + "/admin/login",
    accessToken: ac,
  });
};
