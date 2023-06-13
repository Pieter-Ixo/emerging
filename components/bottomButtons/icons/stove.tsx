import * as React from "react";
import { SVGProps } from "react";

function Stove(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)" stroke="#fff" strokeWidth={1.5}>
      <path d="M8.058 13.65h12.354v5.743a2 2 0 0 1-2 2h-8.354a2 2 0 0 1-2-2V13.65ZM20.412 13.65H8.058a2.837 2.837 0 0 1 2.837-2.836h6.68a2.837 2.837 0 0 1 2.837 2.836ZM8.058 18.302H6.957a2 2 0 0 1-2-2v-.652a2 2 0 0 1 2-2h1.101v4.652ZM12.382 10.782v-.838a1.853 1.853 0 1 1 3.706 0v.838h-3.706ZM17.323 7.357c0-1.074.618-1.253.618-2.506s-.618-1.432-.618-2.506M14.235 5.67c0-1.074.617-1.253.617-2.506s-.617-1.432-.617-2.506M11.146 7.357c0-1.074.618-1.253.618-2.506s-.617-1.432-.617-2.506M5.587 24.637h17.295M20.412 13.65h1.101a2 2 0 0 1 2 2v.653a2 2 0 0 1-2 2h-1.101V13.65Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          transform="translate(.435 .36)"
          d="M0 0h27.13v27.13H0z"
        />
      </clipPath>
    </defs>
  </svg>
}

export default Stove;
