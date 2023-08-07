import { Flex } from "@mantine/core";
import Nav from "@/components/Layout/Navbar/navbar";
import { initStyles } from "@/theme/initStyles";
import BatchPageLayout from "@/components/Pages/Batch";

export default function BatchPage() {
  return (
    <Flex>
      <Nav />
      <main
        style={{
          marginLeft: initStyles.navWidth,
          width: "100%",
          background: "#FAFAFA",
        }}
      >
        <BatchPageLayout />
      </main>
    </Flex>
  );
}
