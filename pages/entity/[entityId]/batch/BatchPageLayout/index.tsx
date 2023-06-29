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
          <List>
            <List.Item>
              <Text fw={700}>Header Card</Text>
              <List>
                <List.Item>
                  <Text>Batch Identifier</Text>
                  <Code color="blue">{`${batch?.name}/${batch?.index}`}</Code>
                </List.Item>
              </List>
            </List.Item>
            <List.Item>
              <Text fw={700}>Impact Asset</Text>
              <List>
                <List.Item>
                  <Text>Identifier</Text>
                  <Code color="blue">
                    {`${entity?._profile?.brand} ${entity?.alsoKnownAs}`}
                  </Code>
                </List.Item>
                <List.Item>
                  <Text>Collection</Text>
                  <Code color="blue">{collection?._tokenIpfs?.name}</Code>
                </List.Item>
                <List.Item>
                  <Text>Image</Text>
                  <Image
                    alt=""
                    src={collection?._tokenIpfs?.image}
                    width={50}
                    height={50}
                  />
                </List.Item>
                <List.Item>
                  <Text>Logo</Text>
                  <Image
                    alt=""
                    src={collection?._tokenIpfs?.properties.icon}
                    width={50}
                    height={50}
                  />
                </List.Item>
                <List.Item>
                  <Text>Denom</Text>
                  <Code color="blue">
                    {collection?._tokenIpfs?.properties.denom}
                  </Code>
                </List.Item>
                <List.Item>
                  <Text>Creation Date</Text>
                  <Code color="blue">
                    {!entity?.metadata?.created
                      ? null
                      : new Date(
                          entity?.metadata?.created
                        ).toLocaleDateString()}
                  </Code>
                </List.Item>
                <List.Item>
                  <Text>Total CARBON Produced</Text>
                  <Code color="red">
                    {entity?._token?.CARBON._totalMinted} CARBON
                  </Code>
                </List.Item>
                <List.Item>
                  <Text>Total Emissions Avoided</Text>
                  <Code color="red">
                    {entity?._token?.CARBON._totalMinted} kgCO2
                  </Code>
                </List.Item>
                <List.Item>
                  <Text>Owned By</Text>
                  <Code color="blue">{entity?.owner}</Code>
                </List.Item>
              </List>
            </List.Item>
          </List>
        </Grid.Col>
        <Grid.Col span={4}>{/* <DetailCard /> */}</Grid.Col>
      </Grid>
    </Container>
  );
}
