
export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const credit = query.credential
  if (credit) {
    return await GetCredit(credit as string)
  } else {
    return await GetCreditList()
  }
})

