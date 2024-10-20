
export default defineEventHandler(async (event) => {

  const code = getQuery(event).code as string;
  if (!code) {
    return new Response(JSON.stringify({
      code: 400,
      message: "code is required",
    }));
  }
  const searchParams = new URLSearchParams();
  const config = useRuntimeConfig(event);
  searchParams.set("client_id", config.public.AUTHING_APP_ID);
  searchParams.set("client_secret", config.public.AUTHING_SECRET_KEY);
  searchParams.set("grant_type", "authorization_code");
  searchParams.set(
    "redirect_uri",
    "https://xjm.deno.dev/api/authing/parsecode",
  );
  searchParams.set("code", code);
  console.log(JSON.stringify({
    "Content-Type": "application/x-www-form-urlencoded",
    "x-authing-app-id": config.public.AUTHING_APP_ID,
  }));
  const url = new URL("/oidc/token", config.public.ADMIN_AUTHING_DOMAIN);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "x-authing-app-id": config.public.AUTHING_APP_ID,
    },
    body: searchParams.toString(),
  }).then(async (r) => {
    return new Response(await r.text());
  }, (e) => {
    return new Response(e.message, { status: 500 });
  });

})
