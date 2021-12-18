import { ReactNode, Suspense } from "react"
import { Head, dynamic } from "blitz"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const DynamicNavBar = dynamic(() => import("../components/NavBar"))
const DynamicFooter = dynamic(() => import("../components/Footer"))

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Consumpation.Coffee"}</title>
      </Head>

      <div className="dark:bg-gray-900 ">
        <DynamicNavBar />

        <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl ">{children}</div>
        </main>

        <DynamicFooter />
      </div>
    </>
  )
}

export default Layout
