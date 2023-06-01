import * as React from "react"
import { SVGProps } from "react"

const DownArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.375.484v12.539l-2.676-2.676-.898.88L5 15.424l4.2-4.199-.9-.879-2.675 2.676V.483h-1.25Z"
      fill="#5FA8EB"
    />
  </svg>
)

export default DownArrow