import { resolver, NotFoundError } from "blitz"
import db from "db"
import * as z from "zod"

const GetCoffee = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetCoffee), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const coffee = await db.coffee.findFirst({ where: { id } })

  if (!coffee) throw new NotFoundError()

  return coffee
})
