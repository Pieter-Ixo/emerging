import { useState } from "react";
import { Card, Text, Divider } from "@mantine/core";
import ImpactTabs, { ClimateImpactTab } from "./ImpactTabs";
import ImpactCharts from "./ImpactCharts";

export default function CollectionClimateImpactsCard() {
  const [climateImpactTab, setClimateImpactTab] = useState<ClimateImpactTab>(
    ClimateImpactTab.SAVED
  );

  return (
    <Card radius={16} py="md" px="xl">
      <Text ta="left" weight={400} size={16}>
        CLIMATE IMPACTS
      </Text>

      <Divider mb="lg" color="#000000" />

      <ImpactTabs activeTab={climateImpactTab} onSetTab={setClimateImpactTab} />
      <ImpactCharts activeTab={climateImpactTab} />
    </Card>
  );
}
