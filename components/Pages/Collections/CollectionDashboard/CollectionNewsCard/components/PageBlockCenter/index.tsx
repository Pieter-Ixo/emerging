import React from "react";
import { Anchor, Center, Flex, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import ArrowRight from "@/assets/icons/arrow-right.svg";

import PageBlock from "../../../PageBlock";

type Props = {
  children?: React.ReactNode;
  collectionId?: string;
};

export default function PageBlockCentralized({
  children,
  collectionId,
}: Props) {
  return (
    <PageBlock
      title="NEWS"
      rightSide={
        collectionId ? (
          <Anchor
            href={`/collections/${collectionId}/news`}
            underline={false}
            color={palette.Black}
          >
            <Flex>
              <Text size="md">SEE ALL</Text>
              <BaseIcon width={24} height={25} isPointer Icon={ArrowRight} />
            </Flex>
          </Anchor>
        ) : null
      }
    >
      <Center mih={267} pb={40}>
        {children}
      </Center>
    </PageBlock>
  );
}
