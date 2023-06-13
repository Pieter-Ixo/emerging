import * as React from "react";
import { SVGProps } from "react";

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={25}
    height={25}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.75 6.268v13.5h19.5v-13.5H2.75Zm3.234 1.5h13.032L12.5 12.104 5.984 7.768Zm-1.734.656 7.828 5.226.422.258.422-.258 7.828-5.226v9.844H4.25V8.424Z"
      fill="#000"
    />
  </svg>
}

export default MailIcon;
