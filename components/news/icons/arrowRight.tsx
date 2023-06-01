import * as React from "react";
import { SVGProps } from "react";

const ArrowRight = ({
  pathFill,
  ...rest
}: SVGProps<SVGSVGElement> & { pathFill?: string }) => (
  <svg
    width={18}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...rest}
  >
    <path
      d="M11.11.984 10.03 2.062l5.086 5.086H.07v1.5h15.047l-5.086 5.086 1.078 1.078 6.375-6.375.516-.539-.516-.54L11.11.985Z"
      fill={pathFill || "#FFF"}
    />
  </svg>
);

export default ArrowRight;
