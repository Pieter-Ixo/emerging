import { useContext, useEffect, useState } from "react";
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
import { fetchUsersTokens } from "@/redux/entityCollections/thunks";
import { WalletContext } from "@/context/wallet";

import DownArrow from "./icons/downArrow";
import ReceiveArrow from "./icons/receiveArrow";
import SendArrow from "./icons/sendArrow";
import {
  ImpactCreditsButtonBlue,
  ImpactCreditsButtonGrey,
} from "./styled-buttons";
import IssueCarbonButton from "./buttons/IssueCarbonButton";
import WithdrowCarbonButton from "./buttons/WithdrowCarbonButton";

type CreditsTabName = "available" | "offset";

function ImpactCreditsCard() {
  const dispatch = useAppDispatch();
  const [creditsTabName, setCreditsTabName] =
    useState<CreditsTabName>("available");
  const { wallet } = useContext(WalletContext);
  const userAddress =
    "ixo1xwn45d6xhe3egcz3nqlfc2elpc3h6usy6yw3uk" || wallet.user?.address;

  const userEntitiesLength = useAppSelector(selectUserEntitiesLength);
  const userTotalAmount = useAppSelector(selectUserEntitiesTotalAmount);
  const userTotalLoading = useAppSelector(selectUserEntitiesTotalLoading);
  const entitiesAdminTotal = useAppSelector(selectEntitiesAdminTotal);

  useEffect(() => {
    if (userAddress) dispatch(fetchUsersTokens(userAddress));
  }, [dispatch, userAddress]);

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
          w={272}
          mt="xl"
          style={{ borderRadius: 23 }}
          radius={20}
        />

        {creditsTabName === "available" && (
          <>
            <Flex align="flex-end">
              {userTotalLoading && <Loader />}
              <Text color={palette.fullBlue} size={56}>
                {userTotalAmount?.amount?.toLocaleString()}
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
                  leftIcon={<SendArrow />}
                >
                  Send
                </ImpactCreditsButtonGrey>
                <ImpactCreditsButtonGrey
                  onClick={() => {}}
                  leftIcon={<ReceiveArrow />}
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
                leftIcon={<DownArrow />}
                bg={palette.greenFull}
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
