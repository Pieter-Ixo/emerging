import { SVGProps } from "react";

function DownArrow({ fill }: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.25 3v12.422L7.29 11.46l-1.08 1.078 5.25 5.25.54.516.54-.516 5.25-5.25-1.08-1.078-3.96 3.96V3h-1.5Zm-6 16.5V21h13.5v-1.5H5.25Z"
        fill={fill}
      />
    </svg>
  );
}

export default DownArrow;
