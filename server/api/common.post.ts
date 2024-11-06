import { decodeBase64, encodeBase64 } from "@std/encoding";
const decoder = new TextDecoder();
const encoder = new TextEncoder();
export default defineEventHandler(async (event) => {
  console.log("黄河收到:", event.method);
  const { data, iv } = await readBody(event);

  try {
    const bindate = decodeBase64(data);
    const biniv = decodeBase64(iv);

    if (!bindate || !biniv) {
      return new Response(
        JSON.stringify({ message: "Invalid parameter" }),
        {
          status: 400,
        },
      );
    }
    return {}
    /*  return generateAESCryptoObject().then(aes => aes.decrypt(bindate, biniv))
       .then(async (d) => {
         const data = decoder.decode(d);
         const parsedData = JSON.parse(data);
         const responsedata = JSON.stringify({
           ...parsedData,
           message: "ok",
         });
         const iv = crypto.getRandomValues(new Uint8Array(16));
         return generateAESCryptoObject().then(aes => aes.encrypt(encoder.encode(responsedata), iv))
           .then(ciphertext => ({
             data: encodeBase64(ciphertext),
             iv: encodeBase64(iv),
           }));
       }); */
  } catch (e) {
    console.error(e);
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid ciphertext",
    });
  }

});
