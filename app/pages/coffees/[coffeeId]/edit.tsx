import { Suspense } from "react"
import { Head, Link, useRouter, useQuery, useMutation, useParam, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import getCoffee from "app/coffees/queries/getCoffee"
import updateCoffee from "app/coffees/mutations/updateCoffee"
import { CoffeeForm, FORM_ERROR } from "app/coffees/components/CoffeeForm"

export const EditCoffee = () => {
  const router = useRouter()
  const coffeeId = useParam("coffeeId", "number")
  const [coffee, { setQueryData }] = useQuery(getCoffee, { id: coffeeId })
  const [updateCoffeeMutation] = useMutation(updateCoffee)

  return (
    <>
      <Head>
        <title>Edit Coffee {coffee.id}</title>
      </Head>

      <div>
        <h1>Edit Coffee {coffee.id}</h1>
        <pre>{JSON.stringify(coffee)}</pre>

        <CoffeeForm
          submitText="Update Coffee"
          // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateCoffee}
          initialValues={coffee}
          onSubmit={async (values) => {
            try {
              const updated = await updateCoffeeMutation({
                id: coffee.id,
                ...values,
              })
              await setQueryData(updated)
              router.push(Routes.ShowCoffeePage({ coffeeId: updated.id }))
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditCoffeePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCoffee />
      </Suspense>

      <p>
        <Link href={Routes.CoffeesPage()}>
          <a>Coffees</a>
        </Link>
      </p>
    </div>
  )
}

EditCoffeePage.authenticate = true
EditCoffeePage.getLayout = (page) => <Layout>{page}</Layout>

export default EditCoffeePage
