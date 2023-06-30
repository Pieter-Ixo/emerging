import { Text, List, Image, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import { PropsWithChildren } from "react";

type Props = {
  entityIdentifier?: string;
  collectionName?: string;
  collectionImage?: string;
  collectionLogo?: string;
  collectionDenom?: string;
  entityCreated?: string;
  entityTotalMinted?: number | string;
  entityOwner?: string;
};

function FieldText({ children }: PropsWithChildren) {
  return (
    <Text fw={400} sx={{ fontSize: 13 }} color={palette.darkestBlue}>
      {children}
    </Text>
  );
}

export default function ImpactAsset({
  entityIdentifier,
  collectionName,
  collectionImage,
  collectionLogo,
  collectionDenom,
  entityCreated,
  entityTotalMinted,
  entityOwner,
}: Props) {
  return (
    <Flex direction="column">
      <Flex
        sx={{
          borderBottom: `1px solid ${palette.Black}`,
          paddingBottom: "8px",
          marginBottom: "8px",
        }}
        gap={8}
        align="center"
      >
        <Image width={24} height={24} src="/images/icon-assets.svg" alt="" />
        <Text
          fw={400}
          sx={{ fontSize: 13 }}
          color={palette.darkestBlue}
          transform="uppercase"
        >
          Impact Asset
        </Text>
      </Flex>
      <Flex direction="column" gap="md">
        <Flex justify="space-between" align="center">
          <FieldText>Identifier</FieldText>
          <FieldText>{entityIdentifier}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Collection</FieldText>
          <FieldText>{collectionName}</FieldText>
        </Flex>
        {/* 
          TODO: FIELDS BELOW WILL BE APPLIED IN THE DETAILS PORTAL
        */}
        {/* <Flex justify="space-between" align="center">
          <FieldText>
            Image
          </Text>
          <Image alt="" src={collectionImage} width={50} height={50} />
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>
            Logo
          </Text>
          <Image alt="" src={collectionLogo} width={50} height={50} />
        </Flex> */}
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
          <FieldText>{entityOwner}</FieldText>
        </Flex>
      </Flex>
    </Flex>
  );
}
