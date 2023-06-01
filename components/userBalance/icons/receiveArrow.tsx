import * as React from "react"
import { SVGProps } from "react"

const ReceiveArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m17.809 5.095-10.64 10.64V8.543H5.644v9.015l.017.746.746.017h9.015v-1.525H8.23l10.64-10.64-1.061-1.06Z"
      fill="#000"
    />
  </svg>
)

export default ReceiveArrow
