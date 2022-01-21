import { NotFoundError, resolver } from "blitz"
import db, { Prisma } from "db"
import * as z from "zod"

interface ICoffeeChartProps {
  coffees: Coffees[]
}

interface Coffees {
  id: string
  createdAt: Date
  updatedAt: Date
  userID: string
  note: string
  amount: number
}

export default resolver.pipe(resolver.authorize(), async ({}) => {
  const coffesByDate = await db.$queryRaw`
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

  if (!coffesByDate) throw new NotFoundError()

  return coffesByDate
})
