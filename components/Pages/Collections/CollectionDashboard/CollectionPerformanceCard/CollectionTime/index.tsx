import { useEffect, useMemo } from "react";
import { Center, Flex, Loader, Text } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { useCookstove } from "@/context/cookstove";
import { selectAllEntitiesExternalIds } from "@/redux/entityCollections/selectors";
import { palette } from "@/theme/palette";
import CollectionSessionsTimeChart from "@/components/Presentational/Chart/Instances/CollectionSessionsTimeChart";

import {
  calculateTotalSessionsSavedTime,
  calculateSessionsSavedTime,
} from "../helpers";

export default function CollectionTime() {
  const {
    stove: { sessionsSummary },
    fetchSessionsSummary,
  } = useCookstove();

  const entitesExternalIds = useAppSelector(selectAllEntitiesExternalIds);

  const sessionsSavedTime = useMemo(
    () => sessionsSummary && calculateSessionsSavedTime(sessionsSummary),
    [sessionsSummary]
  );

  const totalSessionsSavedTime = useMemo(
    () =>
      sessionsSavedTime && calculateTotalSessionsSavedTime(sessionsSavedTime),
    [sessionsSavedTime]
  );

  useEffect(() => {
    if (entitesExternalIds?.length) {
      fetchSessionsSummary(entitesExternalIds);
    }
  }, [entitesExternalIds?.length]);

  return sessionsSavedTime ? (
    <>
      <Flex pt={28} align="flex-end">
        <Text size="xl" color={palette.fullBlue} pr={10} fs="normal">
          {totalSessionsSavedTime?.toLocaleString() || 0}
        </Text>
        <Text size="md" color={palette.Black} pb={18} fs="normal" weight={300}>
          hours saved on cooking time
        </Text>
      </Flex>

      <CollectionSessionsTimeChart sessionsSavedTime={sessionsSavedTime} />
    </>
  ) : (
    <Center py="xl">
    <Loader />
  </Center>
  );
}
