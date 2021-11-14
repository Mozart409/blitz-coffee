import React, { Suspense } from "react"
import { Image, InferGetServerSidePropsType } from "blitz"
import Layout from "app/core/layouts/Layout"
import cache from "app/core/utils/cache"
import getUserCount from "app/query/getUserCount"
import getCoffeeCount from "app/query/getCoffeeCount"
import Fallback from "app/core/components/Fallback"
import {
  AcademicCapIcon,
  BadgeCheckIcon,
  CashIcon,
  ClockIcon,
  ReceiptRefundIcon,
  UsersIcon,
  CubeIcon,
} from "@heroicons/react/outline"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

interface IStatsProps {
  userCount: string
  coffeeCount: string
}

const Stats: React.FunctionComponent<IStatsProps> = ({ userCount, coffeeCount }) => {
  const cards = [
    {
      title: "User Count",
      description: userCount,

      icon: UsersIcon,
      iconForeground: "text-teal-700",
      iconBackground: "bg-teal-50",
    },
    {
      title: "Coffee Count",
      description: coffeeCount,

      icon: CubeIcon,
      iconForeground: "text-purple-700",
      iconBackground: "bg-purple-50",
    },
  ]
  return (
    <div>
      <div className="overflow-hidden my-24 bg-gray-200 rounded-lg divide-y divide-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
        {cards.map((card, cardIdx) => (
          <div
            key={card.title}
            className={classNames(
              cardIdx === 0 ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none" : "",
              cardIdx === 1 ? "sm:rounded-tr-lg" : "",
              cardIdx === cards.length - 2 ? "sm:rounded-bl-lg" : "",
              cardIdx === cards.length - 1 ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none" : "",
              "relative group bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  card.iconBackground,
                  card.iconForeground,
                  "rounded-lg inline-flex p-3 ring-4 ring-white"
                )}
              >
                <card.icon className="w-6 h-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <p className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {card.title}
                </p>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{card.description}</p>
            </div>
            <span
              className="absolute top-6 right-6 text-gray-300 pointer-events-none group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
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
          <Suspense fallback={<div>Loading...</div>}>
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
  /* const userCount = "0"
  const coffeeCount = "0" */

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
