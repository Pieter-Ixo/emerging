import * as React from "react"
import { SVGProps } from "react"

interface Props{
  fill:string
}

const ExpandMyBalance = (props: SVGProps<SVGSVGElement>, {fill}:Props) => (
  <svg
    width={24}
    height={24}
    fill={"black"}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12 4.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3Zm0 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3Zm0 6a1.5 1.5 0 1 0 0 3 1.5 1.5 0 1 0 0-3Z"
    />
  </svg>
)

export default ExpandMyBalance