import { GetCreditList } from "~/database/resume";

export default defineEventHandler(async (event) => {
  const list = await GetCreditList();
  return list;
});
