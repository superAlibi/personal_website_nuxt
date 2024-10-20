import { getServerSecretKey } from "../../database/serverkey.js";
import { AESCBC } from "@advanced/crypto";

export const CurrentAES = new AESCBC(await getServerSecretKey());
