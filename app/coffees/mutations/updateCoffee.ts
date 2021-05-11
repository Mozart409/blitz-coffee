import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateCoffee = z
  .object({
    id: z.number(),
    name: z.string(),
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
