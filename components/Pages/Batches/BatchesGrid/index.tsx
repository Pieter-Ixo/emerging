import { Box, Grid } from "@mantine/core";

import { IAddressBatches } from "@/types/certificates";
import useValueFromRouter from "@/utils/useValueFromRouter";

import BatchesCard from "../BatchesCard";

type Props = {
  ownerBatches?: IAddressBatches;
  adminBatches?: IAddressBatches;
  ownerAddress?: string;
  onRetireBtnClick: (
    availableCredits: number | undefined,
    batchId: string | undefined
  ) => void;
};

export default function BatchesGrid({
  ownerBatches,
  adminBatches,
  ownerAddress,
  onRetireBtnClick,
}: Props) {
  const entityId = useValueFromRouter("entityId");

  return (
    <Box maw="70%">
      <Grid gutter="xl">
        {((ownerBatches && adminBatches) || (!ownerBatches && adminBatches)) &&
          Object.entries(ownerBatches || adminBatches).map(
            ([batchId, batchData]) => (
              <Grid.Col key={batchId} span={6}>
                <BatchesCard
                  batchId={batchId}
                  amount={batchData.amount}
                  retired={batchData.retired}
                  adminMinted={adminBatches[batchId]?.minted}
                  onRetireBtnClick={onRetireBtnClick}
                  ownerAddress={ownerAddress}
                  entityId={entityId}
                />
              </Grid.Col>
            )
          )}
      </Grid>
    </Box>
  );
}
