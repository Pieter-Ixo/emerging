import { Box, Grid } from "@mantine/core";

import { ITransactionBatch } from "@/types/certificates";
import BatchesCard from "@/components/Pages/Batches/BatchesCard";

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
            <BatchesCard
              batchId={id}
              amount={0}
              retired={Number(amount)}
              adminMinted={Number(amount)}
              onRetireBtnClick={onBatchClick}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  );
}
