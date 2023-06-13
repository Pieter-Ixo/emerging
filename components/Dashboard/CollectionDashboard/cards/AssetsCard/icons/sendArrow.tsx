import * as React from "react"
import { SVGProps } from "react"

function SendArrow(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.543 6.628v1.525h7.192l-10.64 10.64 1.061 1.06 10.64-10.64v7.193h1.524V7.391l-.016-.746-.746-.017H8.543Z"
      fill="#000"
    />
  </svg>
}

export default SendArrow
