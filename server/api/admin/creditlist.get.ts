import { GetCreditList } from "~/database/resume"

export default defineEventHandler((event) => {

  const { pageNo, pageSize, ...ops } = getQuery(event)
  return GetCreditList(
    Number.isNaN(pageNo) ? 1 : Number.parseInt(pageNo as string),
    Number.isNaN(pageSize) ? 1 : Number.parseInt(pageSize as string),
    ops
  )
})