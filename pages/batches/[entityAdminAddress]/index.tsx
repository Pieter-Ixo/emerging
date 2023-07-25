import { useState } from "react";
import { Box, Grid } from "@mantine/core";
import BatchesLayout from "../components/layout/BatchesLayout";
import Header from "./components/Header";
import BatchesItem from "./components/BatchesItem";

export default function Batches() {
  const [batches, setBatches] = useState([
    {
      test: 1,
    },
    {
      test: 1,
    },
    {
      test: 1,
    },
    {
      test: 1,
    },
  ]);
  return (
    <BatchesLayout>
      <Box maw="70%">
        <Header />
        <Grid gutter="xl">
          {batches &&
            batches.map(() => (
              <Grid.Col key={Date.now()} span={6}>
                <BatchesItem />
              </Grid.Col>
            ))}
        </Grid>
      </Box>
    </BatchesLayout>
  );
}
