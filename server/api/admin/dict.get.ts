
export default defineEventHandler((event) => {
  const q = getQuery(event)
  return getDictRaw(q.prefix as string)
})