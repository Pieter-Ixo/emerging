import { Button, Flex, Card, Text } from "@mantine/core";

import { IMetadata } from "@/types/entityCollections/commonTypes";
import useDetailPortal from "@/hooks/useDetailPortal";
import JSONViewer from "@/components/Presentational/JSONViewer";
import { palette } from "@/theme/palette";

import { FieldText } from "../styledComponents";

export default function Metadata({
  created,
  metadata,
}: {
  created?: string;
  metadata?: IMetadata;
}) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Metadata");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex
        align="center"
        justify="space-between"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
        mb="xs"
      >
        <Text>Asset Metadata</Text>
        <Text>DOWNLOAD ➔</Text>
      </Flex>
      <JSONViewer json={JSON.stringify(metadata)} />
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Created</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {created}
      </Button>
    </Flex>
  );
}
