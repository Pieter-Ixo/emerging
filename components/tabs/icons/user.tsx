import * as React from "react";
import { SVGProps } from "react";

function User(props: SVGProps<SVGSVGElement>) {
  return <svg width={18} height={18} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8 .215a5.26 5.26 0 0 0-5.25 5.25c0 1.807.923 3.413 2.32 4.359C2.396 10.972.5 13.627.5 16.714H2c0-3.322 2.678-6 6-6s6 2.678 6 6h1.5c0-3.087-1.896-5.742-4.57-6.89a5.268 5.268 0 0 0 2.32-4.36A5.26 5.26 0 0 0 8 .215Zm0 1.5c2.08 0 3.75 1.67 3.75 3.75S10.08 9.215 8 9.215s-3.75-1.67-3.75-3.75S5.92 1.715 8 1.715Z"
      fill={props.fill}
    />
  </svg>
}

export default User;
