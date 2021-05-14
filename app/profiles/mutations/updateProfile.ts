import { resolver } from "blitz"
import db from "db"
import * as z from "zod"

const UpdateProfile = z
  .object({
    name: z.string(),
  })
  .nonstrict()

export default resolver.pipe(
  resolver.zod(UpdateProfile),
  resolver.authorize(),
  async ({ id, ...data }, ctx) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const user = await db.user.update({ where: { id: ctx.session.userId }, data })

    return user
  }
)
