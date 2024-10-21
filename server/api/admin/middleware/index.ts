

import { decodeBase64 } from "@std/encoding/base64";
import { generateAESCryptoObject } from "~/tools/crypto/server";
import { ConsoleHandler, getLogger, setup } from "@std/log";
import dayjs from "dayjs";
setup({
  handlers: {
    default: new ConsoleHandler("INFO", {
      formatter: (record) => {
        return `api/admin middleware: ${dayjs(record.datetime).format("YYYY-MM-DD HH:mm:ss")
          } [${record.levelName}] ${record.msg}`;
      },
    }),
  },
});
const dl = getLogger();
// 接口白名单列表
const whiteList: Array<string> = [];
// 加密排除名单列表
const encryptExcludeList: string[] = [];
const nobodymethods = ["GET", "HEAD"];
const decoder = new TextDecoder();
/**
 * 该目录接口专用于本站管理使用
 * todo：还未接入authing,函数内容暂未完善
 * @param req
 * @param ctx
 * @returns
 */
export default defineEventHandler(async (event) => {

  // 白名单列表
  if (whiteList.includes(event.path)) {
    return;
  }
  const t = getCookie(event, 't');

  if (!t) {
    dl.warn("没有访问令牌");
  }

  if (encryptExcludeList.includes(event.path)) {
    return;
  }

  const { data, iv } = await readBody(event);

  return generateAESCryptoObject().then(aes => aes.decrypt(decodeBase64(data), decodeBase64(iv)))
    .then((plaintext) => {
      const info = decoder.decode(plaintext);
      event.context.state = JSON.parse(info);
    })
})
