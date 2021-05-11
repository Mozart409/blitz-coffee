import { Suspense } from "react"
import { Head, Link, usePaginatedQuery, useRouter, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCoffees from "app/coffees/queries/getCoffees"

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
    <div>
      <ul>
        {coffees.map((coffee) => (
          <li key={coffee.id}>
            <Link href={Routes.ShowCoffeePage({ coffeeId: coffee.id })}>
              <a>{coffee.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
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
        <p>
          <Link href={Routes.NewCoffeePage()}>
            <a>Create Coffee</a>
          </Link>
        </p>

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
