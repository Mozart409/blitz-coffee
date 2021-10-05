import { NotFoundError, resolver } from "blitz"
import db, { Prisma } from "db"
import * as z from "zod"

const GetAmountPerDayInput = z.object({
  // This accepts type of undefined, but is required at runtime
  createdAt: z.date().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(
  resolver.zod(GetAmountPerDayInput),
  resolver.authorize(),
  async ({ createdAt }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const amountPerDay = await db.coffee.findFirst({ where: { createdAt } })

    const amountPerDay = await db.coffee.findMany({
      orderBy: { id: "desc" },
      select: { id: true, createdAt: true, amount: true },
    })

    if (!amountPerDay) throw new NotFoundError()

    return amountPerDay
  }
)
