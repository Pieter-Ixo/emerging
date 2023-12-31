import { PropsWithChildren } from "react";
import { useViewportSize } from "@mantine/hooks";
import { Center, Text } from "@mantine/core";

import { smallLaptopBreakpoint } from "@/constants/breakpoints";

const notDesktopOnlyPathname = [
  `/devices/[entityId]`,
  "/collections/portfolio",
  "/devices/[entityId]/household",
];

export default function Layout({
  children,
  pathname,
}: PropsWithChildren & { pathname: string }) {
  const isDesktopOnly = !notDesktopOnlyPathname.includes(pathname);
  const viewPortSize = useViewportSize();

  if (isDesktopOnly) {
    if (!viewPortSize.width) {
      return null;
    }

    if (viewPortSize.width <= smallLaptopBreakpoint) {
      return (
        <Center maw="100vw" h="100vh" mx="auto">
          <Text fw={700} sx={{ fontSize: 40 }} align="center">
            View on a Desktop Browser
          </Text>
        </Center>
      );
    }
  }

  return (
    <main style={{ width: "100%", background: "#FAFAFA" }}>{children}</main>
  );
}
