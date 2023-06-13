import * as React from "react"
import { SVGProps } from "react"

function Cross(props: SVGProps<SVGSVGElement>) {
  return <svg
    width={16}
    height={17}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M1.414.836.336 1.914 6.922 8.5.336 15.086l1.078 1.078L8 9.578l6.586 6.586 1.078-1.078L9.078 8.5l6.586-6.586L14.586.836 8 7.422 1.414.836Z"
      fill="#000"
    />
  </svg>
}

export default Cross
