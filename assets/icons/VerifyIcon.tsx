import { SVGProps } from "react";

function VerifyIcon({ fill }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_6378_85536)">
        <path
          d="M15.8887 15.2222L17.7348 17L21.8887 13M15.1485 19.93C13.8804 20.6127 12.4298 21 10.8887 21C5.91811 21 1.88867 16.9706 1.88867 12C1.88867 7.02944 5.91811 3 10.8887 3C15.0421 3 18.5383 5.81344 19.5757 9.6385M18.522 22C16.572 21.74 12.8887 19.92 12.8887 10.56C12.8887 10.56 16.572 10.56 18.522 9C20.472 10.56 24.1553 10.56 24.1553 10.56C24.1553 19.92 20.472 21.74 18.522 22Z"
          stroke="white"
          stroke-width="1.39263"
        />
      </g>
      <defs>
        <clipPath id="clip0_6378_85536">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.888672)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

export default VerifyIcon;
