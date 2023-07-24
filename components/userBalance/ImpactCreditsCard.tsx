import { useState } from "react";
import { Card, Flex, SegmentedControl, Stack, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

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
  const [creditsTabName, setCreditsTabName] =
    useState<CreditsTabName>("available");
  const totalClaimable = (3412).toLocaleString();
  const totalOffset = (1412).toLocaleString();

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
              <Text color={palette.fullBlue} size={56}>
                {totalClaimable}
              </Text>
              <Text color={palette.fullBlue} pb="md" ml="xs">
                CARBON
              </Text>
            </Flex>
            <Stack spacing="xs">
              <IssueCarbonButton
                totalClaimable={totalClaimable}
                assetsLength={7}
              />
              <WithdrowCarbonButton
                totalClaimable={totalClaimable}
                assetsLength={7}
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
                {totalOffset}
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
