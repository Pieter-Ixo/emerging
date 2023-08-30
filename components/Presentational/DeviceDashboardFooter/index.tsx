import { Flex, Text } from "@mantine/core";

import ButterflyIcon from "@/assets/icons/butterfly.svg";
import { palette } from "@/theme/palette";

import BaseIcon from "../BaseIcon";

export default function DeviceDashboardFooter() {
  return (
    <Flex justify="center" align="center" mt={28} gap={33} w="100%">
      <Text size="md" color={palette.White}>
        T&Cs
      </Text>
      <BaseIcon status="selected" width={60} height={41} Icon={ButterflyIcon} />
      <Text size="md" color={palette.White}>
        FAQ
      </Text>
    </Flex>
  );
}
