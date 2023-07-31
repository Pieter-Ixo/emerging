import { Flex, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

export default function CollectionFuel() {
  const totalValue = 360;

  return (
    <Flex pt={28} align="flex-end">
      <Text size={56} color={palette.fullBlue} pr={10} fs="normal">
        {totalValue.toLocaleString()}
      </Text>
      <Text color={palette.Black} pb={18} fs="normal" weight={300}>
        kg pellets bought (not real value)
      </Text>
    </Flex>
  );
}
