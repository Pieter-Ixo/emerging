import { useRouter } from "next/router";
import { Flex } from "@mantine/core";

import BatchIdentifier from "@/components/Containers/BatchIdentifier";
import BatchProgress from "@/components/Containers/BatchProgress";
import useValueFromRouter from "@/utils/useValueFromRouter";
import BaseIcon from "@/components/Presentational/BaseIcon";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";

import CardTitle from "../CardTitle";
import CardContainer from "../CardContainer";
import AstroCarbonImage from "../AstroCarbonImage";
import TagForSomethingIDunnoWhat from "../TagForSomethingIDunnoWhat";

type Props = {
  name?: string;
  batchId?: string;
  minted?: number;
  amount?: number;
  retired?: number;
  entityAdminAddress?: string;
};
export default function HeaderCard({
  name,
  batchId,
  minted,
  amount,
  retired,
  entityAdminAddress,
}: Props) {
  const entityExternalId = useValueFromRouter("entityId");
  const router = useRouter();

  // Use url below, when it will be clear, where to redirect to ownerAddress or adminAddress
  const batchDashboardHref = `/entity/${entityExternalId}/batch/byAdminAddress/${entityAdminAddress}`;

  return (
    <CardContainer>
      <BaseIcon
        onClick={() => router.back()}
        style={{ top: 48, cursor: "pointer" }}
        Icon={ArrowLeftIcon}
      />
      <Flex direction="column" gap={10} justify="center">
        <CardTitle>Verified Emission Reduction</CardTitle>
        <BatchIdentifier name={name} batchId={batchId} />
      </Flex>

      <Flex align="center" justify="center" px="xl" gap={28}>
        <AstroCarbonImage />
        <BatchProgress retired={retired} amount={amount} adminMinted={minted} />
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
