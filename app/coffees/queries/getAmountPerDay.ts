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
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    // const amountPerDay = await db.coffee.findFirst({ where: { createdAt } })

    let amountPerDay = [
      {
        amount: 4,
        createdAt: "2021-10-06",
      },
    ]

    const amounts = await db.coffee.findMany({
      take: 25,
      orderBy: { id: "desc" },
      select: { id: true, createdAt: true, amount: true },
    })

    /* var ans = amounts
      .reduce(function (prev: Coffees, curr: Coffees) {
        if (!prev[curr.createdAt.getFullYear()]) prev[curr.createdAt.getFullYear()] = []
        prev[curr.createdAt.getFullYear()] = curr
        return prev
      }, [])
      .reduce(function (prev, curr) {
        prev.push(curr)
        return prev
      }, []) */

    var source = [
      { birthdate: "1993", name: "Ben" },
      { birthdate: "1994", name: "John" },
      { birthdate: "1995", name: "Larry" },
      { birthdate: "1995", name: "Nicole" },
      { birthdate: "1996", name: "Jane" },
      { birthdate: "1996", name: "Janet" },
      { birthdate: "1996", name: "Dora" },
    ]

    let amountsByDate = amounts[0].createdAt.getDate()

    let result = _(amounts)
      .groupBy("createdAt")
      .map(function (items, createdAt) {
        return {
          createdAt: createdAt,
          amounts: _.map(items, "amount"),
        }
      })
      .value()

    let amountsGrouped = [0]

    let coffeesByDate = [{}]

    await amounts.map((coffee) => {
      amountsGrouped.push(coffee.amount)
    })

    let coffeeSum = amountsGrouped.reduce(function (a, b) {
      return a + b
    }, 0)

    console.log("coffeeSum :", coffeeSum)
    console.log("result :", result)
    console.log("amountsByDate:", amountsByDate)

    if (!amounts) throw new NotFoundError()

    return amounts
  }
)
