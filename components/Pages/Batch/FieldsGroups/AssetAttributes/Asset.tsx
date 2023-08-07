import { Card, Flex, Button, Text } from "@mantine/core";

import JSONViewer from "@/components/Presentational/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";
import { palette } from "@/theme/palette";

import { FieldText } from "../styledComponents";
import { AssetAttributesProps } from "./props";

export default function AssetName({
  deviceCredSubject,
  entityProfile,
}: Partial<AssetAttributesProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("AssetName");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex
        align="center"
        justify="space-between"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
        mb="xs"
      >
        <Text>Asset Credential Subject</Text>
        <Text>DOWNLOAD ➔</Text>
      </Flex>
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
