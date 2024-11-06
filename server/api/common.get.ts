import { RSAOAEP } from "@advanced/crypto";
import { decodeBase64, encodeBase64 } from "@std/encoding/base64";
export default defineEventHandler(async (event) => {
  const pk = getQuery(event).pk as string;

  if (!pk) {
    throw createError({
      statusCode: 400,
      statusMessage: "publickey is required",
    });
  }
  // 将publickey解析
  const parsedPublickKey = decodeBase64(pk);
  if (!parsedPublickKey) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid public key",
    });
  }
  // 解析public key
  return RSAOAEP.parsePublicKey(parsedPublickKey)
    .then(async (key) => {
      // 给出服务器aeskey并通过publickey加密aeskey
      const serverKey = await getServerSecretKey();
      return RSAOAEP.encrypt(key, /* serverKey */new Uint8Array());
    }).then((ciphertext) => {
      // 将通过publickey加密过得aeskey返回给客户端
      return {
        data: encodeBase64(ciphertext),
      }

    }).catch((e) => {
      throw createError({
        statusCode: 400,
        statusMessage: "Invalid public key",
      });
    });
});
