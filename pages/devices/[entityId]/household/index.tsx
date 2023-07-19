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
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchEntityByExternalIdAndFill } from "@/redux/entityCollections/thunks";
import { selectSelectedEntity } from "@/redux/entityCollections/selectors";
import ImageTextCard from "@/components/card-image-text/card-image-text";
import HouseholdSVG from "@/assets/icons/household.svg";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { palette } from "@/theme/palette";

const defaultPhotos = [
  "/images/DefaultHouseholdPhotos/default_01.jpg",
  "/images/DefaultHouseholdPhotos/default_02.jpg",
  "/images/DefaultHouseholdPhotos/default_03.jpg",
  "/images/DefaultHouseholdPhotos/default_04.jpg",
];

export default function HouseholdPageLayout() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const entity = useAppSelector(selectSelectedEntity);

  const entityExternalId = useValueFromRouter<string>("entityId");
  const { stove, fetchStove } = useCookstove();

  useEffect(() => {
    if (!entityExternalId) return;
    fetchStove(entityExternalId);
    dispatch(fetchEntityByExternalIdAndFill(entityExternalId));
  }, [dispatch, stove.id, entityExternalId, fetchStove]);

  console.log("🦧", entity);

  if (!entityExternalId) return <Text>missing Entity External Id</Text>;

  return (
    <BackgroundImage src="/images/background.jpg">
      <Container maw="600px" mih="100vh" p="sm">
        <Title
          order={1}
          align="center"
          color={palette.White}
          weight={400}
          mb="lg"
        >
          Supamoto #{entityExternalId}
        </Title>
        <Box style={{ position: "relative" }}>
          <ImageTextCard
            Img={HouseholdSVG}
            text="Visit the household"
            vertical
          />
          <ArrowLeftIcon
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              margin: "1em",
            }}
            fill="black"
            onClick={() => router.back()}
          />
        </Box>
        <Stack p={0} mt="md">
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
