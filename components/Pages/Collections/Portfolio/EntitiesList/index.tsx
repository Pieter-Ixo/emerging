import { useEffect } from "react";
import { Text, Badge, Flex, Grid, Box, Title, Avatar } from "@mantine/core";

import { palette } from "@/theme/palette";
import ProgressBar from "@/components/Presentational/ProgressBar";
import ProfileCard from "@/components/Containers/ProfileCard";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";
import { fillEntitiesForUserCollections } from "@/redux/entityCollections/thunks";
import { selectSelectedEntityExternalId } from "@/redux/entityCollections/selectors";
import {
  ICollectionEntities,
  IEntityExtended,
} from "@/types/entityCollections";
import { getEntityTotalMintedAmount } from "@/helpers/transformData/getTotalMintedAmount";

type EntitiesItemsProps = {
  activeEntityCollection?: ICollectionEntities;
  totalAssets?: number;
};

export default function EntitiesList({
  activeEntityCollection,
  totalAssets,
}: EntitiesItemsProps) {
  const dispatch = useAppDispatch();

  const selectedAssetExternalId = useAppSelector(
    selectSelectedEntityExternalId
  );

  function selectAsset(entity: IEntityExtended) {
    dispatch(setSelectedEntity(entity));
  }

  function deselectAsset() {
    dispatch(setSelectedEntity(undefined));
  }

  function handleAssetClick(entity: IEntityExtended) {
    if (selectedAssetExternalId === undefined) selectAsset(entity);
    else if (selectedAssetExternalId === entity.externalId) deselectAsset();
    else if (selectedAssetExternalId !== entity.externalId) selectAsset(entity);
  }

  useEffect(() => {
    deselectAsset();
    return () => deselectAsset();
  }, []);

  useEffect(() => {
    const isEntitiesFilled = activeEntityCollection?.entities[0]?._profile;

    if (activeEntityCollection && !isEntitiesFilled) {
      dispatch(fillEntitiesForUserCollections(activeEntityCollection));
    }
  }, [activeEntityCollection]);

  if (
    Array.isArray(activeEntityCollection?.entities) &&
    activeEntityCollection?.entities.length === 0
  )
    return <Text>No Assets</Text>;
  return (
    <Grid gutter={24}>
      {activeEntityCollection?.entities?.map((entity) => {
        const isActive = selectedAssetExternalId === entity.externalId;
        return (
          <Grid.Col
            key={entity.id}
            span="content"
            mb={20}
            sx={{
              outline: isActive ? `solid ${palette.activeBlue}` : undefined,
            }}
            onClick={() => handleAssetClick(entity)}
          >
            <ProfileCard
              entity={entity}
              measure={
                <Box>
                  <Badge
                    sx={{
                      background: palette.activeBlue,
                      textAlign: "center",
                      textTransform: "none",
                    }}
                    color=""
                    fw="400"
                    mb="xs"
                    radius="md"
                    variant="filled"
                  >
                    <Text size="xs">0 CARBON to issue</Text>
                  </Badge>
                  <ProgressBar
                    retired={(getEntityTotalMintedAmount(entity) || 0) / 2}
                    produced={getEntityTotalMintedAmount(entity)}
                    totalTokenAmount={getEntityTotalMintedAmount(entity)}
                  />
                  <Flex pt="xs" align="center" justify="space-between">
                    <Flex gap={6} align="end">
                      <Title
                        order={4}
                        c={palette.Black}
                        fw={700}
                        sx={{ lineHeight: 1.1 }}
                      >
                        {entity.alsoKnownAs.replace("{id}", "")}
                      </Title>
                      <Text color={palette.Neutral800} size="xs">
                        of {totalAssets ?? 500}
                      </Text>
                    </Flex>
                    <Avatar
                      src={entity?._profile?.logoUrl}
                      alt=""
                      radius="xl"
                    />
                  </Flex>
                </Box>
              }
            />
          </Grid.Col>
        );
      })}
    </Grid>
  );
}
