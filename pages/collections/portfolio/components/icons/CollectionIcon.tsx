import * as React from "react";
import { SVGProps } from "react";

function CollectionIcon({ fill, stroke }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      width={24}
      height={25}
      viewBox="0 0 24 25"
    >
      <rect
        x="3.75"
        y="13.7739"
        width="6.97072"
        height="8.97619"
        rx="1.25"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <rect
        x="3.75"
        y="2.25"
        width="6.97072"
        height="8.97619"
        rx="1.25"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <rect
        x="13.2793"
        y="13.7739"
        width="6.97072"
        height="8.97619"
        rx="1.25"
        stroke={stroke}
        strokeWidth="1.5"
      />
      <rect
        x="13.2793"
        y="2.25"
        width="6.97072"
        height="8.97619"
        rx="1.25"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default CollectionIcon;
