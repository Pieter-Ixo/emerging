import { useEffect } from "react";
import { Text } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { useCookstove } from "@/context/cookstove";
import { selectAllEntitiesExternalIds } from "@/redux/entityCollections/selectors";

import PageBlock from "../PageBlock";

export default function CollectionPerformanceCard() {
  const {
    stove: { sessionsSummary },
    fetchMonthSummary,
  } = useCookstove();

  const entitesExternalIds = useAppSelector(selectAllEntitiesExternalIds);

  console.log("🐞", sessionsSummary);

  useEffect(() => {
    fetchMonthSummary(entitesExternalIds.slice(0, 10));
  }, []);

  return (
    <PageBlock title="COLLECTION PERFORMANCE" rightSide={<Text>SEE ALL</Text>}>
      <div id="graph" />
    </PageBlock>
  );
}
