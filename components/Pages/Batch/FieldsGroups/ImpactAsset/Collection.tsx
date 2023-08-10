import { Box, Button, Flex, Text } from "@mantine/core";

import ProfileCard from "@/components/Containers/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";

import VerifyIcon from "@/icons/batches/VerifyIcon";
import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

export default function Collection({
  collectionAssetsAmount,
  collection,
}: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Collection");

  const PortalChild = (
    <Box w={277}>
      <ProfileCard
        entity={collection}
        measure={
          collectionAssetsAmount !== undefined && (
            <Text mt="lg">{collectionAssetsAmount} assets</Text>
          )
        }
      />
      <Button mt={40} h={46} w="100%" radius="xl" leftIcon={<VerifyIcon />}>
        <Text fw={400} size={16}>
          Verify
        </Text>
      </Button>
    </Box>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Collection</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {collection?._profile?.name}
      </Button>
    </Flex>
  );
}
