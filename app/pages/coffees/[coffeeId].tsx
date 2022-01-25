import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCoffee from "app/coffees/queries/getCoffee"
import deleteCoffee from "app/coffees/mutations/deleteCoffee"
import Heading from "app/core/components/Heading"

export const Coffee = () => {
  const router = useRouter()
  const coffeeId = useParam("coffeeId", "string")
  const [deleteCoffeeMutation] = useMutation(deleteCoffee)
  const [coffee] = useQuery(getCoffee, { id: coffeeId })

  return (
    <>
      <Head>
        <title>Coffee {coffee.id}</title>
      </Head>

      <div>
        <h2>Coffee {coffee.id}</h2>
        <pre className="dark:text-gray-100">{JSON.stringify(coffee, null, 2)}</pre>

        <div className="space-x-2">
          <button
            type="button"
            className="inline-flex items-center py-2 px-3 text-sm font-medium leading-4 text-white bg-blue-600 rounded-md border border-transparent shadow-sm hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
          >
            <Link href={Routes.EditCoffeePage({ coffeeId: coffee.id })}>
              <a> Edit</a>
            </Link>
          </button>

          <button
            type="button"
            onClick={async () => {
              if (window.confirm("This will be deleted")) {
                await deleteCoffeeMutation({ id: coffee.id })
                router.push(Routes.CoffeesPage())
              }
            }}
            className="inline-flex items-center py-2 px-3 text-sm font-medium leading-4 text-white bg-red-600 rounded-md border border-transparent shadow-sm hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  )
}

const ShowCoffeePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CoffeesPage()}>
          <a>
            <Heading type={"h1"}>Coffees Overview</Heading>
          </a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Coffee />
      </Suspense>
    </div>
  )
}

ShowCoffeePage.authenticate = true
ShowCoffeePage.getLayout = (page) => <Layout>{page}</Layout>

export default ShowCoffeePage
