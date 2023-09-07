import { useEffect, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchBatchesEntityByExternalId,
  fetchBatchesByOwnerAddress,
  fetchBatchesByAdminAddress,
} from "@/redux/batches/thunks";
import {
  selectAdminAddressBatches,
  selectBatchesEntity,
  selectOwnerAddressBatches,
} from "@/redux/batches/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";
import BatchesPageHeader from "@/components/Pages/Batches/Header";
import AppLayout from "@/components/Layout/AppLayout";
import RetireModal from "@/components/Pages/Batches/RetireModal";
import { ControlsDisplayMods } from "@/types";
import BatchesTable from "@/components/Pages/Batches/BatchesTable";
import BatchesGrid from "@/components/Pages/Batches/BatchesGrid";

export default function OwnerBatches() {
  const dispatch = useAppDispatch();
  const ownerAddress = useValueFromRouter("entityOwnerAddress");
  const entityExternalId = useValueFromRouter("entityId");

  const [opened, { open, close }] = useDisclosure(false);
  const [batchesViewMode, toggleBatchesViewMode] = useToggle([
    ControlsDisplayMods.gridView,
    ControlsDisplayMods.listView,
  ]);

  const adminBatches = useAppSelector(selectAdminAddressBatches);
  const ownerBatches = useAppSelector(selectOwnerAddressBatches);
  const batchesEntity = useAppSelector(selectBatchesEntity);

  const [selectedAvailableCredits, setSelectedAvailableCredits] = useState<
    number | undefined
  >();
  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>();

  useEffect(() => {
    if (ownerAddress) dispatch(fetchBatchesByOwnerAddress(ownerAddress));
  }, [ownerAddress]);

  useEffect(() => {
    if (batchesEntity?.accounts[0].address)
      dispatch(fetchBatchesByAdminAddress(batchesEntity?.accounts[0].address));
  }, [batchesEntity?.accounts[0].address]);

  useEffect(() => {
    if (entityExternalId)
      dispatch(fetchBatchesEntityByExternalId(entityExternalId));
  }, [entityExternalId, dispatch]);

  const onBatchClick = (
    availableCredits: number | undefined,
    batchId: string | undefined
  ) => {
    setSelectedAvailableCredits(availableCredits);
    setSelectedBatchId(batchId);
    open();
  };

  function onModalClose() {
    close();
    setSelectedAvailableCredits(undefined);
  }

  return (
    <AppLayout title="Carbon Certificates">
      <BatchesPageHeader
        activeViewMode={batchesViewMode}
        toggleBatchesViewMode={toggleBatchesViewMode}
      />
      {batchesViewMode === ControlsDisplayMods.gridView ? (
        <BatchesGrid
          onBatchClick={onBatchClick}
          ownerBatches={ownerBatches}
          adminBatches={adminBatches}
        />
      ) : (
        <BatchesTable batches={ownerBatches && Object.entries(ownerBatches)} />
      )}
      <RetireModal
        isModalOpened={opened}
        availableCredits={selectedAvailableCredits}
        batchId={selectedBatchId}
        closeModal={() => onModalClose()}
      />
    </AppLayout>
  );
}
