import db from "./index"
import faker from "faker"
import { SecurePassword } from "blitz"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  const user = await db.user.findFirst({ where: { id: "1" } })

  if (!user) {
    const pw = "test"
    const hashedPassword = await SecurePassword.hash(pw.trim())
    await db.user.create({
      data: {
        id: "1",
        email: "test@test.com",
        hashedPassword,
        role: "USER",
      },
    })
  }
  for (let i = 0; i < 25; i++) {
    await db.coffee.create({
      data: {
        note: faker.lorem.sentence(35) + i,
        amount: faker.datatype.number(4) + i,
        userId: "1",
        createdAt: faker.date.recent(),
      },
    })
  }
}

export default seed
