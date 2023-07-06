import { useState } from "react";
import { createPortal } from "react-dom";
import { Card, Flex, Button } from "@mantine/core";

import { FieldText } from "..";
import { ImpactClaimProps, PortalProps } from "./props";

function PortalComponent({ _isVisible, verifiableCred }: Partial<PortalProps>) {
  const portalTargetElement = document.getElementById("detail-portal-target");
  if (!_isVisible || !portalTargetElement || !verifiableCred?.data) return null;

  return createPortal(
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      {verifiableCred.data.map((item) => {
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
    </Card>,
    portalTargetElement
  );
}

export default function ConversionFactor({
  conversionFactor,
  verifiableCred,
}: Partial<ImpactClaimProps>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Conversion Factor</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => handleClick()}
        variant={isVisible ? "outline" : "subtle"}
      >
        {conversionFactor}
      </Button>
      <PortalComponent _isVisible={isVisible} verifiableCred={verifiableCred} />
    </Flex>
  );
}
