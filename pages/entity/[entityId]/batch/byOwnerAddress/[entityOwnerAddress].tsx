import { useEffect, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAndFilterAdminOwnerBatches } from "@/redux/batches/thunks";
import {
  selectAdminBatchesFiltered,
  selectOwnerAddress,
  selectOwnerFilteredBatches,
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
  const routeOwnerAddress = useValueFromRouter("entityOwnerAddress");
  const entityExternalId = useValueFromRouter("entityId");
  const [opened, { open, close }] = useDisclosure(false);
  const [batchesViewMode, toggleBatchesViewMode] = useToggle([
    ControlsDisplayMods.gridView,
    ControlsDisplayMods.listView,
  ]);

  const adminFilteredBatches = useAppSelector(selectAdminBatchesFiltered);
  const ownerFilteredBatches = useAppSelector(selectOwnerFilteredBatches);
  const entityOwnerAddress = useAppSelector(selectOwnerAddress);

  const [selectedAvailableCredits, setSelectedAvailableCredits] = useState<
    number | undefined
  >();
  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>();

  useEffect(() => {
    if (entityExternalId && routeOwnerAddress)
      dispatch(
        fetchAndFilterAdminOwnerBatches({
          externalId: entityExternalId,
          ownerAddress: routeOwnerAddress,
        })
      );
  }, [entityExternalId]);

  if (!Object.keys(ownerFilteredBatches || {})?.length) return null;

  const onRetireBtnClick = (
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
          ownerAddress={entityOwnerAddress}
          onRetireBtnClick={onRetireBtnClick}
          ownerBatches={ownerFilteredBatches}
          adminBatches={adminFilteredBatches}
        />
      ) : (
        <BatchesTable batches={Object.entries(ownerFilteredBatches || {})} />
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
