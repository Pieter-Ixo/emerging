import * as React from "react";
import { SVGProps } from "react";

const Wallet = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={18}
    height={18}
    fill={props.fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M14.227 0a1.633 1.633 0 0 0-.352.047L1.687 3.257A2.268 2.268 0 0 0 0 5.438V15.75A2.262 2.262 0 0 0 2.25 18h13.5A2.262 2.262 0 0 0 18 15.75V6a2.262 2.262 0 0 0-2.25-2.25H5.719L14.25 1.5V3h1.5V1.5c0-.844-.718-1.512-1.523-1.5ZM2.25 5.25h13.5c.425 0 .75.325.75.75v9.75c0 .425-.325.75-.75.75H2.25a.737.737 0 0 1-.75-.75V6c0-.425.325-.75.75-.75Zm11.625 4.5a1.125 1.125 0 1 0 0 2.25 1.125 1.125 0 0 0 0-2.25Z"
      fill={props.fill}
    />
  </svg>
);

export default Wallet;
