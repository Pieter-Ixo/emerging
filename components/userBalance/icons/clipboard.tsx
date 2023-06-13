import * as React from "react";
import { SVGProps } from "react";

function Clipboard(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={20}
    height={20}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.5 3v12.5h4.375v-1.25H3.75v-10h7.5v.625h1.25V3h-10Zm5 2.5V18h10V5.5h-10Zm1.25 1.25h7.5v10h-7.5v-10Z"
      fill="#fff"
    />
  </svg>
}

export default Clipboard;
