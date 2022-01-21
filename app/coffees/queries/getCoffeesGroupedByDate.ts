import { NotFoundError, resolver } from "blitz"
import db, { Prisma } from "db"
import * as z from "zod"

type TcBD = cBD_Item[]

interface cBD_Item {
  date_trunc: string
  count: number
}

export default resolver.pipe(resolver.authorize(), async ({}) => {
  const coffesByDateFalse: TcBD = await db.$queryRaw`
  select
  date_trunc('day', "createdAt"),
  -- or hour, day, week, month, year
  count(1)
  from
  "Coffee"
  group by
  1
  order by
  date_trunc DESC
  limit 20
  `

  if (!coffesByDateFalse) throw new NotFoundError()

  const coffesByDate = coffesByDateFalse.reverse()
  return coffesByDate
})
