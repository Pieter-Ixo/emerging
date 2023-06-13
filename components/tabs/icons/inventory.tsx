import * as React from "react";
import { SVGProps } from "react";

function Inventory(props: SVGProps<SVGSVGElement>) {
  return <svg width={24} height={25} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.28 12.465A9.72 9.72 0 0 1 12 2.745a9.72 9.72 0 0 1 9.72 9.72 9.72 9.72 0 0 1-9.72 9.72 9.72 9.72 0 0 1-9.72-9.72Zm17.673 0c0-4.386-3.567-7.953-7.953-7.953-4.385 0-7.952 3.567-7.952 7.953 0 4.385 3.567 7.952 7.952 7.952 4.386 0 7.953-3.567 7.953-7.952Z"
      fill={props?.fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 9.315a3.15 3.15 0 1 0 0 6.3 3.15 3.15 0 0 0 0-6.3Zm-4.85 3.15a4.85 4.85 0 1 1 9.7 0 4.85 4.85 0 0 1-9.7 0Z"
      fill={props?.fill}
    />
  </svg>
}

export default Inventory;
