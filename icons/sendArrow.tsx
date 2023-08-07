import * as React from "react";
import { SVGProps } from "react";

interface Props {
  color?: string;
}

function SendArrow({ color }: Props, props: SVGProps<SVGSVGElement>) {
  return <svg
    width={24}
    height={24}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.543 5.644V7.17h7.192l-10.64 10.64 1.061 1.06 10.64-10.64v7.193h1.525V6.407l-.017-.746-.746-.017H8.543Z"
      fill={color || "#000"}
    />
  </svg>
}

export default SendArrow;
