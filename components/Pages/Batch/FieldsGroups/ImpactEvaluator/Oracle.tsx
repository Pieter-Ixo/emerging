import { Flex, Button } from "@mantine/core";
import Link from "next/link";

import ProfileCard from "@/components/Containers/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";
import DASHBOARD_RESOURCES_URL from "@/constants/dashboardResoursesUrl";

import { FieldText } from "../styledComponents";
import { OracleVerificationProps } from "./props";

export default function Oracle({ oracle }: Partial<OracleVerificationProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Oracle");
  const tag = oracle?._tags?.entityTags[0].tags;

  const PortalChild = (
    <Link
      target="_blank"
      href={`${DASHBOARD_RESOURCES_URL}/entity/${oracle?.id}/overview`}
    >
      <ProfileCard entity={oracle} tags={tag} />
    </Link>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Oracle</FieldText>
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
