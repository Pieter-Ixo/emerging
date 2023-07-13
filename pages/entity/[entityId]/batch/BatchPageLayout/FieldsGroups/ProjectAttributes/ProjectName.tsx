import { Flex, Button } from "@mantine/core";

import ProfileCard from "@/components/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { ProjectAttributesProps } from "./props";

export default function ProjectName({
  project,
}: Partial<ProjectAttributesProps>) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ProjectName");

  const tag = project?._tags?.entityTags.find(
    (et) => et.category === "Project Type"
  )?.tags || [project?._tags?.entityTags[0].category];

  // @ts-ignore
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
