import * as React from "react";
import { SVGProps } from "react";

function RecipientIcon(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.5 4.018a5.26 5.26 0 0 0-5.25 5.25c0 1.807.923 3.413 2.32 4.36C6.896 14.774 5 17.43 5 20.517h1.5c0-3.323 2.678-6 6-6s6 2.677 6 6H20c0-3.088-1.895-5.743-4.57-6.89a5.268 5.268 0 0 0 2.32-4.36 5.26 5.26 0 0 0-5.25-5.25Zm0 1.5c2.08 0 3.75 1.67 3.75 3.75s-1.67 3.75-3.75 3.75-3.75-1.67-3.75-3.75 1.67-3.75 3.75-3.75Z"
      fill="#000"
    />
  </svg>
}

export default RecipientIcon;
