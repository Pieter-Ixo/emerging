import { useEffect } from "react";
import { Loader, Text } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { useCookstove } from "@/context/cookstove";
import { selectAllEntitiesExternalIds } from "@/redux/entityCollections/selectors";

import PageBlock from "../PageBlock";
import SessionsChart from "./SessionsChart";

export default function CollectionPerformanceCard() {
  const {
    stove: { sessionsSummary },
    fetchMonthSummary,
  } = useCookstove();

  const entitesExternalIds = useAppSelector(selectAllEntitiesExternalIds);

  useEffect(() => {
    fetchMonthSummary(entitesExternalIds);
  }, []);

  return (
    <PageBlock title="COLLECTION PERFORMANCE" rightSide={<Text>SEE ALL</Text>}>
      {sessionsSummary ? (
        <SessionsChart sessionsSummary={sessionsSummary} />
      ) : (
        <Loader />
      )}
    </PageBlock>
  );
}
