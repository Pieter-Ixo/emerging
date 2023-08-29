import { useEffect } from "react";
import {
  BackgroundImage,
  Box,
  Container,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";

import { useCookstove } from "@/context/cookstove";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { useAppDispatch } from "@/hooks/redux";
import ImageTextCard from "@/components/Presentational/ImageTextCard";
import HouseholdSVG from "@/assets/icons/household.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { palette } from "@/theme/palette";
import MapImage from "@/components/Presentational/MapImage";
import BaseIcon from "@/components/Presentational/BaseIcon";

const defaultPhotos = [
  "/images/DefaultHouseholdPhotos/default_01.jpg",
  "/images/DefaultHouseholdPhotos/default_02.jpg",
  "/images/DefaultHouseholdPhotos/default_03.jpg",
  "/images/DefaultHouseholdPhotos/default_04.jpg",
];

export default function HouseholdPageLayout() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const entityExternalId = useValueFromRouter<string>("entityId");
  const { stove, fetchStove } = useCookstove();

  useEffect(() => {
    if (!entityExternalId) return;
    fetchStove(entityExternalId);
  }, [dispatch, entityExternalId, fetchStove]);

  if (!entityExternalId) return <Text>missing Entity External Id</Text>;

  return (
    <BackgroundImage src="/images/background.jpg">
      <Container maw="600px" mih="100vh" py="lg">
        <Title
          order={2}
          align="center"
          color={palette.White}
          weight={400}
          pb="lg"
        >
          Supamoto #{entityExternalId}
        </Title>
        <Box pos="relative">
          <ImageTextCard
            Img={HouseholdSVG}
            text="Visit the household"
            vertical
          />
          <BaseIcon
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1em",
              cursor: "pointer",
            }}
            onClick={() => router.back()}
            Icon={ArrowLeftIcon}
          />
        </Box>
        <Stack p={0} mt="md">
          <MapImage
            latitude={stove.cookstove?.latitude}
            longitude={stove.cookstove?.longitude}
          />
          {defaultPhotos.map((photoHref) => (
            <Image
              radius="md"
              src={photoHref}
              alt="photo of asset user's household"
              key={photoHref}
            />
          ))}
        </Stack>
      </Container>
    </BackgroundImage>
  );
}
