import { Text, Card, Flex, Button } from "@mantine/core";

import JSONViewer from "@/components/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";
import { palette } from "@/theme/palette";

import { FieldText } from "../styledComponents";
import { OutcomeProps } from "./props";

export default function Evidence({
  evidence,
  fuelPurchase,
}: Partial<OutcomeProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Evidence");
  const evidenceString = evidence?.split(":")?.[1] || evidence;

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex
        align="center"
        justify="space-between"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
        mb="xs"
      >
        <Text>Evidence Details</Text>
        <Text>DOWNLOAD ➔</Text>
      </Flex>
      <JSONViewer json={JSON.stringify(fuelPurchase)} />
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Evidence</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {evidenceString}
      </Button>
    </Flex>
  );
}
