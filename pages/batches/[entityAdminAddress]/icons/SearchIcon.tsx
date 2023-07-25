import * as React from "react";
import { SVGProps } from "react";

function SearchIcon({ fill }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={25}
      viewBox="0 0 24 25"
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M14.25 2.75C10.1162 2.75 6.75 6.11621 6.75 10.25C6.75 12.0459 7.37988 13.6924 8.4375 14.9844L2.46094 20.9609L3.53906 22.0391L9.51562 16.0625C10.8076 17.1201 12.4541 17.75 14.25 17.75C18.3838 17.75 21.75 14.3838 21.75 10.25C21.75 6.11621 18.3838 2.75 14.25 2.75ZM14.25 4.25C17.5723 4.25 20.25 6.92773 20.25 10.25C20.25 13.5723 17.5723 16.25 14.25 16.25C10.9277 16.25 8.25 13.5723 8.25 10.25C8.25 6.92773 10.9277 4.25 14.25 4.25Z"
        fill={fill}
      />
    </svg>
  );
}

export default SearchIcon;

