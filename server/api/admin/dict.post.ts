export default defineEventHandler(async (event) => {
  const saveInfo = await readBody(event) as DictDetail;

  return saveDict(saveInfo).then(() => {
    return {
      message: "ok",
    }
  });
});
