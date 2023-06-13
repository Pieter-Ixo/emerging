import * as React from "react";
import { SVGProps } from "react";

function Calculate(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M4.5 2.25v19.5h15V2.25h-15ZM6 3.75h12v16.5H6V3.75Zm1.5 1.5v4.5h9v-4.5h-9ZM9 6.75h6v1.5H9v-1.5Zm-.75 4.5v1.5h1.5v-1.5h-1.5Zm3 0v1.5h1.5v-1.5h-1.5Zm3 0v1.5h1.5v-1.5h-1.5Zm-6 3v1.5h1.5v-1.5h-1.5Zm3 0v1.5h1.5v-1.5h-1.5Zm3 0v1.5h1.5v-1.5h-1.5Zm-6 3v1.5h1.5v-1.5h-1.5Zm3 0v1.5h1.5v-1.5h-1.5Zm3 0v1.5h1.5v-1.5h-1.5Z"
      fill="#D7D7D7"
    />
  </svg>
}

export default Calculate;
