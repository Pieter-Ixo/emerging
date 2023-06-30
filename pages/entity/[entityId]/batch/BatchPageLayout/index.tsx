import { useEffect } from "react";
import { Container, Grid, Title, Text, List, Code, Image } from "@mantine/core";

import { palette } from "@/theme/palette";
import { IEntity } from "@/types/entityCollections";
import { IBatch } from "@/types/certificates";
import useValueFromRouter from "@/utils/useValueFromRouter";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchById } from "@/redux/batches/thunks";
import {
  fetchAndFillCollections,
  fetchEntityByExternalIdAndFill,
} from "@/redux/entityCollections/thunks";
import {
  selectOnlyCollection,
  selectSelectedEntity,
} from "@/redux/entityCollections/selectors";
import { selectSelectedBatch } from "@/redux/batches/selectors";

import HeaderCard from "./FieldsGroups/HeaderCard";
import ImpactAsset from "./FieldsGroups/ImpactAsset";
import ImpactClaim from "./FieldsGroups/ImpactClaim";

export default function BatchPageLayout() {
  const dispatch = useAppDispatch();
  const batch = useAppSelector(selectSelectedBatch);
  const entity = useAppSelector(selectSelectedEntity);
  const collection = useAppSelector(selectOnlyCollection);

  const entityExternalId =
    useValueFromRouter<IEntity["externalId"]>("entityId");
  const batchId = useValueFromRouter<IBatch["id"]>("batchId");

  useEffect(() => {
    if (!entityExternalId || !batchId) return;
    dispatch(fetchEntityByExternalIdAndFill(entityExternalId));
    dispatch(fetchAndFillCollections());
    dispatch(fetchBatchById(batchId));
  }, [dispatch, entityExternalId, batchId]);

  return (
    <Container fluid w="100%" h="100%" p="2em">
      <Title order={1} size="40px" fw={300} color={palette.Neutral800} mb="2em">
        CARBON Certificate
      </Title>

      <Grid gutter="xl">
        <Grid.Col span={8}>
          <HeaderCard
            name={batch?.name}
            index={batch?.index}
            progress={entity?._token?.CARBON._totalMinted}
          />

          <Grid py="md" px="lg" gutter="lg">
            <Grid.Col span={6}>
              <ImpactAsset
                entityIdentifier={`${entity?._profile?.brand} ${entity?.alsoKnownAs}`}
                collectionName={collection?._tokenIpfs?.name}
                collectionImage={collection?._tokenIpfs?.image}
                collectionLogo={collection?._tokenIpfs?.properties.icon}
                collectionDenom={collection?._tokenIpfs?.properties.denom}
                entityCreated={
                  !entity?.metadata?.created
                    ? undefined
                    : new Date(entity?.metadata?.created).toLocaleDateString()
                }
                entityTotalMinted={entity?._token?.CARBON._totalMinted}
                entityOwner={entity?.owner}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <ImpactClaim
                entityIdentifier={`${entity?._profile?.brand}`}
              />
            </Grid.Col>
          </Grid>
        </Grid.Col>
        <Grid.Col span={4}>{/* <DetailCard /> */}</Grid.Col>
      </Grid>
    </Container>
  );
}
