import db from "db"

export default async function getUserCount() {
  // Do your stuff :)
  const userCount = await db.user.count()

  return userCount
}
