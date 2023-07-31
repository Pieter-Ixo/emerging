import { useEffect, useState } from "react";
import { Loader, Text } from "@mantine/core";
import { ICollectionEntitiesToken } from "@/types/entityCollections";
import { useAppSelector } from "@/hooks/redux";
import { selectEntitiesTotalLoading } from "@/redux/entityCollections/selectors";

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
  const isEntitiesTotalTokensLoading = useAppSelector(
    selectEntitiesTotalLoading
  );

  const [climateImpactTab, setClimateImpactTab] = useState<ClimateImpactTab>(
    ClimateImpactTab.SAVED
  );
  const [totalTabValue, setTotal] = useState(0);

  const getActionType = (tabType: ClimateImpactTab) => {
    if (tabType === ClimateImpactTab.SAVED) {
      return ActionType.Minted;
    }
    if (tabType === ClimateImpactTab.ISSUED) {
      return ActionType.Minted;
    }
    return ActionType.Retired;
  };

  const countTotal = (tabType: ClimateImpactTab) => {
    const currentActionType = getActionType(tabType);

    const total = totalCollectionEntitiesTokens?.reduce(
      (sum, token) => sum + (token[currentActionType] || 0),
      0
    );

    switch (currentActionType) {
      // Code below will be in use if `Amount` will become a possible ActionType
      // case ActionType.Amount:
      //   setTotal(total);
      //   break;

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
    <PageBlock title="CLIMATE IMPACTS">
      <ImpactTabs activeTab={climateImpactTab} onSetTab={setClimateImpactTab} />
      {isEntitiesTotalTokensLoading ? (
        <Loader w="100%" mx="auto" />
      ) : (
        <ImpactCharts activeTab={climateImpactTab} totalValue={totalTabValue} />
      )}
    </PageBlock>
  );
}
