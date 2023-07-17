import { Button, Flex, Card } from "@mantine/core";

import { ITokenCarbonExtended } from "@/types/entityCollections";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";

export default function ImpactCreditsProduced({
  tokenTotal,
  tokens,
}: {
  tokenTotal?: number;
  tokens?: ITokenCarbonExtended;
}) {
  const { isVisible, openPortal, closePortal } = useDetailPortal(
    "ImpactCreditsProduced"
  );
  const tokensMap = tokens?.tokens;
  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {Object.entries(tokensMap ?? {}).map(([key, token]) => (
        <Flex direction="row" justify="space-between" key={key}>
          <FieldText>{key}</FieldText>
          <FieldText>{token.minted}</FieldText>
        </Flex>
      ))}
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Impact Credits Produced</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {tokenTotal?.toLocaleString()}
      </Button>
    </Flex>
  );
}
