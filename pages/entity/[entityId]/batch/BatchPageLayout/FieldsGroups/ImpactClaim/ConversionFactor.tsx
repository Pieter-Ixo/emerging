import { Card, Flex, Button } from "@mantine/core";

import useDetailPortal from "@/hooks/useDetailPortal";
import { FieldText } from "../styledComponents";
import { ImpactClaimProps } from "./props";

export default function ConversionFactor({
  conversionFactor,
  verifiableCred,
}: Partial<ImpactClaimProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ConversionFactor");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
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
