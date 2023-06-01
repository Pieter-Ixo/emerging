import * as React from "react"
import { SVGProps } from "react"

const Collapse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={8}
    style={{marginBottom:6}}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m10 .945-.54.516-9.374 9.375 1.078 1.078L10 3.078l8.836 8.836 1.078-1.078L10.54 1.46 10 .945Z"
      fill="#0000007a"
    />
  </svg>
)

export default Collapse