import React, { useMemo } from "react";
import { Card, Flex, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { properties } from "@/constants/MOCKS";

function DetailCard() {
  const hashId = window.location.hash.split("#").pop();

  const selectedProperty = useMemo(
    () => properties[hashId!],
    [hashId, properties]
  );
  console.log(selectedProperty);

  return (
    <Card
      radius={16}
      sx={{ minHeight: 400 }}
      style={{ padding: "1rem 2rem", display: "flex", flexDirection: "column" }}
    >
      <Flex
        align="center"
        justify="space-between"
        gap="md"
        sx={{ borderBottom: `1px solid ${palette.Black}` }}
      >
        <Text fw={400} transform="uppercase">
          Detail
        </Text>
        <Text fw={400} transform="uppercase">
          Download ➔
        </Text>
      </Flex>

      <Flex
        align="center"
        justify="center"
        sx={{
          width: "100%",
          height: "100%",
          padding: "1rem 0",
          margin: "auto",
        }}
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
}

export default DetailCard;
