import React, { Suspense } from "react"
import { Image, InferGetServerSidePropsType } from "blitz"
import Layout from "app/core/layouts/Layout"
import cache from "app/core/utils/cache"
import { UsersIcon } from "@heroicons/react/solid"
import getUserCount from "app/query/getUserCount"
import getCoffeeCount from "app/query/getCoffeeCount"
import Fallback from "app/core/components/Fallback"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

interface IStatsProps {
  userCount: string
  coffeeCount: string
}

const Stats: React.FunctionComponent<IStatsProps> = ({ userCount, coffeeCount }) => {
  return (
    <div>
      <div className="relative bg-white">
        <div className="h-56 bg-gray-600 sm:h-72 lg:absolute lg:left-0 lg:h-full lg:w-1/2 rounded">
          <Image
            className="w-full h-full object-cover rounded"
            src="/team.webp"
            alt="Support team"
            layout="fill"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 py-8 sm:py-12 sm:px-6 lg:py-16">
          <div className="max-w-2xl mx-auto lg:max-w-none lg:mr-0 lg:ml-auto lg:w-1/2 lg:pl-10">
            <div>
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary-500 text-white">
                <UsersIcon className="h-6 w-6" aria-hidden="true" />
              </div>
            </div>
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900 sm:text-4xl">Stats</h2>
            <p className="mt-6 text-lg text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore nihil ea rerum ipsa.
              Nostrum consectetur sequi culpa doloribus omnis, molestiae esse placeat,
              exercitationem magnam quod molestias quia aspernatur deserunt voluptatibus.
            </p>
            <div className="mt-8 overflow-hidden">
              <dl className="-mx-8 -mt-8 flex flex-wrap">
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Users</dt>
                  <dd
                    data-cy="UserCount"
                    className="order-1 text-2xl font-extrabold text-primary-600 sm:text-3xl"
                  >
                    {userCount}
                  </dd>
                </div>
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Coffees</dt>
                  <dd
                    data-cy="CoffeeCount"
                    className="order-1 text-2xl font-extrabold text-primary-600 sm:text-3xl"
                  >
                    {coffeeCount}
                  </dd>
                </div>
                {/*
                <div className="flex flex-col px-8 pt-8">
                  <dt className="order-2 text-base font-medium text-gray-500">Cards</dt>
                  <dd className="order-1 text-2xl font-extrabold text-primary-600 sm:text-3xl">
                    {cardCount}
                  </dd>
                </div> */}
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
        <Link href="/profile">
          <a className="">
            <strong>Profile</strong>
          </a>
        </Link>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
} */

function Home({ userCount, coffeeCount }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <main>
        <div className="buttons" style={{ marginTop: "1rem", marginBottom: "1rem" }}>
          <Suspense fallback={<Fallback />}>
            <Stats userCount={userCount} coffeeCount={coffeeCount} />
          </Suspense>
        </div>
      </main>
    </div>
  )
}

export const getServerSideProps = async () => {
  const userCountRES = await cache.fetch("user-count", () => getUserCount(), 60 * 10 * 1)
  const userCount = JSON.stringify(userCountRES)
  const coffeeCountRES = await cache.fetch("coffee-count", () => getCoffeeCount(), 60 * 10 * 1)
  const coffeeCount = JSON.stringify(coffeeCountRES)

  return {
    props: {
      userCount,
      coffeeCount,
    },
  }
}

Home.suppressFirstRenderFlicker = true
Home.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default Home
