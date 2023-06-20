import { Card, Text, Divider, Box } from "@mantine/core";
import { useAppSelector } from "@/hooks/redux";
import ImpactTabs from "./ImpactTabs";
import ImpactsSaved from "./ImpactsSaved";
import ImpactsOffset from "./ImpactsOffsets";
import ImpactsIssued from "./ImpactsIssued";

export default function CollectionClimateImpactsCard() {
  const impactNavi = useAppSelector((state) => state.user.impactNavi);

  return (
    <Card radius={16} style={{ padding: "1rem 2rem" }}>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "400",
          fontSize: 16,
        }}
      >
        CLIMATE IMPACTS
      </Text>

      <Divider mb="lg" color="#000000" />

      <ImpactTabs />

      <Box style={{ display: impactNavi === "Saved" ? "block" : "none" }}>
        <ImpactsSaved />
      </Box>
      <Box style={{ display: impactNavi === "Generated" ? "block" : "none" }}>
        <ImpactsIssued />
      </Box>
      <Box style={{ display: impactNavi === "Offset" ? "block" : "none" }}>
        <ImpactsOffset />
      </Box>
    </Card>
  );
}
