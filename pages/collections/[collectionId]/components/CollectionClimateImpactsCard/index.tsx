import { useState } from "react";
import { Text } from "@mantine/core";

import PageBlock from "../PageBlock";
import ImpactTabs, { ClimateImpactTab } from "./ImpactTabs";
import ImpactCharts from "./ImpactCharts";

export default function CollectionClimateImpactsCard() {
  const [climateImpactTab, setClimateImpactTab] = useState<ClimateImpactTab>(
    ClimateImpactTab.SAVED
  );

  return (
    <PageBlock title="CLIMATE IMPACTS" rightSide={<Text>SEE ALL</Text>}>
      <ImpactTabs activeTab={climateImpactTab} onSetTab={setClimateImpactTab} />
      <ImpactCharts activeTab={climateImpactTab} />
    </PageBlock>
  );
}
