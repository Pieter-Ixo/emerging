import { useEffect, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchesByAdminAddress } from "@/redux/batches/thunks";
import { selectAdminAddressBatches } from "@/redux/batches/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";
import BatchesPageHeader from "@/components/Pages/Batches/Header";
import AppLayout from "@/components/Layout/AppLayout";
import RetireModal from "@/components/Pages/Batches/RetireModal";
import { ControlsDisplayMods } from "@/types";
import BatchesTable from "@/components/Pages/Batches/BatchesTable";
import BatchesGrid from "@/components/Pages/Batches/BatchesGrid";

export default function AdminBatches() {
  const dispatch = useAppDispatch();
  const adminAddress = useValueFromRouter("entityAdminAddress");
  const adminBatches = useAppSelector(selectAdminAddressBatches);
  const [opened, { open, close }] = useDisclosure(false);
  const [batchesViewMode, toggleBatchesViewMode] = useToggle([
    ControlsDisplayMods.gridView,
    ControlsDisplayMods.listView,
  ]);

  const [selectedOffset, setSelectedOffset] = useState<number | undefined>();
  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>();

  useEffect(() => {
    if (adminAddress) {
      dispatch(fetchBatchesByAdminAddress(adminAddress));
    }
  }, [adminAddress, dispatch]);

  const onBatchClick = (
    offset: number | undefined,
    batchId: string | undefined
  ) => {
    setSelectedOffset(offset);
    setSelectedBatchId(batchId);
    open();
  };

  function onModalClose() {
    close();
    setSelectedOffset(undefined);
  }

  return (
    <AppLayout title="Carbon Certificates">
      <BatchesPageHeader
        activeViewMode={batchesViewMode}
        toggleBatchesViewMode={toggleBatchesViewMode}
      />
      {batchesViewMode === ControlsDisplayMods.gridView ? (
        <BatchesGrid onBatchClick={onBatchClick} adminBatches={adminBatches} />
      ) : (
        <BatchesTable batches={adminBatches && Object.entries(adminBatches)} />
      )}
      <RetireModal
        isModalOpened={opened}
        availableCredits={selectedOffset}
        batchId={selectedBatchId}
        closeModal={() => onModalClose()}
      />
    </AppLayout>
  );
}
