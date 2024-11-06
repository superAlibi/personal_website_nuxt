

export default defineEventHandler(async (event) => {


  const form = await readBody(event);

  const ac = form.get("access_token") as string;
  const state = form.get("state") as string;
  const expires_in = form.get("expires_in") as string;
  // const code = form.get("code");
  // const token_type = form.get("token_type");
  // const scope = form.get("scope");
  console.info(
    "接收到认证服务回调信息:" +
    JSON.stringify(Object.fromEntries(form.entries())),
  );
  const record = await GetCredit(state);
  if (!record) {
    console.info("接收到认证服务回调,但未查询到凭据:" + state);
    return sendRedirect(event, "/", 302);
  }

  await UpdateCredential(Object.assign(record, {
    id: state as string,
    duration: Number.parseInt(expires_in ?? "0"),
    accessToken: ac as string,
  } as CredentialMeta));
  /* if (!ok) {
    console.info("接收到认证服务回调,但更新凭据失败:" + state);
    return sendRedirect(event, "/", 302);
  } */

  const urlObj = new URL(event.path);
  urlObj.pathname = "/resume";
  urlObj.searchParams.set("st", state as string); // 传入临时state,不直接暴露access_token
  const location = urlObj.toString();
  console.info("已更新凭据,重定向至:" + location);
  return sendRedirect(event, location, 302);

})