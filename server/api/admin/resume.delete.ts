import { DeleteCredit } from "~/database/resume";

export default defineEventHandler(async (event) => {
  const ids = getQuery(event).ids as Array<string>;
  await DeleteCredit(ids);
  return {
    status: 200,
    message: "删除成功",
  };
});
