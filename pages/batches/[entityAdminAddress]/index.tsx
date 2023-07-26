import { useEffect, useState } from "react";
import { Box, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchesByAddress } from "@/redux/batches/thunks";
import { selectAddressBatches } from "@/redux/batches/selectors";

import { IAddressBatchesEntry } from "@/types/certificates";
import BatchesLayout from "../components/layout/BatchesLayout";
import Header from "./components/Header";
import BatchesItem from "./components/BatchesItem";

function useAdminAddressFromRouter(): string {
  const router = useRouter();
  const { entityAdminAddress } = router.query;

  if (typeof entityAdminAddress !== "string") return "";

  return entityAdminAddress;
}

export default function Batches() {
  const dispatch = useAppDispatch();
  const adminAddress = useAdminAddressFromRouter();
  const batchesEntries = useAppSelector(selectAddressBatches);

  const [parsedBatches, setParsedBatches] = useState<IAddressBatchesEntry[]>();

  const parseAddressBatches = batchesEntries && Object.entries(batchesEntries);

  useEffect(() => {
    if (adminAddress) {
      dispatch(fetchBatchesByAddress(adminAddress));
      setParsedBatches(parseAddressBatches);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adminAddress, dispatch]);

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
              />
            </Grid.Col>
          ))}
        </Grid>
      </Box>
    </BatchesLayout>
  );
}
