import { useEffect } from "react";
import { Alert, Loader } from "@mantine/core";
import { useRouter } from "next/router";

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
import { selectConnectedWallet } from "@/redux/selectors";
import { fetchTransactionByHash } from "@/redux/transactions/thunks";
import CertificatesGrid from "@/components/Pages/Certificate/CertifcatesGrid";

export default function TransactionCertificate() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const transactionId = useValueFromRouter("transactionId");
  const transaction = useAppSelector(selectTransaction);
  const transactionIsLoading = useAppSelector(selectTransactionIsLoading);
  const transactionError = useAppSelector(selectTransactionError);
  const userWallet = useAppSelector(selectConnectedWallet);

  useEffect(() => {
    if (transactionId && userWallet)
      dispatch(fetchTransactionByHash(transactionId));
  }, [transactionId]);

  useEffect(() => {
    if (!userWallet)
      router.push("/collections/global", undefined, { shallow: true });
  }, []);
  return (
    <AppLayout title="Impacts">
      <BatchesPageHeader
        activeViewMode={ControlsDisplayMods.gridView}
        toggleBatchesViewMode={() => {}}
      />
      {transactionIsLoading && <Loader />}
      {transactionError && (
        <Alert title="Error on the last request!" color="red">
          {transactionError.message}
        </Alert>
      )}
      <CertificatesGrid onBatchClick={() => {}} batches={transaction?.tokens} />
    </AppLayout>
  );
}
