import { getServerSecretKey } from "~/database/serverkey";
import { AESCBC } from "@advanced/crypto";

let CurrentAES: AESCBC
export async function generateAESCryptoObject() {
  return CurrentAES ?? (CurrentAES = new AESCBC(await getServerSecretKey()));
}
