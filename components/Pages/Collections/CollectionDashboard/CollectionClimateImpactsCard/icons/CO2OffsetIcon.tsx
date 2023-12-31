import * as React from "react";
import { SVGProps } from "react";

export default function CO2OffsetIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={24}
      height={25}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#a)">
        <path
          d="M18.774 3.984 18 4.335c-2.384 1.052-5.83 1.448-8.765 2.485-1.468.518-2.827 1.21-3.844 2.32-1.017 1.11-1.64 2.64-1.64 4.594 0 2.021 1.189 3.407 2.296 4.195.472.337.929.58 1.313.75-.463.859-.806 1.632-1.032 2.297-.41 1.198-.474 2.136-.445 2.813.03.676.117 1.14.117 1.125l1.5.14c.047-.542-.093-.826-.117-1.336-.023-.51.02-1.21.375-2.25.71-2.077 2.675-5.496 7.781-10.969l-1.078-1.03c-3.061 3.28-5.039 5.838-6.328 7.898a5.792 5.792 0 0 1-1.219-.657c-.87-.618-1.664-1.523-1.664-2.976 0-1.652.472-2.742 1.242-3.586.771-.844 1.893-1.447 3.235-1.922 2.429-.858 5.434-1.292 8.015-2.25.24.911 1.008 4.031 1.008 8.906 0 2.766-.647 4.35-1.406 5.227-.759.876-1.673 1.125-2.484 1.125-.809 0-1.682-.413-2.438-.938-.756-.524-1.277-1.072-1.805-1.406l-.796 1.266c.134.085.882.776 1.757 1.383.876.606 1.987 1.195 3.282 1.195 1.154 0 2.566-.407 3.633-1.64 1.066-1.234 1.757-3.215 1.757-6.212 0-5.865-1.242-10.078-1.242-10.078l-.234-.82Z"
          fill={props.fill}
        />
      </g>
      <defs>
        <clipPath id="a">
          <path
            fill={props.fill}
            transform="translate(0 .984)"
            d="M0 0h24v24H0z"
          />
        </clipPath>
      </defs>
    </svg>
  );
}
