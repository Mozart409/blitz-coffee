import React, { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCoffees from "app/coffees/queries/getCoffees"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"

import { usePlausible } from "next-plausible"
// import CoffeeChart from "app/core/components/CoffeeChart"

const ITEMS_PER_PAGE = 25

export const CoffeesList = () => {
  const plausible = usePlausible()

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ coffees, hasMore }] = usePaginatedQuery(getCoffees, {
    orderBy: { id: "desc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="mx-auto max-w-2xl">
      <div>
        <div className="mt-4">
          <Link href={Routes.NewCoffeePage()}>
            <a>
              <button
                onClick={() => plausible("createNewCoffee")}
                className="flex justify-center items-center py-2 px-4 w-full text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm dark:text-gray-300 dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                Create new coffee
              </button>
            </a>
          </Link>
        </div>

        <div className="flow-root mt-6">
          <ul className="-my-5 divide-y divide-gray-200">
            {coffees.map((coffee) => (
              <li key={coffee.id} className="py-5">
                <div className="relative focus-within:ring-2 focus-within:ring-indigo-500">
                  <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                    <Link href={Routes.EditCoffeePage({ coffeeId: coffee.id })}>
                      <a className="hover:underline focus:outline-none">
                        <span className="absolute inset-0" aria-hidden="true" />
                        Amount {coffee.amount}
                      </a>
                    </Link>
                  </h3>
                  <h4 className="text-xs font-semibold text-gray-700 dark:text-gray-500">
                    {new Date(coffee.createdAt).toLocaleString()}
                  </h4>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {coffee.note}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        {/*  <div className="mt-6">
          <a
            href="#"
            className="flex justify-center items-center py-2 px-4 w-full text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 shadow-sm hover:bg-gray-50"
          >
            View all
          </a>
        </div> */}
      </div>
      <span className="inline-flex relative z-0 mt-4 rounded-md shadow-sm">
        <button
          type="button"
          className="inline-flex relative items-center py-2 px-2 text-sm font-medium text-gray-500 bg-white rounded-l-md border border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <button
          type="button"
          className="inline-flex relative items-center py-2 px-2 -ml-px text-sm font-medium text-gray-500 bg-white rounded-r-md border border-gray-300 hover:bg-gray-50 focus:z-10 focus:ring-1 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
          disabled={!hasMore}
          onClick={goToNextPage}
        >
          <span>Next</span>
          <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
        </button>
      </span>
    </div>
  )
}

const CoffeesPage: BlitzPage = () => {
  return (
    <>
      <Head>
        <title>Coffees</title>
      </Head>

      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <CoffeesList />
        </Suspense>
      </div>
    </>
  )
}

CoffeesPage.authenticate = true
CoffeesPage.getLayout = (page) => <Layout>{page}</Layout>

export default CoffeesPage
