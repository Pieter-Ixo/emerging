import { Card, Flex, Button, Text } from "@mantine/core";
import Link from "next/link";

import { palette } from "@/theme/palette";
import JSONViewer from "@/components/Presentational/JSONViewer";
import useDetailPortal from "@/hooks/useDetailPortal";
import jsonToJsonld from "@/utils/files/jsonToJsonld";

import { FieldText } from "../styledComponents";
import { OutcomeProps } from "./props";

export default function Claim({
  claimCer,
  claimDescription,
}: Partial<OutcomeProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Claim");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex
        align="center"
        justify="space-between"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
        mb="xs"
      >
        <Text>Claim Details</Text>
        <Link
          href={jsonToJsonld(claimCer)}
          download={`claimCer-${claimCer?.id}.jsonld`}
        >
          <Text>DOWNLOAD ➔</Text>
        </Link>
      </Flex>
      <JSONViewer json={JSON.stringify(claimCer?.credentialSubject?.claim)} />
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Claim</FieldText>
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
