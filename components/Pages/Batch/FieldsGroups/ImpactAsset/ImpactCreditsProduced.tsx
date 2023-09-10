import { Button, Flex, Card, Text, Anchor } from "@mantine/core";

import { ITokensExtended } from "@/types/entityCollections";
import useDetailPortal from "@/hooks/useDetailPortal";
import { palette } from "@/theme/palette";
import shortStr from "@/utils/shortStr";

import Link from "next/link";
import { FieldText } from "../styledComponents";

type Props = {
  tokenTotal?: number;
  tokens?: ITokensExtended;
  created?: string;
};

export default function ImpactCreditsProduced({
  tokenTotal,
  tokens,
  created,
}: Props) {
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
      {Object.entries(tokensMap ?? {}).map(([batchId, token]) => (
        <Flex justify="space-between" key={batchId}>
          <Link target="_blank" href={batchId} passHref legacyBehavior>
            <Anchor size={13}>{shortStr(batchId, 14, 5)}</Anchor>
          </Link>
          <Flex gap="sm">
            <FieldText>{created}</FieldText>
            <FieldText>{token.minted}</FieldText>
          </Flex>
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
