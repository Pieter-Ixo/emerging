import React, { PropsWithChildren } from "react";
import { Anchor, Center } from "@mantine/core";

import { palette } from "@/theme/palette";
import PageBlock from "../../../PageBlock";
import ArrowRight from "../../icons/arrowRight";

export default function PageBlockCentralized({
  children,
  collectionId,
}: PropsWithChildren & { collectionId: string | undefined }) {
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
            SEE ALL
            <ArrowRight pathFill="#000" />
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
