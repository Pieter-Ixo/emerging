import * as React from "react"
import { SVGProps } from "react"

const FilterArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={10}
    height={16}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.375.485v12.54l-2.676-2.676-.898.878L5 15.427l4.2-4.2-.9-.878-2.675 2.675V.485h-1.25Z"
      fill="#5FA8EB"
    />
  </svg>
)

export default FilterArrow