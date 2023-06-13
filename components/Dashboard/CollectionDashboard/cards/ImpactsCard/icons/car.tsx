import * as React from "react";
import { SVGProps } from "react";

function Car(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={57}
    height={51}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M49.75 4.14A4.699 4.699 0 0 0 45.312.984H10.938A4.7 4.7 0 0 0 6.5 4.14L0 22.86v25a3.134 3.134 0 0 0 3.125 3.125H6.25a3.125 3.125 0 0 0 3.125-3.125v-3.125h37.5v3.125A3.134 3.134 0 0 0 50 50.984h3.125a3.125 3.125 0 0 0 3.125-3.125v-25L49.75 4.14ZM10.937 35.36A4.681 4.681 0 0 1 6.25 30.67a4.681 4.681 0 0 1 4.688-4.687 4.681 4.681 0 0 1 4.687 4.687 4.681 4.681 0 0 1-4.688 4.688Zm34.376 0a4.681 4.681 0 0 1-4.688-4.688 4.681 4.681 0 0 1 4.688-4.687A4.681 4.681 0 0 1 50 30.67a4.681 4.681 0 0 1-4.688 4.688ZM6.25 19.734 10.938 5.67h34.374L50 19.734H6.25Z"
      fill={props.fill}
    />
  </svg>
}

export default Car;
