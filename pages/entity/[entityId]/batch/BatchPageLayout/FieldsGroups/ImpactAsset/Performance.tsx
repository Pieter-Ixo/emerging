import { useEffect } from "react";
import { Button, Card, Flex } from "@mantine/core";

import { useCookstove } from "@/context/cookstove";
import useDetailPortal from "@/hooks/useDetailPortal";
import CookstoveDashboard from "@/components/CookstoveDashboard/inidex";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

export default function Performance({
  entityExternalId,
  totalMinted,
}: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Performance");
  const { stove, fetchStove } = useCookstove();

  useEffect(() => {
    if (entityExternalId) {
      fetchStove(entityExternalId);
    }
  }, [stove.id, entityExternalId, fetchStove]);

  const PortalChild = (
    <Card shadow="sm" padding="0" radius="md" withBorder>
      {entityExternalId && (
        <CookstoveDashboard
          id={entityExternalId}
          stove={stove}
          totalMinted={totalMinted}
        />
      )}
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Performance</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        dashboard
      </Button>
    </Flex>
  );
}
