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
  Tooltip,
} from "@mantine/core";

import { palette } from "@/theme/palette";
import { FieldText } from "..";
import { ImpactAssetProps, PortalProps } from "./props";

function PortalComponent({
  _isVisible,
  assetImage,
  assetLogo,
  entityName,
  entityDescription,
  entityStartDate,
}: Partial<PortalProps>) {
  const portalTargetElement = document.getElementById("detail-portal-target");
  if (!_isVisible || !portalTargetElement) return null;

  const startDate = entityStartDate
    ? new Date(entityStartDate).toLocaleDateString()
    : null;

  return createPortal(
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={assetImage} height={160} alt="" />
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
        <Avatar src={assetLogo} alt="it's me" />
      </Flex>

      <Title color="#01283B" fw={700} size="20px" lh="lg">
        {entityName}
      </Title>
      <Text color="dimmed" size="12px" lh="100%">
        {entityDescription}
      </Text>
      <Flex direction="row" justify="space-between" mt="lg">
        <Text color="dimmed" size="12px" lh="100%">
          {startDate}
        </Text>
        <Tooltip label="MOCKED VALUE">
          <Text color="dimmed" size="12px" lh="100%">
            ${(189.0).toLocaleString()}
          </Text>
        </Tooltip>
      </Flex>
    </Card>,
    portalTargetElement
  );
}

export default function Identifier({
  entityIdentifier,
  assetImage,
  assetLogo,
  entityName,
  entityDescription,
  entityStartDate,
}: ImpactAssetProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Identifier</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => handleClick()}
        variant={isVisible ? "outline" : "subtle"}
      >
        {entityIdentifier}
      </Button>
      <PortalComponent
        _isVisible={isVisible}
        assetImage={assetImage}
        assetLogo={assetLogo}
        entityName={entityName}
        entityDescription={entityDescription}
        entityStartDate={entityStartDate}
      />
    </Flex>
  );
}
