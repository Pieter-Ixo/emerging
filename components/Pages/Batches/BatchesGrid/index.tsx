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

  if (!adminBatches) return null;
  /** The logic behind this grid will be next:
   *  to show owner batches we need to get minted values for the actual
   *  progress from admin batches. Amount(Available Credits to withdraw) / Retired (withdrawn)
   *  we get from owner batches + admin batches or only admin batches(because admin batches
   *  already have all the necessary values)
   *  */
  return (
    <Box maw="70%">
      <Grid gutter="xl">
        {Object.entries(ownerBatches || adminBatches).map(
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
