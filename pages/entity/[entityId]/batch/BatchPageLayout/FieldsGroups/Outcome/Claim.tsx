import { Card, Flex, Button } from "@mantine/core";

import JSONViewer from "@/components/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { OutcomeProps } from "./props";

export default function Claim({
  claimCer,
  claimDescription,
}: Partial<OutcomeProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ClaimId");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <JSONViewer json={JSON.stringify(claimCer?.credentialSubject?.claim)} />
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Claim ID</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {claimDescription}
      </Button>
    </Flex>
  );
}
