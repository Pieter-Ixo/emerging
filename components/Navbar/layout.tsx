import { Nav } from "./navbar";
import { useViewportSize } from "@mantine/hooks";
import { smallLaptopBreakpoint } from "@/constants/breakpoints";
import { Center, Flex, Text } from "@mantine/core";

//@ts-ignore
export default function Layout({ children }) {
  const viewPortSize = useViewportSize();

  if (viewPortSize.width <= smallLaptopBreakpoint) {
    return (
      <Center maw={"100vw"} h={"100vh"} mx="auto">
        <Text fw={700} sx={{ fontSize: 40 }} align="center">
          View on a Desktop Browser
        </Text>
      </Center>
    );
  }
  return (
    <Flex>
      <Nav />
      <main style={{ width: "100%", background: "#FAFAFA" }}>{children}</main>
    </Flex>
  );
}
