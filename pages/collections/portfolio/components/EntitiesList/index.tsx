import { useEffect, useState } from "react";
import { Text, Badge, Flex, Grid, Box } from "@mantine/core";
import { palette } from "@/theme/palette";

import ProgressBar from "@/components/progress-bar/ProgressBar";
import ProfileCard from "@/components/ProfileCard";

import { IEntityExtended } from "@/types/entityCollections";
import { getEntityTotalMintedAmount } from "@/helpers/transformData/getTotalMintedAmount";
import { useAppDispatch } from "@/hooks/redux";
import { setSelectedEntity } from "@/redux/entityCollections/slice";

type EntitiesItemsProps = {
  entities?: IEntityExtended[];
  totalAssets?: number;
};

export default function EntitiesList({
  entities,
  totalAssets,
}: EntitiesItemsProps) {
  const dispatch = useAppDispatch();
  const [activeAssetId, setActiveAssetId] = useState<string>();

  function selectAsset(entity: IEntityExtended) {
    setActiveAssetId(entity.externalId);
    dispatch(setSelectedEntity(entity));
  }

  function deselectAsset() {
    dispatch(setSelectedEntity(undefined));
    setActiveAssetId(undefined);
  }

  function handleAssetClick(entity: IEntityExtended) {
    if (activeAssetId === undefined) selectAsset(entity);
    else if (activeAssetId === entity.externalId) deselectAsset();
    else if (activeAssetId !== entity.externalId) selectAsset(entity);
  }

  useEffect(
    () => () => {
      deselectAsset();
    },
    []
  );

  return (
    <Grid justify="space-between">
      {entities?.map((entity) => {
        const isActive = activeAssetId === entity.externalId;
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
                    0 CARBON to issue
                  </Badge>
                  <ProgressBar
                    retired={(getEntityTotalMintedAmount(entity) || 0) / 2}
                    produced={getEntityTotalMintedAmount(entity)}
                  />
                  <Flex gap={6} align="end" pt="xs">
                    <Text
                      c={palette.Black}
                      fw={700}
                      size="23px"
                      sx={{ lineHeight: 1.1 }}
                    >
                      {entity.alsoKnownAs.replace("{id}", "")}
                    </Text>
                    <Text color="dimmed" size="12px">
                      of {totalAssets ?? 500}
                    </Text>
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
