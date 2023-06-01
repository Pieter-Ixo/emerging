import * as React from "react"
import { SVGProps } from "react"

const Chat = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={28}
    height={28}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M2.978 4.598V19.86h4.24v4.305l5.384-4.305h12.42V4.6H2.978Zm1.696 1.696h18.652v11.87h-11.32l-3.093 2.473v-2.474h-4.24V6.293Z"
      fill="#fff"
    />
  </svg>
)

export default Chat
