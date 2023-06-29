import { Flex } from "@mantine/core";
import Nav from "@/components/Navbar/navbar";
import useValueFromRouter from "@/utils/useValueFromRouter";

export default function BatchesPage() {
  const entityId = useValueFromRouter("entityId");
  const batchId = useValueFromRouter("batchId");

  return (
    <Flex>
      <Nav />
      <main style={{ width: "100%", background: "#FAFAFA" }}>
        <p>{entityId}</p>
        <p>{batchId}</p>
      </main>
    </Flex>
  );
}
