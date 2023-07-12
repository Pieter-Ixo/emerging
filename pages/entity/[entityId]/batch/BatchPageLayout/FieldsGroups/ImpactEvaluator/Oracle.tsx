import { Card, Flex, Button } from "@mantine/core";

import JSONViewer from "@/components/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { OracleVerificationProps } from "./props";

export default function Oracle({
  oracleProfile,
}: Partial<OracleVerificationProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Oracle");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <JSONViewer json={JSON.stringify(oracleProfile)} />
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
          oracleProfile?.name
        }
      </Button>
    </Flex>
  );
}
