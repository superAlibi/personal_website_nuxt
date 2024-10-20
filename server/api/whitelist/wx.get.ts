
// import { encode, Hash } from "https://deno.land/x/checksum@1.2.0/mod.ts";
import { createHash } from "node:crypto";
type Query = {
  signature: string;
  timestamp: string;
  nonce: string;
  echostr: string;
};


export default defineEventHandler(async (event) => {
  const token = "Gw8ShC0Sizvy5ivTdQSALw";
  const { signature, timestamp, nonce, echostr } = getQuery(event) as Query;
  const list = [token, timestamp, nonce].sort().join("");

  if (createHash('sha1').update(list).digest('hex') === signature) {
    return echostr;
  }
  return new Response("校验错误", {
    status: 403,
  });
});
