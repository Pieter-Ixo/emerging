import { Flex } from "@mantine/core";
import shortStr from "@/utils/shortStr";
import dateLocale from "@/utils/dateLocale";

import { FieldAnchor, FieldText, FieldsGroupTitle } from "../styledComponents";
import { ImpactAssetProps } from "./props";

import Identifier from "./Identifier";
import Collection from "./Collection";
import Performance from "./Performance";
import Metadata from "./Metadata";
import ImpactCreditsProduced from "./ImpactCreditsProduced";

export default function ImpactAsset({
  entityExternalId,
  entityOwner,
  collectionAssetsAmount,
  entity,
  collection,
}: ImpactAssetProps) {
  const totalMinted = Object.entries(
    entity?._token?.CARBON._totalMinted?.tokens ?? {}
  )?.[0]?.[1].amount;
  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-assets.svg">
        Impact Asset
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Identifier
          entity={entity}
          collectionAssetsAmount={collectionAssetsAmount}
        />
        <Collection
          collection={collection}
          collectionAssetsAmount={collectionAssetsAmount}
        />
        <Metadata
          created={dateLocale(entity?.metadata.created)}
          metadata={entity?.metadata}
        />
        <ImpactCreditsProduced
          tokenTotal={totalMinted}
          tokens={entity?._token?.CARBON}
        />
        <Flex justify="space-between" align="center">
          <FieldText>Credits Retired</FieldText>
          <FieldText>TBC</FieldText>
        </Flex>
        <Performance
          entityExternalId={entityExternalId}
          totalMinted={totalMinted}
        />
        <Flex justify="space-between" align="center">
          <FieldText>Owned By</FieldText>
          <FieldAnchor
            href={`https://www.mintscan.io/ixo/account/${entityOwner}`}
            target="_blank"
          >
            {shortStr(entityOwner)}
          </FieldAnchor>
        </Flex>
      </Flex>
    </Flex>
  );
}
