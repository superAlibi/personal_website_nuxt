
import {
  UpdateCredential,
} from "~/database/resume";
export default defineEventHandler(async (event) => {
  const value = await readBody(event)
  const result = await UpdateCredential(value);
  if (result.ok) {
    return value.id
  }
  // nuxt返回错误消息:创建失败
  throw createError({
    statusCode: 500,
    statusMessage: '创建失败',
  })
})
