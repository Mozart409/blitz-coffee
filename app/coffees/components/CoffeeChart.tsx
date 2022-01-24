/* eslint-disable react-hooks/exhaustive-deps */
import Heading from "app/core/components/Heading"
import React from "react"
import { FC } from "react"
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts"
import { useQuery } from "blitz"

import { format, parseISO } from "date-fns"

import getCoffeesGroupedByDate from "../queries/getCoffeesGroupedByDate"

export type TCoffeesArray = DataStructure[]

export interface DataStructure {
  label: string
  data: DataItem[]
}

export interface DataItem {
  date_trunc: string
  count: number
}

export const CoffeeChart: FC = () => {
  const [coffeeByDate] = useQuery(getCoffeesGroupedByDate, {}, { staleTime: 1000 * 5 })

  return (
    <div>
      <Heading type={"h1"}>Coffee Chart</Heading>

      <div className="m-2 bg-gray-200 rounded">
        {/* <ResizableBox>

        </ResizableBox> */}

        <div className="grid grid-cols-1 justify-items-center p-4">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={coffeeByDate}>
              <defs>
                <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7DD3FC" stopOpacity={1} />
                  <stop offset="100%" stopColor="#2451B7" stopOpacity={1} />
                </linearGradient>
              </defs>

              {/*  <Area dataKey="count" stroke="#7DD3FC" fill="url(#color)" /> */}

              <XAxis
                dataKey="date_trunc"
                axisLine={true}
                tickLine={true}
                allowDecimals={false}
                tickFormatter={(str) => {
                  const date = parseISO(str)
                  return format(date, "d, MMM")
                }}
              />

              <YAxis
                dataKey="count"
                axisLine={true}
                tickLine={true}
                type="number"
                tickCount={8}
                tickSize={1}
                domain={[0, "dataMax"]}
              />

              <Bar dataKey="count" fill="url(#color)" />

              <Tooltip content={<CustomTooltip label={""} payload={[]} />} cursor={false} />
              {/*   <Tooltip /> */}

              <CartesianGrid opacity={0.3} vertical={false} stroke="#ccc" strokeDasharray="5 5" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

interface ICustomTooltip {
  active?: boolean
  payload: payLoadItem[]
  label: string
}

interface payLoadItem {
  payload: {
    date_trunc: string
    count: number
  }
}

const CustomTooltip: FC<ICustomTooltip> = ({ active, payload, label }) => {
  if (active) {
    const count: number = payload[0].payload.count
    return (
      <div className="">
        {/* <div><h4 className="">{format(parseISO(label), "eeee, d MMM, yyyy")}</h4>
        <p className="">{count} coffees</p></div> */}

        <div className="overflow-hidden py-5 px-4 bg-white rounded-lg shadow sm:p-6">
          <dt className="text-sm font-medium text-gray-500 truncate">
            {format(parseISO(label), "eeee, d MMM, yyyy")}
          </dt>
          <dd className="mt-1 text-3xl font-semibold text-gray-900">{count}</dd>
        </div>
      </div>
    )
  }
  return null
}
