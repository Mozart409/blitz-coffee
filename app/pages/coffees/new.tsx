import { Link, useRouter, useMutation, BlitzPage, Routes } from "blitz"
import Layout from "app/core/layouts/Layout"
import createCoffee from "app/coffees/mutations/createCoffee"
import { CoffeeForm, FORM_ERROR } from "app/coffees/components/CoffeeForm"
import Heading from "app/core/components/Heading"

const NewCoffeePage: BlitzPage = () => {
  const router = useRouter()
  const [createCoffeeMutation] = useMutation(createCoffee)

  return (
    <div>
      <Heading type="h1">Create New Coffee</Heading>

      <CoffeeForm
        submitText="Create Coffee"
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateCoffee}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const coffee = await createCoffeeMutation(values)
            router.push(`/coffees/${coffee.id}`)
          } catch (error) {
            console.error(error)
            return {
              [FORM_ERROR]: error.toString(),
            }
          }
        }}
      />

      <p>
        <Link href={Routes.CoffeesPage()}>
          <a className="dark:text-gray-100">Coffees</a>
        </Link>
      </p>
    </div>
  )
}

NewCoffeePage.authenticate = true
NewCoffeePage.getLayout = (page) => <Layout title={"Create New Coffee"}>{page}</Layout>

export default NewCoffeePage
