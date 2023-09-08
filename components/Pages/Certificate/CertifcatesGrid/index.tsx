import { Box, Grid } from "@mantine/core";

import { ITransactionBatch } from "@/types/certificates";

import BatchesItem from "../../Batches/BatchesItem";

type Props = {
  batches?: ITransactionBatch[];
  onBatchClick: (
    offset: number | undefined,
    batchId: string | undefined
  ) => void;
};
export default function CertificatesGrid({ batches, onBatchClick }: Props) {
  return (
    <Box maw="70%">
      <Grid gutter="xl">
        {batches?.map(({ id, amount }) => (
          <Grid.Col key={id} span={6}>
            <BatchesItem
              batchId={id}
              amount={0}
              retired={Number(amount)}
              minted={Number(amount)}
              onBatchClick={onBatchClick}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
