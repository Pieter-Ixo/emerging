import * as React from "react";
import { SVGProps } from "react";

const Time = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9 0C4.037 0 0 4.037 0 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9Zm0 1.5c4.151 0 7.5 3.349 7.5 7.5s-3.349 7.5-7.5 7.5A7.488 7.488 0 0 1 1.5 9c0-4.151 3.349-7.5 7.5-7.5ZM8.25 3v6.75h5.25v-1.5H9.75V3h-1.5Z"
      fill={props?.fill}
    />
  </svg>
);

export default Time;
