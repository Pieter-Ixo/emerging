import { Card, Text, Divider, Box } from "@mantine/core";
import ImpactTabs from "./ImpactTabs";
import { useAppSelector } from "@/hooks/redux";
import ImpactsSaved from "./ImpactsSaved";
import ImpactsOffset from "./ImpactsOffsets";
import ImpactsIssued from "./ImpactsIssued";

function ImpactsCard() {
  const impactNavi = useAppSelector((state) => state.user.impactNavi);

  return (
    <Card shadow="sm" radius={16} withBorder h={"100%"}>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "400",
          fontSize: 16,
        }}
      >
        CLIMATE IMPACTS
      </Text>

      <Divider my="sm" />

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

export default ImpactsCard;
