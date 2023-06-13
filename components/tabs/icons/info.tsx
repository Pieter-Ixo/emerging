import * as React from "react";
import { SVGProps } from "react";

function Info(props: SVGProps<SVGSVGElement>) {
  return <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M9 .465c-4.963 0-9 4.037-9 9s4.037 9 9 9 9-4.037 9-9-4.037-9-9-9Zm0 1.5c4.151 0 7.5 3.348 7.5 7.5 0 4.151-3.349 7.5-7.5 7.5a7.488 7.488 0 0 1-7.5-7.5c0-4.152 3.349-7.5 7.5-7.5Zm-.75 3v6h1.5v-6h-1.5Zm0 7.5v1.5h1.5v-1.5h-1.5Z"
      fill={props.fill}
    />
  </svg>
}

export default Info;
