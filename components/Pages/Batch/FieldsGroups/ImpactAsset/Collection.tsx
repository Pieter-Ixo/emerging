import { Button, Flex, Text } from "@mantine/core";
import Link from "next/link";

import ProfileCard from "@/components/Containers/ProfileCard";
import useDetailPortal from "@/hooks/useDetailPortal";
import VerifyIcon from "@/assets/icons/VerifyIcon";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

export default function Collection({
  collectionAssetsAmount,
  collection,
}: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Collection");

  const PortalChild = (
    <>
      <Link href="https://marketplace.emerging.eco/explore?type=asset">
        <ProfileCard
          entity={collection}
          measure={
            collectionAssetsAmount !== undefined && (
              <Text mt="lg">{collectionAssetsAmount} assets</Text>
            )
          }
        />
      </Link>
      <Button w={277} mt={40} h={46} radius="xl" leftIcon={<VerifyIcon />}>
        <Text fw={400} size={16}>
          Verify
        </Text>
      </Button>
    </>
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
