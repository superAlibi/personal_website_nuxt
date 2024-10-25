<script setup lang="ts">
import process from 'node:process'
const config = useRuntimeConfig()

/* return sdk.revokeToken(jwk)
  .then((success) => {
    if (success) {
      console.log("销毁access token 成功,重定向", loginoutPoint);
      const resp = new Response(null, {
        status: 302,
        headers: {
          Location: loginoutPoint,
        },
      });
      deleteCookie(resp.headers, "jwt", { path: "/admin" });

      return resp;
    }
    console.log("销毁access token ,返回", req.headers.get("referer")!);
    return new Response("退出登录失败", {
      status: 302,
      headers: {
        Location: req.headers.get("referer")!,
      },
    });
  }, (e) => {
    console.error(
      "退出登录失败：",
      e.response.data.error,
      ":",
      e.response.data.error_description,
    );
    console.log("撤销access c出现异常,返回上一级");

    return new Response("退出登录失败", {
      status: 302,
      headers: {
        Location: req.headers.get("referer")!,
      },
    });
  }); */

useCookie("jwt", { path: "/admin" }).value = null
navigateTo(process.env.AUTHING_LOGINOUT_POINT)
</script>