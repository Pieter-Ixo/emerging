import { Container, Grid, Title, Text } from "@mantine/core";
import React from "react";

import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { IEntity } from "@/types/entityCollections";

import Certificate from "./Certificate";
import DetailCard from "./DetailCard";

export default function CertificateDashboard() {
  const assetExternalId =
    useValueFromRouter<IEntity["externalId"]>("assetExternalId");

  if (!assetExternalId) return <Text>Wrong URL</Text>;

  return (
    <Container fluid w="100%" h="100%" p="2em">
      <Title order={1} size="40px" fw={300} color={palette.Neutral800} mb="2em">
        CARBON Certificate
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={8}>
          <Certificate assetExternalId={assetExternalId} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DetailCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
