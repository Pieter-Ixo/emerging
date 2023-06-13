import * as React from "react"
import { SVGProps } from "react"

function FilledStar(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={22}
    height={22}
    style={{marginBottom:3}}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m21.752 8.41-7.629-.806L11 .6 7.877 7.604.248 8.41l5.698 5.136-1.59 7.503L11 17.217l6.645 3.832-1.591-7.503 5.698-5.136Z"
      fill="#fff"
    />
  </svg>
}

export default FilledStar