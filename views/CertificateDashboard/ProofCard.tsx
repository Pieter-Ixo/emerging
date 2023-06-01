import { palette, shadow } from "@/theme/palette";
import { Card, Flex, Text } from "@mantine/core";
import React from "react";

const ProofCard: React.FC = () => {
  return (
    <Card
      shadow={shadow.default}
      radius={16}
      sx={{ height: 400 }}
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
        sx={{ width: "100%", height: "100%" }}
      >
        <Text fw={300} color={palette.Neutral800} align="center">
          Select data on the certificate to display the underlying proof.
        </Text>
      </Flex>
    </Card>
  );
};

export default ProofCard;
