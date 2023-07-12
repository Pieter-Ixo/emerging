import { Flex, Button } from "@mantine/core";

import ProfileCard from "@/components/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { ImpactVerificationProps } from "./props";

export default function Protocol({
  protocol,
}: Partial<ImpactVerificationProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Protocol");

  const PortalChild = <ProfileCard entity={protocol} />;

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Protocol</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {protocol?._profile?.name}
      </Button>
    </Flex>
  );
}
