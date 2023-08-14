import React, { PropsWithChildren } from "react";
import { Center, Text } from "@mantine/core";

import PageBlock from "../../../PageBlock";
import ArrowRight from "../../icons/arrowRight";

export default function PageBlockCentralized({ children }: PropsWithChildren) {
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
      <Center mih={267} pb={40}>
        {children}
      </Center>
    </PageBlock>
  );
}
