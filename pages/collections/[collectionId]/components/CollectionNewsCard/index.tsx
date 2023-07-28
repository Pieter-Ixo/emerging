import { Text, Flex } from "@mantine/core";
import Image from "next/image";

import ArrowRight from "./icons/arrowRight";
import PageBlock from "../PageBlock";

export default function CollectionNewsCard() {
  return (
    <PageBlock
      title="NEWS"
      rightSide={
        <Text>
          SEE ALL
          <ArrowRight pathFill="#000" />
        </Text>
      }
    >
      <Flex direction="column" gap={8}>
        <Image src="/IMG_3991.jpg" alt="" height={170} width={250} />
        <Text fw={500} size={12}>
          Nov 12 22
        </Text>
        <Text>The success story of African Emerging Households</Text>
      </Flex>
    </PageBlock>
  );
}
