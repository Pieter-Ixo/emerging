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

import { FieldText } from "../styledComponents";
import { OutcomeProps } from "./props";

export default function ClaimIssuer({ claimIssuer }: Partial<OutcomeProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ClaimIssuer");

  const PortalChild = (
    <Link href="https://launchpad.ixo.world/entity/did:ixo:entity:a1fcead81eab2f1158a726597d872413/overview">
      <Card shadow="sm" padding="lg" w={277} h={400} radius="md" withBorder>
        <Card.Section>
          <Image src={claimIssuer?.imageUrl} height={160} alt="" />
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
          <Avatar src={claimIssuer?.logoUrl} alt="" />
        </Flex>

        <Title order={4} color="#01283B" fw={700} size="20px" lh="lg">
          {claimIssuer?.name}
        </Title>
        <Text color="dimmed" size="12px" lh="100%">
          {claimIssuer?.description}
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
        {claimIssuer?.name}
      </Button>
    </Flex>
  );
}
