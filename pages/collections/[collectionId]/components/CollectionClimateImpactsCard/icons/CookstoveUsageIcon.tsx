import * as React from "react";
import { SVGProps } from "react";

export default function CookstoveUsageIcon(
  props: { strokeColor: string } & SVGProps<SVGSVGElement>
) {
  return (
    <svg
      width="19"
      height="23"
      fill="none"
      viewBox="0 0 19 23"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.74341 12.4893H14.6717V17.3384C14.6717 18.4429 13.7762 19.3384 12.6717 19.3384H5.74341C4.63884 19.3384 3.74341 18.4429 3.74341 17.3384V12.4893Z"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <path
        d="M14.6716 12.4893L3.74337 12.4893V12.4893C3.74337 11.1033 4.86692 9.97974 6.25289 9.97974L12.1621 9.97974C13.5481 9.97974 14.6716 11.1033 14.6716 12.4893V12.4893Z"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <path
        d="M3.74341 16.6045L2.99997 16.6045C1.89541 16.6045 0.999974 15.7091 0.999974 14.6045L0.999974 14.4893C0.999975 13.3848 1.8954 12.4893 2.99997 12.4893L3.74341 12.4893L3.74341 16.6045Z"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <path
        d="M7.56836 9.95215L7.56836 9.21151C7.56836 8.30618 8.30227 7.57227 9.2076 7.57227V7.57227C10.1129 7.57227 10.8468 8.30618 10.8468 9.21151L10.8468 9.95215L7.56836 9.95215Z"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <path
        d="M11.9395 6.92216C11.9395 5.97204 12.4859 5.81369 12.4859 4.70522C12.4859 3.59675 11.9395 3.4384 11.9395 2.48828"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <path
        d="M9.20752 5.42997C9.20752 4.47986 9.75393 4.3215 9.75393 3.21303C9.75393 2.10456 9.20752 1.94621 9.20752 0.996094"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <path
        d="M6.47534 6.92216C6.47534 5.97204 7.02175 5.81369 7.02175 4.70522C7.02175 3.59675 6.47534 3.4384 6.47534 2.48828"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <line
        x1="1.55762"
        y1="22.1221"
        x2="16.8572"
        y2="22.1221"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
      <path
        d="M14.6716 12.4902H15.4151C16.5196 12.4902 17.4151 13.3857 17.4151 14.4902L17.4151 14.6054C17.4151 15.71 16.5196 16.6054 15.4151 16.6054H14.6716L14.6716 12.4902Z"
        stroke={props.strokeColor || "black"}
        stroke-width="1"
      />
    </svg>
  );
}
