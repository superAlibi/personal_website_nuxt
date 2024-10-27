
import {
  UpdateCredential,
} from "~/database/resume";
export default defineEventHandler(async (event) => {
  const value = await readBody(event)
  await UpdateCredential(value);

})
