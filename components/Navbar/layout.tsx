import { Nav } from "./navbar";
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";

//@ts-ignore
export default function Layout({ children }) {
  const viewPortSize = useViewportSize();
  let styles = {};
  if (viewPortSize.width <= tabletBreakpoint) {
    styles = {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignContent: "center",
      width: "100%",
    };
  } else {
    styles = { display: "flex" };
  }
  return (
    <div>
      <div style={styles}>
        <Nav />
        <main className="flex-1" style={{ width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
