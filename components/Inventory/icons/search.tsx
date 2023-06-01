import * as React from "react"
import { SVGProps } from "react"

const Search = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={20}
    height={21}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M12.25.715c-4.134 0-7.5 3.366-7.5 7.5 0 1.796.63 3.442 1.688 4.734L.46 18.925l1.078 1.079 5.977-5.977a7.442 7.442 0 0 0 4.734 1.688c4.134 0 7.5-3.367 7.5-7.5 0-4.134-3.366-7.5-7.5-7.5Zm0 1.5c3.322 0 6 2.677 6 6 0 3.322-2.678 6-6 6a5.99 5.99 0 0 1-6-6c0-3.323 2.678-6 6-6Z"
      fill="#000"
    />
  </svg>
)

export default Search
