import * as React from "react"
import {} from "dayjs"
import { Chart, LineAdvance } from "bizcharts"
import { useQuery } from "blitz"
import getAmountPerDay from "app/coffees/queries/getAmountPerDay"

interface ICoffeeChartProps {
  coffees: Coffees[]
}

interface Coffees {
  id: string
  createdAt: Date
  updatedAt: Date
  userID?: string
  note: string
  amount: number
}

const CoffeeChart: React.FunctionComponent<ICoffeeChartProps> = ({ coffees }) => {
  //
  const [amountPerDay] = useQuery(getAmountPerDay, { createdAt: coffees[0]?.createdAt })

  let groupedByDate: any[] = []

  coffees.map((item) => {
    const dates = item.createdAt.toDateString().split("8")
    groupedByDate.push(dates)
  })
  return (
    <div>
      <pre>{JSON.stringify(amountPerDay, null, 2)}</pre>
      {/*   <pre>{JSON.stringify(groupedByDate, null, 2)}</pre>
      <pre>{JSON.stringify(coffees, null, 2)}</pre> */}
      <div>
        <h2>Chart</h2>
        <Chart
          scale={{ value: { min: 0 } }}
          padding={[10, 20, 50, 40]}
          autoFit
          height={300}
          data={coffees}
        >
          <LineAdvance shape="smooth" point area position="createdAt*amount" />
        </Chart>
      </div>
    </div>
  )
}

export default CoffeeChart
