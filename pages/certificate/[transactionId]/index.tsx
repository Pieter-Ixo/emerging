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
import CertificatesGrid from "@/components/Pages/Certificate/CertifcatesGrid";

const transactionMockedData = {
  "@type": "ixo.token.v1beta1.MsgRetireToken",
  owner: "ixo1xwn45d6xhe3egcz3nqlfc2elpc3h6usy6yw3uk",
  tokens: [
    {
      id: "f3f21a38abee960ebb96c3780149e411",
      amount: "79",
    },
    {
      id: "7039c1eb4e0471559f5adee1a156b35c",
      amount: "328",
    },
    {
      id: "1f4af07ef744f32a1d8eadaf2f4be81a",
      amount: "328",
    },
    {
      id: "535434307deebff4a62fbafec053cd46",
      amount: "328",
    },
    {
      id: "bae604380508f9a1b1fd4d957c7b8543",
      amount: "328",
    },
    {
      id: "c4326b3d01014b15126a20ebeac75061",
      amount: "328",
    },
    {
      id: "d851779686257fbccb950c97433cfae0",
      amount: "328",
    },
    {
      id: "6972af0c52cdc57c2e5126d86517e4d4",
      amount: "328",
    },
    {
      id: "6db178dc259f04e08d67eec1fca5c9e4",
      amount: "328",
    },
    {
      id: "ab4ad7065b4a353bd5b98b44fd378721",
      amount: "328",
    },
    {
      id: "80e3e6719e596ce4812083354745378c",
      amount: "328",
    },
    {
      id: "0bc28822f56fd0ac0173c231d3e6e283",
      amount: "328",
    },
    {
      id: "76db0f4c79a4e22a3385eb1ff6194d30",
      amount: "328",
    },
    {
      id: "05820076f2c95b6f5116b1ba51e17532",
      amount: "328",
    },
    {
      id: "d3efbe0526b0e577e0fddb805afc1647",
      amount: "328",
    },
    {
      id: "3253f3fd4e9cfe5b580ed99479839661",
      amount: "328",
    },
  ],
  jurisdiction: "SE",
  reason: "Test",
};

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
      <CertificatesGrid
        onBatchClick={() => {}}
        batches={transactionMockedData.tokens}
      />
    </AppLayout>
  );
}
