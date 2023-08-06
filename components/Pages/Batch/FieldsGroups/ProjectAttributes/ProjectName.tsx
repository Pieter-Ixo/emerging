import { Flex, Button } from "@mantine/core";

import ProfileCard from "@/components/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";
import getEntityTagsByCategory from "@/helpers/transformData/getEntityTagsByCategory";

import { FieldText } from "../styledComponents";
import { ProjectAttributesProps } from "./props";

export default function ProjectName({
  project,
}: Partial<ProjectAttributesProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ProjectName");

  const tag = getEntityTagsByCategory(project, "Project Type");

  const PortalChild = <ProfileCard entity={project} tags={tag} />;

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
