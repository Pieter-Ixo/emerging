import { Flex, Button } from "@mantine/core";

import ProfileCard from "@/components/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { OracleVerificationProps } from "./props";

export default function Oracle({ oracle }: Partial<OracleVerificationProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Oracle");
  const tag = oracle?._tags?.entityTags[0].tags as unknown as string;
  const PortalChild = <ProfileCard entity={oracle} tags={[tag]} />;

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
        {oracle?._profile?.name}
      </Button>
    </Flex>
  );
}
