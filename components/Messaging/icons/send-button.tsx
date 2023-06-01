import * as React from "react";
import { SVGProps } from "react";

const SendButton = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={24}
    height={19}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m.917.4.37 1.59L2.93 9.435 1.287 16.88l-.37 1.59 1.51-.61 18.652-7.63 1.934-.795-1.934-.795L2.427 1.01.917.4ZM3.275 3.21l13.167 5.378H4.467L3.275 3.209Zm1.192 7.074h11.975L3.275 15.66l1.192-5.378Z"
      fill="#2B94F5"
    />
  </svg>
);

export default SendButton;
