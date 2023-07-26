import { useEffect, useState } from "react";
import { Box, Grid } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchesByAddress } from "@/redux/batches/thunks";
import { selectAddressBatches } from "@/redux/batches/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { IAddressBatchesEntry } from "@/types/certificates";

import BatchesLayout from "../components/layout/BatchesLayout";
import Header from "../components/Header";
import BatchesItem from "../components/BatchesItem";


export default function Batches() {
  const dispatch = useAppDispatch();
  const adminAddress = useValueFromRouter("entityAdminAddress");
  const entityId = useValueFromRouter("entityId");
  const batches = useAppSelector(selectAddressBatches);

  const [parsedBatches, setParsedBatches] = useState<IAddressBatchesEntry[]>();

  useEffect(() => {
    if (adminAddress) {
      dispatch(fetchBatchesByAddress(adminAddress));
    }
  }, [adminAddress, dispatch]);

  useEffect(() => {
    if (batches) {
      setParsedBatches(Object.entries(batches));
    }
  }, [batches]);

  console.log("🐞💥🔫", { adminAddress, batches, parsedBatches });

  return (
    <BatchesLayout>
      <Box maw="70%">
        <Header />
        <Grid gutter="xl">
          {parsedBatches?.map(([betchId, betchData]) => (
            <Grid.Col key={betchId} span={6}>
              <BatchesItem
                index={betchId}
                amount={betchData.amount}
                retired={betchData.retired}
                minted={betchData.minted}
                offset={betchData.amount}
                entityId={entityId}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </BatchesLayout>
  );
}
