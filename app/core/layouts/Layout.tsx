import { ReactNode, Suspense } from "react"
import { Head, dynamic } from "blitz"
import NavBar from "../components/NavBar"
import Footer from "../components/Footer"

type LayoutProps = {
  title?: string
  children: ReactNode
}

const Layout = ({ title, children }: LayoutProps) => {
  return (
    <>
      <Head>
        <title>{title || "Consumpation.Coffee"}</title>
      </Head>

      <div className="dark:bg-gray-900">
        <NavBar />

        <main className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">{children}</div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default Layout
