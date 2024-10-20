export default defineEventHandler(async (event) => {

  Object.entries(event).forEach(([key, value]) => {
    console.log(key, value);
  });
  return {
    code: 200,
    message: "ok",
  }
});
