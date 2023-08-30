import { Flex, Text } from "@mantine/core";

import BaseIcon from "@/components/Presentational/BaseIcon";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

export default function TransactionType() {
  return (
    <Flex align="center" gap={4}>
      <BaseIcon
        variant="circle"
        circleSize="sm"
        status="selected"
        Icon={ArrowLeftIcon}
      />
      <Text>Test</Text>
    </Flex>
  );
}
