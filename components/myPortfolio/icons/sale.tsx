import * as React from "react";
import { SVGProps } from "react";

function Sale(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={24}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="m12 4.198-.234.211-8.555 8.649-.516.515.516.54 7.125 7.125.539.515.516-.515 8.648-8.555.211-.235v-8.25H12Zm.633 1.5h6.117v6.118l-7.875 7.828-6.07-6.07 7.828-7.876Zm3.867 1.5a.751.751 0 0 0-.75.75c0 .414.337.75.75.75s.75-.336.75-.75a.751.751 0 0 0-.75-.75Z"
      fill="#FFF"
    />
  </svg>
}

export default Sale;
