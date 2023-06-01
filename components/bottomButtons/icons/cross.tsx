import * as React from "react";
import { SVGProps } from "react";

const SvgComponent = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
    style={{ padding: 4 }}
  >
    <path
      d="M5.479.957 10 5.478 14.522.957h4.522v4.521L14.522 10l4.522 4.521v4.522h-4.522L10 14.522 5.48 19.043H.957v-4.521L5.479 10 .957 5.478V.957h4.522Z"
      fill="#fff"
    />
  </svg>
);

export default SvgComponent;
