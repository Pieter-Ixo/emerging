import { Card, Flex, Grid } from "@mantine/core";

import { categoryIconMap, properties } from "@/constants/MOCKS";
import { useAppSelector } from "@/hooks/redux";
import { selectSelectedBatch } from "@/redux/batches/selectors";

import {
  CardContainer,
  ArrowLeft,
  CardTitle,
  BatchIdentifier,
  AstroCarbonImage,
  OffsetProgres,
  TagForSomethingIDunnoWhat,
} from "@/components/CertificateLayoutComponents";

import CategoryBox from "./CategoryBox";

export default function Certificate() {
  const batch = useAppSelector(selectSelectedBatch);

  return (
    <Card radius={16} p={0}>
      <CardContainer>
        <ArrowLeft />
        <Flex direction="column" gap={10} justify="center">
          <CardTitle>Verified Emission Reduction</CardTitle>
          <BatchIdentifier
            index="CARBON"
            name={
              batch?.name ||
              "bafkreibzfmpb5vi3dezygipylystbunhg5nbqwgdahmf4orgeemitelxae"
            }
          />
        </Flex>

        <Flex align="center" justify="center" gap={28}>
          <AstroCarbonImage />
          <OffsetProgres progress={344} />
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

      {/* {batch && <CertificateData />} */}

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
