import * as React from "react";
import { SVGProps } from "react";

// FIXME: EMERGING-143 we shouldn't make a component for each SVG icon. Move all SVGs to assets/icons and make a component which work with all SVGs
export default function CookstoveTimeIcon(
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
        d="M12 3.73242C7.03711 3.73242 3 7.76953 3 12.7324C3 17.6953 7.03711 21.7324 12 21.7324C16.9629 21.7324 21 17.6953 21 12.7324C21 7.76953 16.9629 3.73242 12 3.73242ZM12 5.23242C16.1514 5.23242 19.5 8.58106 19.5 12.7324C19.5 16.8838 16.1514 20.2324 12 20.2324C7.84863 20.2324 4.5 16.8838 4.5 12.7324C4.5 8.58106 7.84863 5.23242 12 5.23242ZM11.25 6.73242V13.4824H16.5V11.9824H12.75V6.73242H11.25Z"
        fill="black"
      />
    </svg>
  );
}
