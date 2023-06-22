import React, { useEffect } from "react";
import { Card, Flex, Grid } from "@mantine/core";

import { selectBatchesForEntity } from "@/redux/batches/selectors";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAllBatches } from "@/redux/batches/thunks";
import { IEntity } from "@/types/entityCollections";

import CategoryBox from "./CategoryBox";
import { categoryIconMap, properties } from "./MOCKS";
import {
  CardContainer,
  ArrowLeft,
  CardTitle,
  BatchIdentifier,
  AstroCarbonImage,
  OffsetProgres,
  TagForSomethingIDunnoWhat,
} from "./components";

type Props = {
  assetExternalId: IEntity["externalId"];
};

export default function Certificate({ assetExternalId }: Props) {
  const dispatch = useAppDispatch();
  const batches = useAppSelector(selectBatchesForEntity(assetExternalId));

  console.log(
    `🦔 <Certificate/> useAppSelector(selectBatchesForEntity(${assetExternalId})):`,
    batches
  );

  useEffect(() => {
    dispatch(fetchAllBatches());
  }, [dispatch]);

  return (
    <Card radius={16} p={0}>
      <CardContainer>
        <ArrowLeft />
        <Flex direction="column" gap={10} justify="center">
          <CardTitle>VERIFIED EMISSION REDUCTIONS</CardTitle>
          <BatchIdentifier>CARBON/bafyb...j2hha</BatchIdentifier>
        </Flex>

        <Flex align="center" justify="center" gap={28}>
          <AstroCarbonImage />
          <OffsetProgres value={421} max={1200} />
        </Flex>

        <Flex gap="md" justify="center" align="center" direction="row">
          <TagForSomethingIDunnoWhat label="Measurement">
            Verified Emission Reduction
          </TagForSomethingIDunnoWhat>
          <TagForSomethingIDunnoWhat label="Reporter">
            SupaMoto Zambia
          </TagForSomethingIDunnoWhat>
          <TagForSomethingIDunnoWhat label="Verifier">
            Carbon Oracle
          </TagForSomethingIDunnoWhat>
        </Flex>
      </CardContainer>

      <Grid py="md" px="lg" gutter="lg">
        {Object.values(categoryIconMap).map((category, index) => (
          <Grid.Col key={index} span={6}>
            <CategoryBox
              category={category}
              properties={Object.values(properties).filter(
                (property) => property.category! === category.category
              )}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Card>
  );
}
//
