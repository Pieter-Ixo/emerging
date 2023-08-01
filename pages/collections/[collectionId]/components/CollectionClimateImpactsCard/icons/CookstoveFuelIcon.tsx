import * as React from "react";
import { SVGProps } from "react";

export default function CookstoveFuelIcon(
  props: { strokeColor: string } & SVGProps<SVGSVGElement>
) {
  const { strokeColor, ...svgProps } = props;
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...svgProps}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M11.4295 15.3284V13.6781H10.0857C6.92834 13.6781 4.44739 11.1972 4.44739 8.0398V5.94537C4.44739 5.5303 4.78365 5.19404 5.19872 5.19404H7.29315C9.05269 5.19404 10.6055 5.96495 11.6339 7.19858C12.2895 4.80958 14.4456 3.09961 17.0672 3.09961H19.1616C19.5767 3.09961 19.9129 3.43587 19.9129 3.85094V5.94537C19.9129 9.10275 17.432 11.5837 14.2746 11.5837H12.9315V15.3284H16.327C18.5362 15.3284 20.327 17.1192 20.327 19.3284C20.327 21.5375 18.5362 23.3284 16.327 23.3284H8.0332C5.82406 23.3284 4.0332 21.5375 4.0332 19.3284C4.0332 17.1192 5.82406 15.3284 8.0332 15.3284H11.4295ZM11.4295 11.1125V10.8324C11.4295 8.50933 9.61689 6.6967 7.29385 6.6967H5.95005V8.0398C5.95005 10.3628 7.76268 12.1755 10.0857 12.1755H10.3665L7.10689 8.91524L8.16929 7.85284L11.4295 11.1125ZM12.9315 9.01858L16.1906 5.75942L17.2545 6.82123L13.9941 10.081H14.2746C16.5983 10.081 18.4103 8.26846 18.4103 5.94537V4.60227H17.0672C14.7435 4.60227 12.9315 6.41485 12.9315 8.73794V9.01858ZM8.0332 16.8284H16.327C17.7077 16.8284 18.827 17.9477 18.827 19.3284C18.827 20.7091 17.7077 21.8284 16.327 21.8284H8.0332C6.65249 21.8284 5.5332 20.7091 5.5332 19.3284C5.5332 17.9477 6.65249 16.8284 8.0332 16.8284Z"
        fill={strokeColor || "black"}
      />
    </svg>
  );
}
