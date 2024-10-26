import { getCreditCount, GetCreditList } from "~/database/resume"

export default defineEventHandler((event) => {

  const { pageNo, pageSize, ...ops } = getQuery(event)
  if (Number.isNaN(pageNo) || !pageNo) {
    return getCreditCount().then(d => d.at(0)?.count)
  }
  return GetCreditList(
    {
      ...ops, pageNo: Number.isNaN(pageNo) ? 1 : Number.parseInt(pageNo as string),
      pageSize: Number.isNaN(pageSize) ? 1 : Number.parseInt(pageSize as string),
    }
  )
})