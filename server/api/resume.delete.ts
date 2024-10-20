import {
  DeleteCredit,
} from "~/database/resume";
export default defineEventHandler(async (event) => {
  const credits: number[] = await readBody(event);
  await DeleteCredit(credits);
  return '已删除'
})
