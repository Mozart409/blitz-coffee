import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const CreateCoffee = z
  .object({
    amout: z.number(),
    note: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(CreateCoffee),
  resolver.authorize(),
  async (input, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const coffee = await db.coffee.create({
      data: {
        ...input,
        userId: ctx.session.userId,
      },
    })

    return coffee
  }
)
