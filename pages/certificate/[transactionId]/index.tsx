import { useEffect } from "react";
import { Alert, Box, Loader } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useValueFromRouter from "@/utils/useValueFromRouter";
import BatchesPageHeader from "@/components/Pages/Batches/Header";
import AppLayout from "@/components/Layout/AppLayout";
import { ControlsDisplayMods } from "@/types";
import {
  selectTransaction,
  selectTransactionError,
  selectTransactionIsLoading,
} from "@/redux/transactions/selectors";
import { fetchTransactionByHash } from "@/redux/transactions/thunks";
import JSONViewer from "@/components/Presentational/JSONViewer";

export default function TransactionCertificate() {
  const dispatch = useAppDispatch();
  const transactionId = useValueFromRouter("transactionId");
  const transaction = useAppSelector(selectTransaction);
  const transactionIsLoading = useAppSelector(selectTransactionIsLoading);
  const transactionError = useAppSelector(selectTransactionError);

  useEffect(() => {
    if (transactionId) {
      dispatch(fetchTransactionByHash(transactionId));
    }
  }, [transactionId]);

  return (
    <AppLayout title="Transaction Certificate">
      <BatchesPageHeader
        activeViewMode={ControlsDisplayMods.listView}
        toggleBatchesViewMode={() => {}}
      />
      {transactionIsLoading && <Loader />}
      {transactionError && (
        <Alert title="Error on the last request!" color="red">
          {transactionError.message}
        </Alert>
      )}
      <Box maw={400}>
        <JSONViewer json={JSON.stringify(transaction)} />
      </Box>
    </AppLayout>
  );
}
