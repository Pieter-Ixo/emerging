import Link from "next/link";
import { useEffect, useState } from "react";
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
import { ITokenMap, IEntityExtended } from "@/types/entityCollections";
import Generated from "@/assets/icons/generated.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import { resetEntityTokens } from "@/redux/entityCollections/actions";
import filterAdminTokens from "@/helpers/batches/filterAdminTokens";

import { ImpactCreditsButtonBlue } from "../UserBalance/StyledButtons";

export default function NavBatchesOwnerCard({
  entity,
}: {
  entity: IEntityExtended;
}) {
  const dispatch = useAppDispatch();
  const adminTokens = useAppSelector(selectAdminTokens);
  const isAdminTokensLoading = useAppSelector(selectAdminTokensIsLoading);
  const ownerTokens = useAppSelector(selectUserTokens);
  const isUserTokensLoading = useAppSelector(selectUserTokensIsLoading);

  const [filteredAdminTokens, setFilteredAdminTokens] = useState<
    ITokenMap | {}
  >({});

  const entityAdminAddress = entity.accounts[0].address;
  const entityOwnerAddress = entity.owner;
  const entityExternalId = entity.externalId;

  useEffect(() => {
    dispatch(resetEntityTokens());
    return () => {
      dispatch(resetEntityTokens());
    };
  }, []);

  useEffect(() => {
    if (entityOwnerAddress) dispatch(fetchUsersTokens(entityOwnerAddress));
    if (entityAdminAddress) dispatch(fetchAdminTokens(entityAdminAddress));
  }, [entityAdminAddress, entityOwnerAddress]);

  useEffect(() => {
    if (ownerTokens && adminTokens) {
      const adminCarbonTokens = adminTokens?.CARBON?.tokens;
      const ownerCarbonTokens = ownerTokens.CARBON.tokens;

      const adminTokensFilteredMap = filterAdminTokens(
        adminCarbonTokens,
        ownerCarbonTokens
      );

      setFilteredAdminTokens(adminTokensFilteredMap);
    }
  }, [ownerTokens, adminTokens]);

  if (isAdminTokensLoading || isUserTokensLoading) return <Loader />;

  if (filteredAdminTokens && !Object.keys(filteredAdminTokens)?.length)
    return null;

  const ownerBatchesGridHref = `/entity/${entityExternalId}/batch/byOwnerAddress/${entityOwnerAddress}`;

  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <Flex align="flex-end">
          <Text color={palette.accentActive} size={56}>
            {Object.entries(filteredAdminTokens|| {}).length}
          </Text>
          <Text color={palette.accentActive} pb="md" ml="xs">
            BATCHES FOR {entity.alsoKnownAs.replace("{id}", "")}
          </Text>
        </Flex>
        <Stack spacing="xs">
          <Link href={ownerBatchesGridHref}>
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
