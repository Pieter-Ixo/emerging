import { Box, Grid } from "@mantine/core";

import { IAddressBatches } from "@/types/certificates";
import useValueFromRouter from "@/utils/useValueFromRouter";

import BatchesItem from "../BatchesItem";

type Props = {
  batches?: IAddressBatches;
  onBatchClick: (
    retired: number | undefined,
    batchNumber: string | undefined
  ) => void;
};

export default function BatchesGrid({ batches, onBatchClick }: Props) {
  const entityId = useValueFromRouter("entityId");

  return (
    <Box maw="70%">
      <Grid gutter="xl">
        {batches &&
          Object.entries(batches).map(([batchId, batchData]) => (
            <Grid.Col key={batchId} span={6}>
              <BatchesItem
                batchId={batchId}
                amount={batchData.amount}
                retired={batchData.retired}
                minted={batchData.minted}
                offset={batchData.amount}
                onBatchClick={onBatchClick}
                entityId={entityId}
              />
            </Grid.Col>
          ))}
      </Grid>
    </Box>
  );
}
