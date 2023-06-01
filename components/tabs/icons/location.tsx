import * as React from "react";
import { SVGProps } from "react";

const Location = (props: SVGProps<SVGSVGElement>) => (
  <svg width={20} height={20} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M10 .25C4.624.25.25 4.624.25 10s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S15.376.25 10 .25Zm0 1.5c.254 0 .502.016.75.038V3.25h-1.5L8.5 5.5h-.75v.75h3.75l.75.75H13v.75l-.75.75-3-.75-3 2.25v2.25l1.5 1.5H10v1.875l.75 1.875h.75l2.25-3v-.75l.75-1.5v-.75h-.75L13 10l.75-.75 1.125.75 1.875-.75V8.5h1.356c.09.488.144.987.144 1.5 0 4.549-3.701 8.25-8.25 8.25-4.549 0-8.25-3.701-8.25-8.25 0-4.549 3.701-8.25 8.25-8.25Z"
      fill={props?.fill}
    />
  </svg>
);

export default Location;
