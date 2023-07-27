import { Text } from "@mantine/core";
import PageBlock from "../PageBlock";

export default function CollectionPerformanceCard() {
  return (
    <PageBlock title="ASSETS" rightSide={<Text>SEE ALL</Text>}>
      <div id="graph" />
    </PageBlock>
  );
}
