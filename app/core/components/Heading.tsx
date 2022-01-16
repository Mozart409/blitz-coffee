import React, { ReactElement } from "react"

interface Props {
  type: "h1" | "h2" | "h3"
  children: string | undefined | JSX.Element
}

const Wrapper = ({ children }) => <div className="prose dark:prose-invert">{children}</div>

function Heading({ type, children }: Props) {
  if (type === "h1")
    return (
      <Wrapper>
        <h1>{children}</h1>
      </Wrapper>
    )

  if (type === "h2")
    return (
      <Wrapper>
        <h2>{children}</h2>
      </Wrapper>
    )

  if (type === "h3")
    return (
      <Wrapper>
        <h3>{children}</h3>
      </Wrapper>
    )

  return null
}

export default Heading
