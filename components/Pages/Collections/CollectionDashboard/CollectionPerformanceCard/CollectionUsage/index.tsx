import { useEffect, useMemo } from "react";
import { Center, Flex, Loader, Text } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { useCookstove } from "@/context/cookstove";
import { selectAllEntitiesExternalIds } from "@/redux/entityCollections/selectors";
import { palette } from "@/theme/palette";
import CollectionSessionsChart from "@/components/Presentational/Chart/Instances/CollectionSessionsChart";

import { calculateTotalSessions } from "../helpers";

export default function CollectionUsage() {
  const {
    stove: { sessionsSummary },
    fetchSessionsSummary,
  } = useCookstove();

  const entitesExternalIds = useAppSelector(selectAllEntitiesExternalIds);

  const totalValue = useMemo(
    () => sessionsSummary && calculateTotalSessions(sessionsSummary),
    [sessionsSummary]
  );

  useEffect(() => {
    if (entitesExternalIds?.length) {
      fetchSessionsSummary(entitesExternalIds);
    }
  }, [entitesExternalIds?.length]);

  if (!sessionsSummary) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Flex pt={28} align="flex-end">
        <Text size="xl" color={palette.accentActive} pr={10} fs="normal">
          {totalValue?.toLocaleString() || 0}
        </Text>
        <Text size="md" color={palette.Black} pb={18} fs="normal" weight={300}>
          clean cooking sessions with renewable energy during last 2 months
        </Text>
      </Flex>

      <CollectionSessionsChart sessionsSummary={sessionsSummary} />
    </>
  );
}
