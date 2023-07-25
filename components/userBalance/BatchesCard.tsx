import Link from "next/link";
import { useEffect } from "react";
import { Card, Flex, Stack, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAdminTokens } from "@/redux/entityCollections/thunks";
import {
  selectAdminTokens,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";

import Generated from "../Dashboard/CollectionDashboard/cards/ImpactsCard/icons/generated";
import { ImpactCreditsButtonBlue } from "./styled-buttons";

export default function BatchesCard() {
  const dispatch = useAppDispatch();
  const uec = useAppSelector(selectUserEntityCollections);
  const adminTokens = useAppSelector(selectAdminTokens);
  const entityAdminAddress = uec?.[0]?.entities?.[0]?.accounts?.[0]?.address;

  useEffect(() => {
    if (entityAdminAddress) dispatch(fetchAdminTokens(entityAdminAddress));
  }, [entityAdminAddress]);

  if (!adminTokens) return null;
  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <Flex align="flex-end">
          <Text color={palette.fullBlue} size={56}>
            {Object.keys(adminTokens?.CARBON.tokens).length}
          </Text>
          <Text color={palette.fullBlue} pb="md" ml="xs">
            BATCHES
          </Text>
        </Flex>
        <Stack spacing="xs">
          <Link href={`/batches/${entityAdminAddress}`}>
            <ImpactCreditsButtonBlue
              leftIcon={<Generated fill={palette.White} />}
            >
              Explore
            </ImpactCreditsButtonBlue>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
