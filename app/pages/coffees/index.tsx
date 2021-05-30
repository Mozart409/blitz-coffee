import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCoffees from "app/coffees/queries/getCoffees"
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid"

const ITEMS_PER_PAGE = 100

export const CoffeesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ coffees, hasMore }] = usePaginatedQuery(getCoffees, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div className="mt-4">
      <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
        <div className="px-4 py-2 sm:px-6">
          <div className="bg-white px-4 sm:px-6">
            <div className="-ml-4 -mt-2 flex items-center justify-between flex-wrap sm:flex-nowrap">
              <div className="ml-4 mt-2">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Coffee List</h3>
              </div>
              <div className="ml-4 mt-2 flex-shrink-0">
                <button
                  type="button"
                  className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  <Link href={Routes.NewCoffeePage()}>
                    <a>Create new coffee</a>
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <ul className="divide-y divide-gray-200">
            {coffees.map((coffee) => (
              <li key={coffee.id} className="py-4">
                <Link href={Routes.ShowCoffeePage({ coffeeId: coffee.id })}>
                  <a>
                    <div className="border-t border-gray-200 px-2 sm:p-0">
                      <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-4 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Note</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {coffee.note}
                          </dd>
                        </div>

                        <div className="py-4 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Amount</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {coffee.amount}
                          </dd>
                        </div>

                        <div className="py-4 sm:py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                          <dt className="text-sm font-medium text-gray-500">Time</dt>
                          <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {coffee.createdAt.toLocaleString()}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="relative z-0 inline-flex shadow-sm rounded-md">
        <button
          type="button"
          className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          disabled={page === 0}
          onClick={goToPreviousPage}
        >
          <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
          <span>Previous</span>
        </button>
        <button
          type="button"
          className="-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
          disabled={!hasMore}
          onClick={goToNextPage}
        >
          <span>Next</span>
          <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
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
