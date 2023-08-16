import React from "react";
import { Center } from "@mantine/core";

import PageBlock from "../../../PageBlock";

type Props = {
  children?: React.ReactNode;
};

export default function NewsPageBlock({ children }: Props) {
  return (
    <PageBlock title="NEWS">
      <Center mih={267} pb={40}>
        {children}
      </Center>
    </PageBlock>
  );
}
