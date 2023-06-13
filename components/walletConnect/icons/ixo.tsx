import * as React from "react"
import { SVGProps } from "react"

function Ixo(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m8.5 4.948-4-4h-4v4l4 4-4 4v4h4l4-4 4 4h4v-4l-4-4 4-4v-4h-4l-4 4Z"
      fill="#fff"
    />
  </svg>
}

export default Ixo
