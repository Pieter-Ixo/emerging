import * as React from "react"
import { SVGProps } from "react"

function Wallet(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M19.908 3.75c-.129.004-.265.02-.397.053L5.734 7.433a2.564 2.564 0 0 0-1.908 2.464v11.658a2.557 2.557 0 0 0 2.544 2.543h15.26a2.557 2.557 0 0 0 2.544-2.543V10.533a2.557 2.557 0 0 0-2.543-2.544H10.29l9.644-2.543v1.696h1.696V5.446c0-.954-.812-1.709-1.723-1.696ZM6.37 9.685h15.26c.48 0 .848.368.848.848v11.022c0 .48-.367.847-.848.847H6.37a.833.833 0 0 1-.848-.847V10.533c0-.48.367-.848.848-.848Zm13.14 5.087a1.272 1.272 0 1 0 .002 2.544 1.272 1.272 0 0 0-.001-2.544Z"
      fill="#fff"
    />
  </svg>
}

export default Wallet
