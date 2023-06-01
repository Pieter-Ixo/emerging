import * as React from "react"
import { SVGProps } from "react"

const BuyLeaf = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.898 7.27c0-3.379 3.353-8.683 9.304-5.047l8.25 5.047-8.25 5.047c-5.95 3.636-9.304-1.668-9.304-5.047Z"
      stroke="#000"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.898 7.27h8.401M1 13.54V1"
      stroke="#000"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </svg>
)

export default BuyLeaf
