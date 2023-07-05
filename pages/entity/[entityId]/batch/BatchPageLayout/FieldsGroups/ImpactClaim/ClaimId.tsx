import { useState } from "react";
import { createPortal } from "react-dom";
import { Card, Flex, Button } from "@mantine/core";

// TODO: this should be imported from components folder
import JSONViewerAlternative from "@/pages/certificate/CertificateDashboard/ProofComponents/JSONViewerAlternative";
import shortStr from "@/utils/shortStr";

import { FieldText } from "..";
import { ImpactClaimProps, PortalProps } from "./props";

function PortalComponent({ _isVisible, claimCer }: Partial<PortalProps>) {
  const portalTargetElement = document.getElementById("detail-portal-target");
  if (!_isVisible || !portalTargetElement) return null;

  return createPortal(
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <JSONViewerAlternative json={JSON.stringify(claimCer)} />
    </Card>,
    portalTargetElement
  );
}

export default function ClaimId({ claimCer }: Partial<ImpactClaimProps>) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  function handleClick() {
    setIsVisible((prev) => !prev);
  }

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Claim ID</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => handleClick()}
        variant={isVisible ? "outline" : "subtle"}
      >
        {shortStr(claimCer?.id)}
      </Button>
      <PortalComponent _isVisible={isVisible} claimCer={claimCer} />
    </Flex>
  );
}
