import { Flex, Button } from "@mantine/core";
import Link from "next/link";

import ProfileCard from "@/components/Containers/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";
import getEntityTagsByCategory from "@/helpers/transformData/getEntityTagsByCategory";
import EMERGING_MARKETPLACE_URL from "@/constants/emergingMarketplaceUrl";

import { FieldText } from "../styledComponents";
import { ProjectAttributesProps } from "./props";

export default function ProjectName({
  project,
}: Partial<ProjectAttributesProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ProjectName");

  const tag = getEntityTagsByCategory(project, "Project Type");

  const PortalChild = (
    <Link
      target="_blank"
      href={`${EMERGING_MARKETPLACE_URL}/entity/${project?.id}/overview`}
    >
      <ProfileCard entity={project} tags={tag} />
    </Link>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Name</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {project?._profile?.name}
      </Button>
    </Flex>
  );
}
