import Link from "next/link";
import { useEffect } from "react";
import { Card, Flex, Loader, Stack, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAdminTokens } from "@/redux/entityCollections/thunks";
import {
  selectAdminTokens,
  selectAdminTokensIsLoading,
} from "@/redux/entityCollections/selectors";
import { IEntityExtended } from "@/types/entityCollections";
import Generated from "@/assets/icons/generated.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";

import { ImpactCreditsButtonBlue } from "./StyledButtons";

export default function BatchesCard({ entity }: { entity: IEntityExtended }) {
  const dispatch = useAppDispatch();
  const adminTokens = useAppSelector(selectAdminTokens);
  const isAdminTokensLoading = useAppSelector(selectAdminTokensIsLoading);

  const entityAdminAddress = entity.accounts[0].address;
  const entityExternalId = entity.externalId;
  const batchDashboardHref = `/entity/${entityExternalId}/batch/byAdminAddress/${entityAdminAddress}`;

  useEffect(() => {
    if (entityAdminAddress) dispatch(fetchAdminTokens(entityAdminAddress));
  }, [entityAdminAddress]);

  if (isAdminTokensLoading) return <Loader />;
  if (!adminTokens || !Object.keys(adminTokens).length) return null;

  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <Flex align="flex-end">
          <Text color={palette.accentActive} size={56}>
            {Object.keys(adminTokens?.CARBON.tokens).length}
          </Text>
          <Text color={palette.accentActive} pb="md" ml="xs">
            BATCHES
          </Text>
        </Flex>
        <Stack spacing="xs">
          <Link href={batchDashboardHref}>
            <ImpactCreditsButtonBlue
              leftIcon={
                <BaseIcon
                  Icon={Generated}
                  width={25}
                  height={24}
                  fill={palette.White}
                />
              }
            >
              Explore
            </ImpactCreditsButtonBlue>
          </Link>
        </Stack>
      </Stack>
    </Card>
  );
}
