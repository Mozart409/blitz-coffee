/* eslint-disable react-hooks/exhaustive-deps */
import Heading from "app/core/components/Heading"
import React from "react"
import { FC } from "react"
import { AxisOptions, Chart } from "react-charts"

import { useQuery } from "blitz"

import ResizableBox from "app/core/components/ResizableBox"
import { format, compareAsc } from "date-fns"
import { Coffee } from "db"

import getUserCount from "app/query/getUserCount"

import groupBy from "lodash/groupBy"
import add from "lodash/add"
import getCoffeesGroupedByDate from "../queries/getCoffeesGroupedByDate"

interface IProps {
  coffees: Coffee[]
}

export type TCoffeesArray = DataStructure[]

export interface DataStructure {
  label: string
  data: DataItem[]
}

export interface DataItem {
  date_trunc: string
  count: number
}

export const CoffeeChart: FC<IProps> = ({ coffees }) => {
  let coffeesArray: TCoffeesArray = [
    {
      label: "Coffees",
      data: [],
    },
  ]

  let grouped_data
  let grouped_data2

  /* const cArry = async () => {
    const a = coffeesArray[0].data
    coffees.map((item) => {
      //  console.log(item.amount)

      const createdAt = format(item.createdAt, "dd.MM.yyyy")
      return a.push({ createdAt: createdAt, amount: item.amount })
    })
    grouped_data2 = groupBy(a, "createdAt")

    return grouped_data

    // return coffeesArray[0].data.sort((a, b) => a.createdAt - b.createdAt)
  }
 */
  /* const data = React.useMemo(() => ({
    getValue: (datum) => datum.grouped_data2,
  })) */

  /* const dataBackUp = React.useMemo(() => [
    {
      label: "Series 1",
      data: [
        {
          primary: new Date().toISOString(),
          secondary: 42,
        },
        {
          primary: "Ordinal Group 1",
          secondary: 16,
        },
        {
          primary: "Ordinal Group 2",
          secondary: 89,
        },
        {
          primary: "Ordinal Group 3",
          secondary: 73,
        },
        {
          primary: "Ordinal Group 4",
          secondary: 45,
        },
        {
          primary: "Ordinal Group 5",
          secondary: 19,
        },
        {
          primary: "Ordinal Group 6",
          secondary: 47,
        },
        {
          primary: "Ordinal Group 7",
          secondary: 36,
        },
        {
          primary: "Ordinal Group 8",
          secondary: 61,
        },
        {
          primary: "Ordinal Group 9",
          secondary: 3,
        },
      ],
    },
    {
      label: "Series 2",
      data: [
        {
          primary: "Ordinal Group 0",
          secondary: 51,
        },
        {
          primary: "Ordinal Group 1",
          secondary: 85,
        },
        {
          primary: "Ordinal Group 2",
          secondary: 86,
        },
        {
          primary: "Ordinal Group 3",
          secondary: 72,
        },
        {
          primary: "Ordinal Group 4",
          secondary: 72,
        },
        {
          primary: "Ordinal Group 5",
          secondary: 1,
        },
        {
          primary: "Ordinal Group 6",
          secondary: 97,
        },
        {
          primary: "Ordinal Group 7",
          secondary: 17,
        },
        {
          primary: "Ordinal Group 8",
          secondary: 94,
        },
        {
          primary: "Ordinal Group 9",
          secondary: 81,
        },
      ],
    },
    {
      label: "Series 3",
      data: [
        {
          primary: "Ordinal Group 0",
          secondary: 64,
        },
        {
          primary: "Ordinal Group 1",
          secondary: 84,
        },
        {
          primary: "Ordinal Group 2",
          secondary: 80,
        },
        {
          primary: "Ordinal Group 3",
          secondary: 36,
        },
        {
          primary: "Ordinal Group 4",
          secondary: 35,
        },
        {
          primary: "Ordinal Group 5",
          secondary: 82,
        },
        {
          primary: "Ordinal Group 6",
          secondary: 25,
        },
        {
          primary: "Ordinal Group 7",
          secondary: 75,
        },
        {
          primary: "Ordinal Group 8",
          secondary: 13,
        },
        {
          primary: "Ordinal Group 9",
          secondary: 24,
        },
      ],
    },
  ]) */

  /* const data2 = React.useMemo(
    () => [
      {
        label: "Series 1",

        data: [
          // ...
          32, 12, 6, 54, 63, 3, 3, -5,
        ],
      },

      {
        label: "Series 2",

        data: [
          // ...
          54, 4, 43, 7, 65, 3, 1, 5, -4, 3,
        ],
      },

      {
        label: "Series 3",

        data: [
          // ...
          5, 76, 7, 8, 5, 4, 3, 45, 67, 8, 32, 33, 21, -4, -32, 3,
        ],
      },
    ],

    []
  ) */

  /*   const primaryAxis = React.useMemo(
    (): AxisOptions<DataItem> => ({
      getValue: (datum) => datum.createdAt,
    }),
    []
  )

  const secondaryAxes = React.useMemo(
    (): AxisOptions<DataItem>[] => [
      {
        getValue: (datum) => datum.amount,
      },
    ],
    []
  ) */
  const [coffeeByDate] = useQuery(
    getCoffeesGroupedByDate,
    {},
    { cacheTime: 1000 * 60 * 60, staleTime: 1000 * 60 }
  )

  const data = React.useMemo(
    () => [
      {
        label: "Coffees",
        data: coffeeByDate,
      },
    ],

    []
  )

  const primaryAxis = React.useMemo(
    () => [
      {
        getValue: (datum: { date_trunc: string }) => datum.date_trunc,
      },
    ],
    []
  )

  const secondaryAxes = React.useMemo(
    () => [
      {
        getValue: (datum: { count: number }) => datum.count,
      },
    ],
    []
  )

  return (
    <div>
      <Heading type={"h1"}>Coffee Chart</Heading>
      {/* {console.log(grouped_data2)} */}
      <div>
        <pre className="dark:text-gray-200">{JSON.stringify(data, null, 2)}</pre>
      </div>
      <div className="m-2 bg-gray-200 rounded">
        <ResizableBox>
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
          />
        </ResizableBox>
      </div>
    </div>
  )
}
