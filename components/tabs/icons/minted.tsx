import * as React from "react";
import { SVGProps } from "react";

const Minted = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="m21.752 7.875-7.629-.806L11 .064 7.877 7.07l-7.629.806 5.698 5.136-1.59 7.502L11 16.681l6.645 3.832-1.591-7.503 5.698-5.135Z"
      fill={props.fill}
    />
  </svg>
);

export default Minted;
