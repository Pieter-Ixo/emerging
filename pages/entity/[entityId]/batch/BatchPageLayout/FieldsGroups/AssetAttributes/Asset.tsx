import { Card, Flex, Button } from "@mantine/core";

import JSONViewer from "@/components/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { AssetAttributesProps } from "./props";

export default function AssetName({
  deviceCredSubject,
  entityProfile,
}: Partial<AssetAttributesProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("AssetName");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <JSONViewer json={JSON.stringify(deviceCredSubject)} />
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Name</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {entityProfile?.name}
      </Button>
    </Flex>
  );
}
