import { useEffect } from "react";
import dynamic from "next/dynamic";
import { Button, Card, Flex } from "@mantine/core";

import { useCookstove } from "@/context/cookstove";
import useDetailPortal from "@/hooks/useDetailPortal";
import moreOrEqualZero from "@/utils/moreOrEqualZero";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

const CookstoveDashboard = dynamic(
  () => import("@/components/Containers/CookstoveDashboard")
);

export default function Performance({
  entityExternalId,
  totalMinted,
  totalTokenAmount,
  totalOffset,
  totalTransfarable,
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
          entityExternalId={entityExternalId}
          stove={stove}
          totalTokenAmount={moreOrEqualZero(totalTokenAmount)}
          totalMinted={moreOrEqualZero(totalMinted)}
          totalOffset={moreOrEqualZero(totalOffset)}
          totalTransferred={moreOrEqualZero(totalTransfarable)}
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
