import { Card, Divider, Flex, Text } from "@mantine/core";
import { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren & {
  title: string;
  rightSide?: ReactNode;
};
export default function PageBlock({ title, children, rightSide }: Props) {
  return (
    <Card radius={16} h="100%" px="lg" py="md">
      <Flex justify="space-between">
        <Text size="md" ta="left" fw={400} transform="uppercase">
          {title}
        </Text>
        {rightSide}
      </Flex>
      <Divider mb="lg" color="#000000" />
      {children}
    </Card>
  );
}
