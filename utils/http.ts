import { decodeBase64, encodeBase64 } from "$std/encoding/base64.ts";
import { AESCBC } from "@advanced/crypto";
import {
  createFetcher,
  RequestInterceptor,
  ResponseInterceptor,
} from "@advanced/fetcher";

const textDecoder = new TextDecoder(), textEncoder = new TextEncoder();
const Whitelist = ["/api/common"];
export const createRequestInterceptor = (
  aes: AESCBC,
  whitelist: string[] = Whitelist,
) => {
  const requestInterceptor: RequestInterceptor = async (
    options,
  ) => {
    const { url, body, ...ops } = options;

    const has = whitelist.some((item) => url.includes(item));
    const config: ReturnType<RequestInterceptor> = { url, ...ops };
    if (has) {
      return { url, ...ops };
    }

    if (body) {
      let originalData: string;
      if (typeof body === "string") {
        originalData = body || "";
      } else {
        originalData = JSON.stringify(body) || "";
      }
      const bin = textEncoder.encode(originalData);
      const iv = crypto.getRandomValues(new Uint8Array(16));
      const ciphertext = await aes.encrypt(bin, iv);

      config.body = JSON.stringify({
        data: encodeBase64(ciphertext),
        iv: encodeBase64(iv),
      });
    }

    const token = localStorage.getItem("token");
    if (token) {
      if (!config.headers) {
        config.headers = {} as Record<string, string>;
      }
      (config.headers as Record<string, string>)["Authorization"] = "Bearer " +
        token;
    }

    return config;
  };
  return requestInterceptor;
};

export const createResponseInterceptor = (
  aes: AESCBC,
) => {
  const responseInterceptor: ResponseInterceptor = async (res) => {
    const resp = res as Response;
    const json = await resp.json();
    const { data, iv, message } = json;

    if (resp.ok) {
      try {
        const bin = decodeBase64(data);
        const ivBin = decodeBase64(iv);
        const plaintext = await aes.decrypt(bin, ivBin);
        return [resp, JSON.parse(textDecoder.decode(plaintext))];
      } catch (e) {
        console.error("意外:无法解码数据:", e.message);
        console.warn("无法解密数据:将返回原json");
        return [resp, json];
      }
    } else {
      return Promise.reject(new Error(message));
    }
  };
  return responseInterceptor;
};

const http = createFetcher({ baseURL: "/api/" });

export { http };
