import { Card, Flex, Button, Text } from "@mantine/core";
import Link from "next/link";

import { palette } from "@/theme/palette";
import useDetailPortal from "@/hooks/useDetailPortal";
import jsonToJsonld from "@/utils/files/jsonToJsonld";

import { FieldText } from "../styledComponents";
import { OutcomeProps } from "./props";

export default function ConversionFactor({
  conversionFactor,
  verifiableCred,
}: Partial<OutcomeProps>) {
  const { isVisible, openPortal, closePortal } =
    useDetailPortal("ConversionFactor");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Flex
        align="center"
        justify="space-between"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
        mb="xs"
      >
        <Text>Asset Credential Subject</Text>
        <Link
          href={jsonToJsonld(verifiableCred)}
          download={`verifiableCred-${verifiableCred?.id}.jsonld`}
        >
          <Text>DOWNLOAD ➔</Text>
        </Link>
      </Flex>
      {verifiableCred?.data.map((item) => {
        const [key] = Object.keys(item);
        const datum = item[key];
        return (
          <Flex direction="row" justify="space-between" key={key}>
            <FieldText>{key}</FieldText>
            <FieldText>
              {datum.value}
              {datum.units}
            </FieldText>
          </Flex>
        );
      })}
    </Card>
  );
  return (
    <Flex justify="space-between" align="center">
      <FieldText>Conversion Factor</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {conversionFactor}
      </Button>
    </Flex>
  );
}
