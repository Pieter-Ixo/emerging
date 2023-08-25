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
import Link from "next/link";

import { palette } from "@/theme/palette";
import useDetailPortal from "@/hooks/useDetailPortal";
import STATIC_RESOURCES_URL from "@/constants/staticUrl";

import { FieldText } from "../styledComponents";
import { OutcomeProps } from "./props";

export default function ClaimIssuer({
  claimIssuerProfile,
  claimIssuerProfileId,
}: Partial<OutcomeProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ClaimIssuer");

  const PortalChild = (
    <Link
      target="_blank"
      href={`${STATIC_RESOURCES_URL}/entity/${claimIssuerProfileId}/overview`}
    >
      <Card shadow="sm" padding="lg" w={277} h={400} radius="md" withBorder>
        <Card.Section>
          <Image src={claimIssuerProfile?.imageUrl} height={160} alt="" />
        </Card.Section>

        <Flex direction="row" pb={10} justify="space-between">
          <Group spacing="4px">
            <Badge bg={palette.redDark} variant="filled">
              Inventory
            </Badge>
            <Badge bg={palette.orangeFull} variant="filled">
              CARBON
            </Badge>
          </Group>
          <Avatar src={claimIssuerProfile?.logoUrl} alt="" />
        </Flex>

        <Title order={4} color="#01283B" fw={700} size="20px" lh="lg">
          {claimIssuerProfile?.name}
        </Title>
        <Text color="dimmed" size="12px" lh="100%">
          {claimIssuerProfile?.description}
        </Text>
      </Card>
    </Link>
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
        {claimIssuerProfile?.name}
      </Button>
    </Flex>
  );
}
