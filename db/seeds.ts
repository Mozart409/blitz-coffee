import db from "./index"
import faker from "faker"
/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
const seed = async () => {
  for (let i = 0; i < 25; i++) {
    await db.coffee.create({
      data: {
        note: faker.lorem.sentence(15) + i,
        amount: faker.datatype.number(4) + i,
        userId: "ckplmqlq70002vl7pnosptesu",
      },
    })
  }
}

export default seed
