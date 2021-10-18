import { ReactNode } from "react"

export interface Props {
  children?: ReactNode
  title: String
}

export default function PageTitle({ children, title }: Props) {
  return (
    <div className="mb-12 md:flex md:justify-between md:items-center">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl sm:truncate">{title}</h1>
      </div>
      <div className="flex mt-4 md:mt-0 md:ml-4">{children}</div>
    </div>
  )
}
