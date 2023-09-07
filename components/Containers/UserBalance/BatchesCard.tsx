import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { Card, Flex, Loader, Stack, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchAdminTokens,
  fetchUsersTokens,
} from "@/redux/entityCollections/thunks";
import {
  selectAdminTokens,
  selectAdminTokensIsLoading,
  selectUserTokens,
  selectUserTokensIsLoading,
} from "@/redux/entityCollections/selectors";
import { IEntityExtended } from "@/types/entityCollections";
import Generated from "@/assets/icons/generated.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import resetEntityTokens from "@/redux/entityCollections/actions";

import { ImpactCreditsButtonBlue } from "./StyledButtons";

export default function BatchesCard({ entity }: { entity: IEntityExtended }) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const adminTokens = useAppSelector(selectAdminTokens);
  const isAdminTokensLoading = useAppSelector(selectAdminTokensIsLoading);
  const userTokens = useAppSelector(selectUserTokens);
  const isUserTokensLoading = useAppSelector(selectUserTokensIsLoading);

  const isPortfolioCollectionsRoute =
    router.pathname === "/collections/portfolio";
  const isGlobalCollectionsRoute =
    router.pathname === "/collections/[collectionId]";

  const entityAdminAddress = entity.accounts[0].address;
  const entityOwnerAddress = entity.owner;
  const entityExternalId = entity.externalId;

  useEffect(() => {
    dispatch(resetEntityTokens());
  }, []);

  useEffect(() => {
    if (isPortfolioCollectionsRoute && entityOwnerAddress) {
      dispatch(fetchUsersTokens(entityOwnerAddress));
    }

    if (isGlobalCollectionsRoute && entityAdminAddress) {
      dispatch(fetchAdminTokens(entityAdminAddress));
    }
  }, [entityAdminAddress, entityOwnerAddress]);

  if (isAdminTokensLoading || isUserTokensLoading) return <Loader />;

  const isAdminTokensEmpty = !adminTokens || !Object.keys(adminTokens).length;
  const isUserTokensEmpty = !userTokens || !Object.keys(userTokens).length;

  if (isAdminTokensEmpty && isUserTokensEmpty) return null;

  const adminTokensLength = adminTokens?.CARBON?.tokens
    ? Object.keys(adminTokens.CARBON?.tokens).length
    : 0;

  const userTokensLength = userTokens?.CARBON?.tokens
    ? Object.keys(userTokens?.CARBON?.tokens).length
    : 0;

  const batchDashboardHref = isGlobalCollectionsRoute
    ? `/entity/${entityExternalId}/batch/byAdminAddress/${entityAdminAddress}`
    : `/entity/${entityExternalId}/batch/byOwnerAddress/${entityOwnerAddress}`;

  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <Flex align="flex-end">
          <Text color={palette.accentActive} size={56}>
            {adminTokensLength || userTokensLength}
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
