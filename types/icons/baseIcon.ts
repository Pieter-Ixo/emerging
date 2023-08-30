import { ElementType, SVGProps } from "react";

export type Status = "selected" | "notSelected" | "disabled";
export type IconProp = { stroke?: string; fill?: string; bgColor?: string };

export type IconVariant = "circle" | "default";

export type BaseIconProps = SVGProps<SVGSVGElement> & {
  status?: Status;
  Icon: ElementType;
  theme?: {
    selected?: IconProp;
    notSelected?: IconProp;
    disabled?: IconProp;
  };
  isStroke?: boolean;
  cursorMode?: "default" | "pointer" | "not-allowed";
  variant?: IconVariant;
};
