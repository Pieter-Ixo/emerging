import { Flex } from "@mantine/core";
import { ISupamotoCookingSumaryContent } from "@/types/supamoto";

import { FieldText, FieldsGroupTitle } from ".";

type Props = {
  identifier?: string;
  country?: string;
  setting?: string;
  household?: string;
  cookingSummary?: ISupamotoCookingSumaryContent[];
};

export default function ImpactProducer({
  identifier,
  country,
  setting,
  household,
  cookingSummary,
}: Props) {
  const totalCookingTime =
    cookingSummary?.reduce(
      (acc, sessionOrIDunnoWhatIsThis) =>
        acc + sessionOrIDunnoWhatIsThis.duration.total,
      0
    ) || 0;
  const totalCookingTimeString = new Date(totalCookingTime * 1000)
    .toISOString()
    .substring(11, 16);

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-user.svg">
        Impact Producer
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Flex justify="space-between" align="center">
          <FieldText>Identifier</FieldText>
          <FieldText>{identifier}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Country</FieldText>
          <FieldText>{country}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Setting</FieldText>
          <FieldText>{setting}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Household</FieldText>
          <FieldText>{household}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Total Cooking Time</FieldText>
          <FieldText>{totalCookingTimeString}</FieldText>
        </Flex>
      </Flex>
    </Flex>
  );
}
