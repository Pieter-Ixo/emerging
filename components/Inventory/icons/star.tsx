import * as React from "react"
import { SVGProps } from "react"

function Star(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={19}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m18.293 6.806-6.357-.671L9.333.298 6.731 6.135l-6.358.671 4.749 4.28-1.326 6.253 5.537-3.194 5.537 3.194-1.325-6.253 4.748-4.28Z"
      fill="#5FA8EB"
    />
  </svg>
}

export default Star
