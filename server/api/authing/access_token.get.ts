export default defineEventHandler(async (event) => {
  const { code } = await readBody(event);
  if (!code) {
    return new Response(JSON.stringify({
      code: 400,
      message: "code is required",
    }));
  }
});
