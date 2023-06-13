import * as React from "react"
import { SVGProps } from "react"

function Transferred(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={32}
    height={33}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y={0.948} width={32} height={32} rx={16} fill="#C5C5C5" />
    <path
      d="m17.53 11.763-.81.809 3.815 3.814H9.25v1.125h11.285l-3.814 3.814.808.809 4.782-4.781.386-.405-.386-.404-4.782-4.781Z"
      fill="#fff"
    />
  </svg>
}

export default Transferred
