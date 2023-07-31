import { Flex } from "@mantine/core";
import Nav from "@/components/Navbar/navbar";
import { initStyles } from "@/theme/initStyles";
import BatchPageLayout from "./BatchPageLayout";

export default function BatchPage() {
  return (
    <Flex>
      <Nav />
      <main style={{marginLeft:initStyles.navWidth, width: "100%", background: "#FAFAFA" }}>
        <BatchPageLayout />
      </main>
    </Flex>
  );
}
