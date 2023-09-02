import { Flex } from "@mantine/core";

import ArrowBackLink from "@/components/Layout/ArrowBackLink";
import BatchIdentifier from "@/components/Containers/BatchIdentifier";
import useValueFromRouter from "@/utils/useValueFromRouter";

import CardTitle from "../CardTitle";
import CardContainer from "../CardContainer";
import OffsetProgres from "../OffsetProgres";
import AstroCarbonImage from "../AstroCarbonImage";
import TagForSomethingIDunnoWhat from "../TagForSomethingIDunnoWhat";

type Props = {
  name?: string;
  batchId?: string;
  offset?: number;
  progress?: number;
  entityAdminAddress?: string;
};
export default function HeaderCard({
  name,
  batchId,
  offset,
  progress,
  entityAdminAddress,
}: Props) {
  const entityExternalId = useValueFromRouter("entityId");

  const batchDashboardHref = `/entity/${entityExternalId}/batch/byAdminAddress/${entityAdminAddress}`;

  return (
    <CardContainer>
      <ArrowBackLink link={batchDashboardHref} styles={{ top: 48 }} />
      <Flex direction="column" gap={10} justify="center">
        <CardTitle>Verified Emission Reduction</CardTitle>
        <BatchIdentifier name={name} batchId={batchId} />
      </Flex>

      <Flex align="center" justify="center" gap={28}>
        <AstroCarbonImage />
        <OffsetProgres progress={progress} />
      </Flex>

      <Flex gap="md" justify="center" align="center" direction="row">
        <TagForSomethingIDunnoWhat label="Measurement">
          Verified Emission Reduction
        </TagForSomethingIDunnoWhat>
        <TagForSomethingIDunnoWhat label="Reporter">
          SupaMoto Zambia
        </TagForSomethingIDunnoWhat>
        <TagForSomethingIDunnoWhat label="Verifier">
          Carbon Oracle
        </TagForSomethingIDunnoWhat>
      </Flex>
    </CardContainer>
  );
}
