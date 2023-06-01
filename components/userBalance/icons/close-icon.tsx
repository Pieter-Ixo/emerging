import * as React from "react";
import { SVGProps } from "react";

const CloseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.914.836.836 1.914 7.422 8.5.836 15.086l1.078 1.078L8.5 9.578l6.586 6.586 1.078-1.078L9.578 8.5l6.586-6.586L15.086.836 8.5 7.422 1.914.836Z"
      fill="#000"
    />
  </svg>
);

export default CloseIcon;
