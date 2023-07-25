import { Card, Flex, Stack, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

import DownArrow from "./icons/downArrow";
import { ImpactCreditsButtonBlue } from "./styled-buttons";

export default function BatchesCard() {
  return (
    <Card p="lg" radius={16}>
      <Text weight={300}>Impact Credits</Text>

      <Stack spacing="xl">
        <Flex align="flex-end">
          <Text color={palette.fullBlue} size={56}>
            {41}
          </Text>
          <Text color={palette.fullBlue} pb="md" ml="xs">
            BATCHES
          </Text>
        </Flex>
        <Stack spacing="xs">
          <ImpactCreditsButtonBlue leftIcon={<DownArrow />}>
            Explore
          </ImpactCreditsButtonBlue>
        </Stack>
      </Stack>
    </Card>
  );
}
