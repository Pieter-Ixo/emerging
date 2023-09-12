import { Flex, Button } from "@mantine/core";
import Link from "next/link";

import ProfileCard from "@/components/Containers/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";
import EMERGING_MARKETPLACE_URL from "@/constants/emergingMarketplaceUrl";
import { IEntityExtended } from "@/types/entityCollections";

import { FieldText } from "../../styledComponents";

type Props = {
  validatorAttr?: { key: string; value: string };
  oracle?: IEntityExtended;
};

export default function ImpactEvaluatorValidator({
  validatorAttr,
  oracle,
}: Props) {
  const { isVisible, openPortal, closePortal } = useDetailPortal(
    "ImpactEvaluatorValidator"
  );
  const tags = oracle?._tags?.entityTags[0].tags;

  const PortalChild = (
    <Link
      target="_blank"
      href={`${EMERGING_MARKETPLACE_URL}/entity/did:ixo:entity:7889238a0a6a68554f65f5c7da96f13b/overview`}
    >
      <ProfileCard entity={oracle} tags={tags} />
    </Link>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>{validatorAttr?.key}</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {validatorAttr?.value}
      </Button>
    </Flex>
  );
}
