import { useEffect } from "react";
import { useToggle } from "@mantine/hooks";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchBatchesByAdminAddress } from "@/redux/batches/thunks";
import { selectAdminAddressBatches } from "@/redux/batches/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";
import BatchesPageHeader from "@/components/Pages/Batches/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { ControlsDisplayMods } from "@/types";
import BatchesTable from "@/components/Pages/Batches/BatchesTable";
import BatchesGrid from "@/components/Pages/Batches/BatchesGrid";
import convertBatchesToTableView from "@/helpers/transformData/extendBatches";

export default function AdminBatches() {
  const dispatch = useAppDispatch();
  const adminAddress = useValueFromRouter("entityAdminAddress");
  const adminBatches = useAppSelector(selectAdminAddressBatches);

  const [batchesViewMode, toggleBatchesViewMode] = useToggle([
    ControlsDisplayMods.gridView,
    ControlsDisplayMods.listView,
  ]);

  useEffect(() => {
    if (adminAddress) {
      dispatch(fetchBatchesByAdminAddress(adminAddress));
    }
  }, [adminAddress, dispatch]);

  return (
    <AppLayout title="Impacts">
      <BatchesPageHeader
        activeViewMode={batchesViewMode}
        toggleBatchesViewMode={toggleBatchesViewMode}
      />
      {batchesViewMode === ControlsDisplayMods.gridView ? (
        <BatchesGrid onRetireBtnClick={() => {}} adminBatches={adminBatches} />
      ) : (
        <BatchesTable
          batches={
            convertBatchesToTableView(Object.entries(adminBatches || {}))
          }
        />
      )}
    </AppLayout>
  );
}
