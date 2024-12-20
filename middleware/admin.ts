export const DriverIDKey = "di";


const witeList = ["/admin/login"];

export default defineNuxtRouteMiddleware(async (to, from) => {
  // 在nux的中间件中获得cookie

  const jwt = useCookie("jwt", { path: "/admin" })
  const config = useRuntimeConfig()
  console.info(`${to.fullPath}`);

  if (witeList.includes(to.fullPath)) {
    console.info(to.fullPath + ":白名单访问");
    return
  }
  // const sdk = useAuthingClient();

  // 没有jwt,不予访问
  /*  if (!jwt.value) {
     const result = sdk.buildAuthorizeUrl({
       redirectUri: config.public.location + "/admin/login",
       responseType: "code",
       scope: "profile openid",
     });
     console.info(
       "/admin:检测到没有access token,重定向登陆",
       result.url,
     );
     return navigateTo(result.url)
   } 
 
 
 
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
       console.info("通过access token获得用户信息成功");
 
       contextInfo.value = user?.data
 
 
     }, async (e) => {
       await sdk.revokeToken(jwt.value!);
       jwt.value = null
       console.info(`revokeToken ${jwt.value} 成功`);
       console.error(e);
       throw createError({
         statusCode: 400,
         statusMessage: "通过access token已失效,请重新登陆",
       })
     });
     */
});
