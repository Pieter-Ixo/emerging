import { Card, Flex, Button, Text, Box } from "@mantine/core";

import JSONViewer from "@/components/Presentational/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";
import { palette } from "@/theme/palette";

import VerifyIcon from "@/icons/batches/VerifyIcon";
import { FieldText } from "../styledComponents";
import { AssetAttributesProps } from "./props";

export default function AssetName({
  deviceCredSubject,
  entityProfile,
}: Partial<AssetAttributesProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("AssetName");

  const PortalChild = (
    <Box w={322}>
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
      <Button
        color="yellow"
        mt={40}
        mb={16}
        h={46}
        w="100%"
        radius="xl"
        leftIcon={<VerifyIcon />}
      >
        <Text fw={400} size={16}>
          Unverified
        </Text>
      </Button>
      <Button h={46} w="100%" radius="xl" leftIcon={<VerifyIcon />}>
        <Text fw={400} size={16}>
          Download
        </Text>
      </Button>
    </Box>
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
