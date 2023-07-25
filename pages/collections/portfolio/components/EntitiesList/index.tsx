import { Text, Badge, Flex, Grid, Box } from "@mantine/core";
import { palette } from "@/theme/palette";
import { IEntityExtended } from "@/types/entityCollections";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import ProfileCard from "@/components/ProfileCard";
import { getEntityTotalMintedAmount } from "@/helpers/transformData/getTotalMintedAmount";

type EntitiesItemsProps = {
  entities?: IEntityExtended[];
  totalAssets?: number;
};

export default function EntitiesList({
  entities,
  totalAssets
}: EntitiesItemsProps) {


  return (
    <Grid gutter="lg">
          {entities &&
            entities.map((entity) => (
              <Grid.Col key={entity.id} span={4}>
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
            ))}
        </Grid>
  );
}
