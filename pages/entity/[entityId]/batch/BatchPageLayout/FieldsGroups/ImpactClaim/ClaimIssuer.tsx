import {
  Avatar,
  Badge,
  Card,
  Flex,
  Group,
  Image,
  Title,
  Text,
  Button,
} from "@mantine/core";

import { palette } from "@/theme/palette";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "..";
import { ImpactClaimProps } from "./props";

export default function ClaimIssuer({
  claimIssuer,
}: Partial<ImpactClaimProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ClaimIssuer");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={claimIssuer?.imageUrl} height={160} alt="" />
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
        <Avatar src={claimIssuer?.logoUrl} alt="it's me" />
      </Flex>

      <Title color="#01283B" fw={700} size="20px" lh="lg">
        {claimIssuer?.name}
      </Title>
      <Text color="dimmed" size="12px" lh="100%">
        {claimIssuer?.description}
      </Text>
    </Card>
  );
  return (
    <Flex justify="space-between" align="center">
      <FieldText>Claim Issuer</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {claimIssuer?.name}
      </Button>
    </Flex>
  );
}
