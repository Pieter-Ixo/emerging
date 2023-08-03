import { useEffect } from "react";
import { Flex, Loader, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { useCookstove } from "@/context/cookstove";
import { useAppSelector } from "@/hooks/redux";
import { selectAllEntitiesExternalIds } from "@/redux/entityCollections/selectors";

import { calculateTotalFuel } from "../helpers";
import CollectionFuelChart from "../../../../../../components/Сhart/Instances/CollectionFuelChart";

export default function CollectionFuel() {
  const {
    stove: { fuelSummary },
    fetchFuelSummary,
  } = useCookstove();

  const entitesExternalIds = useAppSelector(selectAllEntitiesExternalIds);

  useEffect(() => {
    fetchFuelSummary(entitesExternalIds);
  }, []);

  const totalValue = fuelSummary ? calculateTotalFuel(fuelSummary) : 0;

  return fuelSummary ? (
    <>
      <Flex pt={28} align="flex-end">
        <Text size={56} color={palette.fullBlue} pr={10} fs="normal">
          {totalValue.toLocaleString()}
        </Text>
        <Text color={palette.Black} pb={18} fs="normal" weight={300}>
          kg pellets bought in last 2 months
        </Text>
      </Flex>
      <CollectionFuelChart fuelSummary={fuelSummary} />
    </>
  ) : (
    <Loader />
  );
}
