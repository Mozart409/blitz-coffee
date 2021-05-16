import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateCoffee = z
  .object({
    id: z.string(),
    note: z.string().optional(),
    amout: z.number().optional(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateCoffee),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const coffee = await db.coffee.update({ where: { id }, data })

    return coffee
  }
)
