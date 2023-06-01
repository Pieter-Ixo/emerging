import * as React from "react"
import { SVGProps } from "react"

const Cross = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={17}
    height={18}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M8.667.84C4.187.84.542 4.485.542 8.965s3.645 8.125 8.125 8.125 8.125-3.645 8.125-8.125S13.147.84 8.667.84Zm0 1.25a6.866 6.866 0 0 1 6.875 6.875 6.866 6.866 0 0 1-6.875 6.875 6.866 6.866 0 0 1-6.875-6.875A6.866 6.866 0 0 1 8.667 2.09ZM6.303 5.703l-.898.898 2.363 2.364-2.363 2.363.898.898 2.364-2.363 2.363 2.363.898-.898-2.363-2.363L11.928 6.6l-.898-.898-2.363 2.363-2.364-2.363Z"
      fill="#FF1919"
    />
  </svg>
)

export default Cross
