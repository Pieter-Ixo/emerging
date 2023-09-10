import Link from "next/link";
import { useEffect } from "react";
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
import { resetEntityTokens } from "@/redux/entityCollections/actions";

import { ImpactCreditsButtonBlue } from "../UserBalance/StyledButtons";

export default function NavBatchesOwnerCard({
  entity,
}: {
  entity: IEntityExtended;
}) {
  const dispatch = useAppDispatch();
  const adminTokens = useAppSelector(selectAdminTokens);
  const isAdminTokensLoading = useAppSelector(selectAdminTokensIsLoading);
  const userTokens = useAppSelector(selectUserTokens);
  const isUserTokensLoading = useAppSelector(selectUserTokensIsLoading);

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

  if (isAdminTokensLoading || isUserTokensLoading) return <Loader />;

  const isAdminTokensEmpty = !adminTokens || !Object.keys(adminTokens).length;
  const isUserTokensEmpty = !userTokens || !Object.keys(userTokens).length;


  if (isAdminTokensEmpty && isUserTokensEmpty) return null;
  
  // FIXME:EMERGING-244 handle how many batches are inside ownerTokensLenght,
  // by mapping through adminTokens and ownerTokens
  const ownerTokensLength = Object.keys(userTokens?.CARBON?.tokens || {}).length;

  const ownerBatchesGridHref = `/entity/${entityExternalId}/batch/byOwnerAddress/${entityOwnerAddress}`;

  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <Flex align="flex-end">

          <Text color={palette.accentActive} size={56}>
            {ownerTokensLength}
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
