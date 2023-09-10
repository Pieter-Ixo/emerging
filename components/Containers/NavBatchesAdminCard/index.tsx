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
import { resetEntityTokens } from "@/redux/entityCollections/actions";

import { ImpactCreditsButtonBlue } from "../UserBalance/StyledButtons";

export default function NavBatchesAdminCard({
  entity,
}: {
  entity: IEntityExtended;
}) {
  const dispatch = useAppDispatch();
  const adminTokens = useAppSelector(selectAdminTokens);
  const isAdminTokensLoading = useAppSelector(selectAdminTokensIsLoading);

  const entityAdminAddress = entity.accounts[0].address;
  const entityExternalId = entity.externalId;

  useEffect(() => {
    dispatch(resetEntityTokens());
    return () => {
      dispatch(resetEntityTokens());
    };
  }, []);

  useEffect(() => {
    if (entityAdminAddress) {
      dispatch(fetchAdminTokens(entityAdminAddress));
    }
  }, [entityAdminAddress]);

  if (isAdminTokensLoading) return <Loader />;

  const isAdminTokensEmpty = !adminTokens || !Object.keys(adminTokens).length;

  if (isAdminTokensEmpty) return null;

  const adminTokensLength = Object.keys(adminTokens?.CARBON?.tokens || {}).length;
  
  const adminBatchesGridHref = `/entity/${entityExternalId}/batch/byAdminAddress/${entityAdminAddress}`;

  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <Flex align="flex-end">
          <Text color={palette.accentActive} size={56}>
            {adminTokensLength}
          </Text>
          <Text color={palette.accentActive} pb="md" ml="xs">
            BATCHES FOR {entity.alsoKnownAs.replace("{id}", "")}
          </Text>
        </Flex>
        <Stack spacing="xs">
          <Link href={adminBatchesGridHref}>
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
