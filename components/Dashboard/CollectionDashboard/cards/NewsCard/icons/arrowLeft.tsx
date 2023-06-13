import * as React from "react"
import { SVGProps } from "react"

function ArrowLeft(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={18}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m6.96 14.277 1.08-1.079-5.087-5.085H18v-1.5H2.953L8.04 1.527 6.961.448.586 6.823l-.516.54.516.539 6.375 6.375Z"
      fill="#000"
    />
  </svg>
}

export default ArrowLeft
