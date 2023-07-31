import { Button, Flex, Card, Text } from "@mantine/core";

import { ITokenCarbonExtended } from "@/types/entityCollections";
import useDetailPortal from "@/hooks/useDetailPortal";
import { palette } from "@/theme/palette";

import Link from "next/link";
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
      <Flex
        align="center"
        justify="space-between"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
        mb="xs"
      >
        <Text>Impact Credits Produced</Text>
        <Text />
      </Flex>
      {Object.entries(tokensMap ?? {}).map(([key, token]) => (
        <Flex direction="row" justify="space-between" key={key}>
          <Link href={key}>
            <FieldText>{key}</FieldText>
          </Link>
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
