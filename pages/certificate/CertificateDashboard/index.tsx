import { useEffect } from "react";
import { Container, Grid, Title, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { IEntity } from "@/types/entityCollections";
import useValueFromRouter from "@/utils/useValueFromRouter";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAllBatches } from "@/redux/batches/thunks";
import {
  fetchAndFillCollections,
  fetchEntityByExternalIdAndFill,
} from "@/redux/entityCollections/thunks";
import { selectAllBatches } from "@/redux/batches/selectors";
import { setSelectedBatch } from "@/redux/batches/slice";

import Certificate from "./Certificate";
import DetailCard from "./DetailCard";

export default function CertificateDashboard() {
  const dispatch = useAppDispatch();
  const batches = useAppSelector(selectAllBatches);

  const assetExternalId =
    useValueFromRouter<IEntity["externalId"]>("assetExternalId");

  useEffect(() => {
    if (!assetExternalId) return;
    dispatch(fetchEntityByExternalIdAndFill(assetExternalId));
    dispatch(fetchAndFillCollections());
    dispatch(fetchAllBatches());
  }, [dispatch, assetExternalId]);

  useEffect(() => {
    if (batches?.[0]) {
      dispatch(setSelectedBatch(batches[0]));
    }
  }, [dispatch, batches]);

  if (!assetExternalId) return <Text>Wrong URL</Text>;

  return (
    <Container fluid w="100%" h="100%" p="2em">
      <Title order={1} size="40px" fw={300} color={palette.Neutral800} mb="2em">
        CARBON Certificate
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={8}>
          <Certificate />
        </Grid.Col>
        <Grid.Col span={4}>
          <DetailCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
