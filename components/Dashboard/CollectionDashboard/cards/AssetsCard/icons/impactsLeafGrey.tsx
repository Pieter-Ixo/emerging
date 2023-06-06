import * as React from "react"
import { SVGProps } from "react"

const ImpactsLeafGrey = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M5.898 12.719c0-3.38 3.353-8.683 9.304-5.047l8.25 5.047-8.25 5.046c-5.95 3.636-9.304-1.667-9.304-5.046Z"
      stroke="#D7D7D7"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M5.898 12.719h8.401M1 18.988V6.45"
      stroke="#D7D7D7"
      strokeWidth={1.5}
      strokeMiterlimit={10}
      strokeLinecap="round"
    />
  </svg>
)

export default ImpactsLeafGrey
