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
import { FieldText } from "..";
import { ImpactAssetProps, PortalProps } from "./props";

function PortalComponent({
  _isVisible,
  collectionImage,
  collectionLogo,
  collectionProfileDescription,
  collectionProfileName,
  collectionAssetsAmount,
}: Partial<PortalProps>) {
  const portalTargetElement = document.getElementById("detail-portal-target");
  if (!_isVisible || !portalTargetElement) return null;

  return createPortal(
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
    </Card>,
    portalTargetElement
  );
}

export default function Collection({
  collectionName,
  collectionImage,
  collectionLogo,
  collectionProfileDescription,
  collectionProfileName,
  collectionAssetsAmount,
}: ImpactAssetProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Collection</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => handleClick()}
        variant={isVisible ? "outline" : "subtle"}
      >
        {collectionName}
      </Button>
      <PortalComponent
        _isVisible={isVisible}
        collectionImage={collectionImage}
        collectionLogo={collectionLogo}
        collectionProfileDescription={collectionProfileDescription}
        collectionProfileName={collectionProfileName}
        collectionAssetsAmount={collectionAssetsAmount}
      />
    </Flex>
  );
}
