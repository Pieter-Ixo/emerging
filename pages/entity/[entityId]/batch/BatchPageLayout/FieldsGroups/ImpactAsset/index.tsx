import { Anchor, Flex } from "@mantine/core";
import shortStr from "@/utils/shortStr";

import { FieldAnchor, FieldText, FieldsGroupTitle } from "..";
import { ImpactAssetProps } from "./props";

import Identifier from "./Identifier";
import Collection from "./Collection";
import Performance from "./Performance";

export default function ImpactAsset({
  entityExternalId,
  entityIdentifier,
  collectionName,
  collectionImage,
  collectionLogo,
  assetLogo,
  assetImage,
  collectionDenom,
  entityCreated,
  entityTotalMinted,
  entityOwner,
  entityName,
  entityDescription,
  entityStartDate,
  collectionProfileDescription,
  collectionProfileName,
  collectionAssetsAmount,
}: ImpactAssetProps) {
  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-assets.svg">
        Impact Asset
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Identifier
          entityIdentifier={entityIdentifier}
          assetImage={assetImage}
          assetLogo={assetLogo}
          entityName={entityName}
          entityDescription={entityDescription}
          entityStartDate={entityStartDate}
        />
        <Collection
          collectionImage={collectionImage}
          collectionLogo={collectionLogo}
          collectionProfileDescription={collectionProfileDescription}
          collectionProfileName={collectionProfileName}
          collectionName={collectionName}
          collectionAssetsAmount={collectionAssetsAmount}
        />
        <Flex justify="space-between" align="center">
          <FieldText>Denom</FieldText>
          <FieldText>{collectionDenom}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Creation Date</FieldText>
          <FieldText>{entityCreated}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Total CARBON Produced</FieldText>
          <FieldText>{entityTotalMinted} CARBON</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Total Emissions Avoided</FieldText>
          <FieldText>{entityTotalMinted} kgCO2</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Owned By</FieldText>
          <FieldAnchor
            href={`https://www.mintscan.io/ixo/account/${entityOwner}`}
            target="_blank"
          >
            {shortStr(entityOwner)}
          </FieldAnchor>
        </Flex>
        <Performance entityExternalId={entityExternalId} />
      </Flex>
    </Flex>
  );
}
