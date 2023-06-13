import * as React from "react";
import { SVGProps } from "react";

function USDCIcon(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={20}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <circle cx={10} cy={10.268} r={9.5} fill="#033B56" stroke="#00D2FF" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="m10.026 7.435-2.87-2.882h-2.87v2.882l2.87 2.833-2.87 2.882v2.832h2.87l2.87-2.832 2.818 2.832h2.87V13.15l-2.87-2.882 2.87-2.833V4.553h-2.87l-2.818 2.882Z"
      fill="#00D2FF"
    />
    <path
      stroke="#00D2FF"
      strokeWidth={0.007}
      d="M4.289 4.557h11.422v11.422H4.289z"
    />
  </svg>
}

export default USDCIcon;
