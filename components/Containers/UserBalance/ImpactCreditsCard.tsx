import { useEffect, useState } from "react";
import {
  Card,
  Flex,
  Loader,
  SegmentedControl,
  Stack,
  Text,
} from "@mantine/core";

import { palette } from "@/theme/palette";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectEntitiesAdminTotal,
  selectUserEntitiesLength,
  selectUserEntitiesTotalAmount,
  selectUserEntitiesTotalLoading,
} from "@/redux/entityCollections/selectors";
import {
  fetchCollectionsByOwnerAddres,
  fetchUsersTokens,
} from "@/redux/entityCollections/thunks";

import BaseIcon from "@/components/Presentational/BaseIcon";
import DownArrow from "@/assets/icons/down-arrow.svg";
import ReceiveArrow from "@/assets/icons/receive-arrow.svg";
import SendArrow from "@/assets/icons/send-arrow.svg";

import {
  ImpactCreditsButtonBlue,
  ImpactCreditsButtonGrey,
} from "./StyledButtons";
import IssueCarbonButton from "./buttons/IssueCarbonButton";
import WithdrowCarbonButton from "./buttons/WithdrowCarbonButton";

type CreditsTabName = "available" | "offset";

function ImpactCreditsCard() {
  const dispatch = useAppDispatch();
  const [creditsTabName, setCreditsTabName] =
    useState<CreditsTabName>("available");

  const userAddress = useAppSelector((state) => state.user.connectedWallet);
  const userEntitiesLength = useAppSelector(selectUserEntitiesLength);
  const userTotalAmount = useAppSelector(selectUserEntitiesTotalAmount);
  const userTotalLoading = useAppSelector(selectUserEntitiesTotalLoading);
  const entitiesAdminTotal = useAppSelector(selectEntitiesAdminTotal);

  useEffect(() => {
    if (userAddress) {
      dispatch(fetchUsersTokens(userAddress));
      dispatch(fetchCollectionsByOwnerAddres(userAddress));
    }
  }, [userAddress]);

  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <SegmentedControl
          value={creditsTabName}
          onChange={(value) => setCreditsTabName(value as CreditsTabName)}
          data={[
            { label: "available", value: "available" },
            { label: "offset", value: "offset" },
          ]}
          color={creditsTabName === "available" ? "FullBlue.3" : "GreenFull.3"}
          mt="xl"
          radius={23}
        />

        {creditsTabName === "available" && (
          <>
            <Flex align="flex-end">
              {userTotalLoading && <Loader />}
              <Text color={palette.fullBlue} size={56}>
                {(userTotalAmount?.amount || 0)?.toLocaleString()}
              </Text>
              <Text color={palette.fullBlue} pb="md" ml="xs">
                CARBON
              </Text>
            </Flex>
            <Stack spacing="xs">
              <IssueCarbonButton
                totalClaimable={0}
                assetsLength={userEntitiesLength}
              />
              <WithdrowCarbonButton
                totalClaimable={entitiesAdminTotal.toLocaleString()}
                assetsLength={userEntitiesLength}
              />

              <Flex align="flex-end" justify="space-between">
                <ImpactCreditsButtonGrey
                  onClick={() => {}}
                  leftIcon={
                    <BaseIcon Icon={SendArrow} width={24} height={24} />
                  }
                >
                  Send
                </ImpactCreditsButtonGrey>
                <ImpactCreditsButtonGrey
                  onClick={() => {}}
                  leftIcon={
                    <BaseIcon width={24} height={24} Icon={ReceiveArrow} />
                  }
                >
                  Receive
                </ImpactCreditsButtonGrey>
              </Flex>
            </Stack>
          </>
        )}
        {creditsTabName === "offset" && (
          <>
            <Flex align="flex-end">
              <Text color={palette.greenFull} size={56}>
                {userTotalAmount?.retired?.toLocaleString()}
              </Text>
              <Text color={palette.greenFull} pb="md" ml="xs">
                CARBON offset
              </Text>
            </Flex>
            <Stack spacing="xs">
              <ImpactCreditsButtonBlue
                leftIcon={
                  <BaseIcon
                    isPointer
                    width={24}
                    height={24}
                    fill={palette.White}
                    Icon={DownArrow}
                  />
                }
                bg={palette.greenFull}
                styles={{
                  root: {
                    backgroundColor: palette.greenFull,
                    ":hover": { backgroundColor: palette.greenDarker },
                  },
                }}
              >
                offset my footprint
              </ImpactCreditsButtonBlue>
            </Stack>
          </>
        )}
      </Stack>
    </Card>
  );
}

export default ImpactCreditsCard;
