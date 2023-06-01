import { palette } from "@/theme/palette";
import { Container, Grid, Text } from "@mantine/core";
import React from "react";
import AggregateCard from "./AggregateCard";
import ProofCard from "./ProofCard";

const CertificateDashboard: React.FC = () => {
  return (
    <Container
      fluid
      sx={{
        padding: "2rem",
        width: "100%",
        height: "100%",
      }}
    >
      <Text
        component="h1"
        size={"40px"}
        fw={300}
        color={palette.Neutral800}
        sx={{ marginBottom: "2rem" }}
      >
        Carbon Certificate
      </Text>

      <Grid>
        <Grid.Col span={8}>
          <AggregateCard />
        </Grid.Col>
        <Grid.Col span={4}>
          <ProofCard />
        </Grid.Col>
      </Grid>
    </Container>
  );
};

export default CertificateDashboard;
