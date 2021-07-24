import db from "db"

export default async function getUserCount() {
  const coffeeCount = await db.coffee.count()

  return coffeeCount
}
