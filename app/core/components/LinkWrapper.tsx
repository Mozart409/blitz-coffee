import { LinkProps } from "blitz"
import React from "react"

import useLocalStorageState from "use-local-storage-state"

interface Props {
  href: LinkProps
  children: JSX.Element | JSX.Element[]
}

const LinkWrapper = ({ href, children }: Props) => {
  const [timer, setTimer, { removeItem }] = useLocalStorageState("consumption-coffee-last-time", [
    "TEST",
    "TEST2",
  ])

  return (
    <div>
      {/* <a href={href as unknown as String}>{children}</a> */}
      <a href="/">Home</a>
      {timer.map((item) => (
        <p key={item}>{item}</p>
      ))}
      <button onClick={() => removeItem()}>Remove Item</button>
    </div>
  )
}

export default LinkWrapper
