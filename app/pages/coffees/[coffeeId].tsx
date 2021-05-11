import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useParam, BlitzPage, useMutation, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCoffee from "app/coffees/queries/getCoffee"
import deleteCoffee from "app/coffees/mutations/deleteCoffee"

export const Coffee = () => {
  const router = useRouter()
  const coffeeId = useParam("coffeeId", "number")
  const [deleteCoffeeMutation] = useMutation(deleteCoffee)
  const [coffee] = useQuery(getCoffee, { id: coffeeId })

  return (
    <>
      <Head>
        <title>Coffee {coffee.id}</title>
      </Head>

      <div>
        <h1>Coffee {coffee.id}</h1>
        <pre>{JSON.stringify(coffee, null, 2)}</pre>

        <Link href={Routes.EditCoffeePage({ coffeeId: coffee.id })}>
          <a>Edit</a>
        </Link>

        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteCoffeeMutation({ id: coffee.id })
              router.push(Routes.CoffeesPage())
            }
          }}
          style={{ marginLeft: "0.5rem" }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

const ShowCoffeePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.CoffeesPage()}>
          <a>Coffees</a>
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
