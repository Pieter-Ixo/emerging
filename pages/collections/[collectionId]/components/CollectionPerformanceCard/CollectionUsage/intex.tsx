import { useEffect } from "react";
import { Flex, Loader, Text } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { useCookstove } from "@/context/cookstove";
import { selectAllEntitiesExternalIds } from "@/redux/entityCollections/selectors";
import { palette } from "@/theme/palette";

import { calculateTotalSessions } from "../helpers";
import SessionsChart from "./SessionsChart";

export default function CollectionUsage() {
  const {
    stove: { sessionsSummary },
    fetchMonthSummary,
  } = useCookstove();

  const entitesExternalIds = useAppSelector(selectAllEntitiesExternalIds);

  useEffect(() => {
    fetchMonthSummary(entitesExternalIds);
  }, []);

  const totalValue = sessionsSummary
    ? calculateTotalSessions(sessionsSummary)
    : 0;

  return sessionsSummary ? (
    <>
      <Flex pt={28} align="flex-end">
        <Text size={56} color={palette.fullBlue} pr={10} fs="normal">
          {totalValue.toLocaleString()}
        </Text>
        <Text color={palette.Black} pb={18} fs="normal" weight={300}>
          clean cooking sessions with renewable energy
        </Text>
      </Flex>

      <SessionsChart sessionsSummary={sessionsSummary} />
    </>
  ) : (
    <Loader />
  );
}
