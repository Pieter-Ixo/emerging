import * as React from "react";
import { SVGProps } from "react";

const Registered = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={22}
    // fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M.5.715v19.5h12v-1.5H2v-16.5h7.5v4.5H14v1.5h1.5v-2.55l-.226-.225-4.5-4.5-.224-.225H.5ZM11 3.265l1.95 1.95H11v-1.95Zm-7.5 4.95v1.5h9v-1.5h-9Zm12.75 1.5v1.5C14.975 11.44 14 12.49 14 13.84c0 1.5 1.125 2.625 2.625 2.625h.75c.6 0 1.125.525 1.125 1.125s-.525 1.125-1.125 1.125H14.75v1.5h1.5v1.5h1.5v-1.5C19.025 19.99 20 18.94 20 17.59c0-1.5-1.125-2.625-2.625-2.625h-.75c-.6 0-1.125-.525-1.125-1.125s.525-1.125 1.125-1.125h2.625v-1.5h-1.5v-1.5h-1.5ZM3.5 11.965v1.5h5.25v-1.5H3.5Zm6.75 0v1.5h2.25v-1.5h-2.25Zm-6.75 3v1.5h5.25v-1.5H3.5Zm6.75 0v1.5h2.25v-1.5h-2.25Z"
      fill={props?.fill}
    />
  </svg>
);

export default Registered;
