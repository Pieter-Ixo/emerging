import { useEffect, useState } from "react";
import { Text } from "@mantine/core";
import { ICollectionEntitiesToken } from "@/types/entityCollections";

import PageBlock from "../PageBlock";
import ImpactTabs, { ClimateImpactTab } from "./ImpactTabs";
import ImpactCharts from "./ImpactCharts";

enum ActionType {
  Amount = "amount",
  Minted = "minted",
  Retired = "retired",
}

type Props = {
  totalCollectionEntitiesTokens: ICollectionEntitiesToken[];
};

export default function CollectionClimateImpactsCard({
  totalCollectionEntitiesTokens,
}: Props) {
  const [climateImpactTab, setClimateImpactTab] = useState<ClimateImpactTab>(
    ClimateImpactTab.SAVED
  );
  const [totalTabValue, setTotal] = useState(0);

  const getActionType = (tabType: ClimateImpactTab) => {
    if (tabType === ClimateImpactTab.SAVED) {
      return ActionType.Amount;
    }
    if (tabType === ClimateImpactTab.ISSUED) {
      return ActionType.Minted;
    }
    return ActionType.Retired;
  };

  const countTotal = (tabType: ClimateImpactTab) => {
    const currentActionType = getActionType(tabType);

    const total = totalCollectionEntitiesTokens.reduce(
      (sum, token) => sum + token[currentActionType],
      0
    );

    switch (currentActionType) {
      case ActionType.Amount:
        setTotal(total);
        break;
        
      case ActionType.Minted:
        setTotal(total);
        break;

      case ActionType.Retired:
        setTotal(total);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    countTotal(climateImpactTab);
  }, [totalCollectionEntitiesTokens, climateImpactTab]);

  return (
    <PageBlock title="CLIMATE IMPACTS" rightSide={<Text>SEE ALL</Text>}>
      <ImpactTabs activeTab={climateImpactTab} onSetTab={setClimateImpactTab} />
      <ImpactCharts activeTab={climateImpactTab} totalValue={totalTabValue} />
    </PageBlock>
  );
}
