import { ReactNode } from "react"

export interface Props {
  children?: ReactNode
  title: String
}

export default function PageTitle({ children, title }: Props) {
  return (
    <div className="md:flex md:items-center md:justify-between mb-12">
      <div className="flex-1 min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl sm:truncate">{title}</h1>
      </div>
      <div className="mt-4 flex md:mt-0 md:ml-4">{children}</div>
    </div>
  )
}
