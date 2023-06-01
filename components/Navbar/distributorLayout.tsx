import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import { Transition } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { NavDist } from "./navDist";
// import ReactCSSTransitionGroup from "react-transisition-group";

//@ts-ignore
export default function LayoutDist({ children }) {
  return (
    <div>
      <div style={{ display: "flex" }}>
        <NavDist />

        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
