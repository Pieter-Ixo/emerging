import * as React from "react";
import { SVGProps } from "react";

function Tick(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={21}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.667 2.84a8.11 8.11 0 0 0-8.125 8.125 8.11 8.11 0 0 0 8.125 8.125 8.11 8.11 0 0 0 8.125-8.125c0-.874-.118-1.746-.43-2.559l-1.016.996c.125.5.196 1.001.196 1.563a6.854 6.854 0 0 1-6.875 6.875 6.854 6.854 0 0 1-6.875-6.875 6.854 6.854 0 0 1 6.875-6.875c1.875 0 3.56.747 4.746 1.933l.879-.879a7.928 7.928 0 0 0-5.625-2.304Zm7.05 2.675-7.05 7.051L7.99 9.89l-.899.899 3.125 3.125.45.43.449-.43 7.5-7.5-.898-.899Z"
      fill="#61B43A"
    />
  </svg>
}

export default Tick;
