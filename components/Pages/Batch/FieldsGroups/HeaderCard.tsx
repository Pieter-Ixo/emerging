import { Flex } from "@mantine/core";

import {
  CardContainer,
  ArrowLeft,
  CardTitle,
  BatchIdentifier,
  AstroCarbonImage,
  OffsetProgres,
  TagForSomethingIDunnoWhat,
} from "@/components/CertificateLayoutComponents";

type Props = {
  name?: string;
  index?: string;
  offset?: number;
  progress?: number;
};
export default function HeaderCard({ name, index, offset, progress }: Props) {
  return (
    <CardContainer>
      <ArrowLeft />
      <Flex direction="column" gap={10} justify="center">
        <CardTitle>Verified Emission Reduction</CardTitle>
        <BatchIdentifier name={name} index={index} />
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
