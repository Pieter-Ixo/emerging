import * as React from "react";
import { SVGProps } from "react";

interface Props {
  selected: String;
}

function PortfolioIcon({ selected }: Props, props: SVGProps<SVGSVGElement>) {
  return <svg
    width={46}
    height={47}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect
      y={0.984}
      width={46}
      height={46}
      rx={23}
      fill={selected == "portfolio" ? "#2B94F5" : "#F1F1F1"}
    />
    <path
      d="M23 15.734a5.26 5.26 0 0 0-5.25 5.25c0 1.807.923 3.413 2.32 4.36-2.675 1.148-4.57 3.802-4.57 6.89H17c0-3.322 2.678-6 6-6s6 2.678 6 6h1.5c0-3.088-1.895-5.742-4.57-6.89a5.268 5.268 0 0 0 2.32-4.36 5.26 5.26 0 0 0-5.25-5.25Zm0 1.5c2.08 0 3.75 1.67 3.75 3.75s-1.67 3.75-3.75 3.75-3.75-1.67-3.75-3.75 1.67-3.75 3.75-3.75Z"
      fill={selected == "portfolio" ? "#fff" : "#000000"}
    />
  </svg>
}

export default PortfolioIcon;
