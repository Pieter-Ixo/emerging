import { Flex } from "@mantine/core";
import Nav from "@/components/Navbar/navbar";
import BatchPageLayout from "./BatchPageLayout";

export default function BatchPage() {
  return (
    <Flex>
      <Nav />
      <main style={{ width: "100%", background: "#FAFAFA" }}>
        <BatchPageLayout />
      </main>
    </Flex>
  );
}
