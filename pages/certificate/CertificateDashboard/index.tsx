import { Container, Grid, Title } from "@mantine/core";
import React from "react";

import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { IEntity } from "@/types/entityCollections";

import AggregateCard from "./AggregateCard";
import DetailCard from "./DetailCard";
import { categories, properties } from "./MOCKS";

export default function CertificateDashboard() {
  const assetExternalId =
    useValueFromRouter<IEntity["externalId"]>("assetExternalId");
  console.log(assetExternalId);

  return (
    <Container fluid w="100%" h="100%" p="2em">
      <Title order={1} size="40px" fw={300} color={palette.Neutral800} mb="2em">
        CARBON Certificate
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={8}>
          <AggregateCard categories={categories} properties={properties} />
        </Grid.Col>
        <Grid.Col span={4}>
          <DetailCard properties={properties} />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
