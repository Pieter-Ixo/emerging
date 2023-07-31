import * as React from "react";
import { SVGProps } from "react";

export default function TreeIcon({
  fill,
  ...rest
}: SVGProps<SVGSVGElement> & { fill?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="53"
      height="96"
      viewBox="0 0 53 96"
      fill="none"
    >
      <rect
        y="0.450195"
        width="52.3714"
        height="76.7143"
        rx="26.1857"
        fill={fill}
      />
      <path
        d="M26.1858 36.0215L26.1858 93.4501"
        stroke="#595858"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M10.0713 46.7363L25.1784 64.7363"
        stroke="#595858"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M41.7964 42.4502L26.1857 54.4502"
        stroke="#595858"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
