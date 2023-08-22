import { useEffect, useMemo } from "react";
import { Center, Flex, Loader, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { useCookstove } from "@/context/cookstove";
import { useAppSelector } from "@/hooks/redux";
import { selectAllEntitiesExternalIds } from "@/redux/entityCollections/selectors";
import CollectionCostsChart from "@/components/Presentational/Chart/Instances/CollectionCostsChart";

import { calculateCosts, calculateTotalCosts } from "../helpers";

export default function CollectionCosts() {
  const {
    stove: { fuelSummary },
    fetchFuelSummary,
  } = useCookstove();

  const entitesExternalIds = useAppSelector(selectAllEntitiesExternalIds);

  const costsSummary = useMemo(
    () => fuelSummary && calculateCosts(fuelSummary),
    [fuelSummary]
  );

  const totalCosts = useMemo(
    () => costsSummary && calculateTotalCosts(costsSummary),
    [costsSummary]
  );

  useEffect(() => {
    if (entitesExternalIds?.length) fetchFuelSummary(entitesExternalIds);
  }, [entitesExternalIds?.length]);

  if (!costsSummary) {
    return (
      <Center py="xl">
        <Loader />
      </Center>
    );
  }

  return (
    <>
      <Flex pt={28} align="flex-end">
        <Text size={56} color={palette.fullBlue} pr={10} fs="normal">
          ${totalCosts?.toLocaleString() || 0}
        </Text>
        <Text color={palette.Black} pb={18} fs="normal" weight={300}>
          saved on energy costs
        </Text>
      </Flex>
      <CollectionCostsChart costsSummary={costsSummary} />
    </>
  );
}
