export default defineEventHandler(async (event) => {
  const code = getQuery(event).code as string;
  const sdk = useAuthingClient();
  if (!code) {
    console.info("没有code,需要重定向到认证中心");
    const result = sdk.buildAuthorizeUrl({
      redirectUri: "/admin/login",
      responseType: "code",
    });
    return new Response(
      null,
      {
        status: 302,
        headers: {
          Location: result.url,
        },
      },
    );
  }

  const resp = new Response(
    null,
    {
      status: 302,
      headers: {
        Location: "/admin",
      },
    },
  );

  console.log("通过code获得access token");
  return sdk.getAccessTokenByCode(code)
    .then((authingInfo) => {
      setCookie(event, "jwt", authingInfo.access_token, {
        path: "/admin",
        maxAge: authingInfo.expires_in,
      });
      sendRedirect(event, "/admin", 302);
      return resp;
    }, (e) => {
      console.error(
        "通过code获得access token 失败：",
        e.response.data.error,
        ":",
        e.response.data.error_description,
      );
      deleteCookie(event, "jwt", { path: "/admin" });
      return new Response("获取 access token 异常:" + e.response.data.error, {
        status: 500,
      });
    });
})