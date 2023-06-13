import * as React from "react";
import { SVGProps } from "react";

function AlphabeticalFilter(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={16}
    height={15}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.95.59 2.815 1 1.603 4.34h-.02v.039l-.586 1.62-.039.098v.743h1.25v-.528l.254-.722h1.992l.254.722v.528h1.25v-.743L5.92 6l-.586-1.621v-.04h-.02L4.104 1 3.966.59H2.951Zm8.633 0v11.68l-1.62-1.622-.88.88 2.676 2.694.45.43.449-.43 2.675-2.695-.879-.879-1.62 1.621V.59h-1.25ZM3.458 2.875l.528 1.465H2.93l.527-1.465ZM.958 8.09v1.25h3.477l-3.3 3.3-.177.196v1.504h5v-1.25H2.482l3.3-3.301.176-.195V8.09h-5Z"
      fill={props.fill}
    />
  </svg>
}

export default AlphabeticalFilter;
