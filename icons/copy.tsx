import { SVGProps } from "react";
import { palette } from "@/theme/palette";

function Copy({ fill, ...svgProps }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={18}
      height={19}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        d="M0 .448v15h5.25v-1.5H1.5v-12h9v.75H12V.448H0Zm6 3v15h12v-15H6Zm1.5 1.5h9v12h-9v-12Z"
        fill={fill || palette.lightBlue}
      />
    </svg>
  );
}

export default Copy;
