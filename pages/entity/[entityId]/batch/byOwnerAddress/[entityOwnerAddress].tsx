import { useEffect, useState } from "react";
import { useDisclosure, useToggle } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchesByAddress } from "@/redux/batches/thunks";
import { selectAddressBatches } from "@/redux/batches/selectors";
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
  const batches = useAppSelector(selectAddressBatches);
  const [opened, { open, close }] = useDisclosure(false);
  const [batchesViewMode, toggleBatchesViewMode] = useToggle([
    ControlsDisplayMods.gridView,
    ControlsDisplayMods.listView,
  ]);

  const [selectedAvailableCreditsOffset, setSelectedAvailableCredits] =
    useState<number | undefined>();
  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>();

  useEffect(() => {
    if (ownerAddress) dispatch(fetchBatchesByAddress(ownerAddress));
  }, [ownerAddress, dispatch]);

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
        <BatchesGrid onBatchClick={onBatchClick} batches={batches} />
      ) : (
        <BatchesTable batches={batches && Object.entries(batches)} />
      )}
      <RetireModal
        isModalOpened={opened}
        availableCredits={selectedAvailableCreditsOffset}
        batchId={selectedBatchId}
        closeModal={() => onModalClose()}
      />
    </AppLayout>
  );
}
