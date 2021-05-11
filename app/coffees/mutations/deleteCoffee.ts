import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const DeleteCoffee = z
  .object({
    id: z.number(),
  })
  .nonstrict()

export default resolver.pipe(resolver.zod(DeleteCoffee), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const coffee = await db.coffee.deleteMany({ where: { id } })

  return coffee
})
