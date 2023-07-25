import { useEffect, useState } from "react";
import { Box, Grid } from "@mantine/core";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchesByAddress } from "@/redux/batches/thunks";
import { selectAllBatches } from "@/redux/batches/selectors";

import BatchesLayout from "../components/layout/BatchesLayout";
import Header from "./components/Header";
import BatchesItem from "./components/BatchesItem";

function useAdminAddressFromRouter(): string {
  const router = useRouter();
  const { entityAdminAddress } = router.query;
  console.log(router.query);
  if (typeof entityAdminAddress !== "string") return "";

  return entityAdminAddress;
}

export default function Batches() {
  const dispatch = useAppDispatch();
  const adminAddress = useAdminAddressFromRouter();
  // const batches = useAppSelector(selectAllBatches);

  useEffect(() => {
    if (adminAddress) {
      dispatch(fetchBatchesByAddress(adminAddress));
    }
  }, [adminAddress, dispatch]);

  const [batches, setBatches] = useState([
    {
      test: 1,
      progress: 134,
      offset: 226,
    },
    {
      test: 1,
      progress: 67,
      offset: 174,
    },
    {
      test: 1,
      progress: 78,
      offset: 156,
    },
    {
      test: 1,
      progress: 184,
      offset: 239,
    },
  ]);

  return (
    <BatchesLayout>
      <Box maw="70%">
        <Header />
        <Grid gutter="xl">
          {batches &&
            batches.map((betch, i) => (
              <Grid.Col key={Date.now() + 24} span={6}>
                <BatchesItem progress={betch.progress} offset={betch.offset} />
              </Grid.Col>
            ))}
        </Grid>
      </Box>
    </BatchesLayout>
  );
}
