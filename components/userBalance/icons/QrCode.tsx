import * as React from "react";
import { SVGProps } from "react";

const QRCode = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={192}
    height={193}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect y={0.5} width={192} height={192} rx={8} fill="#fff" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M128 24.5v-8h48v56h-8v-8h-24v16h-16v-8h8v-8h-8v-32h-7.999v-8H128Zm8 32h32v-32h-32v32Zm-104-24h16v16H32v-16Zm127.999 0h-16v16h16v-16Zm-128 112h16v16H32v-16Zm103.999-16h-7.999v8h7.999v-8ZM88 168.5h8v8h-8v-8Zm15.998-32h-8v8H88v-16h8v-8h16v8h-8v8h8v16h8v8h8v8h15.999v8h8v-8h16v8h8v-16h-16v-8h-7.999v-16h8v-8h-8v-16h8v-8h7.999v-8h8v-16h-8v8h-15.999v-8h-8v8h8v8h-24v-8h-8v8h-16v8h-8v8h-8v-8h-8v8h-8v8h16v8h-8v8h-8v8h8v8h-8v8h16v-8h8v-8h7.999v-8Zm.001-32h24v8h-24v-8Zm48 8h-16v-8h16v8Zm-.001 48h-23.999v-8h23.999v8Zm-56-8h8v8h-8v-8Zm80-40h-8v8h8v-8ZM16 112.5h8v8h-8v-8Zm8 16v-8h16v8h24v-8h8v16h-8v32h16v8H16v-48h8Zm0-56h-8v8h8v-8h8v-8h8v8h8v8H24v8h16v8H16v8h24v8h8v-8h8v8h8v-8h16v-8h-8v-8h16v8H103.998v-8h8v-8h8v-8h8v-8h-16v8h-8v16h-8v-8h-8v-16h24v-8h-8v-8h-8v8H80v-8h-8v-8h-8v-16h16v-8H16v48h8v8Zm32 0h-8v-8h16v-16h8v16h8v16H56v-8Zm48-40v-8h8v16h8v8h-8v-8H88v-8h-8v-8h8v8h16Zm39.999 88v24h-24v-24h24Zm-24 48h-16v8h16v-8Zm32-96h8v8h-8v-8Zm-96 40h-8v8h8v-8Zm-32 56h32v-32H24v32Zm48-104h-8v8h8v-8Zm-48-8h32v-32H24v32Zm72-40H104v8h-8v-8Zm-32 80H48v-8h16v8Zm104 40v-8h8v16h-16v-8h8Z"
      fill="#333"
    />
  </svg>
);

export default QRCode;
