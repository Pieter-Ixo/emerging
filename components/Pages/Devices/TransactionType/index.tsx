import { Center, Text } from "@mantine/core";

import BaseIcon from "@/components/Presentational/BaseIcon";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

export default function TransactionType() {
  return (
    <Center>
      <BaseIcon
        variant="circle"
        circleSize="sm"
        status="selected"
        Icon={ArrowLeftIcon}
      />
      <Text pl={4} lh={1}>
        Test
      </Text>
    </Center>
  );
}
