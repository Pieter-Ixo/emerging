import { useEffect, useState } from "react";
import { Box, Grid } from "@mantine/core";
import { useDisclosure, useToggle } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchesByAddress } from "@/redux/batches/thunks";
import { selectAddressBatches } from "@/redux/batches/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { IAddressBatchesEntry } from "@/types/certificates";
import BatchesPageHeader from "@/components/Pages/Batches/Header";
import BatchesItem from "@/components/Pages/Batches/BatchesItem";
import AppLayout from "@/components/Layout/AppLayout";
import RetireModal from "@/components/Pages/Batches/RetireModal";
import { ViewMods } from "@/types/stove";

export default function Batches() {
  const dispatch = useAppDispatch();
  const adminAddress = useValueFromRouter("entityAdminAddress");
  const entityId = useValueFromRouter("entityId");
  const batches = useAppSelector(selectAddressBatches);
  const [opened, { open, close }] = useDisclosure(false);
  const [batchesViewMode, toggleBatchesViewMode] = useToggle([
    ViewMods.gridView,
    ViewMods.listView,
  ]);

  const [parsedBatches, setParsedBatches] = useState<IAddressBatchesEntry[]>();
  const [selectedRetired, setSelectedRetired] = useState<number | undefined>();
  const [selectedBatchNumber, setSelectedBatchNumber] = useState<
    number | undefined
  >();

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

  function onBatchClick(
    retired: number | undefined,
    batchNumber: number | undefined
  ) {
    setSelectedRetired(retired);
    setSelectedBatchNumber(batchNumber);
    open();
  }

  function onModalClose() {
    close();
    setSelectedRetired(undefined);
  }

  return (
    <AppLayout title="Carbon Certificates">
      <Box maw="70%">
        <BatchesPageHeader
          activeViewMode={batchesViewMode}
          toggleBatchesViewMode={toggleBatchesViewMode}
        />
        {batchesViewMode === ViewMods.gridView ? (
          <Grid gutter="xl">
            {parsedBatches?.map(([betchId, betchData]) => (
              <Grid.Col key={betchId} span={6}>
                <BatchesItem
                  index={betchId}
                  amount={betchData.amount}
                  retired={betchData.retired}
                  minted={betchData.minted}
                  offset={betchData.amount}
                  onBatchClick={(
                    retired: number | undefined,
                    batchNumber: number | undefined
                  ) => onBatchClick(retired, batchNumber)}
                  entityId={entityId}
                />
              </Grid.Col>
            ))}
          </Grid>
        ) : (
          <div>Test</div>
        )}
      </Box>
      <RetireModal
        isModalOpened={opened}
        retired={selectedRetired}
        batchNumber={selectedBatchNumber}
        closeModal={() => onModalClose()}
      />
    </AppLayout>
  );
}
