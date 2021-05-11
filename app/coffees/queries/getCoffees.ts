import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetCoffeesInput
  extends Pick<Prisma.CoffeeFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }: GetCoffeesInput) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: coffees,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () => db.coffee.count({ where }),
      query: (paginateArgs) => db.coffee.findMany({ ...paginateArgs, where, orderBy }),
    })

    return {
      coffees,
      nextPage,
      hasMore,
      count,
    }
  }
)
