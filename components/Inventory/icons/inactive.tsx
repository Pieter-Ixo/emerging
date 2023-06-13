import * as React from "react";
import { SVGProps } from "react";

function Inactive(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={21}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M10.667 2.84c-4.48 0-8.125 3.645-8.125 8.125s3.645 8.125 8.125 8.125 8.125-3.645 8.125-8.125-3.645-8.125-8.125-8.125Zm0 1.25a6.866 6.866 0 0 1 6.875 6.875 6.866 6.866 0 0 1-6.875 6.875 6.866 6.866 0 0 1-6.875-6.875 6.866 6.866 0 0 1 6.875-6.875ZM8.303 7.703l-.898.898 2.363 2.364-2.363 2.363.898.898 2.364-2.363 2.363 2.363.898-.898-2.363-2.363L13.928 8.6l-.898-.898-2.363 2.363-2.364-2.363Z"
      fill="#FF1919"
    />
  </svg>
}

export default Inactive;
