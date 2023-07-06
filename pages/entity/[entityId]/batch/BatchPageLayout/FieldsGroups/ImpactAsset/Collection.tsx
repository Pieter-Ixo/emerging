import { useState } from "react";
import { createPortal } from "react-dom";
import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Text,
  Image,
  Avatar,
  Title,
} from "@mantine/core";

import { palette } from "@/theme/palette";
import useDetailPortal from "@/hooks/useDetailPortal";
import { FieldText } from "..";
import { ImpactAssetProps } from "./props";

export default function Collection({
  collectionName,
  collectionImage,
  collectionLogo,
  collectionProfileDescription,
  collectionProfileName,
  collectionAssetsAmount,
}: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal();

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={collectionImage} height={160} alt="" />
      </Card.Section>

      <Flex direction="row" justify="space-between">
        <Group spacing="4px">
          <Badge bg={palette.redDark} variant="filled">
            Inventory
          </Badge>
          <Badge bg={palette.orangeFull} variant="filled">
            CARBON
          </Badge>
        </Group>
        <Avatar src={collectionLogo} alt="it's me" />
      </Flex>

      <Title color="#01283B" fw={700} size="20px" lh="lg">
        {collectionProfileName}
      </Title>
      <Text color="dimmed" size="12px" lh="100%">
        {collectionProfileDescription}
      </Text>
      {collectionAssetsAmount !== undefined && (
        <Text mt="lg">{collectionAssetsAmount} assets</Text>
      )}
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Collection</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {collectionName}
      </Button>
    </Flex>
  );
}
