import * as React from "react";
import { SVGProps } from "react";

const Flame = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={19} xmlns="http://www.w3.org/2000/svg" {...props}>
    <path
      d="M8.6.758 6.351 4.505 4.965 3.119l-.527.599C1.825 6.679.5 9.369.5 11.715c0 3.721 3.365 6.75 7.5 6.75 4.136 0 7.5-3.029 7.5-6.75 0-3.572-3.898-7.976-6.221-10.284l-.68-.673Zm.294 2.424C10.826 5.196 14 8.93 14 11.715c0 1.793-1.035 3.378-2.607 4.325a4.528 4.528 0 0 0 .357-1.753c0-1.786-1.264-3.904-2.323-5.366l-.633-.874-1.661 2.491-1.055-1.054-.495.817c-.884 1.46-1.333 2.8-1.333 3.986 0 .628.133 1.218.357 1.753C3.035 15.093 2 13.508 2 11.715c0-1.792 1.048-3.993 3.042-6.397l1.606 1.607 2.246-3.743ZM8.828 10.7c.922 1.438 1.422 2.689 1.422 3.586 0 1.477-1.01 2.678-2.25 2.678s-2.25-1.201-2.25-2.678c0-.692.218-1.483.649-2.362l.968.967 1.46-2.191Z"
      fill={props.fill}
    />
  </svg>
);

export default Flame;
