import { NotFoundError, resolver } from "blitz"
import db, { Prisma } from "db"
import * as z from "zod"
import _ from "lodash"

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

const GetAmountPerDayInput = z.object({
  // This accepts type of undefined, but is required at runtime
  // createdAt: z.date().optional().refine(Boolean, "Required"),
  createdAt: z.date().optional(),
})

export default resolver.pipe(
  resolver.zod(GetAmountPerDayInput),
  resolver.authorize(),
  async ({ createdAt }) => {
    const amounts = await db.coffee.groupBy({
      by: ["createdAt"],
      _sum: { amount: true },
      orderBy: {
        createdAt: "desc",
      },
    })

    console.log("amounts:", amounts)

    if (!amounts) throw new NotFoundError()

    return amounts
  }
)
