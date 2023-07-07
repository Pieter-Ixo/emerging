import { useEffect } from "react";
import { Button, Card, Flex } from "@mantine/core";

import { useCookstove } from "@/context/cookstove";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "..";
import { ImpactAssetProps } from "./props";
import CookstoveDashboard from "./CookstoveDashboard";

export default function Performance({ entityExternalId }: ImpactAssetProps) {
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
        <CookstoveDashboard id={entityExternalId} stove={stove} />
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
