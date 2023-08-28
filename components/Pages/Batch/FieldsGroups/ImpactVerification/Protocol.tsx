import { Flex, Button } from "@mantine/core";
import Link from "next/link";

import ProfileCard from "@/components/Containers/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";
import getEntityTagsByCategory from "@/helpers/transformData/getEntityTagsByCategory";
import DASHBOARD_RESOURCES_URL from "@/constants/dashboardResoursesUrl";

import { FieldText } from "../styledComponents";
import { ImpactVerificationProps } from "./props";

export default function Protocol({
  protocol,
}: Partial<ImpactVerificationProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Protocol");
  const tags = getEntityTagsByCategory(protocol, "Asset Type");

  const PortalChild = (
    <Link
      target="_blank"
      href={`${DASHBOARD_RESOURCES_URL}/entity/${protocol?.id}/overview`}
    >
      <ProfileCard entity={protocol} tags={tags} />
    </Link>
  );

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
