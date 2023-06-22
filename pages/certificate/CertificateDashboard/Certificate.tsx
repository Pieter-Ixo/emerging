import React, { useEffect } from "react";
import { Card, Flex, Grid } from "@mantine/core";

import { requestBatches } from "@/requests/blocksync";

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

export default function Certificate() {
  useEffect(() => {
    requestBatches().then((batches) => console.log("🦇", batches));
  }, []);

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
