import { palette, shadow } from "@/theme/palette";
import { Card, Flex, Text } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { IPropertiesModel } from ".";

const ProofCard: React.FC<{ properties: IPropertiesModel }> = ({
  properties,
}) => {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("detail");
  const selectedProperty = useMemo(
    () => properties[queryParam!],
    [queryParam, properties]
  );

  console.log({ selectedProperty });

  return (
    <Card
      shadow={shadow.default}
      radius={16}
      sx={{ minHeight: 400 }}
      style={{ padding: "1rem 2rem", display: "flex", flexDirection: "column" }}
    >
      <Flex
        align={"center"}
        justify="space-between"
        gap={"md"}
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
      >
        <Text fw={400} transform="uppercase">
          Proof
        </Text>
        <Text fw={400} transform="uppercase">
          Visit ➔
        </Text>
      </Flex>

      <Flex
        align={"center"}
        justify="center"
        sx={{ width: "100%", height: "100%", padding: '1rem 0', margin: 'auto' }}
      >
        {selectedProperty ? (
          <selectedProperty.component {...selectedProperty.props} />
        ) : (
          <Text fw={300} color={palette.Neutral800} align="center">
            Select data on the certificate to display the underlying proof.
          </Text>
        )}
      </Flex>
    </Card>
  );
};

export default ProofCard;
