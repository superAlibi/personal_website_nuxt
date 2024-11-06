import { AuthenticationClient } from "authing-sdk";

export const useAuthingClient = (ac?: string) => {
  return new AuthenticationClient({
    appId: process.env.AUTHING_APP_ID!,
    appHost: process.env.ADMIN_AUTHING_DOMAIN!,
    appSecret: process.env["AUTHING_SECRET_KEY"],
    // 很重要，这个错误，接口会直接返回400错误
    redirectUri: process.env["location"] + "/admin/login",
    accessToken: ac,
  });
};
