import * as React from "react"
import { SVGProps } from "react"

function Ixo(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={10} cy={10} r={9.5} fill="#033B56" stroke="#00D2FF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m10.026 7.168-2.87-2.882h-2.87v2.882L7.156 10l-2.87 2.882v2.832h2.87l2.87-2.832 2.818 2.832h2.87v-2.832L12.844 10l2.87-2.832V4.286h-2.87l-2.818 2.882Z"
      fill="#00D2FF"
    />
    <path
      stroke="#00D2FF"
      strokeWidth={0.007}
      d="M4.289 4.289h11.422v11.422H4.289z"
    />
  </svg>
}

export default Ixo
