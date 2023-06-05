import * as React from "react"
import { SVGProps } from "react"

const DescendingFilter = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={16}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.7.9v1.25h7.5V.9H.7Zm10.625 0v11.68l-1.621-1.622-.879.88 2.676 2.695.449.43.45-.43 2.675-2.696-.879-.879-1.621 1.621V.9h-1.25ZM.7 3.4v1.25h6.25V3.4H.7Zm0 2.5v1.25h5V5.9h-5Zm0 2.5v1.25h3.75V8.4H.7Zm0 2.5v1.25h2.5V10.9H.7Zm0 2.5v1.25h1.25V13.4H.7Z"
      fill="#5FA8EB"
    />
  </svg>
)

export default DescendingFilter
