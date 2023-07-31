import { Flex } from "@mantine/core";
import Nav from "@/components/Navbar/navbar";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { initStyles } from "@/theme/initStyles";

export default function BatchesPage() {
  const entityId = useValueFromRouter("entityId");
  const batchId = useValueFromRouter("batchId");

  return (
    <Flex >
      <Nav />
      <main style={{marginLeft:initStyles.navWidth, width: "100%", background: "#FAFAFA" }}>
        <p>{entityId}</p>
        <p>{batchId}</p>
      </main>
    </Flex>
  );
}
