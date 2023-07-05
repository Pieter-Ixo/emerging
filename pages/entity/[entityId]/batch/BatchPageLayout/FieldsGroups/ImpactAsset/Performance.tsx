import { useState } from "react";
import { createPortal } from "react-dom";
import { Button, Card, Flex } from "@mantine/core";

import CookstoveModal from "@/components/Modals/CookstoveModal";

import { FieldText } from "..";
import { ImpactAssetProps, PortalProps } from "./props";

function PortalComponent({
  _isVisible,
  entityExternalId,
}: Partial<PortalProps>) {
  const portalTargetElement = document.getElementById("detail-portal-target");
  if (!_isVisible || !portalTargetElement) return null;

  return createPortal(
    <Card shadow="sm" padding="0" radius="md" withBorder>
      {entityExternalId && <CookstoveModal id={entityExternalId} />}
    </Card>,
    portalTargetElement
  );
}

export default function Performance({ entityExternalId }: ImpactAssetProps) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Performance</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => handleClick()}
        variant={isVisible ? "outline" : "subtle"}
      >
        dashboard
      </Button>
      <PortalComponent
        _isVisible={isVisible}
        entityExternalId={entityExternalId}
      />
    </Flex>
  );
}
