import { Card, Flex, Button } from "@mantine/core";

// TODO: this should be imported from components folder
import JSONViewerCard from "@/pages/certificate/CertificateDashboard/ProofComponents/JSONViewerCard";
import useDetailPortal from "@/hooks/useDetailPortal";
import shortStr from "@/utils/shortStr";

import { FieldText } from "../styledComponents";
import { ImpactClaimProps } from "./props";

export default function ClaimId({ claimCer }: Partial<ImpactClaimProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ClaimId");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <JSONViewerCard
        json={JSON.stringify(claimCer?.credentialSubject?.claim)}
      />
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Claim ID</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {shortStr(claimCer?.id)}
      </Button>
    </Flex>
  );
}
