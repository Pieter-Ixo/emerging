import { Card, Flex, Button } from "@mantine/core";

import JSONViewer from "@/components/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { ImpactVerificationProps } from "./props";

export default function Protocol({
  protocolProfile,
}: Partial<ImpactVerificationProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Protocol");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <JSONViewer json={JSON.stringify(protocolProfile)} />
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Protocol</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {
          // @ts-ignore
          protocolProfile?.name
        }
      </Button>
    </Flex>
  );
}
