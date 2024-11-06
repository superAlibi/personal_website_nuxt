import { decodeBase64, encodeBase64 } from "@std/encoding";
const decoder = new TextDecoder();
const encoder = new TextEncoder();
export default defineEventHandler(async (event) => {
  console.log("黄河收到:", event.method);
  const { data, iv } = await readBody(event);

  const bindate = decodeBase64(data);
  const biniv = decodeBase64(iv);
  if (!bindate || !biniv) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid parameter",
    });
  }

  return {}
  /* return generateAESCryptoObject().then(aes => aes.decrypt(bindate, biniv))

    .then((d) => {
      const data = decoder.decode(d);
      const parsedData = JSON.parse(data);
      return {
        ...parsedData,
        message: "ok",
      };
    }); */

});
