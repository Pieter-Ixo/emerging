import * as React from "react";
import { SVGProps } from "react";

function Fuel(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={24}
    height={25}
    fill={props.fill}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.396 15.213v-1.65h-1.344c-3.157 0-5.638-2.482-5.638-5.639V5.83c0-.415.336-.752.752-.752H7.26c1.76 0 3.312.771 4.34 2.005.656-2.39 2.812-4.1 5.434-4.1h2.094c.416 0 .752.337.752.752V5.83c0 3.157-2.481 5.638-5.639 5.638h-1.343v3.745h3.396a4 4 0 1 1 0 8H8a4 4 0 1 1 0-8h3.396Zm0-4.216v-.28c0-2.323-1.812-4.136-4.135-4.136H5.917v1.343c0 2.323 1.812 4.136 4.136 4.136h.28L7.073 8.8l1.063-1.063 3.26 3.26Zm1.502-2.094 3.26-3.26 1.063 1.063-3.26 3.26h.28c2.324 0 4.136-1.813 4.136-4.136V4.487h-1.343c-2.324 0-4.136 1.812-4.136 4.135v.28ZM8 16.713h8.294a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 1 1 0-5Z"
      fill={props.fill}
    />
  </svg>
}

export default Fuel;
