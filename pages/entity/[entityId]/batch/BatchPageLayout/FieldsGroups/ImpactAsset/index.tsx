import { Flex } from "@mantine/core";
import shortStr from "@/utils/shortStr";
import dateLocale from "@/utils/dateLocale";
import getEntityTotalTokenAmount, {
  getEntityTotalMintedAmount,
} from "@/helpers/transformData/getTotalMintedAmount";

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
  batchProgress,
}: ImpactAssetProps) {
  const totalTokenAmount = getEntityTotalTokenAmount(entity);
  const totalMinted = getEntityTotalMintedAmount(entity);

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-assets.svg">
        Impact Asset
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Identifier
          retired={totalMinted ? totalMinted / 2 : 0}
          claimable={Number(batchProgress) * 2}
          produced={totalMinted}
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
          created={dateLocale(entity?.metadata.created)}
          tokens={entity?._adminToken?.CARBON}
        />
        <Flex justify="space-between" align="center">
          <FieldText>Credits Retired</FieldText>
          <FieldText>2,460</FieldText>
        </Flex>
        <Performance
          entityExternalId={entityExternalId}
          totalMinted={totalMinted}
          totalTokenAmount={totalTokenAmount}
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
